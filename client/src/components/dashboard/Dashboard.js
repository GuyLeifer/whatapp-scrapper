import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import ChangeFile from '../file/ChangeFile';

import axios from 'axios';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush,
} from 'recharts';
//   import { useHistory } from 'react-router-dom';

function Dashboard() {

    const [loading, setLoading] = useState(true);
    const [links, setLinks] = useState([]);
    const [linksByDates, setLinksByDates] = useState([]);
    const [linksByAuthors, setLinksByAuthors] = useState([]);
    const [chatFileExists, setChatFileExists] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        (async () => {

            const { data } = await axios.get('/links/analysis/websites');
            setLinks(data);

            let dates = await axios.get('/links/analysis/dates');
            dates = dates.data.map(date => (
                {
                    date: date._id.slice(0,10),
                    links: date.count
                }
            ))
            setLinksByDates(dates);

            const authors = await axios.get('/links/analysis/authors');
            setLinksByAuthors(authors.data);

            const file = await axios.get('/chatfile');
            setChatFileExists(file.data);

            setLoading(false)            
        })()
    }, [])

    // let history = useHistory();

    const changeChat = () => {
        setModalIsOpen(true)
    }

    return (
        <>
            { loading ?
                <h2>Loading ...</h2>
            : 
                chatFileExists ?
                    <div className="dashboard">
                        <div className="redirect" onClick={() => changeChat()}>Wanna Change Chat?</div>
                        {modalIsOpen && <ChangeFile modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>}
                        <ChangeFile />
                        <div className="firstLine">
                            <div className="chart">
                                <h2>Links Statistics</h2>
                                <BarChart
                                width={700}
                                height={300}
                                data={links}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="purple" />
                                    <Brush startIndex={0} endIndex={10}/>
                                </BarChart>
                            </div>
                            <div className="chart authorChart">
                                <h2>Authors Statistics</h2>
                                <BarChart
                                width={700}
                                height={300}
                                data={linksByAuthors}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="_id" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="green" />
                                    <Brush startIndex={0} endIndex={10}/>
                                </BarChart>
                            </div>
                        </div>
                            <div className="chart">
                            <h2>Date Statistics</h2>
                            <LineChart
                                width={1500}
                                height={300}
                                data={linksByDates}
                                syncId="anyId"
                                margin={{
                                top: 10, right: 30, left: 0, bottom: 0,
                                }}
                            >           
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="links" stroke="#2C3A47" fill="#2C3A47" strokeWidth={4}/>
                                <Brush />
                            </LineChart>
                        </div> 
                    </div>
                : <div>
                    <form>
                        <input type="file" />
                    </form>
                </div>         
            }
            
        
    </>
    )
}

export default Dashboard
