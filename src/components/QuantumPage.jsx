import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/images/hero.png';
import singularityDoc from '../assets/docs/Singularity_Doc.pdf';

// Import images directly since Vite doesn't support require.context
import image1 from '../assets/images/qGallery/image-1.jpeg';
import image2 from '../assets/images/qGallery/image-2.jpeg';
import image3 from '../assets/images/qGallery/image-3.jpeg';
import image4 from '../assets/images/qGallery/image-4.mp4';
import image5 from '../assets/images/qGallery/image.jpeg';

// Custom CSS styles for the MarutiPage
const styles = {
  pageContainer: {
    position: 'relative',
    backgroundColor: 'white',
    overflowY: 'auto',
    minHeight: '100vh'
  },
  brandLogo: {
    position: 'fixed',
    top: '2rem',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 20
  },
  logoText: {
    fontSize: '1.25rem',
    letterSpacing: '0.1em',
    fontWeight: 300
  },
  pageHeader: {
    paddingTop: '6rem',
    paddingBottom: '2rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    background: 'linear-gradient(to right, #EBF5FF, #EEF2FF)',
    textAlign: 'center'
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto'
  },
  pageTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    backgroundImage: 'linear-gradient(to right, #2563EB, #4F46E5)'
  },
  pageSubtitle: {
    fontSize: '1.5rem',
    maxWidth: '36rem',
    margin: '0 auto',
    color: '#374151'
  },
  section: {
    padding: '4rem 1.5rem',
    backgroundColor: 'white'
  },
  sectionInner: {
    maxWidth: '1280px',
    margin: '0 auto'
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#111827'
  },
  sectionDivider: {
    width: '6rem',
    height: '0.25rem',
    backgroundImage: 'linear-gradient(to right, #3B82F6, #4F46E5)',
    margin: '0 auto'
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2563EB',
    color: 'white',
    borderRadius: '0.375rem',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: 'none',
    cursor: 'pointer'
  },
  // Slideshow styles
  slideshow: {
    position: 'relative',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    marginBottom: '2rem',
    maxWidth: '64rem',
    margin: '0 auto',
    transform: 'scale(1)',
    transition: 'transform 0.3s ease'
  },
  slideshowHover: {
    transform: 'scale(1.01)'
  },
  slideshowContainer: {
    height: '400px',
    position: 'relative'
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 1s ease-in-out'
  },
  slideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    background: 'linear-gradient(to bottom, #F9FAFB, #F3F4F6)'
  },
  slideNavButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)',
    padding: '0.75rem',
    borderRadius: '9999px',
    color: 'white',
    zIndex: 20,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  slideNavButtonHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  prevButton: {
    left: '1rem'
  },
  nextButton: {
    right: '1rem'
  },
  slideNavDots: {
    position: 'absolute',
    bottom: '1rem',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: '0.75rem',
    zIndex: 20,
    padding: '0.5rem'
  },
  slideNavDot: {
    width: '1rem',
    height: '1rem',
    borderRadius: '9999px',
    backgroundColor: '#D1D5DB',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer'
  },
  slideNavDotActive: {
    backgroundColor: '#2563EB',
    transform: 'scale(1.25)'
  },
  slideNavDotHover: {
    backgroundColor: '#9CA3AF'
  },
  slideCounter: {
    color: '#4B5563',
    marginBottom: '1rem',
    backgroundColor: '#EFF6FF',
    display: 'inline-block',
    padding: '0.25rem 1rem',
    borderRadius: '9999px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  },
  slideCounterCurrent: {
    fontWeight: 600,
    color: '#2563EB'
  },
  slideDescription: {
    fontSize: '1.125rem',
    color: '#1F2937',
    maxWidth: '36rem',
    margin: '0 auto'
  },
  // About section styles
  aboutSection: {
    padding: '5rem 1.5rem',
    background: 'linear-gradient(to bottom, #F9FAFB, white)'
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '3rem'
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.75rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    backgroundImage: 'linear-gradient(to right, #2563EB, #4F46E5)'
  },
  cardText: {
    fontSize: '1.125rem',
    color: '#4B5563',
    marginBottom: '2rem',
    lineHeight: 1.7
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem'
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    padding: '1rem',
    border: '1px solid #DBEAFE',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'flex-start'
  },
  featureCardHover: {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-4px)',
    borderColor: '#BFDBFE'
  },
  featureIconContainer: {
    backgroundColor: '#EFF6FF',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    marginRight: '0.75rem',
    flexShrink: 0,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  },
  featureIcon: {
    height: '1.5rem',
    width: '1.5rem',
    color: '#2563EB'
  },
  featureContent: {
    flex: 1
  },
  featureTitle: {
    fontWeight: 600,
    fontSize: '1.125rem',
    marginBottom: '0.25rem',
    color: '#1F2937'
  },
  featureDescription: {
    color: '#4B5563',
    fontSize: '0.875rem'
  },
  // Resources section styles
  resourcesSection: {
    padding: '5rem 1.5rem',
    backgroundColor: 'white'
  },
  resourcesDescription: {
    marginTop: '1.5rem',
    fontSize: '1.125rem',
    color: '#4B5563',
    maxWidth: '48rem',
    margin: '1.5rem auto 0'
  },
  resourcesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.25rem',
    marginTop: '3rem'
  },
  resourceCard: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
    border: '1px solid #F3F4F6',
    transform: 'translateY(0)',
    overflow: 'hidden'
  },
  resourceCardHover: {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-4px)'
  },
  resourceCardContent: {
    background: 'linear-gradient(to right, #EFF6FF, #EEF2FF)',
    padding: '1rem'
  },
  resourceIconContainer: {
    width: '3rem',
    height: '3rem',
    backgroundColor: 'white',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  },
  resourceIcon: {
    height: '1.5rem',
    width: '1.5rem',
    color: '#2563EB'
  },
  resourceTitle: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#1F2937'
  },
  resourceDescription: {
    color: '#4B5563',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
    marginBottom: '0.75rem',
    height: '2.5rem',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  resourceButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '0.5rem 1rem',
    backgroundImage: 'linear-gradient(to right, #3B82F6, #4F46E5)',
    color: 'white',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  resourceButtonIcon: {
    marginLeft: '0.5rem',
    width: '1rem',
    height: '1rem'
  },
  // Gallery section styles
  gallerySection: {
    padding: '5rem 1.5rem',
    background: 'linear-gradient(to bottom, white, #F9FAFB)'
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginTop: '3rem'
  },
  galleryItem: {
    position: 'relative',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    cursor: 'pointer',
    transform: 'translateY(0)',
    transition: 'all 0.3s ease'
  },
  galleryItemHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  },
  galleryImageContainer: {
    position: 'relative',
    backgroundColor: '#F3F4F6'
  },
  galleryImageSquare: {
    aspectRatio: '1/1'
  },
  galleryImageVideo: {
    aspectRatio: '16/9'
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  galleryVideoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.9
  },
  galleryVideoIcon: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  galleryVideoIconContainer: {
    backgroundColor: 'rgba(37, 99, 235, 0.8)',
    backdropFilter: 'blur(4px)',
    padding: '1rem',
    borderRadius: '9999px'
  },
  galleryVideoIconSvg: {
    height: '2rem',
    width: '2rem',
    color: 'white'
  },
  galleryOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    display: 'flex',
    alignItems: 'flex-end'
  },
  galleryOverlayHover: {
    opacity: 1
  },
  galleryOverlayContent: {
    padding: '0.75rem'
  },
  galleryOverlayText: {
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: 500
  },
  galleryZoomIcon: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease'
  },
  galleryZoomIconHover: {
    opacity: 1
  },
  galleryZoomContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(4px)',
    padding: '0.5rem',
    borderRadius: '9999px'
  },
  galleryZoomSvg: {
    height: '1.25rem',
    width: '1.25rem',
    color: '#2563EB'
  },
  galleryVideoSpan: {
    gridColumn: 'span 2'
  },
  // Modal styles
  modal: {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(4px)'
  },
  modalContent: {
    position: 'relative',
    maxWidth: '64rem',
    maxHeight: '90vh',
    width: '100%',
    overflow: 'hidden'
  },
  modalCloseButton: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    padding: '0.5rem',
    borderRadius: '9999px',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  modalCloseButtonHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  modalVideo: {
    backgroundColor: 'black',
    borderRadius: '0.5rem',
    overflow: 'hidden'
  },
  modalVideoElement: {
    width: '100%',
    height: 'auto',
    maxHeight: '80vh'
  },
  modalImage: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(4px)',
    padding: '0.5rem',
    borderRadius: '0.5rem'
  },
  modalImageElement: {
    width: '100%',
    height: 'auto',
    maxHeight: '80vh',
    objectFit: 'contain',
    borderRadius: '0.25rem'
  },
  // Social media & contact styles
  socialMediaContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginTop: '2rem',
    flexWrap: 'wrap'
  },
  socialMediaButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    transition: 'all 0.3s ease',
    color: 'white',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  },
  facebookButton: {
    backgroundColor: '#1877F2'
  },
  twitterButton: {
    backgroundColor: '#1DA1F2'
  },
  instagramButton: {
    background: 'linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)'
  },
  emailButton: {
    backgroundColor: '#EA4335'
  },
  socialIcon: {
    width: '1.25rem',
    height: '1.25rem',
    marginRight: '0.5rem'
  }
};

// Media queries for responsive design
const getResponsiveStyle = (windowWidth) => {
  if (windowWidth <= 640) {
    return {
      pageTitle: {
        fontSize: '2.5rem'
      },
      pageSubtitle: {
        fontSize: '1.25rem'
      },
      sectionTitle: {
        fontSize: '1.75rem'
      },
      cardGrid: {
        gridTemplateColumns: '1fr'
      },
      featureGrid: {
        gridTemplateColumns: '1fr'
      },
      resourcesGrid: {
        gridTemplateColumns: '1fr'
      },
      galleryGrid: {
        gridTemplateColumns: '1fr'
      }
    };
  } else if (windowWidth <= 768) {
    return {
      cardGrid: {
        gridTemplateColumns: '1fr'
      },
      featureGrid: {
        gridTemplateColumns: 'repeat(2, 1fr)'
      },
      resourcesGrid: {
        gridTemplateColumns: 'repeat(2, 1fr)'
      },
      galleryGrid: {
        gridTemplateColumns: 'repeat(2, 1fr)'
      }
    };
  } else {
    return {
      cardGrid: {
        gridTemplateColumns: 'repeat(2, 1fr)'
      },
      featureGrid: {
        gridTemplateColumns: 'repeat(2, 1fr)'
      },
      resourcesGrid: {
        gridTemplateColumns: 'repeat(4, 1fr)'
      },
      galleryGrid: {
        gridTemplateColumns: 'repeat(4, 1fr)'
      }
    };
  }
};

const MarutiPage = ({ onNavigate }) => {
  // Responsive state
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  // Get responsive styles based on window width
  const responsiveStyles = getResponsiveStyle(windowWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamic gallery images 
  const images = [
    { src: image1, name: 'image-1' },
    { src: image2, name: 'image-2' },
    { src: image3, name: 'image-3' }
  ];
  
  const videos = [
    { src: image4, name: 'image-4' }
  ];

  // Use these for the gallery
  const [galleryImages] = useState(images);
  const [videoFiles] = useState(videos);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = galleryImages.map(img => img.src);
  
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
      title: "Singularity Doc",
      description: "Download our comprehensive documentation and design specifications.",
      link: singularityDoc,
      type: "download"
    },
    {
      title: "SUAS Handbook",
      description: "Access the official SUAS competition handbook and resources.",
      link: "https://robonation.gitbook.io/suas-resources/section-2-design-documentation/2.3.-team-website",
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

  // Gallery grid section
  const renderGalleryGrid = () => {
    if (galleryImages.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No gallery images available</p>
        </div>
      );
    }
    
    return (
      <div style={{
        ...styles.galleryGrid,
        ...(responsiveStyles.galleryGrid || {})
      }}>
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05 * index }}
            viewport={{ once: true }}
            style={styles.galleryItem}
            onClick={() => openModal(image.src)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              e.currentTarget.querySelector('[data-overlay]').style.opacity = '1';
              e.currentTarget.querySelector('[data-zoom]').style.opacity = '1';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              e.currentTarget.querySelector('[data-overlay]').style.opacity = '0';
              e.currentTarget.querySelector('[data-zoom]').style.opacity = '0';
            }}
          >
            <div style={{
              ...styles.galleryImageContainer,
              ...styles.galleryImageSquare
            }}>
              <img 
                src={image.src} 
                alt={`Gallery image ${image.name}`} 
                style={styles.galleryImage}
              />
            </div>
            <div data-overlay style={styles.galleryOverlay}>
              <div style={styles.galleryOverlayContent}>
                <p style={styles.galleryOverlayText}>{image.name}</p>
              </div>
            </div>
            <div data-zoom style={styles.galleryZoomIcon}>
              <div style={styles.galleryZoomContainer}>
                <svg style={styles.galleryZoomSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
        
        {videoFiles.map((video, index) => (
          <motion.div
            key={`video-${index}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + (0.1 * index) }}
            viewport={{ once: true }}
            style={{
              ...styles.galleryItem,
              ...styles.galleryVideoSpan
            }}
            onClick={() => openModal(video.src, true)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              e.currentTarget.querySelector('[data-overlay]').style.opacity = '1';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              e.currentTarget.querySelector('[data-overlay]').style.opacity = '0';
            }}
          >
            <div style={{
              ...styles.galleryImageContainer,
              ...styles.galleryImageVideo
            }}>
              {galleryImages.length > 0 ? (
                <img 
                  src={galleryImages[0].src} 
                  alt={`Video thumbnail for ${video.name}`} 
                  style={styles.galleryVideoImage}
                />
              ) : (
                <div style={{
                  backgroundColor: '#EEF2FF',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span>Video Preview</span>
                </div>
              )}
              <div style={styles.galleryVideoIcon}>
                <div style={styles.galleryVideoIconContainer}>
                  <svg style={styles.galleryVideoIconSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div data-overlay style={styles.galleryOverlay}>
              <div style={styles.galleryOverlayContent}>
                <p style={styles.galleryOverlayText}>{video.name}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.pageContainer}>
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
            MARUTI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-700"
          >
            Student Unmanned Aerial Systems (SUAS) Competition Project
          </motion.p>
        </div>
      </header>

      {/* Section 1: Standard Slideshow */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={styles.sectionHeader}
          >
            <h2 style={{
              ...styles.sectionTitle,
              ...(responsiveStyles.sectionTitle || {})
            }}>Project Overview</h2>
            <div style={styles.sectionDivider}></div>
          </motion.div>
          
          {/* Standard Slideshow */}
          {carouselImages.length > 0 ? (
            <div 
              style={styles.slideshow}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
            {/* Slideshow images */}
              <div style={styles.slideshowContainer}>
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                    style={{
                      ...styles.slide,
                      opacity: index === currentSlide ? 1 : 0,
                      zIndex: index === currentSlide ? 10 : 0,
                      pointerEvents: index === currentSlide ? 'auto' : 'none'
                    }}
                >
                  <img
                    src={image}
                      alt={`Maruti Project Slide ${index + 1}`}
                      style={styles.slideImage}
                  />
                </div>
              ))}
              
              {/* Slideshow arrows */}
              <button
                  style={{
                    ...styles.slideNavButton,
                    ...styles.prevButton
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'}
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                  style={{
                    ...styles.slideNavButton,
                    ...styles.nextButton
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'}
                onClick={nextSlide}
                aria-label="Next slide"
              >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Slideshow navigation dots */}
              <div style={styles.slideNavDots}>
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                    style={{
                      ...styles.slideNavDot,
                      ...(index === currentSlide ? styles.slideNavDotActive : {})
                    }}
                    onMouseOver={(e) => {
                      if (index !== currentSlide) {
                        e.currentTarget.style.backgroundColor = '#9CA3AF';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (index !== currentSlide) {
                        e.currentTarget.style.backgroundColor = '#D1D5DB';
                      }
                    }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: '#F3F4F6',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <p>No slides available to display</p>
            </div>
          )}
          
          <motion.div 
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {carouselImages.length > 0 && (
              <p style={styles.slideCounter}>
                <span style={styles.slideCounterCurrent}>{currentSlide + 1}</span> / {carouselImages.length}
            </p>
            )}
            <p style={styles.slideDescription}>
              Experience our Maruti UAV project showcasing the design and capabilities of our autonomous aerial system.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: About */}
      <section style={{
        ...styles.aboutSection
      }}>
        <div style={styles.sectionInner}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={styles.sectionHeader}
          >
            <h2 style={{
              ...styles.sectionTitle,
              ...(responsiveStyles.sectionTitle || {})
            }}>About Maruti</h2>
            <div style={styles.sectionDivider}></div>
          </motion.div>
          
          <div style={{
            ...styles.cardGrid,
            ...(responsiveStyles.cardGrid || {})
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={styles.card}
            >
              <h3 style={styles.cardTitle}>SUAS Competition Project</h3>
              <p style={styles.cardText}>
                Project Maruti is Singularity Team's entry for the Student Unmanned Aerial Systems (SUAS) competition 
                hosted by RoboNation. This annual competition brings together students from around the world to design, 
                build, and demonstrate fully autonomous unmanned aerial systems.
              </p>
              <p style={styles.cardText}>
                Held at St. Mary's County Regional Airport in Maryland, the competition challenges teams to create 
                UAVs capable of autonomous flight, obstacle avoidance, object detection, classification, localization, 
                and air delivery. Our team has developed the Maruti system to excel in these challenging tasks.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                style={styles.button}
                onClick={() => window.open('https://robonation.org/programs/student-unmanned-aerial-systems/', '_blank')}
              >
                Learn More
                <svg style={{ marginLeft: '0.5rem', width: '1rem', height: '1rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={styles.card}
            >
              <h3 style={styles.cardTitle}>Key Features</h3>
              <div style={{
                ...styles.featureGrid,
                ...(responsiveStyles.featureGrid || {})
              }}>
                {[
                  {
                    title: "Autonomous Flight",
                    description: "Advanced autonomous navigation and flight control systems",
                    icon: (
                      <svg style={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    )
                  },
                  {
                    title: "Obstacle Avoidance",
                    description: "Real-time detection and avoidance of obstacles in flight path",
                    icon: (
                      <svg style={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )
                  },
                  {
                    title: "Object Detection",
                    description: "Computer vision system for accurate object identification",
                    icon: (
                      <svg style={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    )
                  },
                  {
                    title: "Air Delivery",
                    description: "Precision payload delivery and deployment system",
                    icon: (
                      <svg style={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )
                  },
                  {
                    title: "Mission Planning",
                    description: "Advanced waypoint planning and mission execution software",
                    icon: (
                      <svg style={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )
                  },
                  {
                    title: "Modular Design",
                    description: "Modular architecture for rapid repair and field adaptability",
                    icon: (
                      <svg style={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    style={styles.featureCard}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = '#BFDBFE';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.borderColor = '#DBEAFE';
                    }}
                  >
                    <div style={styles.featureIconContainer}>
                        {feature.icon}
                      </div>
                    <div style={styles.featureContent}>
                      <h4 style={styles.featureTitle}>{feature.title}</h4>
                      <p style={styles.featureDescription}>{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Section 3: Resources */}
      <section style={styles.resourcesSection}>
        <div style={styles.sectionInner}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={styles.sectionHeader}
          >
            <h2 style={{
              ...styles.sectionTitle,
              ...(responsiveStyles.sectionTitle || {})
            }}>Resources</h2>
            <div style={styles.sectionDivider}></div>
            <p style={styles.resourcesDescription}>
              Access technical documentation, competition guidelines, and team resources for our SUAS project.
            </p>
          </motion.div>
          
          <div style={{
            ...styles.resourcesGrid,
            ...(responsiveStyles.resourcesGrid || {})
          }}>
            {referenceCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
                style={styles.resourceCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={styles.resourceCardContent}>
                  <div style={styles.resourceIconContainer}>
                    {card.type === "download" ? (
                      <svg style={styles.resourceIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    ) : (
                      <svg style={styles.resourceIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    )}
                  </div>
                  <h3 style={styles.resourceTitle}>{card.title}</h3>
                  <p style={styles.resourceDescription}>{card.description}</p>
                  <motion.button 
                    style={styles.resourceButton}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => {
                      if (card.type === "download") {
                        // For download links, create an anchor and download
                        const link = document.createElement('a');
                        link.href = card.link;
                        link.download = card.title.replace(/\s+/g, '_').toLowerCase() + '.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      } else {
                        window.open(card.link, '_blank');
                      }
                    }}
                  >
                    {card.type === "download" ? "Download" : "View Document"}
                    <svg style={styles.resourceButtonIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
      
          {/* Additional Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '3rem',
              flexWrap: 'wrap'
            }}
          >
            <motion.button
              style={{
                ...styles.button,
                backgroundColor: '#059669'
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
            >
              <svg style={{ marginRight: '0.5rem', width: '1.25rem', height: '1.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Flight Demo
            </motion.button>
          </motion.div>
          
          {/* Social Media and Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            style={styles.socialMediaContainer}
          >
            <motion.button
              style={{
                ...styles.socialMediaButton,
                ...styles.facebookButton
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => window.open('https://www.facebook.com/profile.php?id=61573152856177', '_blank')}
            >
              <svg style={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
              Facebook
            </motion.button>
            
            <motion.button
              style={{
                ...styles.socialMediaButton,
                ...styles.twitterButton
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => window.open('https://x.com/TeamSingularIT', '_blank')}
            >
              <svg style={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </motion.button>
            
            <motion.button
              style={{
                ...styles.socialMediaButton,
                ...styles.instagramButton
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => window.open('https://www.instagram.com/_teamsingularit_/', '_blank')}
            >
              <svg style={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.058.975.045 1.504.207 1.857.344.466.182.8.398 1.15.748.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
              Instagram
            </motion.button>
            
            <motion.button
              style={{
                ...styles.socialMediaButton,
                ...styles.emailButton
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => window.location.href = 'mailto:officialsingularit@gmail.com'}
            >
              <svg style={styles.socialIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </section>
            
      {/* Section 4: Gallery */}
      <section style={styles.gallerySection}>
        <div style={styles.sectionInner}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={styles.sectionHeader}
          >
            <h2 style={{
              ...styles.sectionTitle,
              ...(responsiveStyles.sectionTitle || {})
            }}>Gallery</h2>
            <div style={styles.sectionDivider}></div>
            <p style={styles.resourcesDescription}>
              Explore our Maruti UAV through photos and videos of our development and flight tests.
            </p>
          </motion.div>
          
          {/* Gallery Grid - call the render function */}
          {renderGalleryGrid()}
          
          {/* Modal */}
          {isModalOpen && (
            <div 
              style={styles.modal}
              onClick={closeModal}
            >
              <div 
                style={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button 
                  style={styles.modalCloseButton}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'}
                  onClick={closeModal}
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {isVideo ? (
                  <div style={styles.modalVideo}>
                    <video 
                      controls 
                      autoPlay
                      style={styles.modalVideoElement}
                    >
                      <source src={selectedItem} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div style={styles.modalImage}>
                    <img 
                      src={selectedItem} 
                      alt="Large preview" 
                      style={styles.modalImageElement}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MarutiPage; 