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

module.exports = router;