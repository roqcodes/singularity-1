import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const NewDesignPage = ({ onNavigate }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const frameIdRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize Three.js scene
  useEffect(() => {
    // Only initialize once
    if (sceneRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 0.5, 3);
    cameraRef.current = camera;

    // Create renderer
    try {
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false
      });
      
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.shadowMap.enabled = true;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      
      // Clear any existing canvas
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Add controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 1.5;
      controls.maxDistance = 10;
      controlsRef.current = controls;

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const spotLight = new THREE.SpotLight(0xffffff, 1);
      spotLight.position.set(10, 10, 10);
      spotLight.angle = 0.15;
      spotLight.penumbra = 1;
      spotLight.castShadow = true;
      scene.add(spotLight);

      const pointLight = new THREE.PointLight(0xffffff, 0.5);
      pointLight.position.set(-10, -10, -10);
      scene.add(pointLight);

      // Add fallback model while loading
      const fallbackGroup = new THREE.Group();
      const boxGeometry = new THREE.BoxGeometry(1.5, 0.5, 2);
      const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      fallbackGroup.add(box);
      
      const topGeometry = new THREE.BoxGeometry(0.5, 0.2, 0.5);
      const topMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
      const top = new THREE.Mesh(topGeometry, topMaterial);
      top.position.y = 0.5;
      fallbackGroup.add(top);
      
      scene.add(fallbackGroup);
      modelRef.current = fallbackGroup;

      // Start animation loop
      const animate = () => {
        if (!rendererRef.current) return;
        
        frameIdRef.current = requestAnimationFrame(animate);
        
        if (controlsRef.current) {
          controlsRef.current.update();
        }
        
        // Rotate fallback model if visible
        if (modelRef.current === fallbackGroup) {
          fallbackGroup.rotation.y += 0.01;
        }
        
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      };
      
      animate();

      // Load the actual model
      loadModel();

      // Handle window resize
      const handleResize = () => {
        if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;
        
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        
        if (frameIdRef.current) {
          cancelAnimationFrame(frameIdRef.current);
        }
        
        if (controlsRef.current) {
          controlsRef.current.dispose();
        }
        
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
        
        if (modelRef.current) {
          disposeObject(modelRef.current);
        }
      };
    } catch (err) {
      console.error("Failed to initialize 3D renderer:", err);
      setError("Could not initialize 3D viewer. Your browser may not support WebGL.");
      setLoading(false);
    }
  }, []);

  // Function to load the 3D model
  const loadModel = () => {
    if (!sceneRef.current) return;
    
    const loader = new GLTFLoader();
    const modelUrl = '/quadcopter.glb?v=' + Date.now(); // Cache busting
    
    setLoading(true);
    setError(null);
    
    // Set a timeout in case loading hangs
    const timeoutId = setTimeout(() => {
      console.log("Model loading timeout reached");
      setLoading(false);
    }, 20000);
    
    loader.load(
      modelUrl,
      (gltf) => {
        clearTimeout(timeoutId);
        
        const model = gltf.scene;
        
        // Configure model
        model.scale.set(0.8, 0.8, 0.8);
        model.position.set(0, 0, 0);
        
        // Add shadows to all meshes
        model.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        
        // Remove fallback model
        if (modelRef.current && sceneRef.current) {
          sceneRef.current.remove(modelRef.current);
          disposeObject(modelRef.current);
        }
        
        // Add new model
        sceneRef.current.add(model);
        modelRef.current = model;
        
        setLoading(false);
        console.log("Model loaded successfully");
      },
      (xhr) => {
        // Progress callback
        if (xhr.lengthComputable) {
          const progress = Math.round((xhr.loaded / xhr.total) * 100);
          console.log(`Loading model: ${progress}%`);
        }
      },
      (error) => {
        clearTimeout(timeoutId);
        console.error("Error loading model:", error);
        setError("Failed to load 3D model. Please refresh and try again.");
        setLoading(false);
      }
    );
  };

  // Helper to dispose Three.js objects
  const disposeObject = (object) => {
    if (!object) return;
    
    object.traverse((node) => {
      if (node.isMesh) {
        if (node.geometry) {
          node.geometry.dispose();
        }
        
        if (node.material) {
          if (Array.isArray(node.material)) {
            node.material.forEach(material => material.dispose());
          } else {
            node.material.dispose();
          }
        }
      }
    });
  };

  return (
    <div className="h-full w-full relative bg-white pt-24 px-10">
      {/* Brand logo */}
      <div className="absolute top-8 left-0 right-0 text-center z-20">
        <h2 className="text-xl tracking-brand font-light">singularit</h2>
      </div>

      {/* Title header */}
      <div className="flex justify-between items-center w-full px-4 mb-12">
        <h2 className="text-2xl font-semibold">Quantum 2</h2>
        <div className="flex items-center">
          <div className="w-60 h-px bg-black mx-4"></div>
          <h2 className="text-2xl font-semibold">The Design.</h2>
        </div>
      </div>

      {/* 3D Model container */}
      <div className="w-full h-[75vh] relative">
        {/* Loading indicator */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40">
            <div className="backdrop-blur-md bg-white/80 p-8 rounded-2xl shadow-2xl max-w-sm z-50 text-center border border-blue-100/50">
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

        {/* Error message */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-white bg-opacity-90">
            <div className="flex flex-col items-center text-center max-w-md p-8">
              <p className="text-red-500 font-medium text-lg mb-4">{error}</p>
              <button 
                onClick={loadModel}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Three.js container */}
        <div 
          ref={containerRef} 
          className="w-full h-full"
          style={{ touchAction: 'none' }} // Prevent touch action issues on mobile
        ></div>
      </div>
    </div>
  );
};

export default NewDesignPage; 