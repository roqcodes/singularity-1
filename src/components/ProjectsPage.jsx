import React from 'react';
import { motion } from 'framer-motion';
import topViewImage from '../assets/images/topView.png';

const ProjectsPage = ({ onNavigate }) => {
  const handleQuantum2Click = (e) => {
    e.stopPropagation();
    if (onNavigate) {
      onNavigate('quantum');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full relative bg-white overflow-y-auto"
    >
      {/* Brand logo */}
      <div className="absolute top-8 left-0 right-0 text-center z-20">
        <h2 className="text-xl tracking-brand font-light">S I N G U L A R I T Y</h2>
      </div>

      <div className="flex flex-col h-full items-center justify-center py-24 px-10 mobile-px-4">
        {/* Projects Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-16 mobile-mb-10"
        >
          <h1 className="text-6xl font-bold mb-4 mobile-text-3xl">Projects</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mobile-text-lg">
            Explore our innovative drone technology projects designed to push the boundaries of what's possible.
          </p>
        </motion.div>

        {/* Project Cards Container */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
          {/* Quantum 2 Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={handleQuantum2Click}
          >
            <div className="relative">
              <img 
                src={topViewImage} 
                alt="Quantum 2 Drone Top View" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                <span className="text-white font-semibold px-6 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-all duration-300">
                  View Project
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Quantum 2</h3>
              <p className="text-gray-600">
                Our next-generation autonomous drone system with advanced capabilities and intelligent flight control.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Autonomous</span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">4K Camera</span>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">AI-Powered</span>
              </div>
            </div>
          </motion.div>
          
          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/50 rounded-lg shadow-md overflow-hidden border-2 border-dashed border-gray-300"
          >
            <div className="p-6 h-full flex flex-col items-center justify-center text-center py-16">
              <div className="bg-gray-200 rounded-full p-4 mb-4">
                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-700">Coming Soon</h3>
              <p className="text-gray-500">
                More exciting projects are in development. Stay tuned for updates!
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          onClick={() => onNavigate('landing')}
          className="mt-16 group flex items-center text-gray-600 hover:text-black transition-colors duration-300"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to home
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProjectsPage;