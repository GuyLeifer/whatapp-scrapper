const { Router } = require('express');

const router = Router();

// router.get('/', async (req, res) => {
//     const allLinks = await Link.findAll();
//     res.json(allLinks);
// });

// router.get('/:linkId', async (req, res) => {
//     const link = await Link.findByPk(req.params.linkId);
//     res.json(link)
// })

router.post('/', async (req, res) => {
    const { id, link, message, author, date } = req.body;
    const newLink = await Link.create({
        _id: id,
        link: link,
        message: message,
        author: author, 
        createdAt: date || new Date(), 
    });
    res.json(newLink)
})

// router.patch('/:linkId', async (req, res) => {
//     const link = await Link.findByPk(req.params.linkId);
//     await link.update(req.body);
//     res.json(link)
// })

// router.delete('/:linkId', async (req, res) => {
//     const link = await Link.findByPk(req.params.linkId);
//     await link.destroy();
//     res.json({ deleted: true })
// })


module.exports = router;