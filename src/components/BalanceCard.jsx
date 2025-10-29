import React, { useState, useEffect, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { RefreshCw, Zap, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// SPL token mint for HYPER
const HYPER_MINT_ADDRESS = '92s9qna3djkMncZzkacyNQ38UKnNXZFh4Jgqe3Cmpump';

const BalanceCard = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balances, setBalances] = useState({ sol: 0, hyper: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalances = useCallback(async () => {
    if (!connected || !publicKey || !connection) {
      setBalances({ sol: 0, hyper: 0 });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // SOL balance
      const solLamports = await connection.getBalance(publicKey);
      const sol = solLamports / LAMPORTS_PER_SOL;

      // HYPER SPL token balance
      const hyperMint = new PublicKey(HYPER_MINT_ADDRESS);
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { mint: hyperMint });
      let hyper = 0;
      for (const { account } of tokenAccounts.value) {
        const info = account.data.parsed.info;
        const uiAmount = info?.tokenAmount?.uiAmount;
        if (typeof uiAmount === 'number') hyper += uiAmount;
      }

      setBalances({ sol, hyper });
    } catch (e) {
      console.error('Failed to fetch balances:', e);
      setError('Could not fetch balances. Please try again.');
      setBalances({ sol: 0, hyper: 0 });
    } finally {
      setLoading(false);
    }
  }, [connection, publicKey, connected]);

  useEffect(() => {
    fetchBalances();
    const interval = setInterval(fetchBalances, 20000);
    return () => clearInterval(interval);
  }, [fetchBalances]);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-xl p-6 glow-border-soft w-full max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Wallet</h3>
        <WalletMultiButton className="!bg-gradient-to-r !from-cyan-500 !to-blue-600 !text-white !font-bold !h-10" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <span className="text-sm text-gray-300">
            {publicKey ? publicKey.toBase58().slice(0, 4) + '...' + publicKey.toBase58().slice(-4) : 'Not connected'}
          </span>
        </div>
        <Button
          onClick={fetchBalances}
          variant="outline"
          className="border-cyan-600/50 text-cyan-300 hover:bg-cyan-600/10"
          disabled={!connected || loading}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 mb-4">
          <AlertCircle className="w-4 h-4 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-black/30 p-4 rounded-lg border border-white/5">
          <div className="flex items-center mb-2">
            <img src="https://cryptologos.cc/logos/solana-sol-logo.png" alt="SOL" className="w-6 h-6 mr-3" />
            <h4 className="text-lg font-semibold text-white">SOL Balance</h4>
          </div>
          <p className="text-2xl font-mono text-cyan-300">{balances.sol.toFixed(4)}</p>
        </div>

        <div className="bg-black/30 p-4 rounded-lg border border-white/5">
          <div className="flex items-center mb-2">
            <img src="https://horizons-cdn.hostinger.com/1e54f271-6c35-4f84-9c56-0768238922fb/27dd0eef97f4466e1cd44bb600af7438.webp" alt="HYPER" className="w-6 h-6 mr-3" />
            <h4 className="text-lg font-semibold text-white">HYPER Balance</h4>
          </div>
          <p className="text-2xl font-mono text-blue-300">{balances.hyper.toFixed(4)}</p>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
