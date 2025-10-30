import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { tokens, nodes } from '../store.js';

const router = express.Router();

// POST /api/nodes/issue-token
// Generate a new token for node registration
router.post('/issue-token', (req, res) => {
  const { wallet, signature, nonce } = req.body;

  if (!wallet) {
    return res.status(400).json({ error: 'wallet address is required' });
  }

  // Generate unique token
  const token = uuidv4();

  // Store token in memory
  tokens.set(token, {
    token,
    wallet,
    createdAt: new Date().toISOString(),
    used: false,
    signature,
    nonce,
  });

  console.log(`Token issued: ${token} for wallet ${wallet}`);

  res.json({ token });
});

// GET /api/nodes/mine?wallet=...
// Get all nodes registered with a specific wallet
router.get('/mine', (req, res) => {
  const { wallet } = req.query;

  if (!wallet) {
    return res.status(400).json({ error: 'wallet parameter is required' });
  }

  // Filter nodes by wallet
  const userNodes = Array.from(nodes.values())
    .filter(node => node.wallet === wallet)
    .map(node => ({
      id: node.id,
      hostname: node.hostname,
      gpu: node.gpu,
      status: node.status,
      lastHeartbeat: node.lastHeartbeat,
      earned: node.earned || 0,
    }));

  res.json(userNodes);
});

// GET /api/nodes/:nodeId
// Get specific node details
router.get('/:nodeId', (req, res) => {
  const { nodeId } = req.params;
  const node = nodes.get(nodeId);

  if (!node) {
    return res.status(404).json({ error: 'Node not found' });
  }

  res.json(node);
});

// GET /api/nodes
// Get all nodes (admin endpoint)
router.get('/', (req, res) => {
  const allNodes = Array.from(nodes.values());
  res.json(allNodes);
});

export default router;
