import express from 'express';
import { jobs, nodes } from '../store.js';

const router = express.Router();

// GET /api/jobs/mine?wallet=...
// Get all jobs for nodes owned by a specific wallet
router.get('/mine', (req, res) => {
  const { wallet } = req.query;

  if (!wallet) {
    return res.status(400).json({ error: 'wallet parameter is required' });
  }

  // Get node IDs for this wallet
  const userNodeIds = Array.from(nodes.values())
    .filter(node => node.wallet === wallet)
    .map(node => node.id);

  // Filter jobs by node IDs
  const userJobs = Array.from(jobs.values())
    .filter(job => userNodeIds.includes(job.nodeId))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 50) // Limit to 50 most recent jobs
    .map(job => ({
      id: job.id,
      type: job.type,
      nodeId: job.nodeId,
      status: job.status,
      duration: job.duration,
      createdAt: job.createdAt,
      completedAt: job.completedAt,
    }));

  res.json(userJobs);
});

// POST /api/jobs/report
// Receive job result from agent
router.post('/report', (req, res) => {
  const { jobId, nodeId, status, logs, duration } = req.body;

  if (!jobId || !nodeId) {
    return res.status(400).json({ error: 'jobId and nodeId are required' });
  }

  const job = jobs.get(jobId);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  // Update job
  job.status = status || 'completed';
  job.logs = logs;
  job.duration = duration;
  job.completedAt = new Date().toISOString();

  // Update node earnings (simple calculation)
  const node = nodes.get(nodeId);
  if (node && status === 'completed') {
    node.earned = (node.earned || 0) + (duration * 0.01); // Example: 0.01 HYPER per second
  }

  console.log(`Job ${jobId} reported by node ${nodeId}: ${status}`);

  res.json({ success: true });
});

// GET /api/jobs/:jobId
// Get specific job details
router.get('/:jobId', (req, res) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.json(job);
});

// GET /api/jobs
// Get all jobs (admin endpoint)
router.get('/', (req, res) => {
  const allJobs = Array.from(jobs.values())
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(allJobs);
});

export default router;
