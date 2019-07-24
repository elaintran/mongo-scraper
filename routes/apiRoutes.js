var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
    app.get("/scrape", function(req, res) {
        axios.get("https://www.delish.com/cooking/recipe-ideas/").then(function(response) {
            var $ = cheerio.load(response.data);
            var results = [];
        
            //i is the index, element is full-item
            $(".full-item").each(function(i, element) {
                var title = $(element).children(".full-item-content").children(".full-item-title").text();
                var description = $(element).children(".full-item-content").children(".full-item-dek").text().trim();
                var author = $(element).children(".full-item-content").children(".byline").children(".byline-name").text().trim();
                //get the initial image link
                var image = $(element).children(".item-image").children("span").attr("data-lqip");
                //get the index of ? to remove the substring after jpg
                var filterIndex = image.indexOf("?");
                //update link into something cleaner
                image = image.substring(0, filterIndex);
                var link = "https://www.delish.com/cooking/recipe-ideas" + $(element).children(".item-image").attr("href");
                var datetime = $(element).children(".full-item-metadata").children(".publish-date").attr("data-publish-date");
                
                results.push({
                    title: title,
                    description: description,
                    author: author,
                    image: image,
                    link: link,
                    datetime: datetime
                });
            });
            res.json(results);
        });
    })
};