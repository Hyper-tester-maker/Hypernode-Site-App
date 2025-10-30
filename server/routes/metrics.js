import express from 'express';
import { Connection, PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Mock data for demonstration
// In production, this would fetch from Solana blockchain and database
const mockMetrics = {
  network: {
    totalNodes: 0,
    activeNodes: 0,
    totalJobs: 0,
    completedJobs: 0,
    totalValueLocked: 0,
    totalHyperPaid: 0
  },
  recentJobs: [],
  recentNodes: [],
  onChainReceipts: []
};

/**
 * GET /api/metrics
 * Get overall network metrics
 */
router.get('/', async (req, res) => {
  try {
    // In production, fetch from database + Solana
    // For now, return mock data

    const metrics = {
      network: {
        totalNodes: mockMetrics.network.totalNodes,
        activeNodes: mockMetrics.network.activeNodes,
        totalJobs: mockMetrics.network.totalJobs,
        completedJobs: mockMetrics.network.completedJobs,
        totalValueLocked: mockMetrics.network.totalValueLocked,
        totalHyperPaid: mockMetrics.network.totalHyperPaid,
        lastUpdated: new Date().toISOString()
      },
      recentActivity: {
        last24h: {
          jobs: 0,
          nodesRegistered: 0,
          hyperPaid: 0
        },
        last7d: {
          jobs: 0,
          nodesRegistered: 0,
          hyperPaid: 0
        }
      }
    };

    res.json({
      success: true,
      metrics
    });

  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

/**
 * GET /api/metrics/validation
 * Get validation data for public page
 * This is what community/investors will see
 */
router.get('/validation', async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    // This would query Solana blockchain for on-chain receipts
    // For MVP, return mock structure

    const validation = {
      summary: {
        totalJobsOnChain: mockMetrics.network.completedJobs,
        totalHyperPaidOnChain: mockMetrics.network.totalHyperPaid,
        activeNodesOnChain: mockMetrics.network.activeNodes,
        lastBlockVerified: null,
        lastVerificationTime: new Date().toISOString()
      },
      recentReceipts: mockMetrics.onChainReceipts.slice(0, parseInt(limit)),
      blockchain: {
        network: 'Solana Mainnet',
        explorerUrl: 'https://solscan.io',
        hyperTokenMint: process.env.HYPER_TOKEN_MINT,
        programIds: {
          nodeRegistry: 'Coming soon',
          jobReceipt: 'Coming soon',
          paymentSplitter: 'Coming soon'
        }
      }
    };

    res.json({
      success: true,
      validation
    });

  } catch (error) {
    console.error('Error fetching validation data:', error);
    res.status(500).json({ error: 'Failed to fetch validation data' });
  }
});

/**
 * GET /api/metrics/nodes
 * Get node-specific metrics
 */
router.get('/nodes', (req, res) => {
  try {
    const nodeMetrics = {
      total: mockMetrics.network.totalNodes,
      active: mockMetrics.network.activeNodes,
      offline: mockMetrics.network.totalNodes - mockMetrics.network.activeNodes,
      byGPU: {
        'RTX 4090': 0,
        'RTX 4080': 0,
        'RTX 3090': 0,
        'Other': 0
      },
      byLocation: {
        'North America': 0,
        'Europe': 0,
        'Asia': 0,
        'Other': 0
      },
      averageUptime: 0,
      totalVRAM: 0
    };

    res.json({
      success: true,
      metrics: nodeMetrics
    });

  } catch (error) {
    console.error('Error fetching node metrics:', error);
    res.status(500).json({ error: 'Failed to fetch node metrics' });
  }
});

/**
 * GET /api/metrics/jobs
 * Get job-specific metrics
 */
router.get('/jobs', (req, res) => {
  try {
    const jobMetrics = {
      total: mockMetrics.network.totalJobs,
      completed: mockMetrics.network.completedJobs,
      failed: 0,
      cancelled: 0,
      averageDuration: 0,
      byType: {
        llm_inference: 0,
        llm_fine_tuning: 0,
        rag_indexing: 0,
        vision_pipeline: 0,
        render: 0,
        generic_compute: 0
      },
      totalCost: mockMetrics.network.totalHyperPaid
    };

    res.json({
      success: true,
      metrics: jobMetrics
    });

  } catch (error) {
    console.error('Error fetching job metrics:', error);
    res.status(500).json({ error: 'Failed to fetch job metrics' });
  }
});

/**
 * POST /api/metrics/update
 * Internal endpoint to update metrics (called by other services)
 */
router.post('/update', (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case 'node_registered':
      mockMetrics.network.totalNodes++;
      mockMetrics.network.activeNodes++;
      mockMetrics.recentNodes.unshift({
        ...data,
        timestamp: new Date().toISOString()
      });
      break;

    case 'job_completed':
      mockMetrics.network.totalJobs++;
      mockMetrics.network.completedJobs++;
      mockMetrics.network.totalHyperPaid += data.cost || 0;
      mockMetrics.recentJobs.unshift({
        ...data,
        timestamp: new Date().toISOString()
      });
      break;

    case 'on_chain_receipt':
      mockMetrics.onChainReceipts.unshift({
        ...data,
        timestamp: new Date().toISOString()
      });
      break;

    default:
      return res.status(400).json({ error: 'Invalid update type' });
  }

  res.json({
    success: true,
    message: 'Metrics updated'
  });
});

/**
 * GET /api/metrics/health
 * Health check for metrics service
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    metricsCount: {
      nodes: mockMetrics.network.totalNodes,
      jobs: mockMetrics.network.totalJobs,
      receipts: mockMetrics.onChainReceipts.length
    }
  });
});

export default router;
