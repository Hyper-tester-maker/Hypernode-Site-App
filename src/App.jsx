import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import App from '@/pages/App';
import NetworkDashboard from '@/pages/NetworkDashboard';
import Validation from '@/pages/Validation';
import WalletContextProvider from '@/components/WalletProvider';
import Chatbot from '@/components/Chatbot';

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
          <Route path="/app" element={<App />} />
          <Route path="/dashboard" element={<NetworkDashboard />} />
          <Route path="/validation" element={<Validation />} />
          <Route path="/metrics" element={<Validation />} />
        </Routes>
        <Footer />
        <Chatbot />
      </div>
    </WalletContextProvider>
  );
}

export default AppWrapper;