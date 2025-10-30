# GPU Hosts Module - Setup Guide

This document explains the new GPU Hosts functionality added to the HYPERNODE app.

## Overview

The GPU Hosts module allows users to:
1. Connect their Solana wallet
2. Generate a node registration token
3. Run a host agent on their GPU machine
4. View their registered nodes and completed jobs
5. Earn HYPER tokens for completed compute jobs

## Architecture

### Frontend (Vite + React)
- **Location**: `/src/pages/App.jsx` (updated)
- **New Components**:
  - `TokenGenerator.jsx` - Generate node tokens
  - `NodeTable.jsx` - Display registered nodes with live polling
  - `JobTable.jsx` - Display completed jobs
  - `CodeBlock.jsx` - Display commands with copy functionality

### Backend (Express + WebSocket)
- **Location**: `/backend`
- **HTTP Server** (`server.js`):
  - `POST /api/nodes/issue-token` - Generate registration token
  - `GET /api/nodes/mine?wallet=...` - Get nodes for wallet
  - `GET /api/jobs/mine?wallet=...` - Get jobs for wallet
  - `POST /api/jobs/report` - Receive job results

- **WebSocket Server** (`ws-server.js`):
  - Node registration via token
  - Heartbeat to track node status
  - Job dispatch and result collection

### Host Agent (Python)
- **Location**: `/agents/python-host`
- Connects to WebSocket server
- Registers using token from frontend
- Executes jobs and reports results
- Sends periodic heartbeats

## Setup Instructions

### 1. Frontend Setup

```bash
# Copy environment variables
cp .env.example .env

# Edit .env and set:
VITE_NODE_API_ENDPOINT=http://localhost:3001  # Backend API
VITE_NODE_WS_ENDPOINT=ws://localhost:3002     # WebSocket endpoint

# Install dependencies (if not already done)
npm install

# Run development server
npm run dev
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env if needed (default ports: 3001 for HTTP, 3002 for WS)

# Run HTTP server (terminal 1)
node server.js

# Run WebSocket server (terminal 2)
node ws-server.js
```

### 3. Test the Flow

1. Open http://localhost:5173/app
2. Connect your Solana wallet
3. Scroll to "GPU Hosts (Beta)" section
4. Click "Generate node token"
5. Copy the Python command
6. Run the agent (see below)

### 4. Running the Host Agent

```bash
cd agents/python-host

# Install dependencies
pip install -r requirements.txt

# Run agent with your token
python3 agent.py \
  --endpoint ws://localhost:3002 \
  --token YOUR_TOKEN_HERE
```

The agent will:
- Connect to the WebSocket server
- Register with the token
- Send heartbeats every 15 seconds
- Receive and execute jobs
- Send results back

### 5. Verify It Works

Back in the browser at `/app`:
- The "My GPU Nodes" table should show your node as "Online"
- After a few seconds, a test job will be dispatched
- The "Recent Jobs" table will show the completed job

## Deployment

### Frontend (Vercel)

The frontend can stay on Vercel as it is. Just set environment variables:

```bash
VITE_NODE_API_ENDPOINT=https://your-backend-url.com
VITE_NODE_WS_ENDPOINT=wss://your-backend-url.com
```

### Backend (Railway / Fly.io / Render)

The backend needs to run on a platform that supports WebSocket.

#### Railway
```bash
cd backend
railway init
railway up
```

Add environment variables in Railway dashboard.

#### Fly.io
```bash
cd backend
fly launch
fly deploy
```

#### Render
Create a new Web Service and point it to the `/backend` directory.

**Important**: Run both `server.js` and `ws-server.js`:
- Option 1: Use a process manager (PM2)
- Option 2: Deploy as two separate services
- Option 3: Merge into one server (recommended for production)

### Merging HTTP and WS into One Server (Production)

For production, you can run both HTTP and WS on the same Node process:

```javascript
// server.js
import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// HTTP routes
app.use('/api/nodes', nodesRouter);
app.use('/api/jobs', jobsRouter);

// WebSocket handling
wss.on('connection', (ws) => {
  // ... handle WebSocket as in ws-server.js
});

server.listen(PORT);
```

## Environment Variables

### Frontend
- `VITE_NODE_API_ENDPOINT` - Backend API URL
- `VITE_NODE_WS_ENDPOINT` - WebSocket endpoint (shown to users)

### Backend
- `PORT` - HTTP server port (default: 3001)
- `WS_PORT` - WebSocket port (default: 3002)
- `CORS_ORIGIN` - Allowed CORS origins

## API Documentation

### POST /api/nodes/issue-token

Generate a registration token for a wallet.

**Request**:
```json
{
  "wallet": "GqH...xyz"
}
```

**Response**:
```json
{
  "token": "6d3f5c4b-0b29-4ac1-a1e8-4e02f39c1e9f"
}
```

### GET /api/nodes/mine?wallet=ADDRESS

Get all nodes for a wallet.

**Response**:
```json
[
  {
    "id": "node-123",
    "hostname": "gpu-rig-01",
    "gpu": "NVIDIA RTX 4090",
    "status": "online",
    "lastHeartbeat": "2025-10-30T12:00:00Z",
    "earned": 4.25
  }
]
```

### GET /api/jobs/mine?wallet=ADDRESS

Get all jobs for a wallet's nodes.

**Response**:
```json
[
  {
    "id": "job-123",
    "type": "test",
    "nodeId": "node-123",
    "status": "completed",
    "duration": 5,
    "createdAt": "2025-10-30T12:00:00Z",
    "completedAt": "2025-10-30T12:00:05Z"
  }
]
```

## WebSocket Protocol

### Client → Server

**Register**:
```json
{
  "type": "register",
  "token": "uuid",
  "hostInfo": {
    "hostname": "gpu-rig-01",
    "gpus": [{"name": "NVIDIA RTX 4090", "memory": "24GB"}],
    "os": "Ubuntu 22.04"
  }
}
```

**Heartbeat**:
```json
{
  "type": "heartbeat",
  "nodeId": "node-123"
}
```

**Job Result**:
```json
{
  "type": "job_result",
  "id": "job-123",
  "status": "completed",
  "logs": "output logs here"
}
```

### Server → Client

**Registered**:
```json
{
  "type": "registered",
  "nodeId": "node-123",
  "message": "Successfully registered"
}
```

**Job**:
```json
{
  "type": "job",
  "id": "job-123",
  "command": "sleep 5"
}
```

**Error**:
```json
{
  "type": "error",
  "message": "Error description"
}
```

## Production Checklist

- [ ] Replace in-memory storage with database (PostgreSQL/MongoDB)
- [ ] Add authentication for admin endpoints
- [ ] Add rate limiting to prevent abuse
- [ ] Add proper logging (Winston, Pino)
- [ ] Add metrics and monitoring (Prometheus)
- [ ] Implement job queue (Bull, BeeQueue)
- [ ] Add job validation and sandboxing
- [ ] Add SSL/TLS for WebSocket (wss://)
- [ ] Add reconnection logic in agent
- [ ] Add agent authentication (signature verification)
- [ ] Add earnings calculation and blockchain integration
- [ ] Add node reputation system
- [ ] Add job scheduler and load balancer

## Security Considerations

1. **Token Security**: Tokens are currently UUID v4 and single-use. For production, add expiration and signature verification.

2. **Job Execution**: Jobs run with the agent's privileges. In production:
   - Sandbox jobs (Docker containers)
   - Validate and sanitize commands
   - Set resource limits (CPU, memory, time)
   - Implement allowlist of commands

3. **WebSocket Security**: Add authentication to WebSocket connections (signature verification with Solana wallet).

4. **Rate Limiting**: Add rate limits to prevent abuse of token generation and API endpoints.

## Troubleshooting

### Frontend can't connect to backend
- Check `VITE_NODE_API_ENDPOINT` in `.env`
- Make sure backend is running
- Check browser console for CORS errors

### Agent can't connect
- Verify WebSocket endpoint
- Check firewall rules
- Ensure backend WebSocket server is running

### Nodes shown as offline
- Check if agent is running
- Verify heartbeat is being sent (check agent logs)
- Check if more than 30 seconds since last heartbeat

### Jobs not appearing
- Jobs are created when agent connects
- Check backend logs for job dispatch
- Verify WebSocket connection is established

## Next Steps

1. Implement real job types (AI inference, rendering, etc.)
2. Add blockchain integration for payments
3. Add node reputation and reliability tracking
4. Build job marketplace where users can submit jobs
5. Add GPU benchmarking and pricing
6. Implement distributed job scheduling
7. Add monitoring dashboard for node operators

## Support

- Discord: https://discord.gg/hypernode
- Documentation: https://docs.hypernodesolana.org
- GitHub Issues: https://github.com/hypernode-sol/host-agent/issues
