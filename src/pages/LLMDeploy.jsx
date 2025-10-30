import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { List, Server, Clock, Users, Mail, BrainCircuit } from 'lucide-react';

const LLMDeploy = () => {

  const deployedModels = [
    { name: 'GPT-OSS Model 20B', version: '1.0', status: 'Active', jobs: 12, latency: '180ms' },
    { name: 'Deep Seek-R1 Qwen 7B', version: '1.0', status: 'Active', jobs: 92, latency: '130ms' },
    { name: 'Ollama 4B', version: '1.0', status: 'Active', jobs: 57, latency: '90ms' },
  ];

  return (
    <>
      <Helmet>
        <title>LLM Deployment - HYPERNODE</title>
        <meta name="description" content="Deploy and manage Large Language Models (LLMs) on the HYPERNODE decentralized network for scalable and efficient inference." />
      </Helmet>

      <div className="pt-28 pb-20 px-4 min-h-screen bg-black">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">LLM Deployment</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Deploy and manage your Large Language Models on a global, decentralized infrastructure.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 shadow-lg hover-glow flex flex-col justify-center items-center text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
              <Mail className="text-cyan-400 mb-4" size={40} />
              <h2 className="text-3xl font-bold text-cyan-400 mb-4">Want to deploy a model?</h2>
              <p className="text-gray-300 mb-4">
                To deploy your own Large Language Model on the HYPERNODE network, please get in touch with our team.
              </p>
              <a href="mailto:contact@hypernodesolana.org" className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:brightness-125 transition">
                contact@hypernodesolana.org
              </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <List className="text-cyan-400 mr-3" size={28} />
              <h2 className="text-3xl font-bold text-cyan-400">Available Models</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deployedModels.map((model) => (
                <div key={model.name} className="bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 shadow-lg hover-glow-sm transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{model.name}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${model.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {model.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-400"><Server size={16} className="mr-2 text-cyan-400" /> Version: <span className="text-white ml-1">{model.version}</span></div>
                    <div className="flex items-center text-gray-400"><Users size={16} className="mr-2 text-cyan-400" /> Applications/Jobs: <span className="text-white ml-1">{model.jobs}</span></div>
                    <div className="flex items-center text-gray-400"><Clock size={16} className="mr-2 text-cyan-400" /> Avg. Latency: <span className="text-white ml-1">{model.latency}</span></div>
                  </div>
                </div>
              ))}
               <div className="bg-black/20 backdrop-blur-sm border border-dashed border-cyan-500/30 rounded-2xl p-6 shadow-lg flex justify-center items-center text-center">
                  <div className="flex items-center">
                    <BrainCircuit size={20} className="text-cyan-400 mr-3" />
                    <h3 className="text-xl font-bold text-cyan-400">More models coming soon...</h3>
                  </div>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LLMDeploy;