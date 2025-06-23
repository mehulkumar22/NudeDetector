import React from 'react';
import './FileInput.css';

function FileInput({ imageUrl, handleFileChange, handleUrlChange, darkMode, fileName }) {
  const onFileChange = (e) => {
    handleFileChange(e); // fileName is handled in App
  };

  return (
    <div className="file-input-wrapper">
      <div className={`file-input-container ${darkMode ? 'dark' : ''}`}>
        <div className="input-group">
          <label htmlFor="imageUpload" className="upload-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Choose File
          </label>
          <input
            type="file"
            id="imageUpload"
            onChange={onFileChange}
            className="hidden-file-input"
            accept="image/*"
          />
          <span className="file-name">{fileName}</span>
        </div>

        <div className="or-divider">
          <span>OR</span>
        </div>

        <div className="input-group">
          <input
            type="text"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="Paste image URL here"
            className="url-input"
          />
        </div>
      </div>
    </div>
  );
}

export default FileInput;
