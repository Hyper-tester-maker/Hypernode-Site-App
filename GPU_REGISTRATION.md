# GPU Registration Guide

This guide explains how to register your GPU with the HYPERNODE network for telemetry and monitoring.

## Overview

The GPU registration system allows you to:
- Register your GPU-enabled machines with your Solana wallet
- View registered GPUs in real-time on the /app page
- Show the community that the network recognizes and registers GPUs
- Prepare for future job execution and rewards

**Note**: This is currently **telemetry/registration only**. No jobs are executed and no payments are made yet.

## How It Works

1. **Connect Wallet**: Visit https://hypernodesolana.org/app and connect your Solana wallet
2. **Get Script**: Copy the Python registration script from the GPU Hosts section
3. **Run Script**: Execute the script on your GPU machine
4. **View GPU**: Return to /app to see your GPU in the table

## Prerequisites

- Python 3.6 or higher
- NVIDIA GPU with drivers installed
- `nvidia-smi` command available
- `requests` Python library

## Installation

### Install Python Dependencies

```bash
pip install requests
```

Or if you're using Python 3:

```bash
pip3 install requests
```

### Verify nvidia-smi

```bash
nvidia-smi
```

You should see your GPU listed. If not, install NVIDIA drivers:

```bash
# Ubuntu/Debian
sudo ubuntu-drivers autoinstall
sudo reboot

# Or download from NVIDIA website
# https://www.nvidia.com/Download/index.aspx
```

## Usage

### Method 1: Copy from Web Interface (Recommended)

1. Go to https://hypernodesolana.org/app
2. Connect your Solana wallet
3. Scroll to "GPU Hosts (Preview)" section
4. Copy the registration script
5. Save it as `gpu_probe.py`
6. Run the command shown (your wallet address is pre-filled)

### Method 2: Download Script

```bash
# Download the script
wget https://raw.githubusercontent.com/hypernode-sol/Hypernode-Site-App/main/agents/gpu_probe.py

# Or curl
curl -O https://raw.githubusercontent.com/hypernode-sol/Hypernode-Site-App/main/agents/gpu_probe.py

# Make it executable
chmod +x gpu_probe.py

# Run it
python3 gpu_probe.py --wallet YOUR_WALLET_ADDRESS
```

### Method 3: Manual

Copy the script from `/agents/gpu_probe.py` in this repository.

## Example

```bash
python3 gpu_probe.py --wallet GqH4XmKzMvFxJtQ8xqP3VkNx2M9yZp8L7wK5n9R8cD6s
```

Expected output:

```
============================================================
HYPERNODE GPU Registration
============================================================
Wallet: GqH4XmKzMvFxJtQ8xqP3VkNx2M9yZp8L7wK5n9R8cD6s
Hostname: gpu-rig-01
OS: Linux-5.15.0-91-generic-x86_64-with-glibc2.35

Detecting GPUs...
  GPU 1: NVIDIA GeForce RTX 4090
    Memory: 24564 MB (24.0 GB)
    Driver: 555.42

Registering with https://hypernodesolana.org/api/gpu/register...
Status: 200
✓ Successfully registered!

Your GPU is now visible at: https://hypernodesolana.org/app
```

## Verifying Registration

1. Return to https://hypernodesolana.org/app
2. Make sure your wallet is still connected
3. Check the "Your Registered GPUs" table
4. You should see your hostname and GPU model

The table refreshes every 10 seconds automatically.

## API Endpoints

The script uses these API endpoints:

### POST /api/gpu/register

Registers a GPU host.

**Request:**
```json
{
  "wallet": "SOLANA_PUBLIC_KEY",
  "hostname": "gpu-rig-01",
  "gpus": [
    {
      "name": "NVIDIA RTX 4090",
      "memory_mb": 24564,
      "driver": "555.42"
    }
  ],
  "os": "Ubuntu 22.04",
  "ip": null
}
```

**Response:**
```json
{
  "ok": true
}
```

### GET /api/gpu/hosts?wallet=PUBKEY

Lists all registered GPUs for a wallet.

**Response:**
```json
[
  {
    "wallet": "SOLANA_PUBLIC_KEY",
    "hostname": "gpu-rig-01",
    "gpus": [
      {
        "name": "NVIDIA RTX 4090",
        "memory_mb": 24564,
        "driver": "555.42"
      }
    ],
    "os": "Ubuntu 22.04",
    "lastSeen": "2025-10-30T12:00:00Z"
  }
]
```

## Advanced Usage

### Custom API Endpoint (for local development)

```bash
python3 gpu_probe.py \
  --wallet YOUR_WALLET \
  --api http://localhost:3001/api/gpu/register
```

### Running Periodically

To keep your GPU registration fresh, run the script periodically with cron:

```bash
# Edit crontab
crontab -e

# Add this line to run every 5 minutes
*/5 * * * * /usr/bin/python3 /path/to/gpu_probe.py --wallet YOUR_WALLET >> /var/log/gpu_probe.log 2>&1
```

## Troubleshooting

### "nvidia-smi not found"

Install NVIDIA drivers:

```bash
sudo ubuntu-drivers autoinstall
sudo reboot
```

### "requests library not found"

Install the requests library:

```bash
pip3 install requests
```

### "Connection error"

Check your internet connection and verify the API endpoint is accessible:

```bash
curl https://hypernodesolana.org/health
```

### GPU not showing in the table

1. Verify the script ran successfully (status 200)
2. Make sure you're connected with the same wallet
3. Wait 10 seconds for the table to refresh
4. Check browser console for errors (F12)

### Multiple GPUs

If you have multiple GPUs, they will all be detected and registered together. The table shows only the first GPU, but all are stored in the backend.

## Security

- The script only sends telemetry data (hostname, GPU model, memory, driver version)
- No private keys or sensitive data are transmitted
- Your wallet address is used only for grouping your GPUs
- All communication is over HTTPS

## Data Stored

The following data is stored (in-memory, temporarily):

- Wallet address
- Hostname
- GPU model(s)
- GPU memory
- Driver version
- Operating system
- Last seen timestamp

This data is **not persisted** to disk in the current implementation and will be lost if the server restarts. In production, this will be stored in a database.

## Next Steps

Once GPU registration is working:

1. **Job Execution**: The network will start dispatching compute jobs to registered GPUs
2. **Rewards**: Earn HYPER tokens for completed jobs
3. **Reputation**: Build reputation based on job completion rate
4. **Marketplace**: Choose which jobs to accept based on pricing

## Support

- Discord: https://discord.gg/hypernode
- Documentation: https://docs.hypernodesolana.org
- GitHub: https://github.com/hypernode-sol/Hypernode-Site-App/issues

## FAQ

**Q: Is this safe to run?**
A: Yes, the script only collects GPU telemetry and sends it to our API. No code execution happens yet.

**Q: Will I earn tokens?**
A: Not yet. This is registration only. Job execution and rewards coming soon.

**Q: How often should I run the script?**
A: Once is enough for registration. The "Last Seen" timestamp updates each time you run it.

**Q: Can I unregister my GPU?**
A: Currently, GPU registrations expire automatically if not refreshed. Full management features coming soon.

**Q: What if I don't have an NVIDIA GPU?**
A: Currently only NVIDIA GPUs are supported via nvidia-smi. AMD support coming soon.

**Q: Does this work on Windows?**
A: The script is designed for Linux but should work on Windows if Python and nvidia-smi are in your PATH.
