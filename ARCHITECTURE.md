# Hypernode - Repository Architecture

Based on the **Whitepaper v1.0**, the complete Hypernode ecosystem should be organized into **separate, focused repositories** for better maintainability, scalability, and team collaboration.

---

## 🏗️ Recommended Repository Structure

### ✅ **1. hypernode-app** (This Repository)
**Current Repository**: `Hypernode-Site-App`

**Purpose**: Frontend application and backend API

**What it contains**:
- React + Vite frontend (pages: Home, App, Dashboard, Validation)
- Node.js + Express backend API
- Solana wallet integration
- UI components
- API service layer

**Tech Stack**:
- Frontend: React, Vite, TailwindCSS, Framer Motion
- Backend: Node.js, Express, @solana/web3.js
- Storage: In-memory (to be migrated to PostgreSQL)

**Responsibility**:
- User interface for node registration
- Wallet connection and balance display
- Network dashboard visualization
- Public validation/metrics page
- REST API for nodes, jobs, and metrics

**Repository URL**: `github.com/your-org/hypernode-app`

---

### 🔧 **2. hypernode-core-protocol** (To Create)
**Purpose**: Solana smart contracts (programs) for on-chain operations

**What it should contain**:
- **NodeRegistryProgram**: Register, update, and manage GPU nodes on-chain
- **JobReceiptProgram**: Create and settle job receipts on Solana
- **PaymentSplitterProgram**: Distribute HYPER payments (80% node, 10% treasury, etc.)
- **BridgeAdapterProgram** (optional): Cross-chain bridge to Base
- Tests for all programs
- Deployment scripts

**Tech Stack**:
- Solana: Anchor framework (Rust)
- Testing: Mocha, Chai
- Deployment: Solana CLI

**Key Functions**:
```rust
// NodeRegistryProgram
pub fn register_node(ctx: Context<RegisterNode>, hw_signature: String, gpu_specs_hash: String) -> Result<()>
pub fn update_node_status(ctx: Context<UpdateNode>, status: NodeStatus) -> Result<()>
pub fn stake_for_node(ctx: Context<StakeNode>, amount: u64) -> Result<()>

// JobReceiptProgram
pub fn create_job(ctx: Context<CreateJob>, job_id: String, price: u64) -> Result<()>
pub fn submit_result(ctx: Context<SubmitResult>, result_hash: String) -> Result<()>
pub fn settle_job(ctx: Context<SettleJob>) -> Result<()>
```

**Repository URL**: `github.com/your-org/hypernode-core-protocol`

---

### 🖥️ **3. hypernode-node-client** (To Create)
**Purpose**: Worker software that runs on GPU providers' machines

**What it should contain**:
- Docker image for easy deployment
- GPU detection (nvidia-smi, ROCm)
- Heartbeat sender (every 60s)
- Job executor (receives jobs from marketplace, executes, returns results)
- Telemetry reporter (VRAM usage, GPU temp, uptime)
- Auto-update mechanism

**Tech Stack**:
- Language: Python or Rust
- Containerization: Docker
- GPU: CUDA, PyTorch, TensorFlow, Ollama
- Communication: WebSocket or gRPC to backend

**How it works**:
1. User downloads/installs the client
2. Client authenticates with node token (from /app registration)
3. Client detects GPU specs and sends to backend
4. Client sends heartbeat every 60 seconds
5. Client listens for incoming jobs
6. Client executes jobs in isolated Docker containers
7. Client reports results back to backend

**Example Docker command**:
```bash
docker run -d --gpus all \
  -e HN_NODE_TOKEN=hn_abc123... \
  -e WALLET_PUBKEY=YourSolanaPublicKey \
  hypernode/node-client:latest
```

**Repository URL**: `github.com/your-org/hypernode-node-client`

---

### 🤖 **4. hypernode-automation-engine** (HAE) (To Create)
**Purpose**: Automation, orchestration, and agent coordination

**What it should contain**:
- **Job Matchmaking Engine**: Match jobs to available nodes
- **Agent Framework**: Integration with Eliza, Hyper Agent
- **Event Listeners**: Monitor on-chain events (new job, settlement, etc.)
- **Webhook System**: Notify external services when events occur
- **Metrics Aggregator**: Collect and process network metrics
- **Validation Service**: Generate public validation data

**Tech Stack**:
- Backend: Node.js or Python
- Database: PostgreSQL or MongoDB
- Queue: Redis, RabbitMQ, or Bull
- Blockchain: Solana SDK for event listening

**Key Responsibilities**:
- Listen to on-chain job creation events
- Find best node for each job (based on GPU, VRAM, reputation, price)
- Send job to selected node
- Monitor job execution
- Trigger payment settlement on completion
- Update metrics in real-time
- Generate validation page data

**Agent Integration**:
- Eliza agent can submit jobs via API
- Hyper Agent can orchestrate complex multi-step jobs
- Agents can query node availability

**Repository URL**: `github.com/your-org/hypernode-automation-engine`

---

### 📦 **5. hypernode-llm-deployer** (Optional, To Create)
**Purpose**: Deploy and host LLMs on the Hypernode network

**What it should contain**:
- Pre-built templates for popular LLMs (Qwen, DeepSeek, Llama, Mistral)
- Model management (upload, version, deploy)
- Inference API (REST + WebSocket)
- Load balancing across multiple nodes
- Model caching and optimization

**Tech Stack**:
- Python, FastAPI
- Ollama, vLLM, or TGI (Text Generation Inference)
- Model storage: S3, IPFS

**Use Case**:
Instead of running one-off jobs, users can deploy a **hosted LLM** that stays online and accepts inference requests.

Example:
```bash
hypernode deploy --model deepseek-r1-qwen-7b --nodes 3 --min-vram 16
```

**Repository URL**: `github.com/your-org/hypernode-llm-deployer`

---

### 🌉 **6. hypernode-bridge** (Optional, To Create)
**Purpose**: Cross-chain bridge between Solana and Base

**What it should contain**:
- Solana → Base token bridge
- Base → Solana token bridge
- Job submission from Base chain
- Payment settlement cross-chain

**Tech Stack**:
- Solana: Anchor (Rust)
- Base: Solidity smart contracts
- Relayer: Node.js

**Why?**
The whitepaper mentions supporting payments from Base blockchain. This bridge would enable users on Base to use Hypernode services and pay with wrapped HYPER on Base.

**Repository URL**: `github.com/your-org/hypernode-bridge`

---

## 📊 Repository Dependency Graph

```
┌─────────────────────────────────────────────┐
│   hypernode-app (Frontend + Backend API)   │
│   - User interface                          │
│   - Wallet integration                      │
│   - Dashboard & Validation                  │
└───────────┬─────────────────────────────────┘
            │
            │ API Calls
            ▼
┌─────────────────────────────────────────────┐
│   hypernode-automation-engine (HAE)         │
│   - Job matchmaking                         │
│   - Metrics aggregation                     │
│   - Agent coordination                      │
└───┬───────────────────────┬─────────────────┘
    │                       │
    │ On-chain calls        │ Job dispatch
    ▼                       ▼
┌───────────────────┐   ┌─────────────────────┐
│ hypernode-core-   │   │ hypernode-node-     │
│ protocol          │   │ client (Workers)    │
│ - Solana programs │   │ - GPU workers       │
│ - Smart contracts │   │ - Job execution     │
└───────────────────┘   └─────────────────────┘
            │
            │ Bridge (optional)
            ▼
    ┌───────────────┐
    │ hypernode-    │
    │ bridge        │
    │ - Base↔Solana │
    └───────────────┘
```

---

## 🎯 Recommended Development Order

### **Phase 1: Core Infrastructure** ✅ (Done)
- ✅ hypernode-app (frontend + backend API)
- ✅ In-memory storage
- ✅ Wallet integration
- ✅ Basic UI

### **Phase 2: Worker & Execution**
- 🔲 hypernode-node-client (Docker image)
- 🔲 Job execution engine
- 🔲 Heartbeat system
- 🔲 GPU detection

### **Phase 3: On-Chain**
- 🔲 hypernode-core-protocol (Solana programs)
- 🔲 NodeRegistry program
- 🔲 JobReceipt program
- 🔲 PaymentSplitter program
- 🔲 Deploy to Solana mainnet

### **Phase 4: Automation & Agents**
- 🔲 hypernode-automation-engine
- 🔲 Job matchmaking
- 🔲 Eliza integration
- 🔲 Metrics aggregation
- 🔲 Event listeners

### **Phase 5: Advanced Features**
- 🔲 hypernode-llm-deployer
- 🔲 hypernode-bridge (Base)
- 🔲 Advanced reputation system
- 🔲 Governance

---

## 🗂️ Database Strategy

Currently using **in-memory storage** in `hypernode-app`. As the system grows:

### **Option A: Monolithic Database** (Simpler)
- Single PostgreSQL instance
- All repos connect to it
- Tables: `nodes`, `jobs`, `metrics`, `receipts`, `users`

### **Option B: Microservices Databases** (More scalable)
- `hypernode-app`: PostgreSQL (nodes, users, UI state)
- `hypernode-automation-engine`: PostgreSQL + Redis (jobs, queue)
- `hypernode-llm-deployer`: PostgreSQL (models, deployments)

**Recommendation**: Start with **Option A**, migrate to **Option B** later if needed.

---

## 🔐 Security Considerations

1. **API Keys**: Each repository should have its own API keys (not shared)
2. **Wallet Private Keys**: NEVER store in repositories (use env variables)
3. **Node Tokens**: Generate securely, rotate periodically
4. **Smart Contracts**: Audit before mainnet deployment
5. **Worker Sandboxing**: All jobs run in isolated Docker containers

---

## 📝 Summary

To fully implement the Hypernode whitepaper, you need:

| Repository | Status | Priority | Purpose |
|------------|--------|----------|---------|
| **hypernode-app** | ✅ Exists | 🔴 Critical | Frontend + Backend API |
| **hypernode-core-protocol** | ❌ Create | 🔴 Critical | Solana smart contracts |
| **hypernode-node-client** | ❌ Create | 🔴 Critical | GPU worker software |
| **hypernode-automation-engine** | ❌ Create | 🟡 High | Job orchestration |
| **hypernode-llm-deployer** | ❌ Create | 🟢 Medium | Hosted LLM service |
| **hypernode-bridge** | ❌ Create | 🟢 Low | Cross-chain bridge |

---

## 🚀 Next Steps

1. **Short term**: Improve `hypernode-app` (this repo)
   - Add real job submission UI
   - Connect to real database (PostgreSQL)
   - Enhance validation page with real on-chain data

2. **Medium term**: Create `hypernode-core-protocol`
   - Write Solana programs (Anchor)
   - Deploy to devnet
   - Test on-chain operations

3. **Long term**: Create worker and automation
   - Build `hypernode-node-client` Docker image
   - Develop `hypernode-automation-engine`
   - Integrate agents

---

**Questions?**

For architecture discussions, open an issue in this repository or reach out to the team.

---

**Built with ❤️ for the Hypernode ecosystem**
