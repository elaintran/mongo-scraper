var db = require("../models");

//html routes to handlebars
module.exports = function(app) {
    //home route with all of the scraped articles
    app.get("/", function(req, res) {
        //sort the articles in descending order from datetime
        db.Article.find().sort({datetime: -1}).then(function(data) {
            //render information into index.handlebars
            res.render("index", {articles: data});
        }).catch(function(err) {
            res.json(err);
        })
    });

    //route to all of the saved articles
    app.get("/favorite", function(req, res) {
        db.Article.find({saved: true}).sort({datetime: -1}).then(function(data) {
            //render data onto the same handlebar page since the only thing that
            //changed is the type of article displayed
            res.render("index", {articles: data});
        })
    });
};