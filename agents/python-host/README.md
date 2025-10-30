# HYPERNODE GPU Host Agent (Python)

Python agent for connecting your GPU host to the HYPERNODE network.

## Prerequisites

- Python 3.8 or higher
- Ubuntu 22.04 or compatible Linux distribution
- NVIDIA GPU with drivers installed (optional but recommended)
- `nvidia-smi` command available (for GPU detection)

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

Or install directly:
```bash
pip install websockets
```

## Usage

1. Go to https://hypernodesolana.org/app
2. Connect your Solana wallet
3. Generate a node token
4. Run the agent with your token:

```bash
python3 agent.py \
  --endpoint wss://nodes.hypernodesolana.org \
  --token YOUR_TOKEN_HERE
```

For local development:
```bash
python3 agent.py \
  --endpoint ws://localhost:3002 \
  --token YOUR_TOKEN_HERE
```

## Features

- Automatic GPU detection (NVIDIA)
- Heartbeat to keep connection alive
- Job execution with timeout protection
- Graceful shutdown (Ctrl+C)
- Error handling and reconnection

## How it works

1. The agent connects to the HYPERNODE network via WebSocket
2. It registers your GPU host using the provided token
3. Once registered, it starts receiving compute jobs
4. Jobs are executed locally and results are sent back
5. You earn HYPER tokens for completed jobs

## Troubleshooting

### "websockets library is required"
Install the required library:
```bash
pip install websockets
```

### "nvidia-smi not available"
The agent will still work but GPU detection will be limited. Install NVIDIA drivers:
```bash
sudo ubuntu-drivers autoinstall
sudo reboot
```

### Connection refused
Make sure the WebSocket endpoint is correct and accessible. For production:
```bash
wss://nodes.hypernodesolana.org
```

For local development:
```bash
ws://localhost:3002
```

### Token already used
Each token can only be used once. Generate a new token from the web interface.

## Security Notes

- Only run trusted code from the HYPERNODE network
- Jobs run with your user privileges
- Review job commands before execution in production
- Use Docker for better isolation (recommended)

## Docker Version

For better security and isolation, use the Docker version instead:
```bash
docker run -d \
  --name hypernode-host \
  --restart unless-stopped \
  --gpus all \
  -e HN_ENDPOINT=wss://nodes.hypernodesolana.org \
  -e HN_NODE_TOKEN=YOUR_TOKEN_HERE \
  ghcr.io/hypernode-sol/host:latest
```

## Support

- Discord: https://discord.gg/hypernode
- Documentation: https://docs.hypernodesolana.org
- GitHub: https://github.com/hypernode-sol/host-agent
