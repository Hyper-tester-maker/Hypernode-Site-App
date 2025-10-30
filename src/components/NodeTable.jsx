import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Circle } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const NodeTable = () => {
  const { publicKey, connected } = useWallet();
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiEndpoint = import.meta.env.VITE_NODE_API_ENDPOINT || 'http://localhost:3001';

  const fetchNodes = async () => {
    if (!connected || !publicKey) {
      setNodes([]);
      return;
    }

    try {
      const response = await fetch(
        `${apiEndpoint}/api/nodes/mine?wallet=${publicKey.toString()}`
      );
      if (response.ok) {
        const data = await response.json();
        setNodes(data);
      }
    } catch (error) {
      console.error('Error fetching nodes:', error);
    }
  };

  useEffect(() => {
    fetchNodes();

    // Poll every 10 seconds
    const interval = setInterval(fetchNodes, 10000);
    return () => clearInterval(interval);
  }, [connected, publicKey]);

  const getStatusInfo = (lastHeartbeat) => {
    if (!lastHeartbeat) return { text: 'Offline', color: 'text-gray-400', bgColor: 'bg-gray-500/20' };

    const now = new Date();
    const heartbeat = new Date(lastHeartbeat);
    const diffSeconds = (now - heartbeat) / 1000;

    if (diffSeconds < 30) {
      return { text: 'Online', color: 'text-green-400', bgColor: 'bg-green-500/20' };
    }
    return { text: 'Offline', color: 'text-gray-400', bgColor: 'bg-gray-500/20' };
  };

  const formatDate = (dateString) => {
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

  if (!connected) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6"
    >
      <div className="flex items-center mb-6">
        <Server className="text-cyan-400 mr-3" />
        <h3 className="text-xl font-semibold text-gray-200">My GPU Nodes</h3>
      </div>

      {nodes.length === 0 ? (
        <div className="text-center py-12">
          <Server className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">
            No nodes registered yet. Generate a token and run the command on your GPU host.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-cyan-500/30 hover:bg-transparent">
                <TableHead className="text-cyan-400">Node ID</TableHead>
                <TableHead className="text-cyan-400">Hostname</TableHead>
                <TableHead className="text-cyan-400">GPU</TableHead>
                <TableHead className="text-cyan-400">Status</TableHead>
                <TableHead className="text-cyan-400">Last heartbeat</TableHead>
                <TableHead className="text-cyan-400 text-right">Earned (HYPER)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nodes.map((node) => {
                const status = getStatusInfo(node.lastHeartbeat);
                return (
                  <TableRow
                    key={node.id}
                    className="border-cyan-500/20 hover:bg-cyan-500/5"
                  >
                    <TableCell className="font-mono text-sm text-gray-300">
                      {node.id}
                    </TableCell>
                    <TableCell className="text-gray-300">{node.hostname}</TableCell>
                    <TableCell className="text-gray-300">{node.gpu}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full ${status.bgColor}`}>
                        <Circle className={`h-2 w-2 mr-1 ${status.color} fill-current`} />
                        <span className={`text-xs font-semibold ${status.color}`}>
                          {status.text}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm">
                      {formatDate(node.lastHeartbeat)}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-green-400">
                      {node.earned ? node.earned.toFixed(2) : '0.00'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </motion.div>
  );
};

export default NodeTable;
