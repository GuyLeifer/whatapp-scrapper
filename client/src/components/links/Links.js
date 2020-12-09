import React, { useState, useEffect } from 'react';
import './Links.css';
import axios from 'axios';

function Links() {

    const [linksByDates, setLinksByDates] = useState([]);
    const [linksByAuthors, setLinksByAuthors] = useState([]);
    const [byDate, setByDate] = useState(true);

    useEffect(() => {
        (async () => {
            const dateLinks  = await axios.get('/links/by-date');
            setLinksByDates(dateLinks.data);
            const dateAuthors = await axios.get('/links/by-author');
            setLinksByAuthors(dateAuthors.data);
        })()
    }, [])

    const setChoosen = (option) => {
        if (option === "date") {
            document.getElementById(option).setAttribute("class", "chosen");
            setByDate(true);
            const author = document.getElementById("author");
            if (author.classList.contains("chosen")) author.classList.remove("chosen");

        }
        if (option === "author") {
            document.getElementById(option).setAttribute("class", "chosen");
            setByDate(false);
            const date = document.getElementById("date");
            if (date.classList.contains("chosen")) date.classList.remove("chosen");
        }
    }

    return (
        <div className="linksPage">
            <div className="options">
                <h2 id="date" className="chosen" onClick={() => setChoosen('date')}>By Date</h2>
                <h2 id="author" onClick={() => setChoosen('author')}>By Author</h2>
            </div>
            { byDate ?
                linksByDates.map(link => ( 
                    <div className="linkDiv">
                        <div className="dateLink">{link.date.slice(0, 10)}</div>
                        <div>
                            {/* {link.links.map(lin => <span className="link">{lin}</span>)} */}
                            <a className="linkAnchor" href={link.links[0]} target="blank">{link.links[0]}</a>
                        </div>
                        <div className="authorLink">{link.author}</div>
                    </div> 
            )):   
                linksByAuthors.map(link => ( 
                    <div className="linkDiv">
                        <div className="dateLink">{link.date.slice(0, 10)}</div>
                        <div>
                            {/* {link.links.map(lin => <span className="link">{lin}</span>)} */}
                            <a className="linkAnchor" href={link.links[0]} target="blank">{link.links[0]}</a>
                        </div>
                        <div className="authorLink">{link.author}</div>
                    </div>           
            ))}
        </div>
    )
}

export default Links
