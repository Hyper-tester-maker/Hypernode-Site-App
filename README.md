# HYPERNODE Site & App

Official website and application for HYPERNODE - A decentralized GPU compute network on Solana.

## Project Structure

```
├── src/                    # Frontend source code (Vite + React)
│   ├── pages/             # Page components
│   │   └── App.jsx        # Main app page with GPU registration
│   ├── components/        # Reusable components
│   │   ├── GpuHostsPreview.jsx  # GPU registration component
│   │   └── ui/            # UI components (Radix UI)
│   └── main.jsx           # Entry point
│
├── backend/               # Backend API server (Express)
│   ├── server.js         # HTTP API server
│   ├── routes/
│   │   └── gpu.js       # GPU registration endpoints
│
├── agents/               # GPU registration scripts
│   └── gpu_probe.py     # Python script for GPU registration
│
└── GPU_REGISTRATION.md  # GPU registration guide
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
- **GPU Hosts (Preview)** (NEW):
  - Register your GPU-enabled machines
  - View registered GPUs in real-time
  - Simple telemetry and monitoring
  - Community visibility of GPU network

### GPU Registration System
- Lightweight GPU registration via Python script
- Real-time table showing registered GPUs
- Telemetry only (no job execution yet)
- Foundation for future compute marketplace

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

# Start API server
node server.js
```

### Registering a GPU

```bash
# From the /app page, copy the registration script and command
# Or use the standalone script:

python3 agents/gpu_probe.py --wallet YOUR_WALLET_ADDRESS
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

- [GPU Registration Guide](./GPU_REGISTRATION.md) - How to register your GPU
- [Backend API Documentation](./backend/README.md) - API endpoints reference

## Architecture

### GPU Registration Flow

1. **User connects wallet**: User visits `/app` and connects Solana wallet
2. **Copy script**: User copies Python registration script from the page
3. **Run script**: User runs `python3 gpu_probe.py --wallet <address>` on GPU machine
4. **Script collects data**: Script detects GPUs using nvidia-smi
5. **Register with API**: Script POSTs to `/api/gpu/register`
6. **Backend stores**: Backend stores GPU data in memory (wallet + hostname + GPUs)
7. **Table updates**: Frontend polls `/api/gpu/hosts?wallet=<address>` every 10s
8. **GPU visible**: User sees their GPU in the "Your Registered GPUs" table

### API Endpoints

- **POST /api/gpu/register**: Register a GPU host with telemetry data
- **GET /api/gpu/hosts?wallet=<address>**: List all GPUs for a wallet

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

- [ ] Replace in-memory storage with database (PostgreSQL/Redis)
- [ ] Add rate limiting to prevent abuse
- [ ] Add proper logging and monitoring
- [ ] Implement GPU data persistence
- [ ] Add wallet signature verification
- [ ] Set up CI/CD pipeline
- [ ] Add analytics and metrics
- [ ] Implement job execution system (Phase 2)
- [ ] Add blockchain integration for payments (Phase 2)
- [ ] Build compute marketplace (Phase 3)

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
