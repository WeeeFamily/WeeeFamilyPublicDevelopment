import React from 'react';
import './NavBar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const NavBar = () => {
    return (
        <div className="nav-bar">
            <button className="nav-button" onClick={() => window.location.href='/map'}>
                <i className="fas fa-map-marker-alt"></i>
                <span>Map</span>
            </button>
            <button className="nav-button" onClick={() => window.location.href='/home'}>
                <i className="fas fa-home"></i>
                <span>Home</span>
            </button>
            <button className="nav-button" onClick={() => window.location.href='/profile'}>
                <i className="fas fa-user"></i>
                <span>Profile</span>
            </button>
        </div>
    );
};

export default NavBar;
