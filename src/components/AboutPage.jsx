import React from 'react';
import { motion } from 'framer-motion';
import aboutImage from '../assets/images/about.png';

const AboutPage = ({ onNavigate }) => {
  const handleBackgroundClick = () => {
    // Navigate to design page when clicking anywhere on the page
    if (onNavigate) {
      onNavigate('design');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full relative cursor-pointer bg-white"
      onClick={handleBackgroundClick}
    >
      {/* Brand logo */}
      <div className="absolute top-8 left-0 right-0 text-center z-20">
        <h2 className="text-xl tracking-brand font-light">S I N G U L A R I T Y</h2>
      </div>

      <div className="flex h-full mobile-flex-col">
        {/* Left side - Image */}
        <div className="w-1/2 flex items-center justify-center mobile-w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full max-w-lg pl-12 mobile-px-4"
          >
            <img 
              src={aboutImage} 
              alt="Quantum 2 Drone Side View" 
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>
        
        {/* Right side - Text */}
        <div className="w-1/2 flex flex-col justify-center pr-20 mobile-w-full mobile-px-4 about-page-content">
          {/* "Introducing" text */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl font-normal mobile-text-2xl"
          >
            Introducing
          </motion.h3>
          
          {/* "Quantum 2." text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[200px] font-block leading-relaxed mt-[-20px] mb-50 about-page-heading"
            style={{ letterSpacing: "-0.02em" }}
          >
            <b>Quantum 2.</b>
          </motion.h1>
          
          {/* Lorem ipsum text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-2xl leading-relaxed about-page-text" style={{ lineHeight: '1.5', fontWeight: '400' }}>
              Lorem ipsum dolor sit amet consectetur.
              <br />
              Ultricies mi placerat tellus scelerisque.
              <br />
              Vulputate ut elementum malesuada a
              <br />
              scelerisque.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage; 