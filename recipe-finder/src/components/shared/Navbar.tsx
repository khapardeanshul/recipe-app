import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar: React.FC = () => {
    const navigate = useNavigate()

    return (
        <nav className='navbar'>
            <div className='navbar-brand' onClick={() => navigate('/')}>
                RecipeSearch <span className='navbar-brand-accent'>App</span>
            </div>
            <div className='navbar-links'>
                <button onClick={() => navigate('/')} className='nav-link'>
                    Home
                </button>
                {/* <button onClick={() => navigate('/')} className='nav-link'>
                    Ingredients
                </button> */}
                <button onClick={() => navigate('/categories')} className='nav-link'>
                    Categories
                </button>
                
            </div>
        </nav>
    );
};
   
export default Navbar;
