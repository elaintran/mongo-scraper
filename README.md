# Delish Scraper
Delish Scraper is a food news and recipe application that scrapes and displays articles pulled from [Delish](https://www.delish.com/) for users to save into their favorites and add comments.
All data from articles and comments are stored in the MongoDB database.

## Development Process
When the Scrape button is clicked, it sends a GET request to pull article information from Delish.
Within that request, another GET request is sent to Axios in order to get the HTML of the webpage and load the response data into Cheerio. Once loaded, the data becomes targetable by a variable, similar to jQuery. The information of each article entry is then inserted into MongoDB. Once the request is complete, the window is reloaded and the new articles are displayed onto the page. To prevent the same articles from being created in the database, each title property is set as unique.

Users also have the ability to save and unsave their favorite articles. By clicking the heart icon, it sends a PUT request to update the saved state. If an article is favorited, the saved state is set to true and vice versa.

The comment property in the Article model is set to an array instead of object in order to push in additional comments. When a user submits a comment, a new instance is created in the Comment table and also pushed into the comment property of the article it was submitted for.

## Demo
[View Demo Here](https://www.delishscraper-ett.herokuapp.com)

## Technology Used
* [Express](https://www.npmjs.com/package/express)
* [Express-Handlebars](https://www.npmjs.com/package/express-handlebars)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://www.npmjs.com/package/mongoose)
* [Axios](https://www.npmjs.com/package/axios)
* [Cheerio](https://www.npmjs.com/package/cheerio)