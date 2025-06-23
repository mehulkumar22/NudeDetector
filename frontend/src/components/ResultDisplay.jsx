import React from 'react';
import './ResultDisplay.css';

function ResultDisplay({ result }) {
  if (!result) return null;

  return (
    <div className="simple-result">
      <h4>Detection Results</h4>
      <div className="result-content">
        <pre>{result}</pre>
      </div>
    </div>
  );
}

export default ResultDisplay;