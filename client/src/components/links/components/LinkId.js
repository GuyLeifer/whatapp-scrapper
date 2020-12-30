import React, { useEffect, useState } from 'react';
import './LinkId.css';

import axios from 'axios';
// import GenericNotFound from '../../../components/genericNotFound/GenericNotFound'

function LinkId({ match}) {
    const [link, setLink] = useState();
    const { id } = match.params;
    console.log(id)
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/links/by-id/${id}`);
            console.log(data[0]);
            setLink(data[0])
        })()
    }, [])

    return (
        <>
        {link &&
            link.links ?
            <div className="linkId">
                <h2 className="title">Link Number {link._id}</h2>
                <div className="linkDivision">
                    <h3>Link:</h3>
                    <div className="linkContentDiv">
                        <a className="linkAtLinkId" href={link.links[0]} target="blank">{link.links[0]}</a>                     
                    </div>                    
                </div>
                <div className="content">
                    <h4>Message:</h4>
                    <div className="messageAtLinkId">{link.message}</div>
                </div>
                <div className="chatHistory">
                    <div>Chat History:</div>
                    {link.history.map(message => 
                        <div className="chatHistoryContent">
                            <span className="chatHistoryDate">{message.date.split('T')[0] + " " + message.date.split('T')[1].slice(0, 5) }</span>
                            <span className="chatHistoryMessage">{message.message}</span>
                            <span className="chatHistoryAuthor">{message.author}</span>
                        </div>
                    )}
                </div>
                <div className="footer">
                    <div className="info">
                        <div className="authorId">Author: <span className="authorAtLinkId">{link.author}</span></div>                
                        <div className="dateId">Date: {link.date.slice(0, 10)}</div>
                    </div>
                </div>
            </div>
            : <> </>
        }
        </>
    )
}

export default LinkId