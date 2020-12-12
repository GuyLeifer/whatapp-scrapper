const mongoose = require('mongoose');
const Schema = mongoose.Schema

const linkSchema = new Schema({
    _id: Number,
    author: String, 
    date: Date,
    message: String,
    links: [String],
    history: [
        {
            id: Number,
            author: String, 
            date: Date,
            message: String,
        }
    ]
});

const Link = mongoose.model('newLinks', linkSchema);
module.exports = Link;