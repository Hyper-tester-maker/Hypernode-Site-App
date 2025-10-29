
import { useState, useEffect } from 'react';

// This hook simulates fetching network statistics.
export const useNetworkStats = () => {
  const [stats, setStats] = useState({
    computationsPerSecond: 0,
    activeNodes: 10,
    activeGPU: 8,
    activeCPU: 2,
    rewardsDistributed: 125000,
    totalTransactions: 1500000,
    liquidityPools: 2500000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        // Simulate fluctuating computation values
        computationsPerSecond: 190 + Math.random() * 20,
        // Simulate growing rewards
        rewardsDistributed: prevStats.rewardsDistributed + Math.random() * 100,
        // Simulate growing transactions
        totalTransactions: prevStats.totalTransactions + Math.floor(Math.random() * 10),
        // Simulate fluctuating liquidity
        liquidityPools: prevStats.liquidityPools + (Math.random() * 1000 - 500),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};
