const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join('../client', 'build')));

app.use('/links', require('./api/routes/LinkRoute'))
app.use('/chatfile', require('./api/routes/chatFileRoute'))

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


module.exports = app;