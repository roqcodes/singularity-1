import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/images/hero.png';
import image1 from '../assets/images/qGallery/image-1.png';
import image2 from '../assets/images/qGallery/image-2.png';
import image3 from '../assets/images/qGallery/image-3.png';
import image4 from '../assets/images/qGallery/image-4.png';
import image5 from '../assets/images/qGallery/image-5.png';
import droneVideo from '../assets/images/qGallery/drone-video.mp4';

const QuantumPage = ({ onNavigate }) => {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [image1, image2, image3, image4, image5];
  
  // Gallery modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  
  // Open modal with selected item
  const openModal = (item, video = false) => {
    setSelectedItem(item);
    setIsVideo(video);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };
  
  // Auto slide for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [carouselImages.length, currentSlide]);

  // Manual navigation for carousel
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  // Reference cards data
  const referenceCards = [
    {
      title: "Technical Specs",
      description: "Download the full technical specifications of Quantum.",
      link: "#",
      type: "download"
    },
    {
      title: "Research Paper",
      description: "Read our research paper on quantum technology applications.",
      link: "#",
      type: "link"
    },
    {
      title: "User Manual",
      description: "Download the comprehensive user manual.",
      link: "#",
      type: "download"
    },
    {
      title: "Support Forum",
      description: "Visit our community support forum for help and updates.",
      link: "#",
      type: "link"
    }
  ];

  return (
    <div className="relative bg-white overflow-y-auto min-h-screen">
      {/* Brand logo */}
      <div className="fixed top-8 left-0 right-0 text-center z-20">
        <h2 className="text-xl tracking-brand font-light">singularit</h2>
      </div>

      {/* Page header */}
      <header className="pt-24 pb-8 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            QUANTUM
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-700"
          >
            The next generation of quantum technology
          </motion.p>
        </div>
      </header>

      {/* Section 1: Standard Slideshow */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Overview</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          </motion.div>
          
          {/* Standard Slideshow */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl mb-8 max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
            {/* Slideshow images */}
            <div className="h-[400px] relative">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                  style={{ pointerEvents: index === currentSlide ? 'auto' : 'none' }}
                >
                  <img
                    src={image}
                    alt={`Quantum Project Slide ${index + 1}`}
                    className="w-full h-full object-contain bg-gradient-to-b from-gray-50 to-gray-100"
                  />
                </div>
              ))}
              
              {/* Slideshow arrows */}
              <button
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 backdrop-blur-sm p-3 rounded-full text-white hover:bg-black/60 transition-all z-20 shadow-lg hover:shadow-xl"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 backdrop-blur-sm p-3 rounded-full text-white hover:bg-black/60 transition-all z-20 shadow-lg hover:shadow-xl"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Slideshow navigation dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-20 py-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all shadow ${
                    index === currentSlide ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-700 mb-4 bg-blue-50 inline-block px-4 py-1 rounded-full shadow-sm">
              <span className="font-semibold text-blue-600">{currentSlide + 1}</span> / {carouselImages.length}
            </p>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto">
              Experience our Quantum project through these images showcasing its revolutionary design and capabilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: About */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">About Quantum</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-xl"
            >
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Revolutionary Technology</h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Quantum represents a breakthrough in quantum computing technology, 
                combining cutting-edge research with practical applications. 
                Our revolutionary approach to quantum mechanics allows for unprecedented 
                processing power while maintaining energy efficiency.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Developed by a team of leading scientists and engineers, Quantum pushes the 
                boundaries of what's possible in computational technology, opening new doors 
                for scientific discovery, cryptography, and artificial intelligence.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-xl"
            >
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "128 Qubit Architecture",
                    description: "Advanced quantum processing with 128 qubit architecture",
                    icon: (
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    )
                  },
                  {
                    title: "Error Correction",
                    description: "Superconducting quantum circuits with error correction",
                    icon: (
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )
                  },
                  {
                    title: "Hybrid Computing",
                    description: "Hybrid classical-quantum computational model",
                    icon: (
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    )
                  },
                  {
                    title: "Energy Efficient",
                    description: "Energy-efficient cooling system for extended operation",
                    icon: (
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )
                  },
                  {
                    title: "Framework Compatible",
                    description: "Compatible with existing quantum programming frameworks",
                    icon: (
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )
                  },
                  {
                    title: "Modular Design",
                    description: "Modular design for future upgrades and scaling",
                    icon: (
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                      </svg>
                    )
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-4 border border-blue-100 shadow-md hover:shadow-lg transition-all hover:border-blue-200 hover:-translate-y-1"
                  >
                    <div className="flex items-start">
                      <div className="bg-blue-50 p-3 rounded-lg mr-3 flex-shrink-0 shadow-sm">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-800 mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Section 3: Reference Cards */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Resources</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
              Access technical documentation, research papers, and support resources to maximize your Quantum experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {referenceCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm">
                    {card.type === "download" ? (
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 mb-3 line-clamp-2 h-10">{card.description}</p>
                  <a 
                    href={card.link} 
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md text-sm font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    {card.type === "download" ? "Download" : "View Document"}
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Section 4: Gallery */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Gallery</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
              Explore Quantum through our collection of images and videos.
            </p>
          </motion.div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {carouselImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                viewport={{ once: true }}
                className="relative rounded-lg overflow-hidden shadow-md cursor-pointer group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                onClick={() => openModal(image)}
              >
                <div className="aspect-square bg-gray-100">
                  <img 
                    src={image} 
                    alt={`Gallery image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-3">
                    <p className="text-white text-sm font-medium">Quantum Image {index + 1}</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Video Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative rounded-lg overflow-hidden shadow-md cursor-pointer group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg col-span-2"
              onClick={() => openModal(droneVideo, true)}
            >
              <div className="aspect-video bg-gray-100">
                <img 
                  src={image1} 
                  alt="Video thumbnail" 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-blue-600/80 backdrop-blur-sm p-4 rounded-full">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-3">
                  <p className="text-white text-sm font-medium">Quantum in Action (Video)</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
              <div className="relative max-w-5xl max-h-[90vh] w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button 
                  className="absolute top-2 right-2 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/70 transition-all"
                  onClick={closeModal}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {isVideo ? (
                  <div className="bg-black rounded-lg overflow-hidden">
                    <video 
                      controls 
                      autoPlay
                      className="w-full h-auto max-h-[80vh]"
                    >
                      <source src={selectedItem} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="bg-black/30 backdrop-blur-sm p-2 rounded-lg">
                    <img 
                      src={selectedItem} 
                      alt="Large preview" 
                      className="w-full h-auto max-h-[80vh] object-contain rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      {/* <footer className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white py-12 px-6 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">Quantum</h3>
            <p className="text-gray-300">
              Pushing the boundaries of quantum technology to create a better future.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Resources</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Gallery</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Contact</h4>
            <p className="text-gray-300">info@quantum-project.com</p>
            <p className="text-gray-300">+1 (555) 123-4567</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Twitter" className="bg-white/10 p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/20 transition-all shadow-lg">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="bg-white/10 p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/20 transition-all shadow-lg">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
              </a>
              <a href="#" aria-label="GitHub" className="bg-white/10 p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/20 transition-all shadow-lg">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400">© 2025 Quantum Project. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default QuantumPage; 