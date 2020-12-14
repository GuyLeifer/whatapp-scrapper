import React, { useState, useEffect } from 'react';
import './Links.css';

import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

function Links() {

    const [loading, setLoading] = useState(true);
    const [linksByDates, setLinksByDates] = useState([]);
    const [linksByAuthors, setLinksByAuthors] = useState([]);
    const [linksByDomains, setLinksByDomains] = useState([]);
    const [byDate, setByDate] = useState(true);
    const [byAuthor, setByAuthor] = useState(true);
    const [byDomain, setByDomain] = useState(true);

    useEffect(() => {
        (async () => {
            const dateLinks  = await axios.get('/links/by-date');
            setLinksByDates(dateLinks.data);
            const AuthorsLinks = await axios.get('/links/by-author');
            setLinksByAuthors(AuthorsLinks.data);
            const DomainLinks = await axios.get('/links/by-web');
            setLinksByDomains(DomainLinks.data);
            setLoading(false)
        })()
    }, [])

    const setBy = (option) => {
        if (option === 'date')  {
            setByDate(true)
            setByAuthor(false)
            setByDomain(false)
        }
        else if (option === 'author') {
            setByAuthor(true)
            setByDomain(false)
            setByDate(false)
        }
        else if (option === 'domain') {
            setByDomain(true)
            setByAuthor(false)
            setByDate(false)
        }
    }

    const setChoosen = (option) => {
        setBy(option)
        if (option === "date") {
            document.getElementById(option).setAttribute("class", "chosen");
            const author = document.getElementById("author");
            if (author.classList.contains("chosen")) author.classList.remove("chosen");
            const domain = document.getElementById("domain");
            if (domain.classList.contains("chosen")) domain.classList.remove("chosen");

        }
        if (option === "author") {
            document.getElementById(option).setAttribute("class", "chosen");
            const date = document.getElementById("date");
            if (date.classList.contains("chosen")) date.classList.remove("chosen");
            const domain = document.getElementById("domain");
            if (domain.classList.contains("chosen")) domain.classList.remove("chosen");
        }
        if (option === "domain") {
            document.getElementById(option).setAttribute("class", "chosen");
            const date = document.getElementById("date");
            if (date.classList.contains("chosen")) date.classList.remove("chosen");
            const author = document.getElementById("author");
            if (author.classList.contains("chosen")) author.classList.remove("chosen");
        }
    }

    const setDisplay = (domain) => {
        if (document.getElementById(domain).style.display === 'none') {
            document.getElementById(domain).style.display = 'block'
        } else {
            document.getElementById(domain).style.display = 'none'
        }
    }

    return (
        <>  
            {!loading ?
                <div className="linksPage">
                <div className="counter">{linksByDates.length || linksByAuthors.length} Links</div>
                {(linksByDates.length === 0 || linksByAuthors.length === 0) ?
                    <Redirect to="/" />
                :
                    <div className="options">
                        <h2 id="date" className="chosen" onClick={() => setChoosen('date')}>By Date</h2>
                        <h2 id="domain" onClick={() => setChoosen('domain')}>By Domain</h2>
                        <h2 id="author" onClick={() => setChoosen('author')}>By Author</h2>
                    </div>               
                }
                { byDate ?
                    linksByDates.map(link => ( 
                        <div className="linkDiv">
                            <div className="dateLink">{link.date.slice(0, 10)}</div>
                            <div>
                                <a className="linkAnchor" href={link.links[0]} target="blank">{link.links[0]}</a>
                                <Link to={`/links/${link._id}`} className="linkLinkPage">(Go To Link Page)</Link>
                            </div>
                            <div className="authorLink">{link.author}</div>
                        </div> 
                )) : byAuthor ?  
                    linksByAuthors.map(link => ( 
                        <div className="linkDiv">
                            <div className="dateLink">{link.date.slice(0, 10)}</div>
                            <div>
                                <a className="linkAnchor" href={link.links[0]} target="blank">{link.links[0]}</a>
                                <Link to={`/links/${link._id}`} className="linkLinkPage">(Go To Link Page)</Link>
                            </div>
                            <div className="authorLink">{link.author}</div>
                        </div>                    
                )) : byDomain ?
                    linksByDomains.map(domain => ( 
                        <div className="domainDiv">
                            <div className="domainName" onClick={() => setDisplay(domain.domain)}>{domain.domain + " (" + domain.count + ")"}</div>
                            <div id={domain.domain} className="domainLinks" style={{display: "none"}}>
                            {domain.ids.map(link => (
                                <div className="linkDiv">
                                <div className="dateLink">{link.date.slice(0, 10)}</div>
                                <div>
                                    <a className="linkAnchor" href={link.links[0]} target="blank">{link.links[0]}</a>
                                    <Link to={`/links/${link._id}`} className="linkLinkPage">(Go To Link Page)</Link>
                                </div>
                                <div className="authorLink">{link.author}</div>
                            </div> 
                            ))}
                            </div> 
                        </div> 
            ))
            : <></>
            }
                </div>
            : <h2>Loading ...</h2>
            }
            
        </>
    )
}

export default Links
