var express = require("express");
var app = express();
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var PORT = 3000;

app.listen(PORT, function() {
    console.log("App is listening on port " + PORT);
});