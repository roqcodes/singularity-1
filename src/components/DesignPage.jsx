import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ThreeJSModel from './ThreeJSModel';

// Create a memoized ThreeJSModel to prevent re-renders
const MemoizedThreeJSModel = React.memo(ThreeJSModel);

// Mock data for drone parts map
const DRONE_PARTS_DATA = [
  { 
    id: 'main-body', 
    name: 'Central Frame',
    coordinates: { x: 50, y: 50 },
    description: 'The aerodynamic central frame houses the flight control system and serves as the mounting point for all components. Made from carbon fiber composite for optimal strength-to-weight ratio.'
  },
  { 
    id: 'front-right-motor', 
    name: 'FR Motor',
    coordinates: { x: 75, y: 30 },
    description: 'High-efficiency brushless motor with precision German engineering. This motor provides forward-right directional control with 35% more power efficiency than previous generation.'
  },
  { 
    id: 'front-left-motor', 
    name: 'FL Motor',
    coordinates: { x: 25, y: 30 },
    description: 'High-efficiency brushless motor that drives the front left propeller. This precision-engineered component features smart temperature monitoring and adaptive torque management.'
  },
  { 
    id: 'rear-right-motor', 
    name: 'RR Motor',
    coordinates: { x: 75, y: 70 },
    description: 'The rear right motor incorporates our latest QuietTech™ technology, reducing noise by 40% while maintaining power output. The specialized winding pattern enables instant response.'
  },
  { 
    id: 'rear-left-motor', 
    name: 'RL Motor',
    coordinates: { x: 25, y: 70 },
    description: 'The rear left motor features adaptive current management for efficient power usage during flight. This motor compensates for crosswinds and turbulence with millisecond reaction times.'
  },
  { 
    id: 'camera-gimbal', 
    name: 'Camera Gimbal',
    coordinates: { x: 50, y: 30 },
    description: 'Our advanced 3-axis stabilized gimbal system incorporates machine learning algorithms to predict and counteract drone movements before they affect footage.'
  },
  { 
    id: 'battery', 
    name: 'Power Cell',
    coordinates: { x: 50, y: 65 },
    description: 'The next-generation lithium-silicon battery pack delivers 30% more flight time than standard LiPo alternatives. Features rapid-charge capability and smart power management system.'
  }
];

const DesignPage = ({ onNavigate }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [showTip, setShowTip] = useState(true);
  const [mapVisible, setMapVisible] = useState(false);
  const [activePartId, setActivePartId] = useState(null);
  const [partDetailsOpen, setPartDetailsOpen] = useState(false);
  const [labelsVisible, setLabelsVisible] = useState(false);
  const mountTimeRef = useRef(Date.now());
  const mountedRef = useRef(true);
  const timeoutRef = useRef(null);
  
  // Track mount time to prevent issues with component lifecycle
  useEffect(() => {
    console.log("DesignPage mounted");
    mountTimeRef.current = Date.now();
    mountedRef.current = true;
    
    // Set showTip to false as we're removing the tooltip
    setShowTip(false);
    
    // Cache any needed resources
    const preloadResources = () => {
      const imageUrls = [];
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };
    
    preloadResources();
    
    return () => {
      console.log("DesignPage unmounted");
      mountedRef.current = false;
      
      // Clear any timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle model loading completion
  const handleModelLoaded = useCallback((loaded) => {
    console.log("Model loaded in DesignPage:", loaded);
    if (mountedRef.current) {
      setModelLoaded(loaded);
    }
  }, []);
  
  // Handle part selection
  const handlePartSelect = useCallback((partId) => {
    setActivePartId(partId);
    setPartDetailsOpen(true);
  }, []);
  
  // Get active part data
  const activePart = useMemo(() => {
    return DRONE_PARTS_DATA.find(part => part.id === activePartId) || null;
  }, [activePartId]);

  const handleToggleLabels = () => {
    if (window.toggleLabels && typeof window.toggleLabels === 'function') {
      window.toggleLabels();
      setLabelsVisible(!labelsVisible);
    }
  };

  return (
    <div className="h-screen w-full relative bg-white overflow-hidden">
      {/* Brand logo */}
      <div className="absolute top-8 left-0 right-0 text-center z-20">
        <h2 className="text-xl tracking-brand font-light text-gray-800">S I N G U L A R I T Y</h2>
      </div>

      {/* Title header - updated with "Quantum 2 - The Design" */}
      <div className="absolute top-20 left-0 right-0 flex justify-center items-center w-full px-8 z-10">
        <h2 className="text-2xl font-semibold text-gray-800 design-page-title">
          <span className="font-bold text-3xl">Quantum 2</span>
          <span className="ml-2 text-gray-700"> - The Design</span>
        </h2>
      </div>

      {/* Toggle Labels Button - Fixed with label on left and toggle on right */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30">
        <label className="toggle-label-btn">
          <span className="text-sm font-medium text-blue-700 order-1">Labels</span>
          <div className="toggle-switch order-2">
            <input 
              type="checkbox" 
              className="sr-only"
              checked={labelsVisible}
              onChange={handleToggleLabels} 
            />
            <div className="toggle-bg"></div>
            <div className="toggle-dot"></div>
          </div>
        </label>
      </div>

      {/* 3D Model container with improved layout */}
      <div className="absolute inset-0 w-full h-screen pt-24">
        {/* Use the memoized model component with better container positioning */}
        <div 
          className="w-full h-full bg-transparent"
          style={{ position: 'relative' }}
        >
          <MemoizedThreeJSModel onLoaded={handleModelLoaded} />
        </div>
        
        {/* Loading indicator - improved with glassmorphic design */}
        {!modelLoaded && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40">
            <div className="backdrop-blur-md bg-white/80 p-8 rounded-2xl shadow-2xl max-w-sm z-50 text-center border border-blue-100/50 mobile-p-smaller">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full animate-spin-slow border-t-transparent"></div>
                <div className="absolute inset-4 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Initializing Explorer</h3>
              <p className="text-gray-600 mb-5 text-sm">
                Preparing the high-resolution 3D model for your interactive experience...
              </p>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full animate-progress-indeterminate"></div>
              </div>
              <p className="text-xs text-gray-500 mt-3 opacity-75">This may take a few moments depending on your connection.</p>
            </div>
          </div>
        )}
      </div>

      {/* Map Overlay - Only shown when mapVisible is true */}
      {mapVisible && (
        <div className="absolute right-8 bottom-20 z-30 backdrop-blur-md bg-white/75 rounded-xl shadow-2xl p-5 animate-slide-up max-w-md w-full border border-blue-100/50 design-page-overlay">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Drone Components
            </h3>
            <button 
              onClick={() => setMapVisible(false)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Part details */}
          {activePart && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">{activePart.name}</h4>
              <p className="text-gray-700 text-sm">{activePart.description}</p>
            </div>
          )}
          
          {/* Map visualization - simplified placeholder */}
          <div className="relative mt-6 border border-blue-100 rounded-lg bg-white/50 p-2">
            <div className="h-[200px] w-full relative rounded-lg overflow-hidden">
              <div className="border-2 border-blue-600 rounded-full absolute w-3 h-3 transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: '50%', left: '50%' }}
              ></div>
              {DRONE_PARTS_DATA.map(part => (
                <button 
                  key={part.id}
                  className={`absolute border-2 w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 rounded-full ${
                    activePartId === part.id ? 'border-blue-600 bg-blue-600' : 'border-gray-400 bg-white'
                  }`}
                  style={{ 
                    top: `${part.coordinates.y}%`, 
                    left: `${part.coordinates.x}%`,
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handlePartSelect(part.id)}
                >
                  <span className="sr-only">{part.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Feature details overlay */}
      {partDetailsOpen && activePart && (
        <div className="absolute bottom-8 left-8 z-30 backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-5 animate-slide-up max-w-md design-page-overlay">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold text-gray-800">{activePart.name}</h3>
            <button 
              onClick={() => setPartDetailsOpen(false)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-700 text-sm mb-4">{activePart.description}</p>
          
          {/* Additional info - just for visual richness */}
          <div className="flex justify-between text-xs text-gray-500 border-t border-gray-200 pt-4">
            <span>Weight: 58g</span>
            <span>Power: 4.5V</span>
            <span>Efficiency: 98%</span>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default DesignPage; 