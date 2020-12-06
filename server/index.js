const fs = require('fs');
const moment = require('moment');
const whatsapp = require('whatsapp-chat-parser');

const fileContents = fs.readFileSync('./_chat.txt', 'utf8');

function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  // console.log('text.matchAll(urlRegex)', text.matchAll)
  // console.log('text.matchAll(urlRegex)', [...text.matchAll(urlRegex)])
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
  'linkedin.com/in'
]

whatsapp
  .parseString(fileContents)
  .then(messages => {
    // console.log('messages', messages)
    const linksByDates = messages.reduce((dates, messageObject) => {
      const day = moment(messageObject.date).format('YYYY-MM-DD')
      const { message, author } = messageObject;
      console.log('message', messageObject);
      const linksObjects = urlify(message).filter(([link]) => {
        return !linksBlackList.find((blackLink) => link.includes(blackLink))
      })
      // console.log('linksObjects', linksObjects);
      if (linksObjects.length) {
        linksCounter += linksObjects.length
        if (!dates[day]) {
          dates[day] = [];
        }
        dates[day].push({ message, author, links: linksObjects  })
      }
      return dates;
    }, {})
    // console.log('linksByDates', linksByDates)
    // fs.writeFileSync('./chat.json', JSON.stringify(messages))
    fs.writeFileSync('./links-by-dates.json', JSON.stringify(linksByDates))
    console.log('linksCounter', linksCounter)
    // Do whatever you want with messages
  })
  .catch(err => {
    // Something went wrong
  });