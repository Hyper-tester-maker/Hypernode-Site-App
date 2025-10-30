import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Activity, Shield, ArrowRight, Cpu, Database, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NetworkBackground from '@/components/NetworkBackground';

const FeatureCard = ({ icon: Icon, title, description, link, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="group relative"
  >
    <Link to={link}>
      <div className="bg-gradient-to-br from-gray-900/90 to-black border border-cyan-500/30 rounded-xl p-8 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 h-full">
        <div className="p-3 bg-cyan-500/10 rounded-lg w-fit mb-4 group-hover:bg-cyan-500/20 transition-colors">
          <Icon className="w-8 h-8 text-cyan-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 mb-4 leading-relaxed">{description}</p>
        <div className="flex items-center text-cyan-400 font-medium group-hover:translate-x-2 transition-transform">
          Explore <ArrowRight className="ml-2 w-4 h-4" />
        </div>
      </div>
    </Link>
  </motion.div>
);

const StatBadge = ({ icon: Icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-lg p-4 flex items-center gap-3"
  >
    <div className="p-2 bg-cyan-500/10 rounded-lg">
      <Icon className="w-5 h-5 text-cyan-400" />
    </div>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  </motion.div>
);

const Home = () => {
  return (
    <>
      <Helmet>
        <title>HYPERNODE - Distributed GPU Compute Network</title>
        <meta
          name="description"
          content="Decentralized GPU compute marketplace on Solana. Connect your GPU to earn HYPER tokens or access distributed computing power for AI workloads."
        />
      </Helmet>

      <div className="relative min-h-screen bg-black">
        <NetworkBackground />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <img
                  src="https://horizons-cdn.hostinger.com/1e54f271-6c35-4f84-9c56-0768238922fb/27dd0eef97ff29791c8c57e6b192dd95.png"
                  alt="HYPERNODE Logo"
                  className="h-20 w-20 mx-auto mb-4 object-contain"
                />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="glow-text">HYPERNODE</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
                Distributed GPU Compute Network on Solana
              </p>

              <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                Connect your idle GPU to earn rewards or access distributed computing power for
                AI, LLM inference, fine-tuning, and more.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link to="/app">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 text-lg px-8 py-6"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Launch App
                  </Button>
                </Link>
                <Link to="/validation">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 text-lg px-8 py-6"
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    View Metrics
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <StatBadge icon={Cpu} label="Network" value="GPU Powered" delay={0.2} />
                <StatBadge icon={Database} label="Blockchain" value="Solana" delay={0.3} />
                <StatBadge icon={TrendingUp} label="Token" value="$HYPER" delay={0.4} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-transparent to-black/50">
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                Explore the Network
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Access powerful tools to manage nodes, monitor network activity, and verify
                transactions on-chain.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Zap}
                title="App"
                description="Register your GPU nodes, manage your assets, view your SOL and HYPER balances, and start earning rewards."
                link="/app"
                delay={0.4}
              />

              <FeatureCard
                icon={Activity}
                title="Dashboard"
                description="Monitor active nodes, network statistics, GPU distribution, and real-time compute activity across the network."
                link="/dashboard"
                delay={0.5}
              />

              <FeatureCard
                icon={Shield}
                title="Validation"
                description="Public validation page with on-chain metrics, job receipts, transparency reports, and blockchain verification."
                link="/validation"
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Connect your Solana wallet and register your GPU to start earning HYPER tokens on
                the decentralized compute network.
              </p>
              <Link to="/app">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 text-lg px-8 py-6"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Connect Wallet
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer Info */}
        <section className="relative py-12 px-4 border-t border-cyan-500/10">
          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center text-sm text-gray-500">
              <p className="mb-2">
                <span className="text-cyan-400 font-semibold">$HYPER Token:</span>{' '}
                92s9qna3djkMncZzkacyNQ38UKnNXZFh4Jgqe3Cmpump
              </p>
              <p>Built on Solana • Powered by HYPER • Made for the Future</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
