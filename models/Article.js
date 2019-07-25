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
    saved: {
        type: Boolean,
        default: false
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

ArticleSchema.methods.checkAuthor = function() {
    //if author is empty, rewrite author to anonymous
    if (this.author === "") {
        this.author = "Anonymous";
    }
    //if not, use the author's name
    return this.author;
}

ArticleSchema.methods.cleanImgLink = function() {
    //get the index of ? to remove the substring after jpg
    var filterIndex = this.image.indexOf("?");
    //update link into something cleaner
    this.image = this.image.substring(0, filterIndex);
    return this.image;
}

var Article = mongoose.model("Article", ArticleSchema);

//export the Article to models/index.js
module.exports = Article;