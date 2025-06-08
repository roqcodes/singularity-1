import React, { useState } from 'react';
import { motion } from 'framer-motion';

import heroImage from '../assets/images/hero.png';

const IntroPage = ({ onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full relative flex flex-col justify-center items-center"
      onClick={() => onNavigate('about')}
      style={{ cursor: 'pointer' }}
    >
      {/* singularit Brand Logo */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute top-8 left-0 right-0 text-center z-20"
      >
        <h2 className="text-xl tracking-brand font-light">singularit</h2>
      </motion.div>

      {/* Hero Content */}
      <div className="relative h-full w-full flex justify-center items-center">
        {/* Quantum Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute intro-quantum-text"
          style={{ 
            zIndex: 0, 
            pointerEvents: "none",
            textAlign: "center",
            marginTop: "-15%"
          }}
        >
          <h1 className="text-black font-bold" 
            style={{ 
              fontSize: "clamp(150px, 20vw, 280px)",
              lineHeight: "0.9", 
              fontWeight: "900",
              letterSpacing: "-0.02em"
            }}>
            Quantum
          </h1>
        </motion.div>

        {/* Drone Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="intro-drone-image"
          style={{ 
            zIndex: 10,
            position: "relative",
            width: "90%",
            maxWidth: "850px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15%"
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.img 
            src={heroImage} 
            alt="Quantum Drone" 
            style={{ 
              width: "100%",
              height: "auto",
              objectFit: "contain",
              filter: isHovered 
                ? "drop-shadow(0 20px 13px rgba(0, 0, 0, 0.03)) drop-shadow(0 8px 5px rgba(0, 0, 0, 0.08)) sepia(20%) hue-rotate(160deg) saturate(120%)"
                : "drop-shadow(0 20px 13px rgba(0, 0, 0, 0.03)) drop-shadow(0 8px 5px rgba(0, 0, 0, 0.08))"
            }}
            animate={{
              y: isHovered ? [0, -10, 0] : 0,
              scale: isHovered ? 1.02 : 1
            }}
            transition={{
              y: {
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut"
              },
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
          />
        </motion.div>
      </div>

      {/* Tap Anywhere Text */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-0 right-0 text-center z-20"
      >
        <motion.p 
          className="text-sm tracking-widest text-gray-400"
          animate={{
            opacity: [0.5, 1, 0.5],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            textShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
          }}
        >
          Tap Anywhere To Continue
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default IntroPage;