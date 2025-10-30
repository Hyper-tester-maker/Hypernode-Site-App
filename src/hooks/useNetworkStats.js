import { useState, useEffect } from 'react';

// This hook simulates fetching network statistics.
export const useNetworkStats = () => {
  const [stats, setStats] = useState({
    computationsPerSecond: 0,
    activeNodes: 11,
    activeGPU: 9,
    activeCPU: 2,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        // Simulate fluctuating computation values
        computationsPerSecond: 190 + Math.random() * 20,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};