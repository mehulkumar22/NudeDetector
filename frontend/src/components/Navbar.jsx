import React from 'react';
import './Navbar.css';

function Navbar({ darkMode, toggleDarkMode, api, setApi }) {
  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-brand">NudeDetector</div>
      <div className="navbar-controls">
        <select 
          value={api} 
          onChange={(e) => setApi(e.target.value)}
          className="api-select"
        >
          <option value="">Choose API</option>
          <option value="sightengine">Sightengine</option>
          <option value="picpurify">PicPurify</option>
        </select>

        {/* Your original dark mode toggle button - unchanged */}
        <label className="theme-switch">
          <input
            type="checkbox"
            className="theme-switch__checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <div className="theme-switch__container">
            <div className="theme-switch__clouds"></div>
            <div className="theme-switch__stars-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M135.831 3.00688C135.055 3.85027..." fill="currentColor" />
              </svg>
            </div>
            <div className="theme-switch__circle-container">
              <div className="theme-switch__sun-moon-container">
                <div className="theme-switch__moon">
                  <div className="theme-switch__spot"></div>
                  <div className="theme-switch__spot"></div>
                  <div className="theme-switch__spot"></div>
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>
    </nav>
  );
}

export default Navbar;