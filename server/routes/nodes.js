import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory storage (will be replaced with database + Solana on-chain)
const nodes = new Map();
const nodeHeartbeats = new Map();

/**
 * POST /api/nodes/register
 * Register a new GPU/CPU node
 */
router.post('/register', async (req, res) => {
  try {
    const {
      walletAddress,
      gpuModel,
      vram,
      driverVersion,
      cudaVersion,
      hostOS,
      cpuModel,
      ramTotal,
      location,
      capabilities
    } = req.body;

    // Validation
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Check if node already exists for this wallet
    const existingNode = Array.from(nodes.values()).find(
      n => n.walletAddress === walletAddress
    );

    if (existingNode) {
      // Update existing node
      const updatedNode = {
        ...existingNode,
        gpuModel: gpuModel || existingNode.gpuModel,
        vram: vram || existingNode.vram,
        driverVersion: driverVersion || existingNode.driverVersion,
        cudaVersion: cudaVersion || existingNode.cudaVersion,
        hostOS: hostOS || existingNode.hostOS,
        cpuModel: cpuModel || existingNode.cpuModel,
        ramTotal: ramTotal || existingNode.ramTotal,
        location: location || existingNode.location,
        capabilities: capabilities || existingNode.capabilities,
        lastUpdate: new Date().toISOString(),
        status: 'online'
      };

      nodes.set(existingNode.nodeId, updatedNode);
      nodeHeartbeats.set(existingNode.nodeId, Date.now());

      return res.json({
        success: true,
        message: 'Node updated successfully',
        node: updatedNode
      });
    }

    // Create new node
    const nodeId = uuidv4();
    const newNode = {
      nodeId,
      walletAddress,
      gpuModel: gpuModel || 'Unknown',
      vram: vram || 0,
      driverVersion: driverVersion || 'Unknown',
      cudaVersion: cudaVersion || 'Unknown',
      hostOS: hostOS || 'Unknown',
      cpuModel: cpuModel || 'Unknown',
      ramTotal: ramTotal || 0,
      location: location || { country: 'Unknown', city: 'Unknown', lat: 0, lon: 0 },
      capabilities: capabilities || ['inference'],
      registeredAt: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
      status: 'online',
      jobsCompleted: 0,
      totalEarned: 0,
      reputation: 100
    };

    nodes.set(nodeId, newNode);
    nodeHeartbeats.set(nodeId, Date.now());

    res.status(201).json({
      success: true,
      message: 'Node registered successfully',
      node: newNode,
      nodeToken: `hn_${nodeId}_${Date.now()}` // Simple token for demo
    });

  } catch (error) {
    console.error('Error registering node:', error);
    res.status(500).json({ error: 'Failed to register node' });
  }
});

/**
 * POST /api/nodes/:nodeId/heartbeat
 * Update node heartbeat (keep-alive)
 */
router.post('/:nodeId/heartbeat', (req, res) => {
  const { nodeId } = req.params;
  const { status, metrics } = req.body;

  const node = nodes.get(nodeId);
  if (!node) {
    return res.status(404).json({ error: 'Node not found' });
  }

  // Update heartbeat
  nodeHeartbeats.set(nodeId, Date.now());

  // Update node status
  node.status = status || 'online';
  node.lastUpdate = new Date().toISOString();

  if (metrics) {
    node.metrics = metrics;
  }

  nodes.set(nodeId, node);

  res.json({
    success: true,
    message: 'Heartbeat received',
    nextHeartbeatIn: 60000 // 60 seconds
  });
});

/**
 * GET /api/nodes
 * List all registered nodes
 */
router.get('/', (req, res) => {
  const { status, gpuModel, capability } = req.query;

  let nodeList = Array.from(nodes.values());

  // Filter by status
  if (status) {
    nodeList = nodeList.filter(n => n.status === status);
  }

  // Filter by GPU model
  if (gpuModel) {
    nodeList = nodeList.filter(n =>
      n.gpuModel.toLowerCase().includes(gpuModel.toLowerCase())
    );
  }

  // Filter by capability
  if (capability) {
    nodeList = nodeList.filter(n =>
      n.capabilities.includes(capability)
    );
  }

  // Check for stale nodes (no heartbeat in 2 minutes)
  const now = Date.now();
  nodeList = nodeList.map(node => {
    const lastHeartbeat = nodeHeartbeats.get(node.nodeId);
    if (lastHeartbeat && now - lastHeartbeat > 120000) {
      node.status = 'offline';
    }
    return node;
  });

  res.json({
    success: true,
    count: nodeList.length,
    nodes: nodeList
  });
});

/**
 * GET /api/nodes/:nodeId
 * Get specific node details
 */
router.get('/:nodeId', (req, res) => {
  const { nodeId } = req.params;
  const node = nodes.get(nodeId);

  if (!node) {
    return res.status(404).json({ error: 'Node not found' });
  }

  // Check if node is stale
  const lastHeartbeat = nodeHeartbeats.get(nodeId);
  if (lastHeartbeat && Date.now() - lastHeartbeat > 120000) {
    node.status = 'offline';
  }

  res.json({
    success: true,
    node
  });
});

/**
 * GET /api/nodes/wallet/:walletAddress
 * Get nodes by wallet address
 */
router.get('/wallet/:walletAddress', (req, res) => {
  const { walletAddress } = req.params;

  const userNodes = Array.from(nodes.values()).filter(
    n => n.walletAddress === walletAddress
  );

  // Check for stale nodes
  const now = Date.now();
  const updatedNodes = userNodes.map(node => {
    const lastHeartbeat = nodeHeartbeats.get(node.nodeId);
    if (lastHeartbeat && now - lastHeartbeat > 120000) {
      node.status = 'offline';
    }
    return node;
  });

  res.json({
    success: true,
    count: updatedNodes.length,
    nodes: updatedNodes
  });
});

/**
 * DELETE /api/nodes/:nodeId
 * Deregister a node
 */
router.delete('/:nodeId', (req, res) => {
  const { nodeId } = req.params;
  const { walletAddress } = req.body;

  const node = nodes.get(nodeId);
  if (!node) {
    return res.status(404).json({ error: 'Node not found' });
  }

  // Verify ownership
  if (node.walletAddress !== walletAddress) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  nodes.delete(nodeId);
  nodeHeartbeats.delete(nodeId);

  res.json({
    success: true,
    message: 'Node deregistered successfully'
  });
});

export default router;
