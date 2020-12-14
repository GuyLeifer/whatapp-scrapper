const express = require('express')
const router = express.Router();

const mongoose = require('mongoose');
const Link = require('../models/mongoSchema');

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.log(err.reason));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

router.post('/', (req, res) => {
    const { id, links, message, author, date, history } = req.body;
    try {
        const link = new Link({
            _id: id,
            links: links,
            message: message,
            author: author,
            date: date,
            history: history,
        })
        link.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));
        res.status(201).send(link)
    } catch (err) {
        console.log(err.massage)
    }
})

router.get('/', async (req, res) => {
    try {
        const links = await Link.find();
        res.send(links)
    } catch (err) {
        res.send(err)
    }
})

router.get('/analysis/websites', async (req, res) => {
    try {
        const links = await Link.find();
        let webLinks = [];
        links.forEach(link => {
            let webName = new URL(link.links[0]).host;
            if (webName.startsWith("www")) webName = webName.slice(4);
            webLinks.push(webName)         
        })
        webLinks.sort();
        let websites = [];
        // for (let i = 0; i < websites.length; i++) {
        //     for (let j = 0; j < webLinks.length; j++) {
        //         if (websites[i].hasOwnProperty(webLinks[j])) {
        //             websites[i].count++;
        //         } else if (websites)
        //     }
        // }
        let webNames = [];
        webLinks.forEach(link => {
            if(webNames.includes(link)) {
                websites.forEach(web => {
                    if(web.name === link) web.count++
                })
            } else {
                webNames.push(link)
                websites.push({
                    name: link,
                    count: 1
                })
            }
        })
        websites.sort((a, b) => b.count - a.count)
        res.send(websites)
    } catch (err) {
        res.send(err)
    }
})
router.get('/by-web', async (req, res) => {
    try {
        const links = await Link.aggregate(
            [ { $project : { links : 1, author : 1, date : 1 } } ]
        );
        let webLinks = [];
        links.forEach(link => {
            let webName = new URL(link.links[0]).host;
            if (webName.startsWith("www")) webName = webName.slice(4);
            webLinks.push( {
                id: link._id,
                webName: webName
            })         
        })
        webLinks.sort();
        let websites = [];
        let webNames = [];
        webLinks.forEach(link => {
            if(webNames.includes(link.webName)) {
                websites.forEach(web => {
                    if(web.name === link.webName) {
                        web.count++;
                        web.ids.push(link.id);
                    }
                })
            } else {
                webNames.push(link.webName)
                websites.push({
                    name: link.webName,
                    count: 1,
                    ids: [link.id]
                })
            }
        })
        websites.sort((a, b) => b.count - a.count)
        let linksByDomains = [];
        websites.forEach(domain => {
            let ids = [];
            domain.ids.forEach(id => {
                links.forEach(link => {
                    if (id === link._id) ids.push(link)
                })
            })
            linksByDomains.push({
                domain: domain.name,
                count: domain.count,
                ids: ids
            })
        })
        res.send(linksByDomains)
    } catch (err) {
        res.send(err)
    }
})
router.get('/analysis/dates', async (req, res) => {
    try {
        const allLinks = await Link.aggregate( [ 
            { $sortByCount: "$date" },
        ] )

        allLinks.sort( (a, b) => a._id - b._id)
        res.send(allLinks)
    } catch (err) {
        res.send(err)
    }
})
router.get('/analysis/authors', async (req, res) => {
    try {
        const allLinks = await Link.aggregate( [ 
            { $sortByCount: "$author" },
        ] )
        res.send(allLinks)
    } catch (err) {
        res.send(err)
    }
})
router.get('/by-id/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const link = await Link.find({ "_id": id })
        res.send(link)
    } catch (err) {
        res.send(err)
    }
})
router.get('/by-date', async (req, res) => {
    try {
        const allLinks = await Link.aggregate(
            [ { $project : { links : 1, author : 1, date : 1 } } ]
        ).sort( { date: 1, _id: 1 })
        res.send(allLinks)
    } catch (err) {
        res.send(err)
    }
})
router.get('/by-date/:date', async (req, res) => {
    const { date } = req.params;
    try {
        const allLinks = await Link.find({ "date": date })
        res.send(allLinks)
    } catch (err) {
        res.send(err)
    }
})
router.get('/by-author', async (req, res) => {
    try {
        const allLinks = await Link.aggregate(
            [ { $project : { links : 1, author : 1, date : 1 } } ]
        ).sort( { author: 1, _id: 1 })
        res.send(allLinks)
    } catch (err) {
        res.send(err)
    }
})
router.get('/by-author/:author', async (req, res) => {
    const { author } = req.params;
    try {
        const allLinks = await Link.find({ "author": author })
        res.send(allLinks)
    } catch (err) {
        res.send(err)
    }
})

router.get('/search/:query', async (req, res) => {
    const { query } = req.params;
    try {
        const allLinks = await Link.find({links:{'$regex' : query}}).limit( 8 )
        res.send(allLinks)
    } catch (err) {
        res.send(err)
    }
})

module.exports = router;