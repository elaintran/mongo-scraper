var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function(app) {
    app.get("/scrape", function(req, res) {
        axios.get("https://www.delish.com/cooking/").then(function(response) {
            var $ = cheerio.load(response.data);
        
            //i is the index, element is full-item
            $(".full-item").each(function(i, element) {
                var result = {};

                result.title = $(element).children(".full-item-content").children(".full-item-title").text();
                result.description = $(element).children(".full-item-content").children(".full-item-dek").text().trim();
                //get the author name; some authors are unlisted
                var author = $(element).children(".full-item-content").children(".byline").children(".byline-name").text().trim();
                //if author is empty, rewrite author to anonymous
                if (author === "") {
                    result.author = "Anonymous";
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
                //get the attribute value for the date posted
                result.datetime = $(element).children(".full-item-metadata").children(".publish-date").attr("data-publish-date");
                
                db.Article.create(result).then(function(data) {
                    // res.json(data);
                    console.log(data);
                }).catch(function(err) {
                    console.log(err);
                });
            });
            res.send("Scrape Complete");
        });
    });
};