# HYPERNODE Site & App

Official website and application for HYPERNODE - A decentralized GPU compute network on Solana.

## Project Structure

```
├── src/                    # Frontend source code (Vite + React)
│   ├── pages/             # Page components
│   │   └── App.jsx        # Main app page with GPU Hosts module
│   ├── components/        # Reusable components
│   │   ├── TokenGenerator.jsx
│   │   ├── NodeTable.jsx
│   │   ├── JobTable.jsx
│   │   └── ui/            # UI components (Radix UI)
│   └── main.jsx           # Entry point
│
├── backend/               # Backend API server (Express + WebSocket)
│   ├── server.js         # HTTP API server
│   ├── ws-server.js      # WebSocket server for nodes
│   ├── routes/           # API routes
│   └── store.js          # In-memory storage
│
├── agents/               # Host agent implementations
│   └── python-host/     # Python agent for GPU hosts
│       ├── agent.py     # Main agent script
│       └── Dockerfile   # Docker image
│
└── GPU_HOSTS_SETUP.md   # Detailed setup guide
```

## Features

### Main Website
- Landing page with HYPERNODE information
- Technology overview
- Economy and tokenomics
- Developer documentation
- Community resources

### /app - Interactive Application
- **Wallet Integration**: Connect Solana wallets (Phantom, Solflare, Backpack)
- **Balance Display**: View SOL and HYPER token balances
- **GPU Hosts Module** (NEW):
  - Generate node registration tokens
  - Connect GPU hosts to the network
  - Monitor node status in real-time
  - View completed jobs and earnings
  - Earn HYPER tokens for compute work

### GPU Hosts System
- Decentralized GPU compute orchestration
- WebSocket-based node communication
- Real-time job dispatch and monitoring
- Earnings tracking for node operators

## Quick Start

### Frontend Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

Visit http://localhost:5173

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Terminal 1: Start HTTP API server
node server.js

# Terminal 2: Start WebSocket server
node ws-server.js
```

### Running a GPU Host Agent

```bash
cd agents/python-host

# Install dependencies
pip install -r requirements.txt

# Run agent
python3 agent.py \
  --endpoint ws://localhost:3002 \
  --token YOUR_TOKEN_FROM_APP
```

## Environment Variables

### Frontend (.env)
```env
VITE_NODE_API_ENDPOINT=http://localhost:3001
VITE_NODE_WS_ENDPOINT=ws://localhost:3002
```

### Backend (backend/.env)
```env
PORT=3001
WS_PORT=3002
CORS_ORIGIN=http://localhost:5173
```

## Deployment

### Frontend (Vercel)

```bash
# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard:
VITE_NODE_API_ENDPOINT=https://your-backend.com
VITE_NODE_WS_ENDPOINT=wss://your-backend.com
```

### Backend (Railway / Fly.io)

```bash
cd backend

# Railway
railway init
railway up

# Fly.io
fly launch
fly deploy
```

See [GPU_HOSTS_SETUP.md](./GPU_HOSTS_SETUP.md) for detailed deployment instructions.

## Tech Stack

### Frontend
- **Framework**: Vite + React 18
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Blockchain**: Solana Web3.js + Wallet Adapter

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **WebSocket**: ws library
- **Storage**: In-memory (Map) - replace with DB for production

### Host Agent
- **Language**: Python 3.8+
- **WebSocket**: websockets library
- **GPU Detection**: nvidia-smi

## Documentation

- [GPU Hosts Setup Guide](./GPU_HOSTS_SETUP.md) - Comprehensive setup and deployment guide
- [Backend API Documentation](./backend/README.md) - API endpoints and WebSocket protocol
- [Python Agent Documentation](./agents/python-host/README.md) - Agent usage and troubleshooting

## Architecture

### GPU Hosts Flow

1. **User generates token**: User connects wallet at `/app`, clicks "Generate node token"
2. **Backend issues token**: POST `/api/nodes/issue-token` creates a unique UUID token
3. **User runs agent**: User copies command and runs it on their GPU machine
4. **Agent registers**: Agent connects via WebSocket, sends token and host info
5. **Backend validates**: Backend validates token, marks as used, creates node record
6. **Node online**: Node appears in "My GPU Nodes" table, starts receiving jobs
7. **Job execution**: Backend dispatches jobs, agent executes and reports results
8. **Earnings**: Node earns HYPER tokens for completed jobs

### WebSocket Protocol

- **register**: Agent → Server (with token)
- **registered**: Server → Agent (with nodeId)
- **heartbeat**: Agent → Server (every 15s)
- **job**: Server → Agent (job to execute)
- **job_result**: Agent → Server (execution result)

## Development

### Building for Production

```bash
# Frontend
npm run build

# Backend
cd backend
npm start
```

### Code Style

- Use ES6+ features
- Follow existing component patterns
- Keep components focused and reusable
- Comments in English
- Use semantic variable names

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Security

- Tokens are single-use and expire after 1 hour
- WebSocket connections should use WSS (TLS) in production
- Jobs should be sandboxed (use Docker) in production
- Add rate limiting to prevent abuse
- Validate all user inputs

## Production Checklist

- [ ] Replace in-memory storage with database
- [ ] Add authentication for admin endpoints
- [ ] Implement rate limiting
- [ ] Add proper logging and monitoring
- [ ] Use WSS (secure WebSocket) for production
- [ ] Sandbox job execution (Docker containers)
- [ ] Add signature verification for agents
- [ ] Implement job queue system
- [ ] Add blockchain integration for payments
- [ ] Set up CI/CD pipeline

## License

MIT

## Links

- Website: https://hypernodesolana.org
- App: https://hypernodesolana.org/app
- Discord: https://discord.gg/hypernode
- Twitter: https://twitter.com/hypernodesolana
- GitHub: https://github.com/hypernode-sol

## Support

For issues and questions:
- Open an issue on GitHub
- Join our Discord community
- Email: support@hypernodesolana.org
