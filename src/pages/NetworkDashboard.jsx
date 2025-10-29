
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Map, BarChart2, List, Filter, Users, Zap, Cpu, Activity, HardDrive } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import WorldMap from '@/components/WorldMap';
import ActiveNodesChart from '@/components/ActiveNodesChart';
import { useNetworkStats } from '@/hooks/useNetworkStats';

const StatCard = ({ icon, label, value, unit, detail, variant = 'cyan' }) => {
  const colorVariants = {
    cyan: 'border-cyan-500/30 text-cyan-400',
    purple: 'border-purple-500/30 text-purple-400',
  };
  return (
    <div className={`bg-black/20 backdrop-blur-sm border ${colorVariants[variant]} rounded-2xl p-6 shadow-lg hover-glow h-full`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {React.cloneElement(icon, { className: colorVariants[variant] })}
          <span className="ml-3 text-lg font-semibold text-gray-200">{label}</span>
        </div>
      </div>
      <div className="text-4xl font-bold text-white mb-2">
        {value}
        <span className="text-2xl text-gray-400 ml-2">{unit}</span>
      </div>
      {detail && <p className="text-sm text-gray-400">{detail}</p>}
    </div>
  );
};

const topNodes = [
  { id: 'Node-a4b8', country: 'Austria', type: 'GPU', load: 25, uptime: '99.9%', points: 123.45, activeSince: '2025-10-23', lat: 47.5162, lon: 14.5501 },
  { id: 'Node-c2d6', country: 'Austria', type: 'GPU', load: 45, uptime: '99.9%', points: 121.89, activeSince: '2025-10-23', lat: 48.2082, lon: 16.3738 },
  { id: 'Node-f8e1', country: 'Austria', type: 'CPU', load: 60, uptime: '98.5%', points: 82.11, activeSince: '2025-10-24', lat: 47.2692, lon: 11.4041 },
  { id: 'Node-g5h9', country: 'Austria', type: 'GPU', load: 85, uptime: '97.2%', points: 78.56, activeSince: '2025-10-24', lat: 46.6247, lon: 14.3053 },
  { id: 'Node-k3m4', country: 'Brazil', type: 'GPU', load: 30, uptime: '99.7%', points: 47.23, activeSince: '2025-10-25', lat: -14.2350, lon: -51.9253 },
  { id: 'Node-p9q2', country: 'United States', type: 'GPU', load: 40, uptime: '96.4%', points: 35.88, activeSince: '2025-10-26', lat: 39.8283, lon: -98.5795 },
  { id: 'Node-r5t7', country: 'New Zealand', type: 'GPU', load: 20, uptime: '100%', points: 15.32, activeSince: '2025-10-27', lat: -41.2865, lon: 174.7762 },
  { id: 'Node-s1v3', country: 'Canada', type: 'GPU', load: 15, uptime: '95.1%', points: 14.91, activeSince: '2025-10-27', lat: 56.1304, lon: -106.3468 },
  { id: 'Node-t2w4', country: 'Portugal', type: 'CPU', load: 10, uptime: '100%', points: 5.05, activeSince: '2025-10-28', lat: 39.3999, lon: -8.2245 },
  { id: 'Node-x5y1', country: 'Hong Kong', type: 'GPU', load: 5, uptime: '100%', points: 0.00, activeSince: '2025-10-28', lat: 22.3193, lon: 114.1694 },
];

const NetworkDashboard = () => {
  const { toast } = useToast();
  const [lastUpdated] = useState(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }));
  const { computationsPerSecond, activeNodes, activeGPU, activeCPU } = useNetworkStats();
  const [memoryValue, setMemoryValue] = useState(0);

  useEffect(() => {
    const randomMemory = (Math.random() * (75 - 70) + 70).toFixed(1);
    setMemoryValue(randomMemory);
  }, []);

  const handleFilterClick = () => {
    toast({
      title: '🚧 Filter Feature Coming Soon!',
      description: "You'll be able to filter nodes by country and load threshold soon! 🚀",
    });
  };

  const statsData = {
    networkSummary: [
      { icon: <Users size={24} />, label: 'Active Nodes', value: activeNodes, unit: '', detail: 'Total active providers on the network' },
      { icon: <Zap size={24} />, label: 'Active GPUs', value: activeGPU, unit: '', detail: 'Currently available for compute tasks' },
      { icon: <Cpu size={24} />, label: 'Active CPUs', value: activeCPU, unit: '', detail: 'Total CPUs available for compute tasks' },
    ],
    networkCapacity: [
      { icon: <Activity size={24} />, label: 'Computations/sec', value: (computationsPerSecond || 0).toFixed(2), unit: '', detail: 'Real-time processing power', variant: 'purple' },
      { icon: <HardDrive size={24} />, label: 'Memory', value: memoryValue, unit: 'GB', detail: 'Total RAM available', variant: 'purple' },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Network Dashboard - HYPERNODE</title>
        <meta name="description" content="Real-time network statistics for HYPERNODE, including active nodes, geographic distribution, and performance metrics." />
        <meta name="keywords" content="hypernode, network dashboard, active nodes, blockchain, decentralized computing, web3" />
        <meta property="og:title" content="Network Dashboard - HYPERNODE" />
        <meta property="og:description" content="Explore live statistics from the HYPERNODE global network." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Network Dashboard - HYPERNODE" />
        <meta name="twitter:description" content="Explore live statistics from the HYPERNODE global network." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "HYPERNODE Network Dashboard",
              "description": "Real-time network statistics for HYPERNODE, including active nodes, geographic distribution, and performance metrics.",
              "applicationCategory": "Utilities",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0"
              }
            }
          `}
        </script>
      </Helmet>

      <div className="pt-28 pb-20 px-4 min-h-screen bg-black">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Network Dashboard</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Live statistics from the HYPERNODE global network.
            </p>
          </motion.div>

          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-cyan-400 border-b-2 border-cyan-500/30 pb-2">Network Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statsData.networkSummary.map((stat, index) => <StatCard key={index} {...stat} />)}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6 text-purple-400 border-b-2 border-purple-500/30 pb-2">Network Capacity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statsData.networkCapacity.map((stat, index) => <StatCard key={index} {...stat} />)}
                 <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 shadow-lg hover-glow flex items-center justify-center">
                    <p className="text-center text-gray-400">More capacity metrics coming soon...</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 shadow-lg hover-glow"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Map className="text-cyan-400 mr-3" size={24} />
                  <h2 className="text-2xl font-bold text-cyan-400">Geographic Node Distribution</h2>
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-xs text-gray-400">Last updated: {lastUpdated} UTC</span>
                   <button onClick={handleFilterClick} className="flex items-center gap-1 text-cyan-400 hover:text-white transition text-sm">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>
              <div className="h-96 w-full flex items-center justify-center relative">
                <WorldMap nodes={topNodes} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 shadow-lg hover-glow"
            >
              <div className="flex items-center mb-4">
                <BarChart2 className="text-cyan-400 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-cyan-400">Active Nodes (Last 6 Days)</h2>
              </div>
              <div className="h-96 flex items-center justify-center">
                <ActiveNodesChart />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <List className="text-cyan-400 mr-3" size={28} />
              <h2 className="text-3xl font-bold text-cyan-400">Active Nodes</h2>
            </div>
            <div className="bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-black/50">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-cyan-400 tracking-wider">Node ID</th>
                      <th className="p-4 text-sm font-semibold text-cyan-400 tracking-wider">Country</th>
                      <th className="p-4 text-sm font-semibold text-cyan-400 tracking-wider">Type</th>
                      <th className="p-4 text-sm font-semibold text-cyan-400 tracking-wider">Uptime</th>
                      <th className="p-4 text-sm font-semibold text-cyan-400 tracking-wider">Accumulated Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {topNodes.map((node) => (
                      <tr key={node.id} className="hover:bg-cyan-900/20 transition-colors">
                        <td className="p-4 font-mono text-sm text-white">{node.id}</td>
                        <td className="p-4 text-gray-300">{node.country}</td>
                        <td className="p-4 text-gray-300">{node.type}</td>
                        <td className={`p-4 ${parseFloat(node.uptime) < 99 ? 'text-yellow-400' : 'text-green-400'}`}>{node.uptime}</td>
                        <td className="p-4 text-purple-400 font-semibold">{node.points.toFixed(2)} Points</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NetworkDashboard;
