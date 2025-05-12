import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Import all images from qGallery using Vite's import.meta.glob
const qGalleryImagesImport = import.meta.glob('../assets/images/qGallery/*.{png,jpg,jpeg,svg,avif}', { eager: true });
const qGalleryVideosImport = import.meta.glob('../assets/images/qGallery/*.{mp4,webm}', { eager: true });

// Convert the imports to a format similar to what we had before
const qGalleryImages = Object.fromEntries(
  Object.entries(qGalleryImagesImport).map(([path, module]) => [
    path.split('/').pop(), // Get the filename as the key
    module.default       // The actual image URL/path
  ])
);

const qGalleryVideos = Object.fromEntries(
  Object.entries(qGalleryVideosImport).map(([path, module]) => [
    path.split('/').pop(), // Get the filename as the key
    module.default        // The actual video URL/path
  ])
);

const QuantumPage = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  const galleryRef = useRef(null);
  
  // Convert imported images to array
  const imagesArray = Object.values(qGalleryImages);
  const videosArray = Object.values(qGalleryVideos);
  const mediaArray = [...imagesArray, ...videosArray];
  
  const hasMedia = mediaArray.length > 0;
  
  // Determine media type (image or video)
  const isVideo = (src) => typeof src === 'string' && (src.endsWith('.mp4') || src.endsWith('.webm'));
  
  // Track scroll position for back-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Automatic carousel rotation
  useEffect(() => {
    if (!hasMedia) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imagesArray.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [hasMedia, imagesArray.length]);
  
  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  const goToPrevSlide = () => {
    if (!hasMedia) return;
    setCurrentSlide((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);
  };
  
  const goToNextSlide = () => {
    if (!hasMedia) return;
    setCurrentSlide((prev) => (prev + 1) % imagesArray.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-white overflow-x-hidden smooth-scroll"
    >
      {/* Brand logo */}
      <div className="absolute top-8 left-0 right-0 text-center z-20">
        <h2 className="text-xl tracking-brand font-light">S I N G U L A R I T Y</h2>
      </div>

      {/* Hero Carousel Section - Full screen height on desktop, smaller on mobile */}
      <div className="relative w-full h-screen md:h-[85vh] mt-0 quantum-hero-section">
        <div 
          ref={carouselRef}
          className="w-full h-full overflow-hidden relative quantum-hero-carousel"
        >
          {hasMedia ? (
            <>
              {imagesArray.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Quantum 2 - Slide ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              
              {/* Semi-transparent overlay with gradient */}
              <div className="absolute inset-0 overlay-gradient z-10"></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <p className="text-2xl text-gray-500">No images available</p>
            </div>
          )}
          
          {/* Navigation arrows */}
          {hasMedia && (
            <>
              <button
                onClick={goToPrevSlide}
                className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full z-20 hover:bg-opacity-80 transition-all duration-300 carousel-nav-button focus-ring"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNextSlide}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full z-20 hover:bg-opacity-80 transition-all duration-300 carousel-nav-button focus-ring"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Dots indicator */}
          {hasMedia && imagesArray.length > 1 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
              {imagesArray.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 quantum-carousel-indicator ${
                    index === currentSlide ? 'bg-white w-6 active' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Title overlay with text - on top of the semi-transparent overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white p-10">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl font-bold mb-4 mobile-text-3xl quantum-hero-title text-shadow"
              >
                Quantum 2
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl max-w-3xl mx-auto mobile-text-lg quantum-hero-subtitle text-shadow-sm"
              >
                Next generation autonomous drone system
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-8"
              >
                <a 
                  href="#about" 
                  className="inline-block bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 focus-ring-dark mobile-touch-target"
                >
                  Learn More
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 px-10 mobile-py-16 mobile-px-4 bg-white quantum-about-section">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-bold mb-10 mobile-text-2xl"
          >
            About the Project
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="prose prose-lg max-w-none quantum-about-content"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
            </p>
            <p>
              Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.
            </p>
            <p>
              Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            </p>
            <p>
              Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Links Section */}
      <section className="py-24 px-10 bg-gray-50 mobile-py-16 mobile-px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-bold mb-12 mobile-text-2xl mobile-mb-8"
          >
            Documentation & Resources
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 documentation-cards-grid">
            {/* Document Card 1 */}
            <motion.a
              href="#" 
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 quantum-card focus-ring"
            >
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold">Technical Specifications</h3>
              </div>
              <p className="text-gray-600">Detailed technical documentation about the Quantum 2 drone specifications and capabilities.</p>
            </motion.a>
            
            {/* Document Card 2 */}
            <motion.a
              href="#" 
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 quantum-card focus-ring"
            >
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-semibold">Tutorial Videos</h3>
              </div>
              <p className="text-gray-600">Watch our video tutorials to learn how to operate and maintain the Quantum 2 drone system.</p>
            </motion.a>
            
            {/* Document Card 3 */}
            <motion.a
              href="#" 
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 quantum-card focus-ring"
            >
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-xl font-semibold">Reference Architecture</h3>
              </div>
              <p className="text-gray-600">View the reference architecture and design principles behind Quantum 2's advanced control systems.</p>
            </motion.a>
            
            {/* Document Card 4 */}
            <motion.a
              href="#" 
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 quantum-card focus-ring"
            >
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-xl font-semibold">User Manual</h3>
              </div>
              <p className="text-gray-600">Comprehensive user guide for Quantum 2 drone operation, maintenance and troubleshooting.</p>
            </motion.a>
            
            {/* Document Card 5 */}
            <motion.a
              href="#" 
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 quantum-card focus-ring"
            >
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-yellow-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-xl font-semibold">Quick Start Guide</h3>
              </div>
              <p className="text-gray-600">Get up and running quickly with this concise quick start guide for the Quantum 2 system.</p>
            </motion.a>
            
            {/* Document Card 6 */}
            <motion.a
              href="#" 
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 quantum-card focus-ring"
            >
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold">FAQ & Support</h3>
              </div>
              <p className="text-gray-600">Find answers to frequently asked questions and contact our support team for assistance.</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="py-24 px-10 mobile-py-16 mobile-px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-bold mb-12 mobile-text-2xl mobile-mb-8"
          >
            Gallery
          </motion.h2>
          
          {hasMedia ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 quantum-gallery-grid">
              {imagesArray.map((image, index) => (
                <motion.div
                  key={`img-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer quantum-gallery-item"
                  style={{ aspectRatio: '16/9' }}
                >
                  <img 
                    src={image} 
                    alt={`Quantum 2 - Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {videosArray.map((video, index) => (
                <motion.div
                  key={`vid-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (imagesArray.length + index) * 0.1, duration: 0.6 }}
                  className="relative overflow-hidden rounded-lg shadow-md quantum-video-container"
                  style={{ aspectRatio: '16/9' }}
                >
                  <video 
                    controls
                    src={video} 
                    className="w-full h-full object-cover"
                    poster={imagesArray[0]} // Use first image as poster
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white p-1 px-2 rounded-full text-xs">
                    Video
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-500">
                Gallery images coming soon
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Back to top button */}
      <div className={`fixed bottom-8 right-8 z-50 back-to-top ${scrollPosition > 300 ? 'visible' : ''} back-to-top-mobile`}>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-opacity-80 transition-all duration-300 focus-ring mobile-touch-target"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default QuantumPage;