#!/usr/bin/env python3
"""
HYPERNODE GPU Host Agent

This agent connects your GPU host to the HYPERNODE network,
allowing it to receive and execute compute jobs.
"""

import asyncio
import json
import platform
import subprocess
import argparse
import signal
import sys
from datetime import datetime

try:
    import websockets
except ImportError:
    print("Error: websockets library is required")
    print("Install it with: pip install websockets")
    sys.exit(1)

class HypernodeAgent:
    def __init__(self, endpoint, token):
        self.endpoint = endpoint
        self.token = token
        self.node_id = None
        self.ws = None
        self.running = True

    def get_host_info(self):
        """Collect host information including GPU details"""
        hostname = platform.node()
        os_info = f"{platform.system()} {platform.release()}"

        gpus = []
        try:
            # Try to detect NVIDIA GPUs
            result = subprocess.run(
                ['nvidia-smi', '--query-gpu=name,memory.total', '--format=csv,noheader'],
                capture_output=True,
                text=True,
                timeout=5
            )
            if result.returncode == 0:
                for line in result.stdout.strip().split('\n'):
                    if line:
                        parts = line.split(',')
                        gpu_name = parts[0].strip() if parts else 'Unknown'
                        gpu_memory = parts[1].strip() if len(parts) > 1 else 'Unknown'
                        gpus.append({
                            'name': gpu_name,
                            'memory': gpu_memory
                        })
        except (subprocess.TimeoutExpired, FileNotFoundError):
            gpus.append({'name': 'GPU (nvidia-smi not available)', 'memory': 'Unknown'})

        return {
            'hostname': hostname,
            'os': os_info,
            'gpus': gpus
        }

    async def register(self):
        """Register this node with the HYPERNODE network"""
        host_info = self.get_host_info()

        print(f"Registering node...")
        print(f"  Hostname: {host_info['hostname']}")
        print(f"  OS: {host_info['os']}")
        for gpu in host_info['gpus']:
            print(f"  GPU: {gpu['name']} ({gpu['memory']})")

        await self.ws.send(json.dumps({
            'type': 'register',
            'token': self.token,
            'hostInfo': host_info
        }))

    async def send_heartbeat(self):
        """Send periodic heartbeat to keep connection alive"""
        if self.node_id and self.ws:
            await self.ws.send(json.dumps({
                'type': 'heartbeat',
                'nodeId': self.node_id
            }))

    async def execute_job(self, job_id, command):
        """Execute a job and return the result"""
        print(f"\n[{datetime.now().strftime('%H:%M:%S')}] Executing job {job_id}")
        print(f"  Command: {command}")

        try:
            result = subprocess.run(
                command,
                shell=True,
                capture_output=True,
                text=True,
                timeout=300  # 5 minute timeout
            )

            status = 'completed' if result.returncode == 0 else 'failed'
            logs = result.stdout + result.stderr

            print(f"  Status: {status}")

            # Send result back to server
            await self.ws.send(json.dumps({
                'type': 'job_result',
                'id': job_id,
                'status': status,
                'logs': logs
            }))

        except subprocess.TimeoutExpired:
            print(f"  Status: failed (timeout)")
            await self.ws.send(json.dumps({
                'type': 'job_result',
                'id': job_id,
                'status': 'failed',
                'logs': 'Job execution timeout'
            }))
        except Exception as e:
            print(f"  Status: failed ({str(e)})")
            await self.ws.send(json.dumps({
                'type': 'job_result',
                'id': job_id,
                'status': 'failed',
                'logs': str(e)
            }))

    async def handle_message(self, message):
        """Handle incoming messages from the server"""
        try:
            data = json.loads(message)
            msg_type = data.get('type')

            if msg_type == 'registered':
                self.node_id = data.get('nodeId')
                print(f"\n✓ Successfully registered!")
                print(f"  Node ID: {self.node_id}")
                print(f"\nNode is now online and ready to receive jobs.")
                print(f"View your node at: https://hypernodesolana.org/app\n")

            elif msg_type == 'job':
                job_id = data.get('id')
                command = data.get('command')
                await self.execute_job(job_id, command)

            elif msg_type == 'ack':
                # Acknowledgment received
                pass

            elif msg_type == 'error':
                print(f"Error from server: {data.get('message')}")

            else:
                print(f"Unknown message type: {msg_type}")

        except json.JSONDecodeError:
            print(f"Invalid JSON received: {message}")

    async def run(self):
        """Main event loop"""
        print("=" * 60)
        print("HYPERNODE GPU Host Agent")
        print("=" * 60)
        print(f"Connecting to {self.endpoint}...")

        try:
            async with websockets.connect(self.endpoint) as ws:
                self.ws = ws
                print("✓ Connected to HYPERNODE network\n")

                # Register node
                await self.register()

                # Start heartbeat task
                async def heartbeat_loop():
                    while self.running:
                        await asyncio.sleep(15)  # Heartbeat every 15 seconds
                        if self.running:
                            await self.send_heartbeat()

                heartbeat_task = asyncio.create_task(heartbeat_loop())

                # Listen for messages
                while self.running:
                    try:
                        message = await asyncio.wait_for(ws.recv(), timeout=1.0)
                        await self.handle_message(message)
                    except asyncio.TimeoutError:
                        continue
                    except websockets.exceptions.ConnectionClosed:
                        print("\nConnection closed by server")
                        break

                heartbeat_task.cancel()

        except websockets.exceptions.InvalidURI:
            print(f"Error: Invalid WebSocket URI: {self.endpoint}")
        except websockets.exceptions.WebSocketException as e:
            print(f"WebSocket error: {e}")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            print("\nAgent stopped")

    def stop(self):
        """Stop the agent gracefully"""
        print("\nStopping agent...")
        self.running = False


def main():
    parser = argparse.ArgumentParser(
        description='HYPERNODE GPU Host Agent',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 agent.py --endpoint wss://nodes.hypernodesolana.org --token YOUR_TOKEN
  python3 agent.py --endpoint ws://localhost:3002 --token YOUR_TOKEN

For more information, visit: https://hypernodesolana.org
        """
    )

    parser.add_argument(
        '--endpoint',
        required=True,
        help='WebSocket endpoint URL (e.g., wss://nodes.hypernodesolana.org)'
    )

    parser.add_argument(
        '--token',
        required=True,
        help='Node registration token (generate at https://hypernodesolana.org/app)'
    )

    args = parser.parse_args()

    agent = HypernodeAgent(args.endpoint, args.token)

    # Handle Ctrl+C gracefully
    def signal_handler(sig, frame):
        agent.stop()

    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    # Run agent
    try:
        asyncio.run(agent.run())
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    main()
