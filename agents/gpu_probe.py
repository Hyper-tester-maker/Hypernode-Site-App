#!/usr/bin/env python3
"""
HYPERNODE GPU Registration Script

This script collects GPU information from your machine and registers it
with the HYPERNODE network for telemetry purposes.

Usage:
    python3 gpu_probe.py --wallet YOUR_SOLANA_WALLET_ADDRESS

Requirements:
    - Python 3.6+
    - nvidia-smi (for NVIDIA GPU detection)
    - requests library (install with: pip install requests)
"""

import subprocess
import socket
import requests
import platform
import argparse
import json
import sys


def get_gpu_info():
    """
    Collect GPU information using nvidia-smi.
    Returns a list of GPU dictionaries.
    """
    gpus = []
    try:
        output = subprocess.check_output([
            "nvidia-smi",
            "--query-gpu=name,memory.total,driver_version",
            "--format=csv,noheader,nounits"
        ]).decode().strip().splitlines()

        for line in output:
            parts = [x.strip() for x in line.split(",")]
            if len(parts) >= 3:
                name, mem, driver = parts[0], parts[1], parts[2]
                gpus.append({
                    "name": name,
                    "memory_mb": int(float(mem)),
                    "driver": driver
                })
    except FileNotFoundError:
        print("Warning: nvidia-smi not found. GPU detection unavailable.")
        gpus.append({
            "name": "no-nvidia-smi",
            "memory_mb": 0,
            "driver": "unknown"
        })
    except Exception as e:
        print(f"Error detecting GPUs: {e}")
        gpus.append({
            "name": "detection-error",
            "memory_mb": 0,
            "driver": "unknown"
        })

    return gpus


def main():
    parser = argparse.ArgumentParser(
        description='Register your GPU with the HYPERNODE network',
        epilog='Example: python3 gpu_probe.py --wallet GqH...xyz'
    )
    parser.add_argument(
        '--wallet',
        required=True,
        help='Your Solana wallet address'
    )
    parser.add_argument(
        '--api',
        default='https://hypernodesolana.org/api/gpu/register',
        help='API endpoint (default: https://hypernodesolana.org/api/gpu/register)'
    )

    args = parser.parse_args()

    print("=" * 60)
    print("HYPERNODE GPU Registration")
    print("=" * 60)
    print(f"Wallet: {args.wallet}")
    print(f"Hostname: {socket.gethostname()}")
    print(f"OS: {platform.platform()}")
    print("")

    # Collect GPU information
    print("Detecting GPUs...")
    gpus = get_gpu_info()

    for i, gpu in enumerate(gpus, 1):
        print(f"  GPU {i}: {gpu['name']}")
        if gpu['memory_mb'] > 0:
            print(f"    Memory: {gpu['memory_mb']} MB ({gpu['memory_mb'] / 1024:.1f} GB)")
            print(f"    Driver: {gpu['driver']}")

    print("")

    # Prepare payload
    payload = {
        "wallet": args.wallet,
        "hostname": socket.gethostname(),
        "gpus": gpus,
        "os": platform.platform(),
        "ip": None
    }

    # Send registration request
    print(f"Registering with {args.api}...")
    try:
        response = requests.post(args.api, json=payload, timeout=10)
        print(f"Status: {response.status_code}")

        if response.ok:
            print("✓ Successfully registered!")
            print("")
            print("Your GPU is now visible at: https://hypernodesolana.org/app")
        else:
            print(f"Error: {response.text}")
            sys.exit(1)

    except requests.exceptions.RequestException as e:
        print(f"Connection error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
