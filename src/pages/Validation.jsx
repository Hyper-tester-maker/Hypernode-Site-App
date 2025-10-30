import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Shield,
  Activity,
  TrendingUp,
  Database,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const StatCard = ({ icon: Icon, label, value, subtext, color = 'cyan' }) => {
  const colorClasses = {
    cyan: 'from-cyan-500/10 to-blue-600/10 border-cyan-500/30',
    green: 'from-green-500/10 to-emerald-600/10 border-green-500/30',
    purple: 'from-purple-500/10 to-pink-600/10 border-purple-500/30',
    orange: 'from-orange-500/10 to-red-600/10 border-orange-500/30'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm border rounded-xl p-6`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-black/30 rounded-lg">
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
      </div>
    </motion.div>
  );
};

const ReceiptCard = ({ receipt, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:border-cyan-500/30 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="font-mono text-sm text-gray-300">
            {receipt.jobId?.slice(0, 12)}...
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(receipt.timestamp).toLocaleDateString()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500 text-xs mb-1">Type</p>
          <p className="text-gray-300">{receipt.type || 'LLM Inference'}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Cost</p>
          <p className="text-cyan-400 font-mono">{receipt.cost || '0.00'} HYPER</p>
        </div>
      </div>

      {receipt.txSignature && (
        <a
          href={`https://solscan.io/tx/${receipt.txSignature}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          View on Solscan
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </motion.div>
  );
};

const Validation = () => {
  const [metrics, setMetrics] = useState(null);
  const [validation, setValidation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch metrics
      const metricsRes = await fetch(`${API_BASE_URL}/api/metrics`);
      if (!metricsRes.ok) throw new Error('Failed to fetch metrics');
      const metricsData = await metricsRes.json();
      setMetrics(metricsData.metrics);

      // Fetch validation data
      const validationRes = await fetch(`${API_BASE_URL}/api/metrics/validation`);
      if (!validationRes.ok) throw new Error('Failed to fetch validation data');
      const validationData = await validationRes.json();
      setValidation(validationData.validation);

      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Validation & Metrics - HYPERNODE</title>
        <meta
          name="description"
          content="Real-time network validation, on-chain metrics, and job verification for the Hypernode distributed compute network."
        />
      </Helmet>

      <div className="min-h-screen bg-black text-gray-100 pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-8 h-8 text-cyan-400" />
                  <h1 className="text-4xl md:text-5xl font-bold glow-text">
                    Network Validation
                  </h1>
                </div>
                <p className="text-lg text-gray-400">
                  Real-time metrics and on-chain verification
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      Updated: {lastUpdate.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={fetchData}
                  disabled={loading}
                  variant="outline"
                  size="sm"
                  className="border-cyan-600/50 text-cyan-300 hover:bg-cyan-600/10"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <p className="text-red-200 font-medium">Unable to fetch data</p>
                <p className="text-sm text-red-300/70">
                  {error} - Make sure the backend is running on port 3001
                </p>
              </div>
            </motion.div>
          )}

          {/* Stats Grid */}
          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard
                icon={Activity}
                label="Active Nodes"
                value={metrics.network.activeNodes || 0}
                subtext={`${metrics.network.totalNodes || 0} total registered`}
                color="cyan"
              />
              <StatCard
                icon={Database}
                label="Jobs Completed"
                value={metrics.network.completedJobs || 0}
                subtext={`${metrics.network.totalJobs || 0} total submitted`}
                color="green"
              />
              <StatCard
                icon={DollarSign}
                label="HYPER Paid"
                value={`${(metrics.network.totalHyperPaid || 0).toFixed(2)}`}
                subtext="Total network earnings"
                color="purple"
              />
              <StatCard
                icon={TrendingUp}
                label="Value Locked"
                value={`${(metrics.network.totalValueLocked || 0).toFixed(2)}`}
                subtext="SOL equivalent"
                color="orange"
              />
            </div>
          )}

          {/* Blockchain Info */}
          {validation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 bg-gradient-to-br from-gray-900/50 to-black border border-cyan-500/20 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-cyan-400" />
                Blockchain Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Network</p>
                  <p className="text-white font-medium">{validation.blockchain.network}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">HYPER Token Mint</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm text-cyan-400 bg-black/30 px-2 py-1 rounded">
                      {validation.blockchain.hyperTokenMint?.slice(0, 20)}...
                    </code>
                    <a
                      href={`https://solscan.io/token/${validation.blockchain.hyperTokenMint}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Explorer</p>
                  <a
                    href={validation.blockchain.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
                  >
                    {validation.blockchain.explorerUrl}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Last Verification</p>
                  <p className="text-white">
                    {new Date(validation.summary.lastVerificationTime).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-3">Smart Contract Programs</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Node Registry:</span>
                    <span className="text-gray-400">{validation.blockchain.programIds.nodeRegistry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Job Receipt:</span>
                    <span className="text-gray-400">{validation.blockchain.programIds.jobReceipt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment Splitter:</span>
                    <span className="text-gray-400">{validation.blockchain.programIds.paymentSplitter}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Recent On-Chain Receipts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Database className="w-6 h-6 text-green-400" />
              Recent On-Chain Receipts
            </h2>

            {validation?.recentReceipts?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {validation.recentReceipts.map((receipt, index) => (
                  <ReceiptCard key={index} receipt={receipt} index={index} />
                ))}
              </div>
            ) : (
              <div className="bg-black/40 border border-white/10 rounded-xl p-12 text-center">
                <Database className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">No on-chain receipts yet</p>
                <p className="text-sm text-gray-500">
                  Receipts will appear here as jobs are completed and settled on-chain
                </p>
              </div>
            )}
          </motion.div>

          {/* Info Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-2">About Validation</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  This page provides real-time verification of the Hypernode network. All job receipts
                  and payments are recorded on the Solana blockchain, ensuring transparency and
                  auditability. Node registration, job execution, and payment distribution are all
                  cryptographically verifiable through on-chain transactions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Validation;
