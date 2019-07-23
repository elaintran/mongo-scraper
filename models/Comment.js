var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    //name is optional, but should write anonymous if user opts to not write a name
    name: {
        type: String,
        required: false
    },
    //body is required because comments should never be empty
    body: {
        type: String,
        required: true
    }
});

var Comment = mongoose.model("Comment", CommentSchema);

//exports comment to models/index.js
module.exports = Comment;