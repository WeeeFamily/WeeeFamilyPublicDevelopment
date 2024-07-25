import React, {useState} from 'react';
import './NavBar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const NavBar = () => {
    const [activeButton, setActiveButton] = useState('home');
    return (
        <div className="nav-bar">
            <button
                className={`nav-button ${activeButton === 'map' ? 'active' : ''}`}
                onClick={() => setActiveButton('map')}
            >
                <i className="fas fa-map-marker-alt"></i>
                <span>Map</span>
            </button>
            <button
                className={`nav-button ${activeButton === 'home' ? 'active' : ''}`}
                onClick={() => setActiveButton('home')}
            >
                <i className="fas fa-home"></i>
                <span>Home</span>
            </button>
            <button
                className={`nav-button ${activeButton === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveButton('profile')}
            >
                <i className="fas fa-user"></i>
                <span>Profile</span>
            </button>
        </div>
    );
};

export default NavBar;
