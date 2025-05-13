import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import aboutImage from '../assets/images/about.png';
import diyaImage from '../assets/images/team/Diya Mary Koshy_Design and analysis team member.jpg';
import kameshImage from '../assets/images/team/Kamesh Singh_Sponsorship Team.jpg';

const AboutPage = ({ onNavigate }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isSmallScreen = windowWidth <= 640;
  const isMediumScreen = windowWidth <= 992;

  const handleBackgroundClick = () => {
    // Navigate to design page when clicking anywhere on the page
    if (onNavigate) {
      onNavigate('design');
    }
  };

  const teamMembers = [
    {
      name: "Diya Mary Koshy",
      role: "Design and Analysis Team Member",
      image: diyaImage
    },
    {
      name: "Kamesh Singh",
      role: "Sponsorship Team",
      image: kameshImage
    },
    {
      name: "Team Member 3",
      role: "Role 3",
      image: diyaImage // Placeholder image
    },
    {
      name: "Team Member 4",
      role: "Role 4",
      image: kameshImage // Placeholder image
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-full w-full relative bg-white"
    >
      {/* Brand logo */}
      <div className="absolute top-8 left-0 right-0 text-center z-20">
        <h2 className="text-xl tracking-brand font-light">singularit</h2>
      </div>

      {/* First Section - Original About Content */}
      <div className="flex h-screen mobile-flex-col cursor-pointer" onClick={handleBackgroundClick}>
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
          
          {/* Navigation button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onClick={handleBackgroundClick}
            style={{
              marginTop: '2rem',
              backgroundColor: '#2563EB',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '1rem',
              transition: 'background-color 0.3s ease',
              display: 'inline-block',
              alignSelf: 'flex-start',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
          >
            View Design
          </motion.button>
        </div>
      </div>

      {/* Mission Section */}
      <section style={{
        padding: '5rem 1.5rem',
        background: 'linear-gradient(to bottom, #F9FAFB, white)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginBottom: '4rem'
            }}
          >
            <h2 style={{
              fontSize: isMobile ? '2.25rem' : '3rem',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>Our Mission</h2>
            <div style={{
              width: '6rem',
              height: '0.25rem',
              background: 'linear-gradient(to right, #3B82F6, #4F46E5)',
              margin: '0 auto'
            }}></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              maxWidth: '48rem',
              margin: '0 auto'
            }}
          >
            <p style={{
              fontSize: isMobile ? '1.125rem' : '1.25rem',
              color: '#374151',
              lineHeight: 1.75
            }}>
              To revolutionize the drone industry through innovative design, cutting-edge technology, and sustainable practices. 
              We strive to create drones that not only excel in performance but also contribute positively to society and the environment.
            </p>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginTop: '5rem',
              marginBottom: '2.5rem'
            }}
          >
            <h2 style={{
              fontSize: isMobile ? '2.25rem' : '3rem',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>Our Team</h2>
            <div style={{
              width: '6rem',
              height: '0.25rem',
              background: 'linear-gradient(to right, #3B82F6, #4F46E5)',
              margin: '0 auto'
            }}></div>
          </motion.div>

          {/* Team Members Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isSmallScreen ? '1fr' : 
                                isMediumScreen ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '2rem',
            justifyItems: 'center',
            marginTop: '3rem'
          }}>
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'box-shadow 0.3s ease',
                  width: '100%',
                  maxWidth: '280px',
                  padding: '1.5rem',
                  boxSizing: 'border-box'
                }}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}
              >
                <div style={{
                  width: '8rem',
                  height: '8rem',
                  marginBottom: '1rem',
                  overflow: 'hidden',
                  borderRadius: '0.5rem',
                  border: '4px solid #DBEAFE'
                }}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  textAlign: 'center'
                }}>{member.name}</h3>
                <p style={{
                  color: '#6B7280',
                  textAlign: 'center'
                }}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage; 