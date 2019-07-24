var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var app = express();

var PORT = process.env.PORT || 3000;

//parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//make the public folder available for use
app.use(express.static("public"));

var URI = process.env.MONGO_URI || "mongodb://localhost/delishdb";
mongoose.connect(URI, { useNewUrlParser: true });

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

app.listen(PORT, function() {
    console.log("App is listening on port " + PORT);
});