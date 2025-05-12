import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import IntroPage from './components/IntroPage';
import AboutPage from './components/AboutPage';
import ProjectsPage from './components/ProjectsPage';
import QuantumPage from './components/QuantumPage';
import DesignPage from './components/DesignPage';
import GalleryPage from './components/GalleryPage';
import './App.css';

// WebGL support detection component
const WebGLWarning = () => (
  <div className="webgl-warning">
    <h2>WebGL Not Supported</h2>
    <p>Your browser doesn't support WebGL or it's disabled, which is required for the 3D experience.</p>
    <p>Please try a modern browser like Chrome, Firefox, or Edge with hardware acceleration enabled.</p>
  </div>
);

// Sidebar Navigation component
const SidebarNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { id: 'intro', label: 'Home', path: '/intro' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'projects', label: 'Projects', path: '/projects' },
    { id: 'design', label: 'Design', path: '/design' },
    { id: 'gallery', label: 'Gallery', path: '/gallery' },
  ];
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const navigateTo = (path) => {
    navigate(path);
    setIsOpen(false);
  };
  
  const currentPath = '/' + (location.pathname.split('/')[1] || 'intro');
  
  return (
    <>
      {/* Sandwich/Back Button - no background */}
      <button 
        className={`fixed top-8 left-8 z-50 menu-button ${isOpen ? 'back-arrow' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle navigation menu"
      >
        <div className="flex flex-col justify-between w-7 h-6">
          <span className="block h-0.5 bg-black w-7 transition-all duration-700 fluid-transition origin-left" />
          <span className="block h-0.5 bg-black w-7 transition-all duration-700 fluid-transition" />
          <span className="block h-0.5 bg-black w-7 transition-all duration-700 fluid-transition origin-left" />
        </div>
      </button>
      
      {/* Full-screen Navigation */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-transform duration-700 fluid-transition ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col justify-center items-center h-full relative">
          {/* Menu Items */}
          <nav className="flex flex-col items-center">
            <h2 className="font-bold text-3xl text-black mb-10">Navigate.</h2>
            <ul className="space-y-10 list-none p-0">
              {menuItems.map(item => (
                <li key={item.id} className="text-center">
                  <button 
                    className={`text-4xl font menu-button transition-all duration-500 ease-in-out tracking-normal hover:tracking-widest nav-menu-item ${
                      currentPath === item.path 
                        ? 'text-blue-600'
                        : 'text-black hover:text-gray-600'
                    }`}
                    onClick={() => navigateTo(item.path)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="absolute bottom-8 text-center">
            <p className="text-gray-500 text-sm">© 2025 Singularity</p>
          </div>
        </div>
      </div>
    </>
  );
};

// Wrapper components to handle navigation
const IntroWrapper = () => {
  const navigate = useNavigate();
  return (
    <>
      <SidebarNavigation />
      <IntroPage onNavigate={(page) => navigate(`/${page}`)} />
    </>
  );
};

const AboutWrapper = () => {
  const navigate = useNavigate();
  return (
    <>
      <SidebarNavigation />
      <AboutPage onNavigate={(page) => navigate(`/${page}`)} />
    </>
  );
};

const ProjectsWrapper = () => {
  const navigate = useNavigate();
  return (
    <>
      <SidebarNavigation />
      <ProjectsPage onNavigate={(page) => navigate(`/${page}`)} />
    </>
  );
};

const QuantumWrapper = () => {
  const navigate = useNavigate();
  return (
    <>
      <SidebarNavigation />
      <QuantumPage onNavigate={(page) => navigate(`/${page}`)} />
    </>
  );
};

const DesignWrapper = () => {
  const navigate = useNavigate();
  return (
    <>
      <SidebarNavigation />
      <DesignPage onNavigate={(page) => navigate(`/${page}`)} />
    </>
  );
};

const GalleryWrapper = () => {
  const navigate = useNavigate();
  return (
    <>
      <SidebarNavigation />
      <GalleryPage onNavigate={(page) => navigate(`/${page}`)} />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroWrapper />} />
        <Route path="/intro" element={<IntroWrapper />} />
        <Route path="/about" element={<AboutWrapper />} />
        <Route path="/projects" element={<ProjectsWrapper />} />
        <Route path="/quantum" element={<QuantumWrapper />} />
        <Route path="/design" element={<DesignWrapper />} />
        <Route path="/gallery" element={<GalleryWrapper />} />
      </Routes>
    </Router>
  );
};

export default App;