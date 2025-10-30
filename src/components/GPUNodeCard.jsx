import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import {
  Cpu,
  HardDrive,
  Activity,
  CheckCircle,
  XCircle,
  Trash2,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import api from '@/services/api';

const GPUNodeCard = ({ node, onNodeRemoved }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const { publicKey } = useWallet();
  const { toast } = useToast();

  const isOnline = node.status === 'online';

  const handleRemove = async () => {
    if (!publicKey) return;

    try {
      setIsRemoving(true);
      await api.deregisterNode(node.nodeId, publicKey.toBase58());

      toast({
        title: 'Node Removed',
        description: 'Your GPU node has been deregistered successfully.',
      });

      if (onNodeRemoved) {
        onNodeRemoved(node.nodeId);
      }
    } catch (error) {
      console.error('Error removing node:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove node. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <Cpu className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{node.gpuModel}</h3>
            <p className="text-sm text-gray-400">
              {node.vram ? `${node.vram} GB VRAM` : 'Unknown VRAM'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isOnline ? (
            <div className="flex items-center gap-1 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              Online
            </div>
          ) : (
            <div className="flex items-center gap-1 text-red-400 text-sm">
              <XCircle className="w-4 h-4" />
              Offline
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-black/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-purple-400" />
            <p className="text-xs text-gray-400">Jobs Completed</p>
          </div>
          <p className="text-lg font-bold text-white">{node.jobsCompleted || 0}</p>
        </div>

        <div className="bg-black/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-green-400" />
            <p className="text-xs text-gray-400">Total Earned</p>
          </div>
          <p className="text-lg font-bold text-white">
            {(node.totalEarned || 0).toFixed(2)} HYPER
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between text-gray-400">
          <span>Driver:</span>
          <span className="text-gray-300">{node.driverVersion || 'Unknown'}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>CUDA:</span>
          <span className="text-gray-300">{node.cudaVersion || 'Unknown'}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>OS:</span>
          <span className="text-gray-300">{node.hostOS || 'Unknown'}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Location:</span>
          <span className="text-gray-300">
            {node.location?.city || 'Unknown'}, {node.location?.country || 'Unknown'}
          </span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Reputation:</span>
          <span className="text-green-400 font-semibold">{node.reputation || 100}/100</span>
        </div>
      </div>

      {/* Capabilities */}
      {node.capabilities && node.capabilities.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-2">Capabilities:</p>
          <div className="flex flex-wrap gap-2">
            {node.capabilities.map((cap, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-500/30"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Timestamps */}
      <div className="text-xs text-gray-500 mb-4">
        <p>Registered: {new Date(node.registeredAt).toLocaleDateString()}</p>
        <p>Last Update: {new Date(node.lastUpdate).toLocaleString()}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={handleRemove}
          disabled={isRemoving}
          variant="outline"
          size="sm"
          className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {isRemoving ? 'Removing...' : 'Remove Node'}
        </Button>
      </div>
    </motion.div>
  );
};

export default GPUNodeCard;
