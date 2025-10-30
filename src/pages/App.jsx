import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Zap, Droplets, Banknote, ShoppingCart, ChevronDown, Loader, RefreshCw } from 'lucide-react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TOKEN_ADDRESSES = {
  HYPERNODE: '92s9qna3djkMncZzkacyNQ38UKnNXZFh4Jgqe3Cmpump',
  SOLANA: 'So11111111111111111111111111111111111111111'
};

const TokenBalanceCard = ({ name, symbol, balance, icon, loading }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-6 flex items-center justify-between hover-glow"
  >
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold text-white">{name}</p>
        <p className="text-sm text-gray-400">{symbol}</p>
      </div>
    </div>
    <div className="text-right">
      {loading ? (
        <Loader className="animate-spin text-cyan-400" size={24} />
      ) : (
        <p className="text-2xl font-bold text-cyan-400">
          {balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}
        </p>
      )}
    </div>
  </motion.div>
);

const PlaceholderCard = ({
  icon,
  label,
  detail,
  variant = 'green'
}) => {
  const {
    toast
  } = useToast();
  const colorVariants = {
    green: 'border-green-500/30 text-green-400'
  };
  const handleClick = () => {
    toast({
      title: 'Feature Coming Soon! 🛠️',
      description: 'This functionality is under development and will be available shortly.'
    });
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className={`relative bg-black/20 backdrop-blur-sm border ${colorVariants[variant]} rounded-2xl p-6 shadow-lg h-full flex flex-col justify-between items-start`}>
            <div>
                <div className="flex items-center mb-4">
                    {icon}
                    <span className="ml-3 text-lg font-semibold text-gray-200">{label}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{detail}</p>
            </div>
            <Button onClick={handleClick} variant="outline" className="w-full bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white">
                Coming Soon
            </Button>
        </motion.div>;
};

const ConnectDeviceCard = () => {
  const { toast } = useToast();
  const [selectedDevice, setSelectedDevice] = React.useState("Select your device");

  const handleSelect = (device) => {
    setSelectedDevice(device);
    toast({
      title: '🚧 Under Construction!',
      description: 'Direct connection plugins are being built. Stay tuned! 🚀',
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 shadow-lg hover-glow h-full flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center mb-4">
          <Zap className="text-cyan-400" />
          <span className="ml-3 text-lg font-semibold text-gray-200">Connect Your GPU or CPU</span>
        </div>
        <p className="text-sm text-gray-400 mb-6">
          Become a provider by connecting your idle hardware to the HYPERNODE network and start earning rewards.
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between bg-black/30 border-cyan-500/50 text-white hover:bg-cyan-500/10">
            {selectedDevice}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full bg-black/80 border-cyan-500/50 text-white backdrop-blur-xl">
          <DropdownMenuItem onSelect={() => handleSelect('NVIDIA RTX 4090')}>NVIDIA RTX 4090</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSelect('NVIDIA RTX 3080')}>NVIDIA RTX 3080</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSelect('AMD Radeon RX 7900 XTX')}>AMD Radeon RX 7900 XTX</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSelect('AMD Radeon RX 6800 XT')}>AMD Radeon RX 6800 XT</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSelect('CPU (Generic)')}>CPU (Generic)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};


const App = () => {
  const { toast } = useToast();
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balances, setBalances] = useState({ sol: 0, hypernode: 0 });
  const [loading, setLoading] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const getBalances = useCallback(async () => {
    if (!connected || !publicKey) {
      console.log('Not connected or no publicKey');
      return;
    }

    setLoading(true);
    console.log('Fetching balances for:', publicKey.toBase58());

    try {
      // Fetch SOL balance
      console.log('Fetching SOL balance...');
      const solBalance = await connection.getBalance(publicKey);
      console.log('SOL balance (lamports):', solBalance);
      const solBalanceInSol = solBalance / LAMPORTS_PER_SOL;
      console.log('SOL balance:', solBalanceInSol);

      // Fetch HYPERNODE token balance
      console.log('Fetching HYPERNODE token balance...');
      let hypernodeBalance = 0;
      try {
        const hypernodeToken = new PublicKey(TOKEN_ADDRESSES.HYPERNODE);
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { mint: hypernodeToken });
        console.log('HYPERNODE token accounts found:', tokenAccounts.value.length);

        if (tokenAccounts.value.length > 0) {
          hypernodeBalance = tokenAccounts.value[0]?.account.data.parsed.info.tokenAmount.uiAmount || 0;
          console.log('HYPERNODE balance:', hypernodeBalance);
        } else {
          console.log('No HYPERNODE token account found for this wallet');
        }
      } catch (tokenError) {
        console.warn('Error fetching HYPERNODE token (wallet may not have this token):', tokenError.message);
        // Don't throw - just keep hypernode balance at 0
      }

      setBalances({
        sol: solBalanceInSol,
        hypernode: hypernodeBalance,
      });

      toast({
        title: 'Balances Updated! ✅',
        description: `SOL: ${solBalanceInSol.toFixed(4)} | HYPERNODE: ${hypernodeBalance.toFixed(4)}`,
      });
    } catch (error) {
      console.error("Error fetching balances:", error);
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack
      });

      toast({
        title: 'Error Fetching Balances',
        description: error.message || 'Could not fetch your balances. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [connected, publicKey, connection, toast]);

  useEffect(() => {
    if (connected && publicKey && !initialFetchDone) {
      console.log('Wallet connected, fetching balances...');
      toast({
        title: 'Wallet Connected! ✅',
        description: `Connected to ${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`,
      });

      // Small delay to ensure connection is stable
      setTimeout(() => {
        getBalances();
      }, 500);

      setInitialFetchDone(true);
    }

    if (!connected) {
      console.log('Wallet disconnected');
      setBalances({ sol: 0, hypernode: 0 });
      setInitialFetchDone(false);
    }
  }, [connected, publicKey, getBalances, initialFetchDone, toast]);

  const defiServices = [{
      icon: <Droplets size={24} />,
      label: 'Liquidity Pools',
      detail: 'Provide liquidity to earn rewards.'
    }, {
      icon: <Banknote size={24} />,
      label: 'Staking',
      detail: 'Stake your tokens to secure the network.'
    }, {
      icon: <ShoppingCart size={24} />,
      label: 'Token Services',
      detail: 'Trade tokens for computing services.'
    }];

  return <>
            <Helmet>
                <title>App - HYPERNODE</title>
                <meta name="description" content="Interact with the HYPERNODE network. Connect your device, explore DeFi services, and more." />
            </Helmet>
            <div className="min-h-screen bg-black text-gray-100 pt-28 pb-16 px-4">
                <div className="container mx-auto">
                    <motion.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold mb-2 glow-text">HYPERNODE App</h1>
                            <p className="text-lg text-gray-400">Interact with the Network</p>
                        </div>
                        <div className="mt-6 md:mt-0">
                            <WalletMultiButton style={{
                              background: 'linear-gradient(to right, #06b6d4, #2563eb)',
                              border: 'none',
                              fontWeight: 'bold',
                              padding: '12px 24px',
                              borderRadius: '8px',
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                              transition: 'all 0.3s ease',
                            }} />
                        </div>
                    </motion.div>

                    {connected && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-3xl font-bold gradient-text">Your Wallet Balances</h2>
                          <Button
                            onClick={getBalances}
                            variant="ghost"
                            size="sm"
                            className="text-cyan-400 hover:bg-cyan-500/10"
                            disabled={loading}
                          >
                            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                            <span className="ml-2">Refresh</span>
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <TokenBalanceCard
                            name="HYPERNODE"
                            symbol="$HYPER"
                            balance={balances.hypernode}
                            loading={loading && !balances.hypernode}
                            icon={
                              <img
                                src="https://horizons-cdn.hostinger.com/1e54f271-6c35-4f84-9c56-0768238922fb/27dd0eef97ff29791c8c57e6b192dd95.png"
                                alt="HYPERNODE logo"
                                className="w-6 h-6"
                              />
                            }
                          />
                          <TokenBalanceCard
                            name="Solana"
                            symbol="SOL"
                            balance={balances.sol}
                            loading={loading && !balances.sol}
                            icon={
                              <img
                                alt="Solana coin symbol"
                                className="w-6 h-6"
                                src="https://horizons-cdn.hostinger.com/1e54f271-6c35-4f84-9c56-0768238922fb/687b78b67b8f163af9d217c516191166.webp"
                              />
                            }
                          />
                        </div>
                      </motion.div>
                    )}

                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-purple-400 border-b-2 border-purple-500/30 pb-2">Connect & Earn</h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-1">
                                    <ConnectDeviceCard />
                                </div>
                                <div className="lg:col-span-2 flex items-center justify-center bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 shadow-lg hover-glow">
                                    <p className="text-center text-gray-400">More ways to interact with the network coming soon...</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-green-400 border-b-2 border-green-500/30 pb-2">DeFi & Services</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {defiServices.map((service, index) => <PlaceholderCard key={index} {...service} icon={React.cloneElement(service.icon, {
                className: 'text-green-400'
              })} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>;
};
export default App;