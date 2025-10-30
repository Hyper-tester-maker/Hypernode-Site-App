import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@solana/wallet-adapter-react';
import { useToast } from '@/components/ui/use-toast';
import CodeBlock from './CodeBlock';

const TokenGenerator = () => {
  const { publicKey, connected } = useWallet();
  const { toast } = useToast();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiEndpoint = import.meta.env.VITE_NODE_API_ENDPOINT || 'http://localhost:3001';

  const generateToken = async () => {
    if (!connected || !publicKey) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your Solana wallet first',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiEndpoint}/api/nodes/issue-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet: publicKey.toString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate token');
      }

      const data = await response.json();
      setToken(data.token);

      toast({
        title: 'Token generated successfully!',
        description: 'Use the commands below to connect your GPU host',
      });
    } catch (error) {
      toast({
        title: 'Error generating token',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const dockerCommand = token
    ? `docker run -d \\
  --name hypernode-host \\
  --restart unless-stopped \\
  --gpus all \\
  -e HN_ENDPOINT=wss://nodes.hypernodesolana.org \\
  -e HN_NODE_TOKEN=${token} \\
  ghcr.io/hypernode-sol/host:latest`
    : '';

  const pythonCommand = token
    ? `python3 agent.py \\
  --endpoint wss://nodes.hypernodesolana.org \\
  --token ${token}`
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* How it works */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 font-bold">
              1
            </div>
            <div>
              <p className="font-semibold text-gray-200">Connect your Solana wallet</p>
              <p className="text-sm text-gray-400 mt-1">Use the wallet button above</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 font-bold">
              2
            </div>
            <div>
              <p className="font-semibold text-gray-200">Generate a node token</p>
              <p className="text-sm text-gray-400 mt-1">Click the button below</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 font-bold">
              3
            </div>
            <div>
              <p className="font-semibold text-gray-200">Run the command on your GPU host</p>
              <p className="text-sm text-gray-400 mt-1">Docker or Python supported</p>
            </div>
          </div>
        </div>
      </div>

      {/* Generate token button */}
      {!connected ? (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="text-yellow-400 flex-shrink-0" />
          <p className="text-yellow-200">
            Connect your Solana wallet to register a GPU node.
          </p>
        </div>
      ) : (
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={generateToken}
            disabled={loading || !connected}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-6 text-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Key className="mr-2 h-5 w-5" />
                Generate node token
              </>
            )}
          </Button>
        </div>
      )}

      {/* Commands */}
      {token && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-3">
              Node configuration
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Run one of these commands on your GPU host machine:
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="text-sm font-semibold text-cyan-400 mb-2">Docker (Recommended)</h5>
              <CodeBlock code={dockerCommand} language="docker" />
            </div>

            <div>
              <h5 className="text-sm font-semibold text-cyan-400 mb-2">Python</h5>
              <CodeBlock code={pythonCommand} language="bash" />
              <p className="text-xs text-gray-500 mt-2">
                <a
                  href="https://github.com/hypernode-sol/host-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  View agent source on GitHub
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TokenGenerator;
