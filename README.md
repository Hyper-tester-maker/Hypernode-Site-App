# Hypernode - Distributed GPU & Agent-Oriented Compute Network

**Whitepaper v1.0 Implementation**

A decentralized GPU compute network built on Solana, enabling GPU providers to monetize idle hardware and AI developers to access distributed computing power.

![Hypernode](https://img.shields.io/badge/Status-Active%20Development-brightgreen)
![Solana](https://img.shields.io/badge/Blockchain-Solana-blueviolet)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🚀 Overview

Hypernode is a **distributed GPU compute marketplace** that connects:
- **GPU Providers**: Individuals with idle GPUs (RTX 4090, 3090, etc.) who want to earn rewards
- **AI Developers**: Teams needing compute power for LLM inference, fine-tuning, RAG, and other AI workloads
- **Agents & Automation**: AI agents that orchestrate jobs across the network

All powered by the **$HYPER** token on Solana.

---

## 🏗️ Architecture

The project follows a clean, modular architecture with 5 layers:

### Layer 0: Protocol & Token (On-Chain)
- **$HYPER Token**: `92s9qna3djkMncZzkacyNQ38UKnNXZFh4Jgqe3Cmpump`
- Solana programs for node registry, job receipts, and payments

### Layer 1: Network / Nodes (Off-Chain)
- GPU/CPU node registration
- Heartbeat and telemetry
- Resource discovery

### Layer 2: Job Marketplace
- Job submission and matching
- LLM inference, fine-tuning, RAG, rendering
- Pricing and rewards

### Layer 3: Agents & Automation (HAE)
- Hypernode Automation Engine
- Validation & metrics
- AI agent integration (Eliza, Hyper Agent)

### Layer 4: Interfaces
- Web application (React + Vite)
- REST API
- Public validation dashboard

---

## 📂 Project Structure

```
Hypernode-Site-App/
├── server/                      # Backend API (Node.js + Express)
│   ├── routes/
│   │   ├── nodes.js            # Node registry endpoints
│   │   ├── jobs.js             # Job marketplace endpoints
│   │   └── metrics.js          # Metrics and validation endpoints
│   ├── index.js                # Main server
│   ├── package.json
│   └── README.md               # Backend documentation
│
├── src/                         # Frontend (React + Vite)
│   ├── components/
│   │   ├── BalanceCard.jsx     # SOL + HYPER balance
│   │   ├── GPUNodeCard.jsx     # Display registered GPU node
│   │   ├── NodeRegistrationDialog.jsx  # Register new node
│   │   ├── Navbar.jsx
│   │   └── ui/                 # Reusable UI components
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── App.jsx             # Main app (node registration)
│   │   ├── Validation.jsx      # Public validation & metrics
│   │   ├── NetworkDashboard.jsx
│   │   └── ...
│   ├── services/
│   │   └── api.js              # API service wrapper
│   └── main.jsx
│
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md                    # This file
```

---

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Hypernode-Site-App.git
cd Hypernode-Site-App
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Configure Environment Variables

**Frontend** (`.env` in root):
```env
VITE_API_URL=http://localhost:3001
```

**Backend** (`server/.env`):
```env
PORT=3001
SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
HYPER_TOKEN_MINT=92s9qna3djkMncZzkacyNQ38UKnNXZFh4Jgqe3Cmpump
NODE_ENV=development
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The app will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001`

---

## 🎯 Key Features

### ✅ Implemented

- [x] **Solana Wallet Integration** (Phantom, Solflare, Backpack)
- [x] **SOL & HYPER Balance Display**
- [x] **GPU Node Registration** (connect wallet → register GPU)
- [x] **Node Management** (view, remove nodes)
- [x] **Backend API** (Node Registry, Job Marketplace, Metrics)
- [x] **Validation Page** (public metrics & on-chain verification)
- [x] **Responsive UI** (mobile-friendly)

### 🚧 In Development

- [ ] Job submission UI
- [ ] Real-time node heartbeat
- [ ] Job matchmaking algorithm
- [ ] Payment processing with HYPER
- [ ] On-chain receipt writing (Solana programs)
- [ ] Docker image for GPU workers
- [ ] WebSocket for real-time updates

### 🔮 Planned

- [ ] AI agent integration (Eliza, Hyper Agent)
- [ ] LLM Deployer module
- [ ] Bridge to Base blockchain
- [ ] Advanced reputation system
- [ ] Governance features

---

## 🔗 API Endpoints

### Node Registry

```
POST   /api/nodes/register              # Register new node
GET    /api/nodes                       # List all nodes
GET    /api/nodes/:nodeId               # Get node details
GET    /api/nodes/wallet/:address       # Get nodes by wallet
POST   /api/nodes/:nodeId/heartbeat     # Send heartbeat
DELETE /api/nodes/:nodeId               # Deregister node
```

### Job Marketplace

```
POST   /api/jobs                    # Create new job
GET    /api/jobs                    # List jobs
GET    /api/jobs/:jobId             # Get job details
POST   /api/jobs/:jobId/cancel      # Cancel job
GET    /api/jobs/stats/summary      # Get statistics
```

### Metrics & Validation

```
GET    /api/metrics                 # Overall network metrics
GET    /api/metrics/validation      # Validation data (public)
GET    /api/metrics/nodes           # Node metrics
GET    /api/metrics/jobs            # Job metrics
```

Full API documentation: [server/README.md](server/README.md)

---

## 🎨 User Flow

### For GPU Providers

1. **Connect Wallet** → Connect Phantom/Solflare/Backpack
2. **View Balance** → See SOL and HYPER balance
3. **Register GPU** → Click "Register New Node"
   - Select GPU model (RTX 4090, 3080, etc.)
   - Select VRAM
   - Choose capabilities (inference, training, render)
4. **View Node Card** → See your registered GPU with stats
5. **Earn Rewards** → Complete jobs and earn HYPER tokens

### For Job Creators

1. **Connect Wallet**
2. **Create Job** (coming soon)
   - Select job type (LLM inference, fine-tuning, etc.)
   - Specify requirements (VRAM, model)
   - Set budget in HYPER
3. **Monitor Progress** → View job status in real-time
4. **Get Results** → Receive output and on-chain receipt

### For Public / Investors

1. Visit `/validation` page
2. View network metrics:
   - Active nodes
   - Jobs completed
   - HYPER paid
   - On-chain receipts
3. Verify transactions on Solscan

---

## 🔐 Security & Validation

- All node registrations require valid Solana wallet
- Job ownership verified via wallet signatures
- On-chain receipts for transparency
- Public validation page for auditing
- Future: Proof-of-execution for jobs

---

## 🪙 Token Information

- **Name**: Hypernode
- **Symbol**: HYPER
- **Type**: SPL Token (Solana)
- **Mint Address**: `92s9qna3djkMncZzkacyNQ38UKnNXZFh4Jgqe3Cmpump`
- **Network**: Solana Mainnet

### Token Utility

- Pay for GPU jobs
- Earn rewards for providing compute
- Stake for higher reputation
- Governance (future)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Solana Web3.js** - Blockchain integration
- **@solana/wallet-adapter** - Wallet connection

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **@solana/web3.js** - Solana integration
- **CORS** - Cross-origin support

### Infrastructure
- **Solana Mainnet** - Blockchain layer
- **Helius RPC** - Solana RPC provider
- **In-memory storage** (will migrate to PostgreSQL/MongoDB)

---

## 📊 Development Roadmap

### Phase 0: Reorganization ✅
- ✅ Create modular architecture
- ✅ Separate backend and frontend
- ✅ Setup development environment

### Phase 1: MVP Node Registration ✅
- ✅ Wallet connection
- ✅ Node registration UI
- ✅ Node display and management
- ✅ Backend API

### Phase 2: MVP Jobs (In Progress)
- 🚧 Job submission UI
- 🚧 Matchmaking system
- 🚧 Basic job execution
- 🚧 On-chain receipts

### Phase 3: LLM & AI
- ⏳ DeepSeek / Qwen / Ollama integration
- ⏳ Real inference jobs
- ⏳ Results visualization

### Phase 4: Automation & Agents
- ⏳ Hypernode Automation Engine (HAE)
- ⏳ Agent integration (Eliza)
- ⏳ Enhanced validation page

### Phase 5: Advanced Features
- ⏳ Bridge to Base
- ⏳ PayAI plugins
- ⏳ Webhooks and events

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 🔗 Links

- **Website**: hypernodesolana.org
- **Twitter**: @hypernode_sol
- **Discord**: [Join our community](https://discord.gg/hypernode)
- **Whitepaper**: [View full whitepaper](docs/whitepaper-v1.0.md)

---

## 📞 Support

For questions or issues:
- Open a GitHub issue
- Join our Discord
- Email: support@hypernode.sol

---

## 🎉 Acknowledgments

Inspired by:
- Akash Network
- Nosana
- DeepBrainChain
- Render Network

Built with ❤️ by the Hypernode team.

---

**Made for Solana | Powered by HYPER | Built for the Future**
