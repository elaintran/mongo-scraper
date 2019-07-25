var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    //name is optional, but should write anonymous if user opts to not write a name
    name: {
        type: String,
        trim: true,
        required: false
    },
    //body is required because comments should never be empty
    body: {
        type: String,
        trim: true,
        required: true
    }
});

CommentSchema.methods.checkPoster = function() {
    if (this.name === "") {
        this.name = "Anonymous";
    }
    return this.name;
}

var Comment = mongoose.model("Comment", CommentSchema);

//exports comment to models/index.js
module.exports = Comment;