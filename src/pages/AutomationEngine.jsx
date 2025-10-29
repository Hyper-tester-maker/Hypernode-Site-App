import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Cpu, Briefcase, Zap, DollarSign, Puzzle, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AutomationEngine = () => {
  const { toast } = useToast();

  const handleCTA = () => {
    toast({
      title: '🚧 Feature Coming Soon!',
      description: 'The agent development and node setup plugin will be available directly on the site soon. Stay tuned! 🚀',
    });
  };

  const handleLearnMore = () => {
    toast({
      title: '🚧 Documentation Coming Soon!',
      description: 'In-depth guides and documentation for this feature are on the way. 🚀',
    });
  };

  return (
    <>
      <Helmet>
        <title>Automation Engine - HYPERNODE</title>
        <meta name="description" content="Turn your Hypernode machine into an intelligent agent. Run automations, publish agents, and monetize your compute power." />
      </Helmet>
      
      <div className="relative pt-28 pb-20 px-4 min-h-screen bg-black overflow-hidden">
        {/* Hero Banner */}
        <section className="relative text-center py-20 md:py-32">
          <div className="absolute inset-0 cyber-grid z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10"></div>
          <div className="container mx-auto relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                Hypernode Automation + Distributed Compute
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                Transform your Hypernode machine into an intelligent agent—run automations, publish your agents, and monetize your compute power.
              </p>
              <Button
                onClick={handleCTA}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Introduction / Value Proposition */}
        <section className="py-20">
          <div className="container mx-auto text-center max-w-4xl">
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed mb-6"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              Hypernode has internally absorbed an advanced vision-language-action framework, empowering our network participants with unprecedented capabilities. Now, you can run, develop, and monetize autonomous agents directly within the ecosystem.
            </motion.p>
            <motion.p 
              className="text-cyan-400 font-semibold text-xl"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            >
              All under the Hypernode brand, integrating distributed compute, the x402 token economy, and intelligent automation.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
              <a href="#how-it-works" className="mt-6 inline-block text-blue-400 hover:text-blue-300 transition">How It Works <ArrowRight className="inline-block ml-1" size={16} /></a>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Cpu size={32} />, title: "Connect Your Node", description: "Register your hardware, meet the requirements, and install the Hypernode client." },
                { icon: <Puzzle size={32} />, title: "Choose or Develop an Agent", description: "Select from the Hypernode marketplace or use our templates to build your own." },
                { icon: <Zap size={32} />, title: "Execute Tasks & Earn", description: "Run automated jobs with your agent and earn x402 tokens for your contribution." },
                { icon: <Monitor size={32} />, title: "Monitor and Publish", description: "Track performance on your dashboard, climb the rankings, and publish agents." },
              ].map((step, index) => (
                <motion.div key={index} className="bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 text-center hover-glow" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
                  <div className="text-cyan-400 mb-4 inline-block">{step.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Use Cases */}
        <section className="py-20">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text">Featured Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Monetize Idle Compute with Agents", description: "Turn your downtime into revenue by letting agents perform compute-intensive tasks on the network.", icon: <DollarSign/> },
                { title: "Intelligent Infrastructure Maintenance", description: "Deploy agents to automate node monitoring, self-healing, and infrastructure updates, ensuring maximum uptime.", icon: <Bot/> },
                { title: "Develop & Publish Specialized Agents", description: "Build custom Web3/AI agents for specialized tasks and offer them on the Hypernode ecosystem marketplace.", icon: <Puzzle/> },
              ].map((caseItem, index) => (
                <motion.div key={index} className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-8 flex flex-col hover-glow" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
                  <div className="text-purple-400 mb-4">{caseItem.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4 flex-grow">{caseItem.title}</h3>
                  <p className="text-gray-400 mb-6 flex-grow">{caseItem.description}</p>
                  <Button onClick={handleLearnMore} variant="link" className="text-purple-400 p-0 self-start">Learn More <ArrowRight className="ml-2" size={16} /></Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits by Profile */}
        <section className="py-20">
           <div className="container mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text">Benefits by Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { title: "Node Operators", icon: <Cpu />, benefits: ["Monetize idle hardware", "Earn x402 tokens automatically", "Simple setup and management"] },
                 { title: "Agent Developers", icon: <Bot />, benefits: ["Access a scalable compute network", "Easy-to-use SDK and templates", "Monetize your custom agents"] },
                 { title: "Enterprises / Clients", icon: <Briefcase />, benefits: ["Cost-effective automation services", "Access a global, distributed workforce of agents", "Secure and verifiable task execution"] }
               ].map((profile, index) => (
                 <motion.div key={index} className="bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 hover-glow" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
                   <div className="flex items-center mb-6">
                     <div className="text-cyan-400 mr-4">{profile.icon}</div>
                     <h3 className="text-2xl font-bold text-white">{profile.title}</h3>
                   </div>
                   <ul className="space-y-3">
                     {profile.benefits.map((benefit, i) => (
                       <li key={i} className="flex items-start">
                         <Zap size={16} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                         <span className="text-gray-300">{benefit}</span>
                       </li>
                     ))}
                   </ul>
                 </motion.div>
               ))}
            </div>
           </div>
        </section>
        
        {/* Final CTA Banner */}
        <section className="py-20">
          <motion.div 
            className="container mx-auto bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Ready to turn your node into an intelligent agent?</h2>
            <Button
              onClick={handleCTA}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            >
              Start Building Now
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </section>

      </div>
    </>
  );
};

export default AutomationEngine;