import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Technology from '@/pages/Technology';
import Economy from '@/pages/Economy';
import Developers from '@/pages/Developers';
import Community from '@/pages/Community';
import Contact from '@/pages/Contact';
import App from '@/pages/App';
import NetworkDashboard from '@/pages/NetworkDashboard';
import LLMDeploy from '@/pages/LLMDeploy';
import X402Module from '@/pages/X402Module';
import AutomationEngine from '@/pages/AutomationEngine';
import WalletContextProvider from '@/components/WalletProvider';

function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <WalletContextProvider>
      <div className="min-h-screen bg-black text-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/economy" element={<Economy />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/app" element={<App />} />
          <Route path="/dashboard" element={<NetworkDashboard />} />
          <Route path="/llm-deploy" element={<LLMDeploy />} />
          <Route path="/x402" element={<X402Module />} />
          <Route path="/automation" element={<AutomationEngine />} />
        </Routes>
        <Footer />
      </div>
    </WalletContextProvider>
  );
}

export default AppWrapper;