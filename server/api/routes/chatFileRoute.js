const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: 'chats/' });

const scraper = require('../../scraper')

const fs = require('fs');
const path = './_chat.txt';

const mongoose = require('mongoose');
const Link = require('../models/mongoSchema');

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.log(err.reason));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


router.get('/', async (req, res) => {
    try {
        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                console.error(err)
                res.send(false)
            } else {
                res.send(true)
            }
        })
    } catch(err) {
        console.error(err)
    }
})

router.post('/', upload.single('file'), async (req, res) => {
    const formData = req.file;
    try {
        fs.writeFileSync('./_chat.txt', fs.readFileSync(formData.path, 'utf8'), 'utf8');
        await Link.remove({});
        scraper();
        res.send("Chat Uploaded Successfully")
    } catch (err) {
        res.send(err.message)
    }
})

router.put('/', upload.single('file'), async (req, res) => {
    const formData = req.file;
    try {
        fs.writeFileSync('./_chat.txt', fs.readFileSync(formData.path, 'utf8'), 'utf8');
        await Link.remove({});
        scraper();
        res.send("Chat Exchanged Successfully")
    } catch (err) {
        res.send(err.message)
    }
})

module.exports = router;