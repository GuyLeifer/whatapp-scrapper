import React from 'react';
import './Navbar.css';

import { Link } from "react-router-dom";
import Searchbar from './search/Searchbar';

// icons
import homeIcon from './images/homeIcon.png';
import whatsappIcon from './images/whatsappIcon.png';
import aboutIcon from './images/aboutIcon.jpg';

function Navbar() {
    return (
        <div className="navbar">
            <div className="homeLink">
                <Link to="/">
                    <img className="navIcon" src={homeIcon} alt="Home" />
                </Link>
            </div>
            <div className="postsLink">
                <Link to="/links">
                    <img className="navIcon" src={whatsappIcon} alt="Posts" />
                </Link>
            </div>
            <Searchbar />
            <div className="aboutLink">
                <Link to="/about">
                    <img className="navIcon" src={aboutIcon} alt="About" />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
