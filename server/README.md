# Hypernode Backend API

Backend API for Hypernode - Distributed GPU & Agent-Oriented Compute Network on Solana

## Overview

This backend provides the core APIs for:
- **Node Registry**: Register and manage GPU/CPU nodes
- **Job Marketplace**: Submit, execute and track AI/compute jobs
- **Metrics & Validation**: Public metrics and on-chain verification data

## Architecture

```
server/
├── index.js              # Main server entry point
├── routes/
│   ├── nodes.js          # Node registry endpoints
│   ├── jobs.js           # Job marketplace endpoints
│   └── metrics.js        # Metrics and validation endpoints
├── package.json
├── .env
└── README.md
```

## Quick Start

### Install Dependencies

```bash
cd server
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```env
PORT=3001
SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
HYPER_TOKEN_MINT=92s9qna3djkMncZzkacyNQ38UKnNXZFh4Jgqe3Cmpump
NODE_ENV=development
```

### Run Server

```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

Server will start on `http://localhost:3001`

## API Endpoints

### Health Check

```
GET /health
```

### Node Registry

```
POST   /api/nodes/register              # Register new node
GET    /api/nodes                       # List all nodes
GET    /api/nodes/:nodeId               # Get node details
GET    /api/nodes/wallet/:walletAddress # Get nodes by wallet
POST   /api/nodes/:nodeId/heartbeat     # Update node heartbeat
DELETE /api/nodes/:nodeId               # Deregister node
```

### Job Marketplace

```
POST   /api/jobs                    # Create new job
GET    /api/jobs                    # List jobs
GET    /api/jobs/:jobId             # Get job details
POST   /api/jobs/:jobId/cancel      # Cancel job
POST   /api/jobs/:jobId/result      # Submit job result (worker use)
GET    /api/jobs/stats/summary      # Get job statistics
```

### Metrics & Validation

```
GET    /api/metrics                 # Overall network metrics
GET    /api/metrics/validation      # Validation data (public page)
GET    /api/metrics/nodes           # Node-specific metrics
GET    /api/metrics/jobs            # Job-specific metrics
POST   /api/metrics/update          # Update metrics (internal)
GET    /api/metrics/health          # Metrics service health
```

## Example: Register a Node

```bash
curl -X POST http://localhost:3001/api/nodes/register \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "YOUR_SOLANA_WALLET_ADDRESS",
    "gpuModel": "NVIDIA RTX 4090",
    "vram": 24576,
    "driverVersion": "535.129.03",
    "cudaVersion": "12.2",
    "hostOS": "Ubuntu 22.04",
    "cpuModel": "AMD Ryzen 9 5950X",
    "ramTotal": 65536,
    "location": {
      "country": "USA",
      "city": "San Francisco",
      "lat": 37.7749,
      "lon": -122.4194
    },
    "capabilities": ["inference", "training", "render"]
  }'
```

## Example: Create a Job

```bash
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "YOUR_SOLANA_WALLET_ADDRESS",
    "jobType": "llm_inference",
    "model": "deepseek-r1-qwen-7b",
    "input": {
      "prompt": "Explain quantum computing",
      "maxTokens": 500
    },
    "requirements": {
      "minVRAM": 8,
      "capabilities": ["inference"]
    },
    "budget": 10,
    "maxDuration": 300
  }'
```

## Job Types

- `llm_inference` - Run LLM inference
- `llm_fine_tuning` - Fine-tune LLM models
- `rag_indexing` - Build RAG indexes
- `vision_pipeline` - Computer vision tasks
- `render` - 3D rendering
- `generic_compute` - Generic compute tasks

## Technology Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **@solana/web3.js** - Solana integration
- **uuid** - ID generation
- **cors** - CORS handling
- **dotenv** - Environment config

## Data Storage

Currently using **in-memory storage** for rapid development. Future versions will integrate:
- PostgreSQL/MongoDB for off-chain data
- Solana blockchain for on-chain receipts
- Redis for caching and queues

## Security Notes

- All node registrations require valid Solana wallet address
- Job ownership verified via wallet address
- API rate limiting (to be implemented)
- Input validation on all endpoints

## Integration with Frontend

The frontend (React app) should:
1. Connect Solana wallet
2. Call `/api/nodes/register` to register GPU
3. Poll `/api/nodes/wallet/:address` to get node status
4. Display metrics from `/api/metrics/validation`

## Future Enhancements

- [ ] On-chain integration (write receipts to Solana)
- [ ] WebSocket for real-time updates
- [ ] Job matchmaking algorithm
- [ ] Payment processing with HYPER token
- [ ] Node reputation system
- [ ] Job result verification
- [ ] Docker container for node workers
- [ ] Database persistence
- [ ] Authentication & API keys
- [ ] Rate limiting
- [ ] Logging & monitoring

## Support

For issues or questions, check the main repository README.
