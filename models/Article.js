var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//create a new schema for article
var ArticleSchema = new Schema({
    //title is required for users know what the article is about
    title: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: false
    },
    //optional author, but will print anonymous if empty 
    author: {
        type: String,
        trim: true,
        required: false
    },
    //image is not mandatory, but should have a placeholder image in case no image is loaded
    image: {
        type: String,
        default: "dummy-image",
        required: false
    },
    //link is required so users can have a place to read the article
    link: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        trim: true,
        required: false
    },
    datetime: {
        type: Date,
        required: false
    },
    postDate: {
        type: Date
    },
    saved: {
        type: Boolean,
        default: false
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

//export the Article to models/index.js
module.exports = Article;