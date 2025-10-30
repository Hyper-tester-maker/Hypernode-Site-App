import express from 'express';

const router = express.Router();

// In-memory storage for GPU hosts
// TODO: In production, replace with Redis or PostgreSQL
const gpuHosts = new Map();

// POST /api/gpu/register
// Register a GPU host with the network
router.post('/register', (req, res) => {
  const { wallet, hostname, gpus, os, ip } = req.body;

  // Validation
  if (!wallet) {
    return res.status(400).json({ error: 'wallet is required' });
  }

  if (!hostname) {
    return res.status(400).json({ error: 'hostname is required' });
  }

  // Create unique key for this host (wallet + hostname)
  const hostKey = `${wallet}:${hostname}`;

  // Check if host already exists
  const existingHost = gpuHosts.get(hostKey);

  if (existingHost) {
    // Update existing host
    existingHost.gpus = gpus || existingHost.gpus;
    existingHost.os = os || existingHost.os;
    existingHost.ip = ip || existingHost.ip;
    existingHost.lastSeen = new Date().toISOString();

    console.log(`GPU host updated: ${hostname} for wallet ${wallet}`);
  } else {
    // Create new host
    gpuHosts.set(hostKey, {
      wallet,
      hostname,
      gpus: gpus || [],
      os: os || 'unknown',
      ip: ip || null,
      registeredAt: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
    });

    console.log(`GPU host registered: ${hostname} for wallet ${wallet}`);
  }

  res.json({ ok: true });
});

// GET /api/gpu/hosts?wallet=<PUBKEY>
// Get all GPU hosts registered for a specific wallet
router.get('/hosts', (req, res) => {
  const { wallet } = req.query;

  if (!wallet) {
    return res.status(400).json({ error: 'wallet parameter is required' });
  }

  // Filter hosts by wallet
  const userHosts = Array.from(gpuHosts.values())
    .filter(host => host.wallet === wallet)
    .map(host => ({
      wallet: host.wallet,
      hostname: host.hostname,
      gpus: host.gpus,
      os: host.os,
      lastSeen: host.lastSeen,
    }));

  res.json(userHosts);
});

// GET /api/gpu/hosts/all (admin endpoint for debugging)
router.get('/hosts/all', (req, res) => {
  const allHosts = Array.from(gpuHosts.values());
  res.json({
    total: allHosts.length,
    hosts: allHosts,
  });
});

export default router;
