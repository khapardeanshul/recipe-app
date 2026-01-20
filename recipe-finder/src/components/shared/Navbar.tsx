import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import Button from './Button';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      {/* Left: Brand */}
        <div className="navbar-brand" onClick={() => navigate('/')}>
          Recipe<span className="navbar-brand-accent">Finder</span>
        </div>

      {/* Desktop navigation */}
      <div className="navbar-links">
        <Button 
          variant={isActive('/') ? 'primary': 'secondary'}
          onClick={() => navigate('/')}
        >
          Home
        </Button>

        <Button 
          variant={isActive('/categories') ? 'primary' : 'secondary'}
          onClick={() => navigate('/categories')}
        >
          Categories
        </Button>
      </div>

      {/* Mobile hamburger */}
      <div className='navbar-hamburger'>
        <Button
          variant='secondary'
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {FiMenu({size:22})}
        </Button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className='mobile-menu'>
          <Button 
            variant='secondary'
            onClick={() => {
              navigate('/');
              setMenuOpen(false);
            }}
          >
            Home
          </Button>

          <Button 
            variant='secondary'
            onClick={() => {
              navigate('/categories');
              setMenuOpen(false);
            }}
          >
            Categories
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
