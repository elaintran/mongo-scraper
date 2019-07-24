var db = require("../models");

//html routes to handlebars
module.exports = function(app) {
    //home route with all of the scraped articles
    app.get("/", function(req, res) {
        //sort the articles in descending order from datetime
        //possibly parse the datetime to a more readable format through moment
        db.Article.find().sort({datetime: -1}).then(function(data) {
            //render information into index.handlebars
            res.render("index", {articles: data});
        })
    });

    //route to all of the saved articles
    app.get("/bookmarks", function(req, res) {
        //make a new handlebars to hold this information?
        //display only saved articles through boolean?
        res.render("bookmark", {});
    });
};