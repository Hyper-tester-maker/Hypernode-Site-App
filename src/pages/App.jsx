import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Droplets, Banknote, ShoppingCart, Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import BalanceCard from '@/components/BalanceCard';
import PointsCard from '@/components/PointsCard';
import GPUNodeCard from '@/components/GPUNodeCard';
import NodeRegistrationDialog from '@/components/NodeRegistrationDialog';
import api from '@/services/api';

const PlaceholderCard = ({ icon, label, detail, variant = 'green' }) => {
  const { toast } = useToast();
  const colorVariants = {
    green: 'border-green-500/30 text-green-400'
  };

  const handleClick = () => {
    toast({
      title: 'Feature Coming Soon! 🛠️',
      description: 'This functionality is under development and will be available shortly.'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative bg-black/20 backdrop-blur-sm border ${colorVariants[variant]} rounded-2xl p-6 shadow-lg h-full flex flex-col justify-between items-start`}
    >
      <div>
        <div className="flex items-center mb-4">
          {icon}
          <span className="ml-3 text-lg font-semibold text-gray-200">{label}</span>
        </div>
        <p className="text-sm text-gray-400 mb-4">{detail}</p>
      </div>
      <Button
        onClick={handleClick}
        variant="outline"
        className="w-full bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
      >
        Coming Soon
      </Button>
    </motion.div>
  );
};

const App = () => {
  const { connected, publicKey } = useWallet();
  const { toast } = useToast();
  const [nodes, setNodes] = useState([]);
  const [loadingNodes, setLoadingNodes] = useState(false);
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);

  const defiServices = [
    {
      icon: <Droplets size={24} />,
      label: 'Liquidity Pools',
      detail: 'Provide liquidity to earn rewards.'
    },
    {
      icon: <Banknote size={24} />,
      label: 'Staking',
      detail: 'Stake your tokens to secure the network.'
    },
    {
      icon: <ShoppingCart size={24} />,
      label: 'Token Services',
      detail: 'Trade tokens for computing services.'
    }
  ];

  // Fetch user's nodes when wallet is connected
  useEffect(() => {
    if (connected && publicKey) {
      fetchUserNodes();
    } else {
      setNodes([]);
    }
  }, [connected, publicKey]);

  const fetchUserNodes = async () => {
    if (!publicKey) return;

    try {
      setLoadingNodes(true);
      const response = await api.getNodesByWallet(publicKey.toBase58());
      setNodes(response.nodes || []);
    } catch (error) {
      console.error('Error fetching nodes:', error);
      // Don't show error toast on first load
    } finally {
      setLoadingNodes(false);
    }
  };

  const handleNodeRegistered = (newNode) => {
    setNodes((prev) => [newNode, ...prev]);
  };

  const handleNodeRemoved = (nodeId) => {
    setNodes((prev) => prev.filter((n) => n.nodeId !== nodeId));
  };

  return (
    <>
      <Helmet>
        <title>App - HYPERNODE</title>
        <meta
          name="description"
          content="Interact with the HYPERNODE network. Connect your device, explore DeFi services, and more."
        />
      </Helmet>

      <div className="min-h-screen bg-black text-gray-100 pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-center mb-12"
          >
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 glow-text">HYPERNODE App</h1>
              <p className="text-lg text-gray-400">Interact with the Network</p>
            </div>
            <div className="mt-6 md:mt-0">
              <WalletMultiButton className="!bg-gradient-to-r !from-cyan-500 !to-blue-600 !text-white !font-bold !py-3 !px-6 !rounded-lg !shadow-lg transition-all duration-300 transform hover:scale-105" />
            </div>
          </motion.div>

          {connected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
            >
              <div className="lg:col-span-2">
                <BalanceCard />
              </div>
              <div className="lg:col-span-1">
                <PointsCard />
              </div>
            </motion.div>
          )}

          <div className="space-y-12">
            {/* GPU Nodes Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-cyan-400 border-b-2 border-cyan-500/30 pb-2 pr-4">
                  Your GPU Nodes
                </h2>
                {connected && (
                  <Button
                    onClick={() => setRegistrationDialogOpen(true)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Register New Node
                  </Button>
                )}
              </div>

              {!connected ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-12 text-center"
                >
                  <Zap className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
                  <p className="text-gray-400 mb-6">
                    Connect your Solana wallet to register your GPU and start earning HYPER tokens
                  </p>
                  <WalletMultiButton className="!bg-gradient-to-r !from-cyan-500 !to-blue-600 !text-white !font-bold !py-3 !px-6 !rounded-lg !shadow-lg" />
                </motion.div>
              ) : loadingNodes ? (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                  <span className="ml-3 text-gray-400">Loading your nodes...</span>
                </div>
              ) : nodes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {nodes.map((node) => (
                      <GPUNodeCard
                        key={node.nodeId}
                        node={node}
                        onNodeRemoved={handleNodeRemoved}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-12 text-center"
                >
                  <Zap className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No Nodes Registered Yet
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Register your first GPU node to start earning rewards on the Hypernode network
                  </p>
                  <Button
                    onClick={() => setRegistrationDialogOpen(true)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Register Your First Node
                  </Button>
                </motion.div>
              )}
            </div>

            {/* DeFi Services Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-green-400 border-b-2 border-green-500/30 pb-2">
                DeFi & Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {defiServices.map((service, index) => (
                  <PlaceholderCard
                    key={index}
                    {...service}
                    icon={React.cloneElement(service.icon, {
                      className: 'text-green-400'
                    })}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Node Registration Dialog */}
      <NodeRegistrationDialog
        open={registrationDialogOpen}
        onOpenChange={setRegistrationDialogOpen}
        onNodeRegistered={handleNodeRegistered}
      />
    </>
  );
};

export default App;
