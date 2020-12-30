import React, { useState } from 'react';
import './Searchbar.css';
import axios from 'axios';

// icons
import searchIcon from './images/searchIcon.png';
import postIcon from './images/postIcon.png';

function Searchbar() {

    const [options, setOptions] = useState([]);

    const changeHandler = async (e) => {
        if (e.target.value === "") {
            setOptions([])
        } else {
            try {
                const { data } = await axios.get(`/links/search/${e.target.value}`);
                console.log(data)
                if(data) {
                    setOptions(data);
                } else {
                    setOptions([])
                }
                }
                catch(err) {
                    console.log(err.message);
                }
        }
    }
    const goToPage = (id) => {
        const link = `/link/${id}`;
        window.location.href = link;
    }

    return (
        <div className="searchContainer">
            <img className="search-icon" src={searchIcon} alt="search"/>
            <input 
                id="search"
                type="search" 
                placeholder="Search For Link..."
                onChange={(e) => changeHandler(e)}
            />
            <div className="optionsSearch">
            {options.length > 0 && (
                options.map(link => 
                    <div 
                    className={"optionLink"} 
                    key={"link " + link._id}
                    onClick={() => goToPage(link._id)}
                    >
                        <div className="optionName">{link.links[0].slice(0,25)}...</div>
                        <div className="optionIconDiv">
                        <img className="optionIcon" src={postIcon} alt="postIcon" />
                        </div>
                    </div>
                )
            )}
            </div>
        </div> 
    )
}

export default Searchbar