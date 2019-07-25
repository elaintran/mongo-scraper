# Delish Scraper
Delish Scraper is a food news and recipe application that scrapes and displays articles pulled from [Delish](https://www.delish.com/) for users to save into their favorites and add comments.
All data from articles and comments are stored in the MongoDB database.

## Development Process
When the Scrape button is clicked, it sends a GET request to pull article information,
which sends another GET request Axios in order to get the HTML of the Delish webpage and load the response data into Cheerio, where it becomes targetable by a variable ($). Each article entry and the information selected, including the title, author, image, and datetime, is inserted into MongoDb. Once the GET request is complete, the window is reloaded and the new articles are displayed onto the page. To prevent the same articles from being create in the database, each title property is set as unique.

## Demo
[View Demo Here](https://www.delishscraper-ett.herokuapp.com)

Technology Used
* [Express](https://www.npmjs.com/package/express)
* [Express-Handlebars](https://www.npmjs.com/package/express-handlebars)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://www.npmjs.com/package/mongoose)
* [Axios](https://www.npmjs.com/package/axios)
* [Cheerio](https://www.npmjs.com/package/cheerio)