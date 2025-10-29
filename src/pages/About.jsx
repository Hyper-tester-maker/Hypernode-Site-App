import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Eye, Target, ShieldCheck, Users, Leaf, Sparkles, UserPlus } from 'lucide-react';

const About = () => {
  const values = [
    { icon: <ShieldCheck size={32} />, title: 'Security' },
    { icon: <Users size={32} />, title: 'Transparency' },
    { icon: <Leaf size={32} />, title: 'Sustainability' },
    { icon: <Sparkles size={32} />, title: 'Community-driven innovation' },
  ];

  return (
    <>
      <Helmet>
        <title>About HYPERNODE - Our Vision, Mission & Values</title>
        <meta name="description" content="To become the largest decentralized network of compute on the planet — enabling AI, scientific and high-performance workloads at unprecedented scale." />
      </Helmet>

      <div className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">About HYPERNODE</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Building the future of distributed computing
            </p>
          </motion.div>

          <div className="space-y-20">
            <motion.section
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-12"
            >
              <div className="flex items-center mb-6">
                <Eye className="text-cyan-400 mr-4" size={40} />
                <h2 className="text-4xl font-bold text-cyan-400">Vision</h2>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed italic">
                “To become the largest decentralized network of compute on the planet — enabling AI, scientific and high-performance workloads at unprecedented scale.”
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-12"
            >
              <div className="flex items-center mb-6">
                <Target className="text-purple-400 mr-4" size={40} />
                <h2 className="text-4xl font-bold text-purple-400">Mission</h2>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                At HYPERNODE, we reclaim idle computing capacity — from desktops, servers and IoT devices — and channel it into meaningful compute tasks. Our intelligent AI-agent orchestrates work across the network; our blockchain verification layer ensures integrity, transparency and rewards for participants.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 gradient-text">Values</h2>
                <p className="text-xl text-gray-400">The foundation of our decentralized network</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-cyan-500/5 to-blue-600/5 border border-cyan-500/20 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center mb-6 text-black mx-auto">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-cyan-400">{value.title}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-2xl p-12"
            >
              <div className="flex items-center mb-6">
                <UserPlus className="text-green-400 mr-4" size={40} />
                <h2 className="text-4xl font-bold text-green-400">Who Can Join?</h2>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                Whether you’re a hardware owner with spare capacity, a developer with AI models, or a researcher in need of global compute scale — HYPERNODE provides the infrastructure and incentive model to participate and thrive.
              </p>
            </motion.section>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;