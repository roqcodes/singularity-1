import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import aboutImage from '../assets/images/about.png';

import diyaImage from '../assets/images/team/Diya Mary Koshy_Design and analysis team member.jpg';
import kameshImage from '../assets/images/team/Kamesh Singh_Sponsorship Team.jpg';
import gauthamImage from '../assets/images/team/Gautham Krishna_GCS Operator.jpg';
import lakshminarayananImage from '../assets/images/team/LAKSHMINARAYANAN A V_Mentor.jpg';
import aleenaAImage from '../assets/images/team/Aleena A_Electronics Team.jpg';
import aswathyImage from '../assets/images/team/Aswathy ks_design and analysis subteam.jpg';
import sidharthImage from '../assets/images/team/Sidharth_Propulsion and BMS.jpg';
import jithikaImage from '../assets/images/team/Jithika_member of Design & Analysis subteam.jpg';
import arunImage from '../assets/images/team/Arun KN_ Team Lead And Software Team.jpg';
import sanjayImage from '../assets/images/team/Sanjay Krishna_Software Team.jpg';
import aflahImage from '../assets/images/team/Aflah_Design and Analysis Team.jpg';
import nandagopalImage from '../assets/images/team/Nandagopal_Software_Team.jpg';
import aleenaGImage from '../assets/images/team/Aleena George_Software Team.jpg';
import roopeshImage from '../assets/images/team/Roopesh_Flight system and safety.jpg';

// Create custom CSS for the page
const customStyles = {
  teamSection: {
    backgroundColor: 'rgba(249, 250, 251, 0.8)',
    padding: '3rem 0',
    borderRadius: '1rem',
    marginTop: '2rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
  },
  teamSectionHeader: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  teamSectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#111827',
  },
  teamMemberCard: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    width: '100%',
    maxWidth: '220px',
    padding: '1.25rem',
    boxSizing: 'border-box'
  },
  teamMemberImage: {
    width: '6.5rem',
    height: '6.5rem',
    marginBottom: '1rem',
    overflow: 'hidden',
    borderRadius: '0.5rem',
    border: '4px solid #DBEAFE'
  }
};

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

  // Parse name and role from filename pattern: Name_Role.jpg
  const parseNameAndRole = (imagePath) => {
    try {
      const fileName = imagePath.split('/').pop().split('.')[0];
      
      // Find the last underscore to split name and role
      const lastUnderscoreIndex = fileName.lastIndexOf('_');
      
      if (lastUnderscoreIndex === -1) {
        return { name: fileName, role: "Team Member" };
      }
      
      const name = fileName.substring(0, lastUnderscoreIndex);
      const role = fileName.substring(lastUnderscoreIndex + 1);
      
      // Format name and role for better display
      return {
        name: name.replace(/_/g, ' '),
        role: role.replace(/_/g, ' ')
      };
    } catch (error) {
      return { name: "Team Member", role: "Unknown Role" };
    }
  };

  // Create team members array from imported images
  const teamMembers = [
    { 
      image: gauthamImage,
      ...parseNameAndRole('../assets/images/team/Gautham Krishna_GCS Operator.jpg') 
    },
    { 
      image: lakshminarayananImage,
      ...parseNameAndRole('../assets/images/team/LAKSHMINARAYANAN A V_Mentor.jpg') 
    },
    { 
      image: aleenaAImage,
      ...parseNameAndRole('../assets/images/team/Aleena A_Electronics Team.jpg') 
    },
    { 
      image: aswathyImage,
      ...parseNameAndRole('../assets/images/team/Aswathy ks_design and analysis subteam.jpg') 
    },
    { 
      image: sidharthImage,
      ...parseNameAndRole('../assets/images/team/Sidharth_Propulsion and BMS.jpg') 
    },
    { 
      image: jithikaImage,
      ...parseNameAndRole('../assets/images/team/Jithika_member of Design & Analysis subteam.jpg') 
    },
    { 
      image: arunImage,
      ...parseNameAndRole('../assets/images/team/Arun KN_ Team Lead And Software Team.jpg') 
    },
    { 
      image: sanjayImage,
      ...parseNameAndRole('../assets/images/team/Sanjay Krishna_Software Team.jpg') 
    },
    { 
      image: aflahImage,
      ...parseNameAndRole('../assets/images/team/Aflah_Design and Analysis Team.jpg') 
    },
    { 
      image: nandagopalImage,
      ...parseNameAndRole('../assets/images/team/Nandagopal_Software_Team.jpg') 
    },
    { 
      image: aleenaGImage,
      ...parseNameAndRole('../assets/images/team/Aleena George_Software Team.jpg') 
    },
    { 
      image: roopeshImage,
      ...parseNameAndRole('../assets/images/team/Roopesh_Flight system and safety.jpg') 
    },
    { 
      image: diyaImage,
      ...parseNameAndRole('../assets/images/team/Diya Mary Koshy_Design and analysis team member.jpg') 
    },
    { 
      image: kameshImage,
      ...parseNameAndRole('../assets/images/team/Kamesh Singh_Sponsorship Team.jpg') 
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

      <div className="flex flex-col md:block">
        {/* First Section - Original About Content */}
        <div className="flex h-screen mobile-flex-col cursor-pointer" onClick={handleBackgroundClick}>
          {/* Left side - Image */}
          <div className="w-1/2 flex items-center justify-center mobile-w-full mobile-h-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full max-w-lg pl-12 mobile-px-4 mobile-pl-4"
            >
              <img 
                src={aboutImage} 
                alt="Quantum 2 Drone Side View" 
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>
          
          {/* Right side - Text */}
          <div className="w-1/2 flex flex-col justify-center pr-20 mobile-w-full mobile-px-4 mobile-pr-4 mobile-h-1/2 about-page-content">
            {/* "Introducing" text */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl font-normal mobile-text-2xl"
            >
              Introducing
            </motion.h3>
            
            {/* "Singularit" text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-[200px] font-block leading-relaxed mt-[-20px] mb-50 about-page-heading"
              style={{ 
                letterSpacing: "-0.02em",
                fontSize: isMobile ? '4rem' : '200px',
                marginTop: isMobile ? '0' : '-20px',
                marginBottom: isMobile ? '1rem' : '50px'
              }}
            >
              <b>Singularit</b>
            </motion.h1>
            
            {/* Lorem ipsum text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-2xl leading-relaxed about-page-text" style={{ 
                lineHeight: '1.5', 
                fontWeight: '400',
                fontSize: isMobile ? '1.125rem' : '1.5rem'
              }}>
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
                marginBottom: '1rem',
                color: '#111827'
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
            <div style={customStyles.teamSection}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                style={customStyles.teamSectionHeader}
              >
                <h2 style={customStyles.teamSectionTitle}>Our Team</h2>
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
                                    isMediumScreen ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
                gap: '1.5rem',
                justifyItems: 'center',
                marginTop: '3rem',
                marginBottom: '2rem',
                padding: '0 1rem'
              }}>
                {teamMembers.map((member, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.5) }}
                    viewport={{ once: true }}
                    style={customStyles.teamMemberCard}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={customStyles.teamMemberImage}>
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
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      marginBottom: '0.4rem',
                      textAlign: 'center',
                      lineHeight: 1.2
                    }}>{member.name}</h3>
                    <p style={{
                      color: '#6B7280',
                      textAlign: 'center',
                      fontSize: '0.875rem',
                      lineHeight: 1.4
                    }}>{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mentors Section */}
            <div style={{
              ...customStyles.teamSection,
              marginTop: '4rem'
            }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                style={customStyles.teamSectionHeader}
              >
                <h2 style={customStyles.teamSectionTitle}>Our Mentors</h2>
                <div style={{
                  width: '6rem',
                  height: '0.25rem',
                  background: 'linear-gradient(to right, #3B82F6, #4F46E5)',
                  margin: '0 auto'
                }}></div>
              </motion.div>

              {/* Mentors Grid */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '4rem',
                marginTop: '3rem',
                marginBottom: '2rem',
                padding: '0 1rem',
                flexWrap: 'wrap'
              }}>
                {/* Placeholder for mentor cards - you can add the actual mentor data later */}
                {[1, 2].map((_, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.5) }}
                    viewport={{ once: true }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <div style={{
                      width: '12rem',
                      height: '12rem',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '4px solid #DBEAFE',
                      backgroundColor: '#E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9CA3AF',
                      fontSize: '1.5rem',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      Image
                    </div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      lineHeight: 1.2,
                      color: '#111827'
                    }}>Mentor Name</h3>
                    <p style={{
                      color: '#6B7280',
                      textAlign: 'center',
                      fontSize: '1rem',
                      lineHeight: 1.4
                    }}>Mentor Role</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default AboutPage; 