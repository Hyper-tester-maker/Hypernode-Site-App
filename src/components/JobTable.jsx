import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Circle } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const JobTable = () => {
  const { publicKey, connected } = useWallet();
  const [jobs, setJobs] = useState([]);

  const apiEndpoint = import.meta.env.VITE_NODE_API_ENDPOINT || 'http://localhost:3001';

  const fetchJobs = async () => {
    if (!connected || !publicKey) {
      setJobs([]);
      return;
    }

    try {
      const response = await fetch(
        `${apiEndpoint}/api/jobs/mine?wallet=${publicKey.toString()}`
      );
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();

    // Poll every 10 seconds
    const interval = setInterval(fetchJobs, 10000);
    return () => clearInterval(interval);
  }, [connected, publicKey]);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return { text: 'Completed', color: 'text-green-400', bgColor: 'bg-green-500/20' };
      case 'running':
        return { text: 'Running', color: 'text-blue-400', bgColor: 'bg-blue-500/20' };
      case 'failed':
        return { text: 'Failed', color: 'text-red-400', bgColor: 'bg-red-500/20' };
      case 'pending':
        return { text: 'Pending', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' };
      default:
        return { text: status, color: 'text-gray-400', bgColor: 'bg-gray-500/20' };
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '-';
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (!connected) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6"
    >
      <div className="flex items-center mb-6">
        <Activity className="text-cyan-400 mr-3" />
        <h3 className="text-xl font-semibold text-gray-200">Recent Jobs</h3>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <Activity className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">
            No jobs executed yet. Once your nodes start processing jobs, they will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-cyan-500/30 hover:bg-transparent">
                <TableHead className="text-cyan-400">Job ID</TableHead>
                <TableHead className="text-cyan-400">Type</TableHead>
                <TableHead className="text-cyan-400">Node</TableHead>
                <TableHead className="text-cyan-400">Status</TableHead>
                <TableHead className="text-cyan-400 text-right">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => {
                const status = getStatusInfo(job.status);
                return (
                  <TableRow
                    key={job.id}
                    className="border-cyan-500/20 hover:bg-cyan-500/5"
                  >
                    <TableCell className="font-mono text-sm text-gray-300">
                      {job.id}
                    </TableCell>
                    <TableCell className="text-gray-300">{job.type}</TableCell>
                    <TableCell className="font-mono text-sm text-gray-400">
                      {job.nodeId}
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full ${status.bgColor}`}>
                        <Circle className={`h-2 w-2 mr-1 ${status.color} fill-current`} />
                        <span className={`text-xs font-semibold ${status.color}`}>
                          {status.text}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-gray-400">
                      {formatDuration(job.duration)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </motion.div>
  );
};

export default JobTable;
