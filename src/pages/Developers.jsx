import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Code, Book, Users, LifeBuoy, ArrowRight, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Developers = () => {
  const { toast } = useToast();

  const resources = [
    {
      icon: <PlayCircle size={32} />,
      title: 'Getting Started',
      description: 'A quick step-by-step guide to get you up and running on the network in minutes.',
      link: 'https://github.com/Hypernode-sol/Docs/wiki',
    },
    {
      icon: <Code size={32} />,
      title: 'API & SDKs',
      description: 'Explore libraries, endpoints, and code examples to integrate with HYPERNODE.',
      link: 'https://github.com/Hypernode-sol/Docs/wiki',
    },
    {
      icon: <Book size={32} />,
      title: 'Docs & Tutorials',
      description: 'Dive deep into our comprehensive guides and best practices.',
      link: 'https://github.com/Hypernode-sol/Docs/wiki',
    },
    {
      icon: <Users size={32} />,
      title: 'Community & Support',
      description: 'Join our Discord, forum, and GitHub to connect with other developers.',
      link: 'https://discord.gg/hypernode',
    },
  ];

  const handleStartNow = () => {
    toast({
      title: '🚀 Developer Accounts Coming Soon!',
      description: "Registration isn't open yet, but explore our docs to get ready!",
    });
    window.open('https://github.com/Hypernode-sol/Docs/wiki', '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Developer Portal - HYPERNODE</title>
        <meta name="description" content="Welcome to the HYPERNODE Developer Hub. Whether you’re deploying large-language models, running a compute node, or building applications on our platform — you’ll find what you need right here." />
      </Helmet>

      <div className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Developer Portal</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Welcome to the HYPERNODE Developer Hub. Whether you’re deploying large-language models, running a compute node, or building applications on our platform — you’ll find what you need right here.
            </p>
          </motion.div>

          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {resources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-8 flex flex-col"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center mb-6 text-black">
                    {resource.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">{resource.title}</h3>
                  <p className="text-gray-300 mb-6 flex-grow">{resource.description}</p>
                  <Button asChild variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 mt-auto">
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      Explore
                      <ArrowRight className="ml-2" size={16} />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-12 text-center"
            >
              <h2 className="text-4xl font-bold mb-6 gradient-text">Ready to build?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Click Start Now to register your developer account, explore the API, and deploy your first model or node in minutes.
              </p>
              <Button onClick={handleStartNow} size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                Start Now
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
};
export default Developers;