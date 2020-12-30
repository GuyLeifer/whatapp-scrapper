require('dotenv/').config(); 
const app = require('./app');
const scraper = require('./scraper');

const port = process.env.PORT;

app.listen(port, () => {
    scraper()
    console.log(`app listening at http://localhost:${port}`)
})