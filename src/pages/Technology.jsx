import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Cpu, Network, Shield, Zap, Code, CheckCircle, GitBranch, ArrowRight, BrainCircuit, Layers, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Technology = () => {
  const architectureLayers = [
    { 
      name: 'AI Coordination Layer', 
      icon: <BrainCircuit size={32} />, 
      color: 'from-cyan-400 to-blue-500',
      description: 'An intelligent agent orchestrates tasks, matching workloads with the best nodes for optimal performance and efficiency.'
    },
    { 
      name: 'Blockchain Verification Layer', 
      icon: <Shield size={32} />, 
      color: 'from-blue-500 to-purple-500',
      description: 'Leverages Solana to provide a transparent, immutable ledger for verifying task completion and distributing rewards fairly.'
    },
    { 
      name: 'Distributed Compute Fabric', 
      icon: <Cpu size={32} />, 
      color: 'from-purple-500 to-pink-500',
      description: 'A global network of idle devices (CPUs, GPUs) that provides the raw power for executing complex computational jobs.'
    }
  ];

  const keyModules = [
    {
      name: 'x402 Agent Module',
      description: 'Our specialized intelligence engine for orchestrating large-language-model (LLM) deployment and distributed AI tasks.'
    },
    {
      name: 'LLM Deploy Platform',
      description: 'Deploy, monitor and scale your models across the network with automated provisioning and load-balancing.'
    }
  ];

  const components = [
    { component: 'Hypernode-Miner', func: 'Executes tasks and submits proofs', benefit: 'Allows anyone to contribute power and earn rewards.' },
    { component: 'Virtual-Agent', func: 'AI orchestrator for job allocation', benefit: 'Maximizes network efficiency and task success rates.' },
    { component: 'Reward-Distribution-Manager', func: 'Manages staking and payments on Solana', benefit: 'Ensures fair, transparent, and timely rewards.' },
    { component: 'Hypernode-line', func: 'CLI and SDK for developers', benefit: 'Simplifies deployment and interaction with the network.' },
    { component: 'Hypernode-Dashboard', func: 'Visualization and analytics layer', benefit: 'Provides real-time insights into network performance.' },
  ];

  const handleCoreRepositoriesClick = () => {
    window.open('https://github.com/Hypernode-sol?tab=repositories', '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Technology - How HYPERNODE Works</title>
        <meta name="description" content="Explore HYPERNODE's revolutionary architecture: an AI Coordination Layer, a Blockchain Verification Layer, and a Distributed Compute Fabric." />
      </Helmet>

      <div className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">How HYPERNODE Works</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A revolutionary architecture combining blockchain, AI, and distributed computing
            </p>
          </motion.div>

          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-cyan-400">Architecture Overview</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {architectureLayers.map((layer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-cyan-500/5 to-blue-600/5 border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/50 transition-all"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${layer.color} rounded-lg flex items-center justify-center mb-6 text-black`}>
                    {layer.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-cyan-400">{layer.name}</h3>
                  <p className="text-gray-400">{layer.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-12"
            >
              <div className="flex items-center mb-6">
                <Layers className="text-purple-400 mr-4" size={40} />
                <h2 className="text-4xl font-bold text-purple-400">Key Modules</h2>
              </div>
              <div className="space-y-8">
                {keyModules.map((mod, index) => (
                  <div key={index}>
                    <h3 className="text-2xl font-bold text-white mb-2">{mod.name}</h3>
                    <p className="text-lg text-gray-300 leading-relaxed">{mod.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/20 to-black/20 border border-gray-700/50 rounded-2xl p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                  <Database className="text-cyan-400 mr-4" size={40} />
                  <h2 className="text-4xl font-bold text-cyan-400">Core Components</h2>
                </div>
                <Button 
                  onClick={handleCoreRepositoriesClick}
                  variant="outline" 
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                >
                  Explore on GitHub
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-700/50">
                <table className="w-full text-left">
                  <thead className="bg-black/30">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-cyan-400 tracking-wider">Component</th>
                      <th className="p-4 text-sm font-semibold text-cyan-400 tracking-wider">Function</th>
                      <th className="p-4 text-sm font-semibold text-cyan-400 tracking-wider">Benefit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {components.map((comp, index) => (
                      <tr key={index} className="hover:bg-cyan-900/20 transition-colors">
                        <td className="p-4 font-mono text-sm text-white whitespace-nowrap">
                          <strong>{comp.component}</strong>
                        </td>
                        <td className="p-4 text-gray-300">{comp.func}</td>
                        <td className="p-4 text-gray-300">{comp.benefit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Technology;