import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const Contact = () => {

  return <>
      <Helmet>
        <title>Contact - Get in Touch with HYPERNODE</title>
        <meta name="description" content="Contact the HYPERNODE team for partnerships, technical support, or press inquiries. Find answers to frequently asked questions." />
      </Helmet>

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Get in Touch</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We'd love to hear from you. Reach out for partnerships, support, or just to say hello.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 mb-20">
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.3
          }} className="space-y-8">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-purple-400 mb-6">Partnerships & Grants</h2>
                <p className="text-gray-300 mb-6">
                  Interested in collaborating with HYPERNODE? We're actively seeking partnerships with research institutions, enterprises, and blockchain projects.
                </p>
                <p className="text-gray-300">
                  We also offer grants for developers building innovative applications on our network. Contact us to learn more about funding opportunities.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-green-400 mb-4">Direct Contact</h2>
                <p className="text-gray-300 mb-2">
                  <span className="text-cyan-400 font-semibold">Email:</span> contact@hypernodesolana.org
                </p>
                <p className="text-gray-300">
                  <span className="text-cyan-400 font-semibold">Response Time:</span> 8-12h
                </p>
              </div>
            </motion.div>
          </div>

          <section>
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Briefcase className="text-cyan-400 mr-3" size={40} />
                <h2 className="text-4xl font-bold gradient-text">Join the Team</h2>
              </div>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                We're looking for talented individuals to help us build the future of decentralized computing. Check out our open positions below.
              </p>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="bg-gradient-to-br from-cyan-500/5 to-blue-600/5 border border-cyan-500/20 rounded-xl p-8 text-center mb-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Open Position: Marketing & Community Team for Web3/AI Project</h3>
              <p className="text-gray-400">We’re building Hypernode, a decentralized AI and compute network on Solana, turning idle computing power into an intelligent and incentivized global infrastructure.

We’re looking for a Marketing & Community Team (or individuals) to lead our social media, content, and community operations.</p>
              <p className="text-gray-400 mt-4">
                Find more details and apply here: <a href="https://www.upwork.com/jobs/~021981717667401234640" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Upwork Job Posting</a>
              </p>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="bg-gradient-to-br from-purple-500/5 to-pink-600/5 border border-purple-500/20 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Computer Vision Developer for AI Telemetry Dashboard</h3>
              <p className="text-gray-400">oin us in building a telemetry dashboard for Hypernode, a decentralized AI network. You'll design visual intelligence layers using computer vision and AI-driven visualization to make complex computations visible and interactive.</p>
              <p className="text-gray-400 mt-4">
                Find more details and apply here: <a href="https://www.upwork.com/jobs/~021981437191134502561" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Upwork Job Posting</a>
              </p>
            </motion.div>
          </section>
        </div>
      </div>
    </>;
};
export default Contact;