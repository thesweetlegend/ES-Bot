const express = require('express');
var router = express.Router();
const ArticlesModel = require('../models/teams.js')


// Display the articles page
router.get("/", function(req, res)
{

  // Use the results of the model method to build the articles page
  function createArticlesPage(results)
  {
    console.log(results);
    req.TPL.articles = results;
    res.render("teams",
               req.TPL);
  }

  // Retrieve all of the articles using the model method, display the page
  ArticlesModel.getAllArticles(createArticlesPage);

});

module.exports = router;
