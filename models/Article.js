var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//create a new schema for article
var ArticleSchema = new Schema({
    //title is required for users know what the article is about
    //unique title to prevent the same article from being added to database
    title: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    //stored, but not displayed on page
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
        trim: true,
        required: false
    },
    //link is required so users can be linked to the original article
    link: {
        type: String,
        trim: true,
        required: true
    },
    //extra property, used to add to the look of ui
    tag: {
        type: String,
        trim: true,
        required: false
    },
    //used to sort articles in descending order
    datetime: {
        type: Date,
        trim: true,
        required: false
    },
    //show if articles are favorited or not
    saved: {
        type: Boolean,
        default: false
    },
    //comment in array is important; allows mulitple comments to be pushed in
    //so original comment does not get overridden
    //also good for displaying the number of comments on page through comment.length
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