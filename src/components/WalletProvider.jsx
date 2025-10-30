import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { BackpackWalletAdapter } from '@solana/wallet-adapter-backpack';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Wraps the entire app with Solana wallet context.
// Uses Mainnet by default. If you have a Helius endpoint, set VITE_HELIUS_RPC in your env.
const WalletContextProvider = ({ children }) => {
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = useMemo(() => {
    const helius = import.meta?.env?.VITE_HELIUS_RPC;

    // Try custom RPC first, then fallback to public endpoints
    if (helius && helius.length > 0) {
      console.log('Using custom Helius RPC endpoint');
      return helius;
    }

    // Use public RPC (note: these have rate limits)
    const publicEndpoint = clusterApiUrl(network);
    console.log('Using public Solana RPC endpoint:', publicEndpoint);
    console.log('⚠️ Warning: Public RPC has rate limits. For production, use a custom RPC provider.');

    return publicEndpoint;
  }, [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new BackpackWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;
