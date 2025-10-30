import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { tokens, nodes, jobs } from './store.js';

const WS_PORT = process.env.WS_PORT || 3002;

const wss = new WebSocketServer({ port: WS_PORT });

console.log(`WebSocket server running on port ${WS_PORT}`);

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  let nodeId = null;

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());

      switch (message.type) {
        case 'register':
          handleRegister(ws, message);
          break;

        case 'heartbeat':
          handleHeartbeat(ws, message);
          break;

        case 'job_result':
          handleJobResult(ws, message);
          break;

        default:
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Unknown message type'
          }));
      }
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format'
      }));
    }
  });

  ws.on('close', () => {
    if (nodeId) {
      console.log(`Node ${nodeId} disconnected`);
      const node = nodes.get(nodeId);
      if (node) {
        node.status = 'offline';
      }
    }
  });

  function handleRegister(ws, message) {
    const { token, hostInfo } = message;

    if (!token) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Token is required'
      }));
      return;
    }

    // Validate token
    const tokenData = tokens.get(token);
    if (!tokenData) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid token'
      }));
      return;
    }

    if (tokenData.used) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Token already used'
      }));
      return;
    }

    // Mark token as used
    tokenData.used = true;

    // Create node
    nodeId = uuidv4();
    const node = {
      id: nodeId,
      wallet: tokenData.wallet,
      hostname: hostInfo?.hostname || 'unknown',
      gpu: hostInfo?.gpus?.[0]?.name || 'Unknown GPU',
      os: hostInfo?.os || 'unknown',
      status: 'online',
      registeredAt: new Date().toISOString(),
      lastHeartbeat: new Date().toISOString(),
      earned: 0,
    };

    nodes.set(nodeId, node);
    console.log(`Node registered: ${nodeId} for wallet ${tokenData.wallet}`);

    ws.send(JSON.stringify({
      type: 'registered',
      nodeId,
      message: 'Successfully registered'
    }));

    // Send initial job (example)
    setTimeout(() => {
      sendJobToNode(ws, nodeId);
    }, 5000);
  }

  function handleHeartbeat(ws, message) {
    const { nodeId: msgNodeId } = message;

    if (!msgNodeId || msgNodeId !== nodeId) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid node ID'
      }));
      return;
    }

    const node = nodes.get(nodeId);
    if (node) {
      node.lastHeartbeat = new Date().toISOString();
      node.status = 'online';
    }

    ws.send(JSON.stringify({ type: 'ack' }));
  }

  function handleJobResult(ws, message) {
    const { id, status, logs } = message;

    const job = jobs.get(id);
    if (!job) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Job not found'
      }));
      return;
    }

    job.status = status;
    job.logs = logs;
    job.completedAt = new Date().toISOString();

    const startTime = new Date(job.createdAt);
    const endTime = new Date(job.completedAt);
    job.duration = Math.floor((endTime - startTime) / 1000);

    // Update node earnings
    const node = nodes.get(job.nodeId);
    if (node && status === 'completed') {
      node.earned = (node.earned || 0) + (job.duration * 0.01);
    }

    console.log(`Job ${id} completed by node ${job.nodeId}: ${status}`);

    ws.send(JSON.stringify({
      type: 'ack',
      message: 'Job result received'
    }));
  }

  function sendJobToNode(ws, nodeId) {
    const jobId = uuidv4();
    const job = {
      id: jobId,
      type: 'test',
      nodeId,
      command: 'sleep 5',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    jobs.set(jobId, job);

    ws.send(JSON.stringify({
      type: 'job',
      id: jobId,
      command: job.command,
    }));

    console.log(`Job ${jobId} sent to node ${nodeId}`);
  }
});
