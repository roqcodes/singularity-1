import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate, Routes, Route } from 'react-router-dom';
import IntroPage from './IntroPage';
import AboutPage from './AboutPage';
import DesignPage from './DesignPage';
import GalleryPage from './GalleryPage';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('intro');

  const handleIntroClick = () => {
    if (currentPage === 'intro') {
      setCurrentPage('about');
      navigate('/about');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white">
      {/* Main content container */}
      <div className="h-full w-full">
        <AnimatePresence mode="wait">
          {currentPage === 'intro' && (
            <IntroPage key="intro" onContinue={handleIntroClick} onNavigate={handlePageChange} />
          )}
          
          {currentPage === 'about' && (
            <AboutPage key="about" onNavigate={handlePageChange} />
          )}
          
          {currentPage === 'design' && (
            <DesignPage key="design" onNavigate={handlePageChange} />
          )}
          
          {currentPage === 'gallery' && (
            <GalleryPage key="gallery" onNavigate={handlePageChange} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LandingPage; 