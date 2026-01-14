import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          Recipe<span className="navbar-brand-accent">Finder</span>
        </div>
      </div>

      {/* Desktop buttons */}
      <div className="navbar-links">
        <button
          className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <button
          className={`nav-link ${isActive('/categories') ? 'nav-link-active' : ''}`}
          onClick={() => navigate('/categories')}
        >
          Categories
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="custom-menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="menu-bar bar-1" />
        <span className="menu-bar bar-2" />
        <span className="menu-bar bar-3" />
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => { navigate('/'); setMenuOpen(false); }}>Home</button>
          <button onClick={() => { navigate('/categories'); setMenuOpen(false); }}>Categories</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
