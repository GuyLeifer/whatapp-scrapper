const mongoose = require('mongoose');
const Schema = mongoose.Schema

const linkSchema = new Schema({
    _id: Number,
    author: String, 
    date: Date,
    message: String,
    links: [String]
});

const Link = mongoose.model('links', linkSchema);
module.exports = Link;