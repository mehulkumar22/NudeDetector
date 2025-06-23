// Spinner.js
import React from 'react';
import './Spinner.css';

function Spinner({ size = 50, color = '#646cff', speed = 0.8 }) {
  return (
    <div 
      className="spinner"
      style={{
        '--spinner-size': `${size}px`,
        '--spinner-color': color,
        '--spinner-speed': `${speed}s`
      }}
    ></div>
  );
}

export default Spinner;