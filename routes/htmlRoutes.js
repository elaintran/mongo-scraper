//html routes to handlebars
module.exports = function(app) {
    //home route with all of the scraped articles
    app.get("/", function(req, res) {
        // 
        //render information into index.handlebars
        res.render("index", {});
    });

    //route to all of the saved articles
    app.get("/bookmarks", function(req, res) {
        res.render("bookmark", {});
    });
};