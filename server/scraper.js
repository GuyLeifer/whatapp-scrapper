const fs = require('fs');
const moment = require('moment');
const whatsapp = require('whatsapp-chat-parser');
const axios = require('axios');
// const puppeteer = require('puppeteer');

function scraper() {
    // const browser = await puppeteer.launch({
    //     headless: false
    // })
    // console.log("until here 2 - puppeteer is working")
    // const page = await browser.newPage();
    // await page.goto('https://web.whatsapp.com/', {
    //     waitUntil: 'load',
    // });                                                          //dark web
    // console.log("until here 3 - whatapp web on board")
    // await page.waitForSelector('#pane-side > div:nth-child(1) > div > div')
    // console.log("until here 4 - whatapp web connected")
    // const chats = await page.$$('#pane-side > div:nth-child(1) > div > div > div');
    // chats.forEach(chat => {
    //     console.log(chat.$('div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > span > span').getProperty('innerText').jsonValue());
    // })
    // console.log("until here 5 - whatapp web navigated")



    const fileContents = fs.readFileSync('./_chat.txt', {encoding: "utf8"});
    
    function urlify(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return [...text.matchAll(urlRegex)]
    }
    
    let linksCounter = 0;
    
    // Forms
    // Docs
    // Github example
    // youtube learn
    // Reading
    // song
    // jobke
    // npm package
    const linksBlackList = [
        'zoom.us',
    ]
    
    let id = 1;
    whatsapp
        .parseString(fileContents)
        .then(messages => {
    // console.log('messages', messages)
            const linksByDates = messages.reduce((dates, messageObject) => {
                const day = moment(messageObject.date).format('YYYY-MM-DD')
                const { message, author } = messageObject;
                const linksObjects = urlify(message).filter(([link]) => {
                    return !linksBlackList.find((blackLink) => link.includes(blackLink))
                })
                if (linksObjects.length) {
                    linksCounter += linksObjects.length
                    if (!dates[day]) {
                        dates[day] = [];

                    }
                    dates[day].push({ id: id, message, author, links: linksObjects  })
                    id++;
                }
                return dates;
            }, {})
        
            fs.writeFileSync('./chat.json', JSON.stringify(messages))
            fs.writeFileSync('./links-by-dates.json', JSON.stringify(linksByDates))

            // linksByDates.forEach(async function(link) {
            //     console.log("in")
            //     await axios.post('/links', {
            //         link: link.link,
            //         author: link.author,
            //         link: link.link,
            //         date: link.date,
            //     })
            // })

            for (const date of Object.keys(linksByDates)) {
                linksByDates[date].map(async(link) => {
                    try {
                        await axios.post('http://localhost:8001/links', {
                            id: link.id,
                            author: link.author,
                            message: link.message,
                            links: link.links[0],
                            date: date
                        })
                    } catch (err) {
                        console.log(err.message)
                    }
                })
            }

            console.log('linksCounter', linksCounter)
        })
        .catch(err => {
            console.log(err.message)
        });
}

module.exports = scraper;
