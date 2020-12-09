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
    const { id, links, message, author, date } = req.body;
    try {
        const link = new Link({
            _id: id,
            links: links,
            message: message,
            author: author,
            date: date
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

router.get('/analysis', async (req, res) => {
    try {
        const linksYoutube = await Link.find({"links": /^https:\/\/www.youtube/});
        const linksFacebook = await Link.find({"links": /^https:\/\/www.facebook/});
        const linksGithub = await Link.find({"links": /^https:\/\/www.github/});
        const linksStackOverflow = await Link.find({"links": /^https:\/\/www.stackoverflow/});
        const linksLinkedin = await Link.find({"links": /^https:\/\/www.linkedin/});
        
        res.send([linksYoutube, linksFacebook, linksGithub, linksStackOverflow, linksLinkedin])
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
router.get('/by-date', async (req, res) => {
    try {
        const allLinks = await Link.find().sort( { date: 1, _id: 1 })
        res.send(allLinks)
    } catch (err) {
        res.send(err)
    }
})
router.get('/by-author', async (req, res) => {
    try {
        const allLinks = await Link.find().sort( { author: 1, _id: 1 })
        res.send(allLinks)
    } catch (err) {
        res.send(err)
    }
})

module.exports = router;