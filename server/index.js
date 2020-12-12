require('dotenv/').config(); 
const app = require('./app');
const scraper = require('./scraper');

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
    scraper()
    // setInterval(function() {
    //     scraper()
    // }, 2 * 60 * 1000);
})