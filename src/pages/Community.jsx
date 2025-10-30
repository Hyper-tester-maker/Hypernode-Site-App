import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Twitter, Github, Users, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Community = () => {
  const { toast } = useToast();

  const socialLinks = [
    { icon: <Twitter size={32} />, name: 'Twitter/X', handle: '@hypernode_sol', color: 'from-blue-400 to-cyan-500', link: 'https://twitter.com/hypernode_sol' },
    { icon: <Github size={32} />, name: 'GitHub', handle: 'github.com/Hypernode-sol', color: 'from-gray-400 to-gray-600', link: 'https://github.com/Hypernode-sol' },
    { icon: <MessageSquare size={32} />, name: 'Discord', handle: 'Join the conversation', color: 'from-indigo-500 to-purple-600', link: '#' }
  ];

  const featuredProjects = [
    {
      title: 'Distributed ML Training',
      author: 'Community Member',
      description: 'Open-source framework for training machine learning models across the HYPERNODE network'
    },
    {
      title: 'Climate Modeling Node',
      author: 'Research Team',
      description: 'Specialized node configuration optimized for climate simulation computations'
    },
    {
      title: 'Protein Folding Analysis',
      author: 'BioCompute Lab',
      description: 'Leveraging HYPERNODE for breakthrough protein structure predictions'
    }
  ];

  const handleSocialClick = (social) => {
    if (social.link === '#') {
      toast({
        title: `🚧 ${social.name} Coming Soon!`,
        description: "Our community server is being set up. Stay tuned for the invitation link! 🚀",
      });
    } else {
      window.open(social.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <Helmet>
        <title>Community - Join the HYPERNODE Network</title>
        <meta name="description" content="Connect with the HYPERNODE community on Twitter, GitHub, and Discord. Contribute to open-source projects and shape the future of distributed computing." />
      </Helmet>

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Join the HYPERNODE Community</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect. Contribute. Compute.
            </p>
          </motion.div>

          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSocialClick(social)}
                  className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-10 text-center hover:border-cyan-500/60 transition-all cursor-pointer group"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${social.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <div className="text-white">
                      {social.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{social.name}</h3>
                  <p className="text-gray-400">{social.handle}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-4">
                <Users className="text-cyan-400 mr-3" size={40} />
                <h2 className="text-4xl font-bold gradient-text">Community Contributions</h2>
              </div>
              <p className="text-lg text-gray-400">Amazing projects built by our community</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-xl p-8 hover:border-purple-500/60 transition-all"
                >
                  <div className="flex items-center mb-4">
                    <Sparkles className="text-purple-400 mr-2" size={24} />
                    <h3 className="text-xl font-bold text-purple-400">{project.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">by {project.author}</p>
                  <p className="text-gray-300">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-2xl p-12 text-center"
            >
              <h2 className="text-4xl font-bold mb-6 gradient-text">Ready to Contribute?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Whether you're a developer, researcher, or enthusiast, there's a place for you in the HYPERNODE community
              </p>
              <Button 
                onClick={() => handleSocialClick({ name: 'GitHub', link: 'https://github.com/Hypernode-sol' })}
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
              >
                Join Our GitHub
                <Github className="ml-2" size={20} />
              </Button>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Community;