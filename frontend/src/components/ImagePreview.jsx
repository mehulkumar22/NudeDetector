import React, { useState } from 'react';
import './ImagePreview.css';

function ImagePreview({ preview }) {
  const [showImage, setShowImage] = useState(false);

  return (
    <div className="image-preview-container">
      {preview ? (
        <div className="preview-wrapper">
          <img
            src={preview}
            alt="Preview"
            className={`image-preview ${showImage ? 'unblur' : 'blur'}`}
            onClick={() => setShowImage(prev => !prev)}
          />
          <button
            type="button"
            className="toggle-button"
            onClick={() => setShowImage(prev => !prev)}
          >
            {showImage ? 'Hide Image' : 'Show Image'}
          </button>
        </div>
      ) : (
        <div className="image-placeholder">No image to preview</div>
      )}
    </div>
  );
}

export default ImagePreview;