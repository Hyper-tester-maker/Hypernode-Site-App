import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Zap, Droplets, Banknote, ShoppingCart, ChevronDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const {
    toast
  } = useToast();
  
  const handleConnectWallet = () => {
    toast({
      title: 'Coming Soon! 🚀',
      description: 'Wallet connectivity for network interaction will be implemented shortly.'
    });
  };

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
                        <Button onClick={handleConnectWallet} className="mt-6 md:mt-0 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                            Connect Wallet
                        </Button>
                    </motion.div>

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