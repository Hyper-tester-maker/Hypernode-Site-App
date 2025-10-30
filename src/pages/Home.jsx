import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, HardDrive, Code, UserCheck } from 'lucide-react';
import NetworkBackground from '@/components/NetworkBackground';

const Home = () => {

  const handleWhitepaper = () => {
    window.open('https://github.com/Hypernode-sol/Whitepaper', '_blank');
  };
  const handleJoinNetwork = () => {
    window.open('https://github.com/Hypernode-sol/Network-and-Communication-Infrastructure', '_blank');
  };

  const personas = [
    {
      icon: <HardDrive size={32} className="text-black" />,
      title: "For Device Owners",
      description: "Monetize your unused compute-resources.",
    },
    {
      icon: <Code size={32} className="text-black" />,
      title: "For Developers & Researchers",
      description: "Deploy large-scale AI and scientific workloads with ease and scalability.",
    },
    {
      icon: <UserCheck size={32} className="text-black" />,
      title: "For the Community",
      description: "Participate in a truly open ecosystem built for performance, fairness and innovation.",
    },
  ];

  const exchanges = [
    { name: 'Binance Dex', url: 'https://web3.binance.com/en/token/sol/92s9qna3djkMncZzkacyNQ38UKnNXZFh4Jgqe3Cmpump', logo: 'https://horizons-cdn.hostinger.com/1e54f271-6c35-4f84-9c56-0768238922fb/8b59ed7f120cd607b9e764787d68d81a.webp' },
    { name: 'Uniswap', url: 'https://app.uniswap.org/explore/tokens/solana/92s9qna3djkMncZzkacyNQ38UKnNXZFh4Jgqe3Cmpump?inputCurrency=NATIVE', logo: 'https://horizons-cdn.hostinger.com/1e54f271-6c35-4f84-9c56-0768238922fb/8a8ecbd08d1876a018a66928e48e9e07.webp' },
    { name: 'MEXC', url: 'https://www.mexc.com/es/dex/trade?pair_ca=B8uTD3RSYHbhXBKSfSurxBcipnUJKZjQRJiYjqX2JqZu&chain_id=100000&token_ca=92s9qna3djkMncZzkacyNQ38UKnNXZFh4Jgqe3Cmpump&from=search', logo: 'https://horizons-cdn.hostinger.com/1e54f271-6c35-4f84-9c56-0768238922fb/9a9f5a72eb8cb18b26a8a150cbb88495.webp' },
  ];

  return (
    <>
      <Helmet>
        <title>HYPERNODE — Harnessing Global Computing Power</title>
        <meta name="description" content="HYPERNODE is a global, decentralized computing network that unlocks idle processing capacity across devices. An embedded AI-agent orchestrates tasks worldwide, while a transparent blockchain-based incentive layer ensures secure, auditable rewards." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "HYPERNODE",
              "url": "https://hypernodesolana.org",
              "logo": "https://horizons-cdn.hostinger.com/1e54f271-6c35-4f84-9c56-0768238922fb/27dd0eef97ff29791c8c57e6b192dd95.png",
              "description": "A global, decentralized computing network that unlocks idle processing power."
            }
          `}
        </script>
      </Helmet>

      <div className="relative min-h-screen">
        <NetworkBackground />
        
        <section className="relative pt-32 pb-20 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
                HYPERNODE — Harnessing<br />Global Computing Power
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                HYPERNODE is a global, decentralized computing network that unlocks idle processing capacity across devices. An embedded AI-agent orchestrates tasks worldwide, while a transparent blockchain-based incentive layer ensures secure, auditable rewards.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                <Button onClick={handleWhitepaper} size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
                  Read Whitepaper
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button onClick={handleJoinNetwork} size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                  Join the Network
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-10 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"
            >
              <span className="font-semibold text-gray-300 text-lg">Buy $HYPER:</span>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {exchanges.map((exchange) => (
                  <a
                    key={exchange.name}
                    href={exchange.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buy on ${exchange.name}`}
                    className="zoom-logo"
                  >
                    <img src={exchange.logo} alt={exchange.name} className="h-24 md:h-28 object-contain" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-20 px-4 bg-gradient-to-b from-transparent to-black/50">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                An Open Ecosystem
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">HYPERNODE is built for everyone. Find your place in the future of decentralized computing.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {personas.map((persona, index) => (
                <motion.div
                  key={persona.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  className="bg-gradient-to-br from-cyan-500/5 to-blue-600/5 border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/50 transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                    {persona.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-cyan-400">{persona.title}</h3>
                  <p className="text-gray-400">
                    {persona.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Home;