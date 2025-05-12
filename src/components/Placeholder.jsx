import React from 'react';

// Utility component to create placeholder images until real ones are provided
const Placeholder = ({ width, height, text, style }) => {
  return (
    <div
      style={{
        width: width || '100%',
        height: height || '100%',
        backgroundColor: 'rgba(240, 240, 240, 0.2)',
        border: '1px dashed #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      <p className="text-gray-400">{text || 'Image placeholder'}</p>
    </div>
  );
};

// Method to create a Data URL for a placeholder image
export const createPlaceholderImage = (text, width = 400, height = 300, bg = '#f0f0f0') => {
  // This would normally create a data URL, but for simplicity we'll return a background style
  return {
    background: bg,
    width: `${width}px`,
    height: `${height}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
    fontSize: '14px',
    textAlign: 'center',
    padding: '20px',
  };
};

export default Placeholder; 