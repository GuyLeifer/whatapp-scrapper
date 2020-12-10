import React, { useEffect, useState } from 'react';
import './LinkId.css';

import axios from 'axios';
// import GenericNotFound from '../../../components/genericNotFound/GenericNotFound'

function PostId({ match}) {
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
                <h2><a className="linkAtLinkId" href={link.links[0]} target="blank">{link.links[0]}</a></h2>
                <div className="content"><h4>Message:</h4>{link.message}</div>
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

export default PostId