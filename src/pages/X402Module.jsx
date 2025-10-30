import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Cpu, Zap, CheckCircle, ArrowRight, ShoppingCart, Bot, BadgeDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const FeatureCard = ({ icon, title, description, comingSoon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 shadow-lg h-full flex flex-col hover-glow"
    >
      {comingSoon && (
        <div className="absolute top-4 right-4 bg-cyan-500/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full">
          Coming Soon
        </div>
      )}
      <div className="flex-shrink-0 mb-6 text-cyan-400">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed flex-grow">{description}</p>
    </motion.div>
  );
};

const X402Module = () => {
  const { toast } = useToast();

  const handleLearnMore = () => {
    window.open('https://github.com/Hypernode-sol/Hypernode-facilitator/wiki', '_blank');
  };
  
  const handleNotifyClick = () => {
    toast({
      title: '🚧 Feature Coming Soon!',
      description: 'The waitlist integration will be available shortly. Stay tuned! 🚀',
    });
  };

  const featuredCapabilities = [
    {
      icon: <ShoppingCart size={40} />,
      title: "Agent & Service Marketplace",
      description: "Soon, Hypernode's Hyper Agent, operating on ElizaOS, will use the payai-plugin to orchestrate a global marketplace for computational power. Smart agents will announce services (rendering, GPU-nodes, distributed nodes, LLMs), and users can hire, pay, and execute jobs automatically.",
    },
    {
      icon: <BadgeDollarSign size={40} />,
      title: "Native Payments with x402 Token",
      description: "The x402 layer will enable programmable payments between agents, users, and Hypernode network nodes. Using ElizaOS + payai-plugin, the Hyper Agent will manage contracts, settlements, and services at scale. Accept or pay in x402 or partner tokens—all automated.",
    },
    {
      icon: <Bot size={40} />,
      title: "Autonomous Intelligent Agents",
      description: "Hypernode's Hyper Agent, based on ElizaOS and powered by the payai-plugin, will coordinate a distributed network of agents—negotiating, hiring, executing tasks, and scaling jobs end-to-end autonomously.",
    }
  ];

  return (
    <>
      <Helmet>
        <title>x402 Module - HYPERNODE</title>
        <meta name="description" content="Explore the x402 Module, HYPERNODE's core engine for verifiable, confidential, and high-performance distributed computing." />
      </Helmet>

      <div className="pt-28 pb-20 px-4 min-h-screen bg-black">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">x402 Module</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The core engine for verifiable, confidential, and high-performance distributed computing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 shadow-lg hover-glow"
            >
              <div className="flex items-center mb-6">
                <Cpu className="text-cyan-400 mr-3" size={28} />
                <h2 className="text-3xl font-bold text-cyan-400">Technical Explanation</h2>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                The x402 Module is a specialized WebAssembly (WASM) runtime, sandboxed for security and optimized for performance. It enables hardware-agnostic execution of computational tasks, ensuring that code runs identically across any node in the HYPERNODE network, from high-end GPUs to standard CPUs.
              </p>
              <p className="text-gray-300 leading-relaxed">
                It integrates cryptographic primitives for Zero-Knowledge Proofs (ZKPs), allowing for verifiable computation without revealing the underlying data. This makes it ideal for confidential computing tasks in AI, finance, and research.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 shadow-lg hover-glow"
            >
              <div className="flex items-center mb-6">
                <Zap className="text-cyan-400 mr-3" size={28} />
                <h2 className="text-3xl font-bold text-cyan-400">Key Features</h2>
              </div>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-400 mr-3 mt-1" />
                  <div>
                    <strong>Verifiable Execution:</strong> Generates proofs of correct computation.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-400 mr-3 mt-1" />
                  <div>
                    <strong>Confidential Computing:</strong> Supports ZKPs for data privacy.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-400 mr-3 mt-1" />
                  <div>
                    <strong>Deterministic Runtime:</strong> Guarantees identical outputs on any hardware.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-400 mr-3 mt-1" />
                  <div>
                    <strong>High Performance:</strong> Near-native speed with low overhead.
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
          
          {/* Featured Capabilities Section */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Featured Capabilities</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* (Placeholder: integrate ElizaOS + plugin-payai on the backend when available) */}
              {featuredCapabilities.map((feature, index) => (
                <FeatureCard key={index} {...feature} comingSoon />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Button
                onClick={handleNotifyClick}
                size="lg"
                className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
              >
                I want to be notified
              </Button>
              <p className="text-gray-500 text-sm mt-6 max-w-xl mx-auto">
                Preparing the official launch of the x402 layer and the Hypernode marketplace. Stay tuned—big news is coming.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-6 gradient-text">Dive Deeper into x402</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore the full technical documentation, source code, and implementation details on our GitHub.
            </p>
            <Button
              onClick={handleLearnMore}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            >
              Learn More
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default X402Module;