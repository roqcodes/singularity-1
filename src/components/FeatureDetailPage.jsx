import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FeatureDetailPage = ({ featureId, imagePosition = 'right' }) => {
  const navigate = useNavigate();

  // In a real application, feature details would be fetched based on featureId
  const featureDetails = {
    title: 'Lorem Ipsum.',
    description: 'Lorem ipsum dolor sit amet consectetur. Ultricies mi placerat tellus scelerisque. Vulputate ut elementum malesuada a scelerisque.',
    image: 'https://via.placeholder.com/400x300'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full relative bg-white pt-24 px-10"
    >
      {/* singularit Brand Logo */}
      <div className="absolute top-8 left-0 right-0 text-center z-20">
        <h2 className="text-xl tracking-brand font-light">singularit</h2>
      </div>

      {/* Title header with line */}
      <div className="flex justify-between items-center w-full px-4 mb-16">
        <h2 className="text-2xl font-semibold">Quantum 2</h2>
        <div className="flex items-center">
          <div className="w-60 h-px bg-black mx-4"></div>
          <h2 className="text-2xl font-semibold">The Design.</h2>
        </div>
      </div>

      {/* Feature content with alternating layout */}
      <div className={`flex h-[60vh] ${imagePosition === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Image section */}
        <div className="w-1/2 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: imagePosition === 'left' ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-[80%]"
          >
            <img 
              src={featureDetails.image} 
              alt={featureDetails.title} 
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>

        {/* Text section */}
        <div className="w-1/2 flex flex-col justify-center px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl font-bold mb-8"
          >
            {featureDetails.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg leading-relaxed"
          >
            {featureDetails.description}
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onClick={() => navigate('/design')}
            className="mt-8 text-sm underline self-start cursor-pointer"
          >
            Back to Design Overview
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureDetailPage; 