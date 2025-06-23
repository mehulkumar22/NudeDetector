import React, { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import FileInput from './components/FileInput';
import ImagePreview from './components/ImagePreview';
import ResultDisplay from './components/ResultDisplay';
import Spinner from './components/Spinner';

function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [api, setApi] = useState('');
  const [result, setResult] = useState('');
  const [preview, setPreview] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('No file chosen');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl('');
    setPreview(file ? URL.createObjectURL(file) : null);
    if (file) setFileName(file.name);
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImage(null);
    setImageUrl(url);
    setPreview(url);
    setFileName('No file chosen');
  };

  const handleClearImage = () => {
    setImage(null);
    setImageUrl('');
    setPreview(null);
    setResult('');
    setFileName('No file chosen');
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image && !imageUrl) return alert("Please provide an image or URL.");
    if (!api) return alert("Please select an API.");

    const formData = new FormData();
    if (image) formData.append('image', image);
    if (imageUrl) formData.append('image_url', imageUrl);
    formData.append('api', api);

    setResult('');
    setIsLoading(true);

    try {
      const res = await fetch('https://nudedetector-backend.onrender.com/detect-nudity', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');

      const confidence = (data.confidence_score * 100).toFixed(2);
      const output = `
API Used: ${data.api}
Classification: ${data.classification}
Nudity Detected: ${data.nudity_detected ? 'Yes' : 'No'}
Confidence Score: ${confidence}%`;

      setResult(output);
    } catch (err) {
      setResult("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        api={api}
        setApi={setApi}
        onSubmit={handleSubmit}
      />

      <form onSubmit={handleSubmit}>
        <FileInput
          imageUrl={imageUrl}
          api={api}
          handleFileChange={handleFileChange}
          handleUrlChange={handleUrlChange}
          darkMode={darkMode}
          setApi={setApi}
          fileName={fileName}
        />
        <ImagePreview preview={preview} onClear={handleClearImage} />
        <div className="button-group">
          <button type="submit" className="submit-btn">Detect Nudity</button>
          {preview && (
            <button 
              type="button" 
              className="clear-btn"
              onClick={handleClearImage}
            >
              Clear Image
            </button>
          )}
        </div>
      </form>

      {isLoading ? <Spinner /> : <ResultDisplay result={result} />}
    </div>
  );
}

export default App;
