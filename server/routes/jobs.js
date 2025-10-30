import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory storage
const jobs = new Map();
const jobQueue = [];

/**
 * Job types supported
 */
const JOB_TYPES = {
  LLM_INFERENCE: 'llm_inference',
  LLM_FINE_TUNING: 'llm_fine_tuning',
  RAG_INDEXING: 'rag_indexing',
  VISION_PIPELINE: 'vision_pipeline',
  RENDER: 'render',
  GENERIC_COMPUTE: 'generic_compute'
};

const JOB_STATUS = {
  PENDING: 'pending',
  QUEUED: 'queued',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
};

/**
 * POST /api/jobs
 * Create a new job
 */
router.post('/', async (req, res) => {
  try {
    const {
      walletAddress,
      jobType,
      model,
      input,
      requirements,
      budget,
      maxDuration
    } = req.body;

    // Validation
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    if (!jobType || !Object.values(JOB_TYPES).includes(jobType)) {
      return res.status(400).json({
        error: 'Invalid job type',
        validTypes: Object.values(JOB_TYPES)
      });
    }

    const jobId = uuidv4();
    const job = {
      jobId,
      walletAddress,
      jobType,
      model: model || 'default',
      input: input || {},
      requirements: requirements || {
        minVRAM: 8,
        capabilities: ['inference']
      },
      budget: budget || 0,
      maxDuration: maxDuration || 3600, // 1 hour default
      status: JOB_STATUS.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedNode: null,
      result: null,
      logs: [],
      metrics: {
        startTime: null,
        endTime: null,
        duration: null,
        cost: 0
      }
    };

    jobs.set(jobId, job);
    jobQueue.push(jobId);

    // Simulate matchmaking (will be replaced with real logic)
    setTimeout(() => {
      const j = jobs.get(jobId);
      if (j && j.status === JOB_STATUS.PENDING) {
        j.status = JOB_STATUS.QUEUED;
        j.updatedAt = new Date().toISOString();
        jobs.set(jobId, j);
      }
    }, 1000);

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      job
    });

  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

/**
 * GET /api/jobs
 * List all jobs or filter by wallet
 */
router.get('/', (req, res) => {
  const { walletAddress, status, jobType, limit = 100 } = req.query;

  let jobList = Array.from(jobs.values());

  // Filter by wallet
  if (walletAddress) {
    jobList = jobList.filter(j => j.walletAddress === walletAddress);
  }

  // Filter by status
  if (status) {
    jobList = jobList.filter(j => j.status === status);
  }

  // Filter by job type
  if (jobType) {
    jobList = jobList.filter(j => j.jobType === jobType);
  }

  // Sort by creation date (newest first)
  jobList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Limit results
  jobList = jobList.slice(0, parseInt(limit));

  res.json({
    success: true,
    count: jobList.length,
    jobs: jobList
  });
});

/**
 * GET /api/jobs/:jobId
 * Get specific job details
 */
router.get('/:jobId', (req, res) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.json({
    success: true,
    job
  });
});

/**
 * POST /api/jobs/:jobId/cancel
 * Cancel a job
 */
router.post('/:jobId/cancel', (req, res) => {
  const { jobId } = req.params;
  const { walletAddress } = req.body;

  const job = jobs.get(jobId);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  // Verify ownership
  if (job.walletAddress !== walletAddress) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  // Can only cancel pending or queued jobs
  if (![JOB_STATUS.PENDING, JOB_STATUS.QUEUED].includes(job.status)) {
    return res.status(400).json({
      error: 'Can only cancel pending or queued jobs'
    });
  }

  job.status = JOB_STATUS.CANCELLED;
  job.updatedAt = new Date().toISOString();
  jobs.set(jobId, job);

  // Remove from queue
  const queueIndex = jobQueue.indexOf(jobId);
  if (queueIndex > -1) {
    jobQueue.splice(queueIndex, 1);
  }

  res.json({
    success: true,
    message: 'Job cancelled successfully',
    job
  });
});

/**
 * POST /api/jobs/:jobId/result
 * Submit job result (used by node workers)
 */
router.post('/:jobId/result', (req, res) => {
  const { jobId } = req.params;
  const { nodeId, result, logs, metrics } = req.body;

  const job = jobs.get(jobId);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  job.status = JOB_STATUS.COMPLETED;
  job.result = result;
  job.logs = logs || [];
  job.metrics = {
    ...job.metrics,
    ...metrics,
    endTime: new Date().toISOString()
  };
  job.updatedAt = new Date().toISOString();

  jobs.set(jobId, job);

  res.json({
    success: true,
    message: 'Job result submitted successfully',
    job
  });
});

/**
 * GET /api/jobs/stats/summary
 * Get job statistics
 */
router.get('/stats/summary', (req, res) => {
  const allJobs = Array.from(jobs.values());

  const stats = {
    total: allJobs.length,
    pending: allJobs.filter(j => j.status === JOB_STATUS.PENDING).length,
    queued: allJobs.filter(j => j.status === JOB_STATUS.QUEUED).length,
    running: allJobs.filter(j => j.status === JOB_STATUS.RUNNING).length,
    completed: allJobs.filter(j => j.status === JOB_STATUS.COMPLETED).length,
    failed: allJobs.filter(j => j.status === JOB_STATUS.FAILED).length,
    cancelled: allJobs.filter(j => j.status === JOB_STATUS.CANCELLED).length,
    totalCost: allJobs.reduce((sum, j) => sum + (j.metrics.cost || 0), 0)
  };

  res.json({
    success: true,
    stats
  });
});

export default router;
