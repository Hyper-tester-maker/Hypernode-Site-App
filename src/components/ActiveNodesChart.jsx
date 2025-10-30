import React from 'react';
import { motion } from 'framer-motion';

const ActiveNodesChart = () => {
  const chartData = [
    { date: 'Oct 24', nodes: 4 },
    { date: 'Oct 25', nodes: 5 },
    { date: 'Oct 26', nodes: 6 },
    { date: 'Oct 27', nodes: 8 },
    { date: 'Oct 28', nodes: 10 },
    { date: 'Oct 29', nodes: 11 },
  ];
  const maxNodes = 15;

  return (
    <div className="w-full h-full flex flex-col justify-end p-4 bg-grid">
       <style>{`
        .bg-grid {
          background-image:
            linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .scanline::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%);
          animation: scan 2s infinite;
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
      <div className="flex-grow flex items-end space-x-4">
        {chartData.map((data, index) => (
          <div key={data.date} className="flex-1 flex flex-col items-center group relative h-full justify-end">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {data.nodes}
            </div>
            <motion.div
              className="w-full bg-cyan-900 rounded-t-md relative overflow-hidden scanline"
              initial={{ height: '0%' }}
              animate={{ height: `${(data.nodes / maxNodes) * 100}%` }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-cyan-400 to-blue-500"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: 'easeOut' }}
              />
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 filter blur-[1px]"></div>
            </motion.div>
            <span className="text-xs text-gray-400 mt-2">{data.date}</span>
          </div>
        ))}
      </div>
      <div className="w-full h-px bg-cyan-500/30 mt-2" />
    </div>
  );
};

export default ActiveNodesChart;