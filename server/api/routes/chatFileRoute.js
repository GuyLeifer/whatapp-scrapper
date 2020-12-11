const express = require('express')
const router = express.Router();

const fs = require('fs')
const path = './_chat.txt';

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

router.post('/', (req, res) => {
    const formData = req.body;
    console.log(req)
    try {
        console.log(file)
        // fs.writeFileSync('./chat.txt', file)
    } catch (err) {
        res.send(err.message)
    }
})
router.put('/', (req, res) => {
    const formData = req.file;
    console.log(req.fields)
    // try {
    //     console.log(fs.readFileSync(file))
    //     // fs.writeFileSync('./chat.txt', file)
    // } catch (err) {
    //     res.send(err.message)
    // }
})

module.exports = router;