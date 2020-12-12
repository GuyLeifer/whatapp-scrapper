import React from 'react';
import './About.css';

//icons
import WhatsAppLinkImage from './images/WhatsAppLinkImage.jpg';

function About() {
    return (
        <div className="about">
            {/* <img className="aboutImg" src={youtubeIcon} alt="About"/> */}
            <p>You absolutely ask yourself what the hell is this site,</p>
            <p>OK, </p>
            <p>You'll Just about to get your answer.</p>
            <img className="WhatsAppLinkImage" src={WhatsAppLinkImage} alt="WhatsApp"/>
            <p>This Site is taking your chat history of your whatsapp and collect the links you and your friends shared each other</p>
            <p>The home page includes charts with information, and the links page includes all the links of the group</p>
            <p>Every Link has a page, contains the Link itself, the all message sent, the chat history for the context, the author and the date.</p>
            <p>Enjoy the Experience of the site!</p>
        </div>
    )
}

export default About