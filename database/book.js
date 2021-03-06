const mongoose = require("mongoose");

//creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    authers: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number,
});

//create a book model
const BookModel = mongoose.model("books", BookSchema); //-> books here mean the name of database

module.exports = BookModel;