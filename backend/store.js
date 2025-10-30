// In-memory storage for tokens, nodes, and jobs
// In production, this should be replaced with a database

export const tokens = new Map();
export const nodes = new Map();
export const jobs = new Map();

// Clean up old unused tokens every hour
setInterval(() => {
  const oneHourAgo = Date.now() - (60 * 60 * 1000);

  for (const [token, data] of tokens.entries()) {
    if (!data.used && new Date(data.createdAt).getTime() < oneHourAgo) {
      tokens.delete(token);
      console.log(`Cleaned up expired token: ${token}`);
    }
  }
}, 60 * 60 * 1000);

// Mark nodes as offline if no heartbeat for 60 seconds
setInterval(() => {
  const sixtySecondsAgo = Date.now() - (60 * 1000);

  for (const [nodeId, node] of nodes.entries()) {
    if (node.lastHeartbeat && new Date(node.lastHeartbeat).getTime() < sixtySecondsAgo) {
      if (node.status !== 'offline') {
        node.status = 'offline';
        console.log(`Node ${nodeId} marked as offline`);
      }
    }
  }
}, 10 * 1000);
