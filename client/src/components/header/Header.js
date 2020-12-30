import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom'
// icons
import whatsappIcon from './images/whatsappIcon.png';

function Header() {
    return (
        <div>
            <header className="Header">
                <h1>WhatsApp</h1>
                <Link to="/about">          
                    <img className="whatsappIcon" src ={whatsappIcon} alt="WhatsApp Icon"/>
                </Link> 
                <h1>Links</h1>
            </header>
        </div>
    )
}

export default Header
