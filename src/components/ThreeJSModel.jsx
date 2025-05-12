import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// Simple loading indicator component
function LoadingIndicator() {
  return (
    <div className="absolute inset-0 flex items-center justify-center h-full backdrop-blur-sm z-10">
      <div className="backdrop-blur-md bg-white/80 p-8 rounded-2xl shadow-2xl max-w-sm z-50 text-center border border-blue-100/50">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full animate-spin-slow border-t-transparent"></div>
        </div>
        <span className="text-xl font-semibold mb-2 text-gray-800 block">Loading 3D Model</span>
        <p className="text-gray-600 mb-5 text-sm">
          Preparing the interactive viewer...
        </p>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full animate-progress-indeterminate"></div>
        </div>
      </div>
    </div>
  );
}

// Main ThreeJSModel component using direct Three.js implementation
const ThreeJSModel = ({ onLoaded }) => {
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [visibleParts, setVisibleParts] = useState([]);
  
  // Refs for THREE.js objects and state
  const initializedRef = useRef(false);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const animationFrameRef = useRef(null);
  const loadStartedRef = useRef(false);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const touchStartTimeRef = useRef(0);
  const originalCameraPositionRef = useRef(null);
  const originalControlsTargetRef = useRef(null);
  const partLabelsRef = useRef([]);
  const partButtonsRef = useRef([]);
  const hoveredPartRef = useRef(null);
  const proximityThresholdRef = useRef(3);
  const lastCameraPosRef = useRef(new THREE.Vector3());
  const lastFrameTimeRef = useRef(0);
  const envMapRef = useRef(null);
  const mouseMoveThrottleRef = useRef(false);
  const lastCameraRotRef = useRef(null);
  const lastRaycastTimeRef = useRef(0);
  const raycastThrottleTimeRef = useRef(100); // ms between raycasts
  const markersContainerRef = useRef(null);
  
  // Memoize drone parts data to prevent recreation on each render
  const droneParts = useMemo(() => [
    { 
      id: 'main-body', 
      name: 'Central Frame', 
      description: 'The aerodynamic central frame houses the flight control system and serves as the mounting point for all components. Made from carbon fiber composite for optimal strength-to-weight ratio, it features integrated cooling channels and vibration dampening.', 
      position: [0, 0.1, 0],
      specs: ['Carbon fiber construction', 'Integrated shock absorption', 'IP54 weather resistance']
    },
    { 
      id: 'front-right-motor', 
      name: 'FR Motor', 
      description: 'High-efficiency brushless motor with precision German engineering. This motor provides forward-right directional control with 35% more power efficiency than previous generation. Features adaptive speed control and electronic braking systems.', 
      position: [0.7, 0.15, 0.7],
      specs: ['22,000 RPM max', '98.7% efficiency rating', 'Titanium alloy bearings']
    },
    { 
      id: 'front-left-motor', 
      name: 'FL Motor', 
      description: 'High-efficiency brushless motor that drives the front left propeller. This precision-engineered component features smart temperature monitoring and adaptive torque management for consistent performance in all conditions.', 
      position: [-0.7, 0.15, 0.7],
      specs: ['22,000 RPM max', '98.7% efficiency rating', 'Titanium alloy bearings']
    },
    { 
      id: 'rear-right-motor', 
      name: 'RR Motor', 
      description: 'The rear right motor incorporates our latest QuietTech™ technology, reducing noise by 40% while maintaining power output. The specialized winding pattern enables instant response to flight controller commands.', 
      position: [0.7, 0.15, -0.7],
      specs: ['22,000 RPM max', '98.7% efficiency rating', '30% noise reduction']
    },
    { 
      id: 'rear-left-motor', 
      name: 'RL Motor', 
      description: 'The rear left motor features adaptive current management for efficient power usage during flight. This motor compensates for crosswinds and turbulence with millisecond reaction times to maintain perfect flight stability.', 
      position: [-0.7, 0.15, -0.7],
      specs: ['22,000 RPM max', '98.7% efficiency rating', 'Titanium alloy bearings']
    },
    { 
      id: 'camera-gimbal', 
      name: 'Camera Gimbal', 
      description: 'Our advanced 3-axis stabilized gimbal system incorporates machine learning algorithms to predict and counteract drone movements before they affect footage. The carbon-nano-tube construction provides rigidity while keeping weight minimal.', 
      position: [0, 0, 0.9],
      specs: ['3-axis stabilization', '±0.005° accuracy', 'Carbon nanotube construction']
    },
    { 
      id: 'battery', 
      name: 'Power Cell', 
      description: 'The next-generation lithium-silicon battery pack delivers 30% more flight time than standard LiPo alternatives. Features rapid-charge capability and smart power management system that prioritizes critical systems based on flight conditions.', 
      position: [0, -0.1, 0],
      specs: ['30 min flight time', 'Quick-swap design', '500+ charge cycles']
    }
  ], []);
  
  // Throttled raycasting helper
  const throttledRaycast = useCallback(() => {
    if (mouseMoveThrottleRef.current) return;
    mouseMoveThrottleRef.current = true;
    
    // Reset throttle after a short delay (16ms ≈ 60fps)
    setTimeout(() => {
      mouseMoveThrottleRef.current = false;
    }, 16);
    
    checkHoveredPart();
  }, []);

  // Proper disposal function for THREE.js objects
  const disposeMesh = useCallback((object) => {
    if (!object) return;
    
    object.traverse(node => {
      if (node.isMesh) {
        if (node.geometry) {
          node.geometry.dispose();
        }
        
        if (node.material) {
          if (Array.isArray(node.material)) {
            node.material.forEach(material => {
              // Dispose of all material properties that have a dispose method
              Object.keys(material).forEach(prop => {
                if (material[prop] && typeof material[prop].dispose === 'function') {
                  material[prop].dispose();
                }
              });
              material.dispose();
            });
          } else {
            // Dispose of all material properties that have a dispose method
            Object.keys(node.material).forEach(prop => {
              if (node.material[prop] && typeof node.material[prop].dispose === 'function') {
                node.material[prop].dispose();
              }
            });
            node.material.dispose();
          }
        }
      }
    });
  }, []);
  
  // Generate environment map once and reuse it
  const generateEnvironmentMap = useCallback(() => {
    // Return cached environment map if it exists
    if (envMapRef.current) return envMapRef.current;
    
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size * 2;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Create a gradient sky with light colors for white theme
    const gradient = ctx.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(0, '#e6f0ff'); // Light blue at top
    gradient.addColorStop(0.5, '#f0f7ff'); // Lighter blue
    gradient.addColorStop(1, '#ffffff'); // White at bottom
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size * 2, size);
    
    // Add subtle dots for better reflections
    ctx.fillStyle = '#3b82f6';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * size * 2;
      const y = Math.random() * size * 0.5;
      const radius = Math.random() * 1;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    
    // Cache the texture
    envMapRef.current = texture;
    
    return texture;
  }, []);
  
  // Helper function to create placeholder drone
  const createPlaceholderDrone = useCallback(() => {
    const group = new THREE.Group();
    
    // Body
    const bodyGeometry = new THREE.BoxGeometry(1.5, 0.2, 1.5);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3b82f6,
      roughness: 0.5,
      metalness: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    group.add(body);
    
    // Top
    const topGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.8);
    const topMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x60a5fa,
      roughness: 0.6,
      metalness: 0.4
    });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.y = 0.2;
    top.castShadow = true;
    group.add(top);
    
    // Add motors at each corner
    const motorPositions = [
      [0.7, 0.15, 0.7],
      [-0.7, 0.15, 0.7],
      [0.7, 0.15, -0.7],
      [-0.7, 0.15, -0.7]
    ];
    
    motorPositions.forEach((pos, index) => {
      // Use instanced geometries for motors to improve performance
      const motorGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 12);
      const motorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1e40af,
        roughness: 0.5,
        metalness: 0.5
      });
      const motor = new THREE.Mesh(motorGeometry, motorMaterial);
      motor.position.set(pos[0], pos[1], pos[2]);
      motor.castShadow = true;
      group.add(motor);
      
      // Add propellers
      const propGeometry = new THREE.BoxGeometry(0.8, 0.05, 0.1);
      const propMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xdbeafe,
        roughness: 0.7,
        metalness: 0.2
      });
      const propeller = new THREE.Mesh(propGeometry, propMaterial);
      propeller.position.set(pos[0], pos[1] + 0.1, pos[2]);
      propeller.castShadow = true;
      
      // Rotate propellers differently based on position to visually indicate rotation direction
      if ((pos[0] > 0 && pos[2] > 0) || (pos[0] < 0 && pos[2] < 0)) {
        propeller.rotation.y = 0;
      } else {
        propeller.rotation.y = Math.PI / 2;
      }
      
      group.add(propeller);
    });
    
    return group;
  }, []);
  
  // Initialize Three.js scene - only once
  useEffect(() => {
    // Skip if already initialized or container not ready
    if (initializedRef.current || !containerRef.current || rendererRef.current) return;
    
    // Mark as initialized immediately to prevent multiple initializations
    initializedRef.current = true;
    console.log("Initializing Three.js scene");
    
    try {
      // Create a dedicated div for the canvas that we control
      const canvasContainer = document.createElement('div');
      canvasContainer.style.width = '100%';
      canvasContainer.style.height = '100%';
      canvasContainer.style.position = 'absolute';
      canvasContainer.style.top = '0';
      canvasContainer.style.left = '0';
      containerRef.current.appendChild(canvasContainer);
      canvasContainerRef.current = canvasContainer;
      
      // Expose toggle labels function globally
      window.toggleLabels = () => {
        const allLabelsVisible = partLabelsRef.current.some(l => l.sprite && l.sprite.visible);
        partLabelsRef.current.forEach(labelObj => {
          if (labelObj.sprite) {
            labelObj.sprite.visible = !allLabelsVisible;
          }
        });
        console.log(`All labels toggled to: ${!allLabelsVisible}`);
      };
      
      // Create a container for HTML markers
      const markersContainer = document.createElement('div');
      markersContainer.style.position = 'absolute';
      markersContainer.style.top = '0';
      markersContainer.style.left = '0';
      markersContainer.style.width = '100%';
      markersContainer.style.height = '100%';
      markersContainer.style.pointerEvents = 'none';
      markersContainer.style.overflow = 'hidden';
      markersContainer.className = 'drone-part-markers';
      containerRef.current.appendChild(markersContainer);
      markersContainerRef.current = markersContainer;
      
      // Create scene with white background
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff); // White background
      sceneRef.current = scene;
      
      // Create camera with better parameters
      const camera = new THREE.PerspectiveCamera(
        45, // Wider field of view
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 1, 5);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;
      originalCameraPositionRef.current = camera.position.clone();
      
      // Create renderer with optimized settings
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
        alpha: true,
        stencil: false,
        depth: true,
      });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x for performance
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace; // Updated from outputEncoding
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      rendererRef.current = renderer;
      
      canvasContainer.appendChild(renderer.domElement);
      
      // Add controls with better defaults
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 2;
      controls.maxDistance = 10;
      controls.maxPolarAngle = Math.PI / 1.5; // Limit rotation
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.target.set(0, 0, 0);
      controls.update();
      originalControlsTargetRef.current = controls.target.clone();
      controlsRef.current = controls;
      
      // Add more efficient lighting setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      
      // Key light with optimized shadow settings
      const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
      keyLight.position.set(5, 5, 5);
      keyLight.castShadow = true;
      keyLight.shadow.bias = -0.001;
      keyLight.shadow.mapSize.width = 2048;
      keyLight.shadow.mapSize.height = 2048;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 50;
      keyLight.shadow.camera.left = -10;
      keyLight.shadow.camera.right = 10;
      keyLight.shadow.camera.top = 10;
      keyLight.shadow.camera.bottom = -10;
      
      // Optimize shadow camera frustum
      const shadowHelper = new THREE.CameraHelper(keyLight.shadow.camera);
      shadowHelper.visible = false; // For debugging, set to true
      scene.add(shadowHelper);
      scene.add(keyLight);
      
      // Fill light from opposite side
      const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
      fillLight.position.set(-5, 2, -5);
      scene.add(fillLight);
      
      // Rim light for better highlights
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
      rimLight.position.set(0, -5, 0);
      scene.add(rimLight);
      
      // Add better ground plane
      const groundGeometry = new THREE.PlaneGeometry(50, 50);
      const groundMaterial = new THREE.ShadowMaterial({ 
        opacity: 0.1,
        color: 0x000000
      });
      const groundPlane = new THREE.Mesh(groundGeometry, groundMaterial);
      groundPlane.rotation.x = -Math.PI / 2;
      groundPlane.position.y = -1;
      groundPlane.receiveShadow = true;
      scene.add(groundPlane);
      
      // Add a simple placeholder while loading
      const placeholderGroup = createPlaceholderDrone();
      scene.add(placeholderGroup);
      modelRef.current = placeholderGroup;
      
      // Setup animation loop with performance optimization
      let previousTime = 0;
      let frameCounter = 0;
      
      const animate = (time) => {
        if (!sceneRef.current || !cameraRef.current || !rendererRef.current) {
          console.log("Animation loop stopped - required resources no longer available");
          return;
        }
        
        animationFrameRef.current = requestAnimationFrame(animate);
        
        // Calculate delta time for smoother animations
        const deltaTime = (time - previousTime) * 0.001; // convert to seconds
        previousTime = time;
        
        // Update controls with damping
        if (controlsRef.current) {
          controlsRef.current.update();
        }
        
        // Animate placeholder with better frame rate control
        if (modelRef.current === placeholderGroup) {
          placeholderGroup.rotation.y += 0.5 * deltaTime;
        }
        
        // Only update labels every few frames to improve performance
        frameCounter++;
        if (frameCounter % 2 === 0) { // More frequent updates (every 2nd frame)
          // Only update part labels if camera has moved
          const currentCameraPos = cameraRef.current.position.clone();
          const currentCameraRot = cameraRef.current.rotation.clone();
          
          if (!lastCameraPosRef.current || 
              !lastCameraRotRef.current ||
              !currentCameraPos.equals(lastCameraPosRef.current) || 
              !currentCameraRot.equals(lastCameraRotRef.current)) {
            
            console.log("Camera moved - updating part visibility");
            // Call the Google Earth style proximity check
            checkPartProximity();
            
            // Make labels face the camera
            partLabelsRef.current.forEach(labelObj => {
              if (labelObj.sprite) {
                labelObj.sprite.quaternion.copy(cameraRef.current.quaternion);
              }
            });
            partButtonsRef.current.forEach(btnObj => {
              if (btnObj.sprite) {
                btnObj.sprite.quaternion.copy(cameraRef.current.quaternion);
              }
            });
            
            // Store current position and rotation
            lastCameraPosRef.current = currentCameraPos;
            lastCameraRotRef.current = currentCameraRot;
          }
          
          frameCounter = 0;
        }
        
        // Limit rendering to a stable frame rate (approximately 60fps)
        const currentTime = performance.now();
        if (currentTime - lastFrameTimeRef.current > 16) { // ~60fps
          // Update label renderOrder to ensure they're drawn last
          partLabelsRef.current.forEach(labelObj => {
            if (labelObj.sprite && labelObj.sprite.visible) {
              labelObj.sprite.renderOrder = 999;
            }
          });
          
          // Render scene
          rendererRef.current.render(sceneRef.current, cameraRef.current);
          lastFrameTimeRef.current = currentTime;
        }
      };
      
      // Add event listeners with proper bindings
      renderer.domElement.addEventListener('click', handleCanvasClick);
      renderer.domElement.addEventListener('mousemove', handleMouseMove);
      
      // Add touch support for mobile devices
      renderer.domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
      renderer.domElement.addEventListener('touchmove', handleTouchMove, { passive: true });
      renderer.domElement.addEventListener('touchend', handleTouchEnd);
      
      // Start animation loop
      animate(0);
      
      // Handle window resize
      window.addEventListener('resize', handleResize);
      
      // Load the model after scene is set up
      if (!loadStartedRef.current) {
        loadStartedRef.current = true;
        loadModel();
      }
      
      // Cleanup on unmount - IMPROVED
      return () => {
        console.log("Cleaning up Three.js resources");
        
        window.removeEventListener('resize', handleResize);
        
        if (rendererRef.current && rendererRef.current.domElement) {
          rendererRef.current.domElement.removeEventListener('click', handleCanvasClick);
          rendererRef.current.domElement.removeEventListener('mousemove', handleMouseMove);
        }
        
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        
        if (controlsRef.current) {
          controlsRef.current.dispose();
          controlsRef.current = null;
        }
        
        // Remove and dispose of all sprites
        if (partLabelsRef.current.length > 0) {
          partLabelsRef.current.forEach(labelObj => {
            if (labelObj.sprite && sceneRef.current) {
              sceneRef.current.remove(labelObj.sprite);
              if (labelObj.sprite.material) {
                if (labelObj.sprite.material.map) {
                  labelObj.sprite.material.map.dispose();
                }
                labelObj.sprite.material.dispose();
              }
            }
          });
          partLabelsRef.current = [];
        }
        
        if (partButtonsRef.current.length > 0) {
          partButtonsRef.current.forEach(btnObj => {
            if (btnObj.sprite && sceneRef.current) {
              sceneRef.current.remove(btnObj.sprite);
              if (btnObj.sprite.material) {
                if (btnObj.sprite.material.map) {
                  btnObj.sprite.material.map.dispose();
                }
                btnObj.sprite.material.dispose();
              }
            }
          });
          partButtonsRef.current = [];
        }
        
        // Dispose of all textures
        THREE.Cache.clear();
        
        // Properly dispose of the renderer and canvas
        if (rendererRef.current) {
          rendererRef.current.dispose();
          
          if (rendererRef.current.domElement && rendererRef.current.domElement.parentNode) {
            try {
              rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
            } catch (e) {
              console.log("Error removing canvas:", e);
            }
          }
          
          rendererRef.current = null;
        }
        
        // Clean up model and all its geometries/materials
        if (modelRef.current) {
          disposeMesh(modelRef.current);
          if (sceneRef.current) sceneRef.current.remove(modelRef.current);
          modelRef.current = null;
        }
        
        // Clear scene - remove and dispose all objects
        if (sceneRef.current) {
          while(sceneRef.current.children.length > 0) { 
            const object = sceneRef.current.children[0];
            sceneRef.current.remove(object);
            
            if (object.isMesh || object.isObject3D) {
              disposeMesh(object);
            }
          }
          sceneRef.current = null;
        }
        
        // Remove the canvas container
        if (canvasContainerRef.current && canvasContainerRef.current.parentNode) {
          try {
            canvasContainerRef.current.parentNode.removeChild(canvasContainerRef.current);
          } catch (e) {
            console.log("Error removing canvas container:", e);
          }
          canvasContainerRef.current = null;
        }
        
        // Reset initialization flag
        initializedRef.current = false;
        
        // Reset cursor if it was changed
        document.body.style.cursor = 'default';
      };
      
    } catch (err) {
      console.error("Error initializing Three.js:", err);
      setError(`Failed to initialize 3D viewer: ${err.message}. Your browser may not support WebGL.`);
      if (onLoaded) onLoaded(false);
    }
  }, [onLoaded, detailsVisible]);
  
  // Handle mouse movement with throttling
  const handleMouseMove = useCallback((event) => {
    if (!modelRef.current || !cameraRef.current || !isLoaded) return;
    
    // Calculate mouse position in normalized device coordinates
    const rect = rendererRef.current.domElement.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // No need to call checkHoveredPart here - it will be called in the animation loop
  }, [isLoaded]);
  
  // Handle mobile touch events
  const handleTouchStart = useCallback((event) => {
    touchStartTimeRef.current = Date.now();
    
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      mouseRef.current.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    }
  }, []);
  
  const handleTouchMove = useCallback((event) => {
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      mouseRef.current.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    }
  }, []);
  
  const handleTouchEnd = useCallback((event) => {
    // Only trigger click if the touch was short (not a drag)
    if (Date.now() - touchStartTimeRef.current < 300) {
      handleCanvasClick(event);
    }
  }, []);
  
  // Handle canvas clicks
  const handleCanvasClick = useCallback((event) => {
    if (!modelRef.current || !isLoaded) return;
    
    // Handle "Know More" button clicks first
    if (checkButtonClick()) {
      return;
    }
    
    // Hide details panel if clicking elsewhere when it's open
    if (detailsVisible) {
      setDetailsVisible(false);
      return;
    }
    
    // If we reached here, we're not clicking on a button
    if (hoveredPartRef.current) {
      focusOnPart(hoveredPartRef.current);
    } else {
      resetCamera();
    }
  }, [isLoaded, detailsVisible]);
  
  // Handle window resize
  const handleResize = useCallback(() => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    
    rendererRef.current.setSize(width, height);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, []);
  
  // Function to focus camera on a specific part
  const focusOnPart = useCallback((part) => {
    if (!controlsRef.current || !cameraRef.current) return;
    
    // Stop auto-rotation when focusing on a part
    controlsRef.current.autoRotate = false;
    
    // Calculate target position (part position plus a bit of offset)
    const targetPosition = new THREE.Vector3(
      part.position[0] * 0.8,
      part.position[1] * 0.8 + 0.5, // Slightly higher view
      part.position[2] * 0.8 + 2 // Move back a bit to see the part better
    );
    
    // Look-at position (part position)
    const lookAtPosition = new THREE.Vector3(...part.position);
    
    // Animate camera to new position
    animateCamera(targetPosition, lookAtPosition, 1000);
  }, []);
  
  // Reset camera to original position
  const resetCamera = useCallback(() => {
    if (!controlsRef.current || !cameraRef.current) return;
    
    // Reset auto-rotation
    controlsRef.current.autoRotate = true;
    
    // Get original position
    const targetPosition = originalCameraPositionRef.current.clone();
    const lookAtPosition = originalControlsTargetRef.current.clone();
    
    // Animate camera return
    animateCamera(targetPosition, lookAtPosition, 1000);
  }, []);
  
  // Smooth camera animation with easing
  const animateCamera = useCallback((targetPosition, lookAtPosition, duration) => {
    if (!cameraRef.current || !controlsRef.current) return;
    
    const startPosition = cameraRef.current.position.clone();
    const startTarget = controlsRef.current.target.clone();
    const startTime = performance.now();
    
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }
    
    const updateCamera = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      // Interpolate camera position
      cameraRef.current.position.lerpVectors(
        startPosition,
        targetPosition,
        easedProgress
      );
      
      // Interpolate controls target
      controlsRef.current.target.lerpVectors(
        startTarget,
        lookAtPosition,
        easedProgress
      );
      
      controlsRef.current.update();
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(updateCamera);
      }
    };
    
    updateCamera();
  }, []);

  // Function to load the 3D model
  const loadModel = () => {
    if (!sceneRef.current) return;
    
    console.log("Starting model load");
    
    const loader = new GLTFLoader();
    THREE.Cache.enabled = true; // Enable caching
    
    // Set a loading timeout - increased to be more realistic
    const timeoutId = setTimeout(() => {
      console.log("Model loading timeout reached");
      // Try to proceed with placeholder model if timeout occurs
      setIsLoaded(true);
      if (onLoaded) onLoaded(true);
    }, 20000); // 20 seconds instead of 10
    
    // Use a proper resolved path with both relative and absolute path support
    const modelPath = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
      ? './quadcopter.glb'  // Development path
      : '/quadcopter.glb';  // Production path
    
    // Create progress indicator with white theme
    const progressContainer = document.createElement('div');
    progressContainer.className = 'absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-md p-3 border border-gray-200';
    progressContainer.style.zIndex = '30';
    
    const progressText = document.createElement('div');
    progressText.className = 'text-gray-700 text-sm mb-1';
    progressText.innerHTML = 'Loading model: 0%';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'w-full bg-gray-200 rounded-full h-2';
    
    const progressFill = document.createElement('div');
    progressFill.className = 'bg-blue-500 h-full rounded-full';
    progressFill.style.width = '0%';
    
    progressBar.appendChild(progressFill);
    progressContainer.appendChild(progressText);
    progressContainer.appendChild(progressBar);
    
    if (containerRef.current) {
      containerRef.current.appendChild(progressContainer);
    }
    
    // First check if model file exists
    fetch(modelPath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          // File exists, proceed with loading
          loader.load(
            modelPath,
            (gltf) => {
              clearTimeout(timeoutId);
              console.log("Model loaded successfully", gltf);
              
              if (containerRef.current && progressContainer.parentNode === containerRef.current) {
                containerRef.current.removeChild(progressContainer);
              }
              
              if (!sceneRef.current) {
                console.log("Scene no longer exists, abort model processing");
                return;
              }
              
              const model = gltf.scene;
              
              // Get model dimensions
              const box = new THREE.Box3().setFromObject(model);
              const size = box.getSize(new THREE.Vector3());
              const center = box.getCenter(new THREE.Vector3());
              
              // Scale model based on size
              const maxDim = Math.max(size.x, size.y, size.z);
              const scale = 2 / maxDim;
              model.scale.set(scale, scale, scale);
              
              // Center model
              model.position.x = -center.x * scale;
              model.position.y = -center.y * scale;
              model.position.z = -center.z * scale;
              
              // Setup shadows
              model.traverse(node => {
                if (node.isMesh) {
                  node.castShadow = true;
                  node.receiveShadow = true;
                  
                  // Improve materials
                  if (node.material) {
                    node.material.needsUpdate = true;
                    
                    // Optional: Add some subtle environment reflection
                    if (!node.material.envMap) {
                      const pmremGenerator = new THREE.PMREMGenerator(rendererRef.current);
                      pmremGenerator.compileCubemapShader();
                      
                      // Simple environment map
                      const envTexture = generateEnvironmentMap();
                      const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
                      
                      envTexture.dispose();
                      pmremGenerator.dispose();
                      
                      node.material.envMap = envMap;
                      node.material.envMapIntensity = 0.5;
                    }
                  }
                }
              });
              
              // Remove placeholder
              if (sceneRef.current && modelRef.current) {
                sceneRef.current.remove(modelRef.current);
                disposeMesh(modelRef.current);
              }
              
              // Add model to scene
              if (sceneRef.current) {
                sceneRef.current.add(model);
                modelRef.current = model;
                
                // Add part labels after model is loaded
                addPartLabels();
              }
              
              // Set camera to a good viewing position
              if (cameraRef.current) {
                cameraRef.current.position.set(0, 1, 5);
                cameraRef.current.lookAt(0, 0, 0);
                cameraRef.current.updateProjectionMatrix();
              }
              
              setIsLoaded(true);
              if (onLoaded) onLoaded(true);
              console.log("Model setup completed");
            },
            (xhr) => {
              if (xhr.lengthComputable) {
                const progress = Math.round((xhr.loaded / xhr.total) * 100);
                console.log(`Loading model: ${progress}%`);
                
                // Update progress UI
                progressText.innerHTML = `Loading model: ${progress}%`;
                progressFill.style.width = `${progress}%`;
                
                // Don't mark as loaded at 70% - wait for complete loading
                // for better visual quality
              }
            },
            (error) => {
              clearTimeout(timeoutId);
              console.error("Error loading model:", error);
              
              if (containerRef.current && progressContainer.parentNode === containerRef.current) {
                containerRef.current.removeChild(progressContainer);
              }
              
              setError(`Failed to load 3D model: ${error.message}. Please try refreshing the page.`);
              if (onLoaded) onLoaded(false);
            }
          );
        } else {
          // File doesn't exist
          console.error("Model file not found:", modelPath);
          
          if (containerRef.current && progressContainer.parentNode === containerRef.current) {
            containerRef.current.removeChild(progressContainer);
          }
          
          setError(`Could not find 3D model file (${response.status}). Please check that the file exists.`);
          if (onLoaded) onLoaded(false);
          clearTimeout(timeoutId);
        }
      })
      .catch(error => {
        console.error("Error checking model file:", error);
        
        if (containerRef.current && progressContainer.parentNode === containerRef.current) {
          containerRef.current.removeChild(progressContainer);
        }
        
        setError(`Network error when checking model file: ${error.message}. Please check your connection.`);
        if (onLoaded) onLoaded(false);
        clearTimeout(timeoutId);
      });
  };
  
  // Create optimized text sprites for labels and buttons
  const createTextSprite = useCallback((text, position, isButton = false) => {
    console.log(`Creating sprite for: ${text} at position:`, position);
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // Set canvas size based on text length - make labels larger
    const fontSize = isButton ? 14 : 20;
    canvas.width = text.length * fontSize * 0.7 + 40;
    canvas.height = fontSize + 24;
    
    // Draw with glassmorphic effect
    if (isButton) {
      // Button style
      context.fillStyle = 'rgba(59, 130, 246, 0.9)';
    } else {
      // Label style - glassmorphic effect
      context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    }
    
    // Draw rounded rectangle
    const radius = 10;
    context.beginPath();
    context.moveTo(radius, 0);
    context.lineTo(canvas.width - radius, 0);
    context.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
    context.lineTo(canvas.width, canvas.height - radius);
    context.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
    context.lineTo(radius, canvas.height);
    context.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
    context.lineTo(0, radius);
    context.quadraticCurveTo(0, 0, radius, 0);
    context.closePath();
    context.fill();
    
    // Add more prominent border and shadow
    context.shadowColor = 'rgba(0, 0, 0, 0.4)';
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 4;
    
    if (!isButton) {
      // Add a stronger border
      context.strokeStyle = 'rgba(59, 130, 246, 0.8)'; // Blue border
      context.lineWidth = 2;
      context.stroke();
    }
    
    // Draw text with better contrast
    context.font = `${isButton ? '' : 'bold '}${fontSize}px Inter, Arial, sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = isButton ? '#ffffff' : '#1e40af'; // Darker blue for better readability
    
    // Remove shadow for text
    context.shadowColor = 'transparent';
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    // Create sprite texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    
    // Create sprite material with improved transparency and z-fighting prevention
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.1,
      depthTest: false, // Disable depth testing to prevent z-fighting
      depthWrite: false // Don't write to depth buffer
    });
    
    // Create sprite with adjusted position based on type
    const sprite = new THREE.Sprite(spriteMaterial);
    
    // Position the label more prominently above the part
    const posY = isButton ? 0.2 : 0.4;
    sprite.position.set(position[0], position[1] + posY, position[2]);
    
    // Make labels bigger for better visibility
    const scaleX = isButton ? 0.45 : 0.7;
    const scaleY = (canvas.height / canvas.width) * scaleX;
    sprite.scale.set(scaleX, scaleY, 1);
    
    // Add to scene
    if (sceneRef.current) {
      console.log(`Adding sprite for ${text} to scene`);
      sceneRef.current.add(sprite);
    } else {
      console.warn(`Scene not available for sprite: ${text}`);
    }
    
    // Hide initially
    sprite.visible = false;
    
    return sprite;
  }, []);
  
  // Check proximity to parts and show/hide labels accordingly with performance optimization
  // Updated for Google Earth style proximity detection with dynamic visibility based on distance
  const checkPartProximity = useCallback(() => {
    if (!cameraRef.current || !modelRef.current || !isLoaded) return;
    
    // Get camera position once for all calculations
    const cameraPos = cameraRef.current.position.clone();
    const cameraFwd = new THREE.Vector3(0, 0, -1).applyQuaternion(cameraRef.current.quaternion);
    
    droneParts.forEach(part => {
      const partPos = new THREE.Vector3(...part.position);
      
      // Calculate distance from camera to part
      const distance = partPos.distanceTo(cameraPos);
      
      // Find label and button for this part
      const labelObj = partLabelsRef.current.find(l => l.part.id === part.id);
      const buttonObj = partButtonsRef.current.find(b => b.part.id === part.id);
      
      if (labelObj && labelObj.sprite) {
        // Calculate if part is in front of camera (dot product of camera forward and direction to part)
        const dirToPartNorm = partPos.clone().sub(cameraPos).normalize();
        const dotProduct = dirToPartNorm.dot(cameraFwd);
        
        // Only show if part is in front of camera and within distance threshold
        const maxDistance = proximityThresholdRef.current;
        const inFrontOfCamera = dotProduct > 0.3; // Allow some peripheral vision
        const closeEnough = distance < maxDistance;
        const shouldBeVisible = inFrontOfCamera && closeEnough;
        
        // Only update visibility if it changed
        if (labelObj.sprite.visible !== shouldBeVisible) {
          console.log(`Setting visibility for ${part.name} to ${shouldBeVisible}`);
          labelObj.sprite.visible = shouldBeVisible;
        }
        
        // If visible, update appearance based on distance
        if (shouldBeVisible) {
          // Calculate normalized distance factor (0=closest, 1=furthest)
          const distanceFactor = Math.min(1, Math.max(0, distance / maxDistance));
          
          // Opacity: 1.0 (close) to 0.3 (far)
          const opacity = 1.0 - distanceFactor * 0.7;
          
          // Scale: larger when closer, smaller when further
          const baseScale = 0.6;
          const scaleFactor = 1.0 - distanceFactor * 0.4;
          const aspectRatio = labelObj.sprite.scale.y / labelObj.sprite.scale.x;
          
          // Apply opacity and scale
          labelObj.sprite.material.opacity = opacity;
          labelObj.sprite.scale.set(baseScale * scaleFactor, baseScale * scaleFactor * aspectRatio, 1);
        }
        
        // Only show the "Know More" button when hovering over this part
        if (buttonObj && buttonObj.sprite) {
          const buttonShouldBeVisible = 
            shouldBeVisible && hoveredPartRef.current && 
            hoveredPartRef.current.id === part.id;
          
          if (buttonObj.sprite.visible !== buttonShouldBeVisible) {
            buttonObj.sprite.visible = buttonShouldBeVisible;
          }
        }
      }
    });
  }, [isLoaded, droneParts]);
  
  // Check for hovered parts using raycasting - THROTTLED
  const checkHoveredPart = useCallback(() => {
    if (!modelRef.current || !cameraRef.current || !isLoaded) return;
    
    // Throttle raycasting for performance
    const now = performance.now();
    if (now - lastRaycastTimeRef.current < raycastThrottleTimeRef.current) return;
    lastRaycastTimeRef.current = now;
    
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    
    // Find only mesh objects for better performance
    const meshObjects = [];
    modelRef.current.traverse(obj => {
      if (obj.isMesh) meshObjects.push(obj);
    });
    
    const intersects = raycasterRef.current.intersectObjects(meshObjects, false);
    
    if (intersects.length > 0) {
      // Find the closest part to the intersection point
      const intersectionPoint = intersects[0].point;
      let closestPart = null;
      let minDistance = Infinity;
      
      droneParts.forEach(part => {
        const partPos = new THREE.Vector3(...part.position);
        const distance = partPos.distanceTo(intersectionPoint);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestPart = part;
        }
      });
      
      if (closestPart && minDistance < 1.2) {
        // Check if we're hovering over a button - with improved hit detection
        const buttonHovered = partButtonsRef.current.some(btn => {
          if (btn.part.id === closestPart.id && btn.sprite.visible) {
            const btnPos = btn.sprite.position.clone();
            const screenPos = btnPos.project(cameraRef.current);
            
            // Convert to screen coordinates
            const x = (screenPos.x + 1) * window.innerWidth / 2;
            const y = (-screenPos.y + 1) * window.innerHeight / 2;
            
            // Check if mouse is near button - adjusted hit area for better usability
            const mouseX = (mouseRef.current.x + 1) * window.innerWidth / 2;
            const mouseY = (-mouseRef.current.y + 1) * window.innerHeight / 2;
            
            const dist = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2));
            // Increased hit area for better touch support
            return dist < 40;
          }
          return false;
        });
        
        if (buttonHovered) {
          if (document.body.style.cursor !== 'pointer') {
            document.body.style.cursor = 'pointer';
          }
        } else {
          if (document.body.style.cursor !== 'default') {
            document.body.style.cursor = 'default';
          }
          
          if (hoveredPartRef.current !== closestPart) {
            hoveredPartRef.current = closestPart;
            setHoveredPart(closestPart);
          }
        }
      } else {
        if (document.body.style.cursor !== 'default') {
          document.body.style.cursor = 'default';
        }
        
        if (hoveredPartRef.current !== null) {
          hoveredPartRef.current = null;
          setHoveredPart(null);
        }
      }
    } else {
      if (document.body.style.cursor !== 'default') {
        document.body.style.cursor = 'default';
      }
      
      if (hoveredPartRef.current !== null) {
        hoveredPartRef.current = null;
        setHoveredPart(null);
      }
    }
  }, [isLoaded, droneParts, setHoveredPart]);

  // Check if a button was clicked with improved hit detection
  const checkButtonClick = useCallback(() => {
    if (!partButtonsRef.current.length || !cameraRef.current) return false;
    
    for (const btn of partButtonsRef.current) {
      if (!btn.sprite.visible) continue;
      
      const btnPos = btn.sprite.position.clone();
      const screenPos = btnPos.project(cameraRef.current);
      
      // Convert to screen coordinates
      const x = (screenPos.x + 1) * window.innerWidth / 2;
      const y = (-screenPos.y + 1) * window.innerHeight / 2;
      
      // Check if mouse/touch is near button with appropriate hit area
      const mouseX = (mouseRef.current.x + 1) * window.innerWidth / 2;
      const mouseY = (-mouseRef.current.y + 1) * window.innerHeight / 2;
      
      const dist = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2));
      
      if (dist < 35) { // Button "radius" for interaction
        // Show details for this part
        setSelectedPart(btn.part);
        setDetailsVisible(true);
        return true;
      }
    }
    
    return false;
  }, [setSelectedPart, setDetailsVisible]);
  
  // Add part labels with improved positioning
  const addPartLabels = useCallback(() => {
    console.log("Adding part labels");
    
    // Clear existing labels first
    if (partLabelsRef.current.length > 0) {
      console.log("Clearing existing labels:", partLabelsRef.current.length);
      partLabelsRef.current.forEach(labelObj => {
        if (labelObj.sprite && sceneRef.current) {
          sceneRef.current.remove(labelObj.sprite);
          if (labelObj.sprite.material) {
            labelObj.sprite.material.dispose();
          }
        }
      });
      partLabelsRef.current = [];
    }
    
    if (partButtonsRef.current.length > 0) {
      console.log("Clearing existing buttons:", partButtonsRef.current.length);
      partButtonsRef.current.forEach(btnObj => {
        if (btnObj.sprite && sceneRef.current) {
          sceneRef.current.remove(btnObj.sprite);
          if (btnObj.sprite.material) {
            btnObj.sprite.material.dispose();
          }
        }
      });
      partButtonsRef.current = [];
    }
    
    // Create new labels and buttons with improved positioning
    console.log("Creating new labels for parts:", droneParts.length);
    partLabelsRef.current = droneParts.map(part => {
      const sprite = createTextSprite(part.name, part.position);
      return { part, sprite };
    });
    
    partButtonsRef.current = droneParts.map(part => {
      // Position buttons slightly below labels
      const pos = [...part.position];
      pos[1] -= 0.2; 
      const sprite = createTextSprite("Know More", pos, true);
      return { part, sprite };
    });
    
    // Add a small delay then force all labels visible for testing
    setTimeout(() => {
      console.log("Debug: Forcing label visibility check");
      // Call checkPartProximity directly instead of through dependency
      if (cameraRef.current && modelRef.current && isLoaded) {
        checkPartProximity(); // Call the function directly for initial setup
      }
    }, 1000);
  }, [createTextSprite, droneParts, isLoaded, checkPartProximity]);
  
  return (
    <div className="w-full h-full relative" ref={containerRef}>
      {!isLoaded && <LoadingIndicator />}
      
      {/* Glassmorphic tooltip for hovered parts - simplified */}
      {hoveredPart && !selectedPart && !detailsVisible && (
        <div className="absolute top-12 right-4 transition-all duration-300 backdrop-blur-md bg-white/80 px-4 py-3 rounded-xl shadow-lg z-20 max-w-xs animate-fade-in border border-blue-100/50">
          <p className="text-base font-medium text-blue-800">{hoveredPart.name}</p>
          <p className="text-xs text-gray-600 mt-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Click for details
          </p>
        </div>
      )}
      
      {/* Modern details panel with glassmorphic design */}
      {selectedPart && detailsVisible && (
        <div className="fixed inset-0 flex items-center justify-end z-30 bg-black/20 backdrop-blur-sm">
          <div className="w-full md:w-1/3 h-full overflow-auto bg-white/90 backdrop-blur-md shadow-2xl p-0 animate-slide-in-right border-l border-blue-100/50">
            {/* Header with gradient background */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <button 
                onClick={() => setDetailsVisible(false)}
                className="absolute top-3 right-3 rounded-full w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <h2 className="text-2xl font-bold">{selectedPart.name}</h2>
            </div>
            
            {/* Content section with improved design */}
            <div className="p-6">
              <div className="prose max-w-none">
                {/* Specifications list with improved styling */}
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-blue-50">
                  <h3 className="text-lg font-semibold mb-3 text-blue-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Technical Specifications
                  </h3>
                  <ul className="space-y-3">
                    {selectedPart.specs.map((spec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        <span className="text-gray-700">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 flex space-x-3 pt-4 border-t border-gray-200">
                <button 
                  onClick={resetCamera}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Back to Full View
                </button>
                <button 
                  onClick={() => setDetailsVisible(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Error message if needed */}
      {error && (
        <div className="flex flex-col items-center justify-center h-full bg-white text-gray-800 z-50">
          <p className="text-red-500 font-medium text-lg text-center mb-4">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default ThreeJSModel;