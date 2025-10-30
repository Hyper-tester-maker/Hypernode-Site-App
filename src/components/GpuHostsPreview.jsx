import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Copy, Check, AlertCircle } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const GpuHostsPreview = () => {
  const { publicKey, connected } = useWallet();
  const { toast } = useToast();
  const [hosts, setHosts] = useState([]);
  const [copied, setCopied] = useState(false);

  const apiEndpoint = import.meta.env.VITE_NODE_API_ENDPOINT || 'http://localhost:3001';

  // Fetch registered GPU hosts
  const fetchHosts = async () => {
    if (!connected || !publicKey) {
      setHosts([]);
      return;
    }

    try {
      const response = await fetch(
        `${apiEndpoint}/api/gpu/hosts?wallet=${publicKey.toString()}`
      );
      if (response.ok) {
        const data = await response.json();
        setHosts(data);
      }
    } catch (error) {
      console.error('Error fetching GPU hosts:', error);
    }
  };

  // Poll every 10 seconds
  useEffect(() => {
    if (connected && publicKey) {
      fetchHosts();
      const interval = setInterval(fetchHosts, 10000);
      return () => clearInterval(interval);
    }
  }, [connected, publicKey]);

  // Format last seen date
  const formatLastSeen = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);

    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  // Python script to display
  const getPythonScript = () => {
    const walletAddress = publicKey ? publicKey.toString() : 'YOUR_WALLET_ADDRESS';
    return `#!/usr/bin/env python3
import subprocess, socket, requests, platform, argparse, json

def get_gpu_info():
    gpus = []
    try:
        out = subprocess.check_output([
            "nvidia-smi",
            "--query-gpu=name,memory.total,driver_version",
            "--format=csv,noheader,nounits"
        ]).decode().strip().splitlines()
        for line in out:
            name, mem, driver = [x.strip() for x in line.split(",")]
            gpus.append({
                "name": name,
                "memory_mb": int(mem),
                "driver": driver
            })
    except Exception:
        gpus.append({"name": "no-nvidia-smi", "memory_mb": 0, "driver": "unknown"})
    return gpus

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--wallet", required=True)
    parser.add_argument("--api", default="https://hypernodesolana.org/api/gpu/register")
    args = parser.parse_args()

    payload = {
        "wallet": args.wallet,
        "hostname": socket.gethostname(),
        "gpus": get_gpu_info(),
        "os": platform.platform(),
        "ip": None
    }
    r = requests.post(args.api, json=payload, timeout=5)
    print("status:", r.status_code)
    print(r.text)

if __name__ == "__main__":
    main()`;
  };

  const getCommand = () => {
    const walletAddress = publicKey ? publicKey.toString() : 'YOUR_WALLET_ADDRESS';
    return `python3 gpu_probe.py --wallet ${walletAddress}`;
  };

  // Copy script to clipboard
  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(getPythonScript());
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Script copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please copy manually',
        variant: 'destructive',
      });
    }
  };

  // Copy command to clipboard
  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(getCommand());
      toast({
        title: 'Copied!',
        description: 'Command copied to clipboard',
      });
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please copy manually',
        variant: 'destructive',
      });
    }
  };

  if (!connected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 shadow-lg hover-glow"
      >
        <div className="flex items-center mb-4">
          <Cpu className="text-cyan-400 mr-3" />
          <h3 className="text-xl font-semibold text-gray-200">GPU Hosts (Preview)</h3>
        </div>
        <div className="flex items-center space-x-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <AlertCircle className="text-yellow-400 flex-shrink-0" />
          <p className="text-yellow-200">
            Connect your Solana wallet to register a GPU host.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 shadow-lg hover-glow"
    >
      <div className="flex items-center mb-4">
        <Cpu className="text-cyan-400 mr-3" />
        <h3 className="text-xl font-semibold text-gray-200">GPU Hosts (Preview)</h3>
      </div>
      <p className="text-sm text-gray-400 mb-6">
        Register your GPU-enabled machines and see them here in real time.
      </p>

      {/* Registered GPUs Table */}
      <div className="mb-6 bg-black/20 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4">
        <h4 className="text-md font-semibold text-gray-200 mb-3">Your Registered GPUs</h4>

        {hosts.length === 0 ? (
          <div className="text-center py-8">
            <Cpu className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              No GPUs registered yet. Run the script below to register your first GPU.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-cyan-500/30 hover:bg-transparent">
                  <TableHead className="text-cyan-400">Hostname</TableHead>
                  <TableHead className="text-cyan-400">GPU Model</TableHead>
                  <TableHead className="text-cyan-400">Memory</TableHead>
                  <TableHead className="text-cyan-400">Last Seen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hosts.map((host, index) => {
                  const firstGpu = host.gpus && host.gpus.length > 0 ? host.gpus[0] : null;
                  return (
                    <TableRow
                      key={index}
                      className="border-cyan-500/20 hover:bg-cyan-500/5"
                    >
                      <TableCell className="font-mono text-sm text-gray-300">
                        {host.hostname}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {firstGpu ? firstGpu.name : 'Unknown'}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {firstGpu && firstGpu.memory_mb
                          ? `${Math.round(firstGpu.memory_mb / 1024)} GB`
                          : '-'}
                      </TableCell>
                      <TableCell className="text-gray-400 text-sm">
                        {formatLastSeen(host.lastSeen)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Registration Script */}
      <div className="bg-black/20 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-md font-semibold text-gray-200">Registration Script</h4>
          <Button
            size="sm"
            variant="ghost"
            onClick={copyScript}
            className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy Script
              </>
            )}
          </Button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-2">
              1. Save this as <code className="text-cyan-400">gpu_probe.py</code>
            </p>
            <div className="bg-black/40 rounded-lg p-3 overflow-x-auto max-h-48 overflow-y-auto">
              <pre className="text-xs text-gray-300 font-mono">
                {getPythonScript()}
              </pre>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">
              2. Run this command on your GPU machine:
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-black/40 rounded-lg p-3">
                <code className="text-sm text-cyan-400 font-mono break-all">
                  {getCommand()}
                </code>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={copyCommand}
                className="flex-shrink-0 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Requirements: Python 3, <code className="text-cyan-400">nvidia-smi</code>, <code className="text-cyan-400">requests</code> library
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default GpuHostsPreview;
