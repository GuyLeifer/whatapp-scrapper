import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom'
// icons
import whatsappIcon from './images/whatsappIcon.png';

function Header() {
    return (
        <div>
            <header className="header">
                <header className="header">
                    <h1>WhatsApp</h1>
                    <Link to="/about">          
                        <img className="whatsappIcon" src ={whatsappIcon} alt="WhatsApp Icon"/>
                    </Link> 
                    <h1>Scraper</h1>
                </header>
            </header>
        </div>
    )
}

export default Header
