const fs = require('fs');
const moment = require('moment');
const whatsapp = require('whatsapp-chat-parser-alt');

// const mongoose = require('mongoose');
const Link = require('./api/models/mongoSchema');

// mongoose.connect(process.env.MONGODB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).catch(err => console.log(err.reason));


// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

async function scraper() {

    const path = './_chat.txt'

    try {
        if (fs.existsSync(path)) {
            const fileContents = fs.readFileSync(path, {encoding: "utf8"});
    
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
            
            whatsapp
                .parseString(fileContents)
                .then(result => {
                    const messages = result.messages;
                    let id = 1;
                    let messageId = 1;
                    let messagesWithId = messages.map(message => {
                        message.messageId = messageId;
                        messageId++;
                        return message;
                    })
        
                    let linksByDates = messagesWithId.reduce((dates, messageObject) => {
                        const day = moment(messageObject.date).format('YYYY-MM-DD')
                        const { message, author, messageId } = messageObject;
                        const linksObjects = urlify(message).filter(([link]) => {
                            return !linksBlackList.find((blackLink) => link.includes(blackLink))
                        })
                        if (linksObjects.length) {
                            linksCounter += linksObjects.length
                            if (!dates[day]) {
                                dates[day] = [];
        
                            }
                            dates[day].push({ id: id, message, messageId, author, links: linksObjects  })
                            id++;
                        }
                        return dates;
                    }, {})
        
        
                    for (const date of Object.keys(linksByDates)) {
                        linksByDates[date].map(async(link) => {
        
                            let history = [];
                            for (let i = link.messageId - 11; i < link.messageId + 10; i++) {
                                if (i >= 0 && i < messagesWithId.length ) history.push( {
                                    date: messagesWithId[i].date,
                                    author: messagesWithId[i].author,
                                    message: messagesWithId[i].message,
                                    messageId: messagesWithId[i].messageId,
                                })
                            }
                            try {
                                const uploadLink = new Link({
                                    _id: link.id,
                                    author: link.author,
                                    message: link.message,
                                    links: link.links[0],
                                    date: date,
                                    history: history,
                                })
                                uploadLink.save()
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));
                            } catch (err) {
                                console.log(err.massage)
                            }
                        })
                    }
        
                    console.log('linksCounter', linksCounter)
                    return linksCounter;
                    
                })
                .catch(err => {
                    console.log(err.message)
                });
        }
    } catch(err) {
        console.error(err)
    }
}

module.exports = scraper;
