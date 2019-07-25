var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function(app) {
    //send a get request when the scrape button is clicked
    app.get("/scrape", function(req, res) {
        //axios parses the link into html format
        axios.get("https://www.delish.com/cooking/").then(function(response) {
            //cheerio makes the html elements targetable, similar to jquery
            var $ = cheerio.load(response.data);
        
            //i is the index, element is full-item
            $(".full-item").each(function(i, element) {
                //object to hold all of the article information
                var result = {};

                result.title = $(element).children(".full-item-content").children(".full-item-title").text();
                result.description = $(element).children(".full-item-content").children(".full-item-dek").text().trim();
                //get the author name; some authors are unlisted
                var author = $(element).children(".full-item-content").children(".byline").children(".byline-name").text().trim();
                //if author is empty, rewrite author to anonymous
                if (author === "") {
                    result.author = "Anonymous";
                //if not, use the author's name
                } else {
                    result.author = author;
                }
                //get the initial image link
                var image = $(element).children(".item-image").children("span").attr("data-lqip");
                //get the index of ? to remove the substring after jpg
                var filterIndex = image.indexOf("?");
                //update link into something cleaner
                result.image = image.substring(0, filterIndex);
                result.tag = $(element).children(".full-item-metadata").children("a").text();
                //link to the article
                result.link = "https://www.delish.com/cooking/recipe-ideas" + $(element).children(".item-image").attr("href");
                //get the attribute value for the date posted to sort by descending order
                result.datetime = $(element).children(".full-item-metadata").children(".publish-date").attr("data-publish-date");
                
                //inserts a new article into the article collection
                //create and insert works the same
                db.Article.create(result).then(function(data) {
                    console.log(data);
                }).catch(function(err) {
                    console.log(err);
                });
            });
            //need to send back a response when complete
            res.send("Scrape Complete");
        });
    });

    //find all of the articles
    app.get("/articles", function(req, res) {
        db.Article.find({}).then(function(data) {
            //send back a response containing the data in json format
            res.json(data);
        //if error, return error
        }).catch(function(err) {
            res.json(err);
        });
    });

    //find a specific article by their id and associate comments
    app.get("/articles/:id", function(req, res) {
        db.Article.findOne({_id: req.params.id}).populate("comment").then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
    });

    //send a post request when adding a comment
    app.post("/articles/:id", function(req, res) {
        console.log(req.body);
        //create a comment using the poster's name and comment
        db.Comment.create(req.body).then(function(data) {
            //find the article by id and push the new comment into the specific article
            db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {"comment": data._id}}, {new: true})
            .then(function(data) {
                res.json(data);
            }).catch(function(err) {
                res.json(err);
            });
        });
    });

    //update the saved status of a certain article depending on if user clicks on the favorite button
    app.put("/articles/:id", function(req, res) {
        db.Article.update({_id: req.params.id}, {saved: req.body.saved}).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
    });
};