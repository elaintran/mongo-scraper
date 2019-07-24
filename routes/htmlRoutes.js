var db = require("../models");

//html routes to handlebars
module.exports = function(app) {
    //home route with all of the scraped articles
    app.get("/", function(req, res) {
        db.Article.find().sort({datetime: -1}).then(function(data) {
            //render information into index.handlebars
            res.render("index", {articles: data});
        })
    });

    //route to all of the saved articles
    app.get("/bookmarks", function(req, res) {
        res.render("bookmark", {});
    });
};