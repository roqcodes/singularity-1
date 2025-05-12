/**
 * This script verifies that the 3D model file exists and is loadable.
 * It's used automatically by the application when attempting to load the model.
 */

(function() {
  // Function to check if the model file exists
  function checkModelFile() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('HEAD', './quadcopter.glb', true);
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          // File exists and is accessible
          resolve(true);
        } else {
          // File doesn't exist or can't be accessed
          reject(new Error(`Model file not found (status: ${xhr.status})`));
        }
      };
      
      xhr.onerror = function() {
        reject(new Error('Network error when trying to access the model file'));
      };
      
      xhr.send();
    });
  }

  // Check WebGL support
  function checkWebGLSupport() {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  }

  // Make these functions available globally
  window.MODEL_CHECKER = {
    checkModelFile,
    checkWebGLSupport
  };
})(); 