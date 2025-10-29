import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, Award, Check, Cpu, BrainCircuit, ShieldCheck, Box, Package, CircleDollarSign } from 'lucide-react';

const Economy = () => {
  const howItWorks = [
    { icon: <Cpu size={24} />, title: 'Contribution', description: 'You provide compute capacity, deploy models or maintain the network.' },
    { icon: <ShieldCheck size={24} />, title: 'Verification', description: 'Contributions are validated via blockchain consensus and the AI-agent checks for task-completion, reliability and performance.' },
    { icon: <Award size={24} />, title: 'Reward', description: 'Participants receive tokens (or credit) based on their verified contribution and network demand.' }
  ];

  const participantRoles = [
    { role: 'Node Operator', contribution: 'Provides CPU/GPU computing power', reward: 'Tokens per completed task + uptime bonuses' },
    { role: 'Model Deployer', contribution: 'Submits AI/LLM models for inference', reward: 'Revenue share from model usage' },
    { role: 'Staker', contribution: 'Stakes $HYPER to secure a node or model', reward: 'Percentage of rewards from the staked entity' },
    { role: 'Validator', contribution: 'Runs a validator node to secure the network', reward: 'Network transaction fees and inflation rewards' },
  ];

  const tokenomicsHighlights = [
    'Fixed/capped supply',
    'Dynamic reward pool',
    'Transparent distribution schedule',
    'Governance rights for token holders'
  ];

  return (
    <>
      <Helmet>
        <title>HYPERNODE Economy: Incentive, Reward & Grow</title>
        <meta name="description" content="In the HYPERNODE economy, everyone contributes — and everyone benefits. Node-operators offer compute power, model-deployers bring AI workloads, and the network rewards participation via transparent, on-chain incentives." />
      </Helmet>

      <div className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">HYPERNODE Economy</h1>
            <p className="text-2xl font-bold text-white mb-4">Incentive, Reward & Grow</p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              In the HYPERNODE economy, everyone contributes — and everyone benefits. Node-operators offer compute power, model-deployers bring AI workloads, and the network rewards participation via transparent, on-chain incentives.
            </p>
          </motion.div>

          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-cyan-400">How It Works</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-10 text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-black">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-purple-400">Participant Roles</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-800/20 to-black/20 border border-purple-700/50 rounded-2xl p-8 max-w-5xl mx-auto"
            >
              <div className="overflow-x-auto rounded-lg">
                <table className="w-full text-left">
                  <thead className="bg-black/30">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-purple-400 tracking-wider">Role</th>
                      <th className="p-4 text-sm font-semibold text-purple-400 tracking-wider">Contribution</th>
                      <th className="p-4 text-sm font-semibold text-purple-400 tracking-wider">Reward Mechanism</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {participantRoles.map((item, index) => (
                      <tr key={index} className="hover:bg-purple-900/20 transition-colors">
                        <td className="p-4 text-white font-bold">{item.role}</td>
                        <td className="p-4 text-gray-300">{item.contribution}</td>
                        <td className="p-4 text-gray-300">{item.reward}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </section>

          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-2xl p-12"
            >
              <div className="flex items-center mb-6">
                <CircleDollarSign className="text-green-400 mr-4" size={40} />
                <h2 className="text-4xl font-bold text-green-400">Tokenomics Highlights</h2>
              </div>
              <ul className="space-y-4 text-lg text-gray-200">
                {tokenomicsHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="text-green-400 mr-3" size={24} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </section>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-white max-w-4xl mx-auto">
              Join the HYPERNODE economy to transform spare compute into real value — and drive the next frontier of decentralized AI infrastructure.
            </h3>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Economy;