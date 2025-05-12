import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/images/hero.png';

const ProjectsPage = ({ onNavigate }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onNavigate) {
      onNavigate('quantum');
    } else {
      navigate('/quantum');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full relative bg-white"
    >
      {/* Brand logo */}
      <div className="absolute top-8 left-0 right-0 text-center z-20">
        <h2 className="text-xl tracking-brand font-light">singularit</h2>
      </div>

      <div className="flex h-full flex-col items-center justify-center mobile-flex-col">
        {/* Page Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl font-block mb-12 mobile-text-3xl"
        >
          Our Projects
        </motion.h1>
        
        {/* Project Cards */}
        <div className="w-full max-w-4xl flex justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-80 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={handleCardClick}
          >
            <div className="h-56 overflow-hidden">
              <img 
                src={heroImage} 
                alt="Maruti Project" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-3xl font-bold mb-2">Maruti</h3>
              <p className="text-gray-600">
                Explore our revolutionary Maruti project. Click to learn more.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsPage; 