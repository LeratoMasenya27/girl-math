import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => setActiveTab('home')}>
          Currency Converter
        </div>
        
        <div className={`navbar-tabs ${menuOpen ? 'active' : ''}`}>
          <button 
            className={`navbar-tab ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('home');
              setMenuOpen(false);
            }}
          >
            Home
          </button>
          <button 
            className={`navbar-tab ${activeTab === 'blog' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('blog');
              setMenuOpen(false);
            }}
          >
            Blog
          </button>
          <button 
            className={`navbar-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('settings');
              setMenuOpen(false);
            }}
          >
            Settings
          </button>
          <button 
            className={`navbar-tab signup-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('signup');
              setMenuOpen(false);
            }}
          >
            Sign Up
          </button>
        </div>
        
        <button className="mobile-menu-button" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;