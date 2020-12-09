import React, { useState, useEffect } from 'react';
import './Dashboard.css';

import axios from 'axios';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush,
  } from 'recharts';

function Dashboard() {

    const [links, setLinks] = useState([]);
    const [linksByDates, setLinksByDates] = useState([]);
    const [linksByAuthors, setLinksByAuthors] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/links/analysis');
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
        })()
    }, [])

    const linksData = [
        { 
            web: 'Youtube',
            amount: 0
        },
        { 
            web: 'Facebook',
            amount: 0
        },
        { 
            web: 'Github',
            amount: 0
        },
        { 
            web: 'StackOverFlow',
            amount: 0
        },
        { 
            web: 'LinkedIn',
            amount: 0
        },
    ]

    for (let i = 0; i < links.length; i++) {
        linksData[i].amount = links[i].length
    }

    return (
        <div className="dashboard">
            <div className="firstLine">
                <div className="chart">
                    <h2>Links Statistics</h2>
                    <BarChart
                    width={700}
                    height={300}
                    data={linksData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="web" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="purple" />
                    </BarChart>
                </div>
                <div className="chart">
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
                        <Brush />
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
                    <Line type="monotone" dataKey="links" stroke="#2C3A47" fill="#2C3A47" />
                    <Brush />
                </LineChart>
                </div> 
        </div>
    )
}

export default Dashboard
