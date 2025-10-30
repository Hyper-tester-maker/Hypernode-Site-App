# HYPERNODE API Server

Backend API server for GPU node management and job orchestration.

## Installation

```bash
cd backend
npm install
```

## Configuration

Copy `.env.example` to `.env` and adjust settings:

```bash
cp .env.example .env
```

## Running

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

You need to run both the HTTP server and WebSocket server:

Terminal 1:
```bash
node server.js
```

Terminal 2:
```bash
node ws-server.js
```

## API Endpoints

### POST /api/nodes/issue-token
Generate a new token for node registration.

Request:
```json
{
  "wallet": "SOLANA_PUBLIC_KEY"
}
```

Response:
```json
{
  "token": "uuid-v4-token"
}
```

### GET /api/nodes/mine?wallet=...
Get all nodes registered with a specific wallet.

### GET /api/jobs/mine?wallet=...
Get all jobs for nodes owned by a specific wallet.

### POST /api/jobs/report
Receive job result from agent (used by GPU hosts).

## WebSocket Protocol

Connect to `ws://localhost:3002` (or configured WS_PORT).

### Register Node
```json
{
  "type": "register",
  "token": "uuid-from-issue-token",
  "hostInfo": {
    "hostname": "gpu-rig-01",
    "gpus": [{"name": "NVIDIA RTX 4090"}],
    "os": "ubuntu"
  }
}
```

### Heartbeat
```json
{
  "type": "heartbeat",
  "nodeId": "node-id"
}
```

### Job Result
```json
{
  "type": "job_result",
  "id": "job-id",
  "status": "completed",
  "logs": "output logs"
}
```

## Deployment

### Railway / Fly.io
This backend can be deployed to Railway or Fly.io for production use.

For Railway:
```bash
railway init
railway up
```

For Fly.io:
```bash
fly launch
fly deploy
```

## Production Notes

- Replace in-memory storage with a database (PostgreSQL, MongoDB)
- Add authentication/authorization for admin endpoints
- Add rate limiting
- Add proper logging
- Add metrics and monitoring
