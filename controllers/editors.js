const express = require('express');
var router = express.Router();
const ArticlesModel = require('../models/articles.js');
const UserModel = require('../models/user.js');

// Display the editors page
router.get("/", function(req, res)
{
  function displayInfo(userArray, articleArray){
    req.TPL.article = articleArray;
    req.TPL.user = userArray;
    res.render('editors', req.TPL);
  }
  function getArticle(user){
    ArticlesModel.getArticleInfo(user,displayInfo);
  }

  console.log(req.session.level);
  if(req.session.level == "editor"){
    UserModel.getUser(getArticle);
  }
  else{
    res.redirect("/home");
  }

});

// Display the editors page
router.get("/delUser/:username", function(req, res)
{
    function renderPage() { 
      res.redirect("/editors"); 
    }

    function deleteUserArticle(username){
      console.log("Deleting info: "+username);
      ArticlesModel.deleteUserArticle(username,renderPage);
    }

    UserModel.deleteUser(req.params.username, deleteUserArticle);
});

// Display the editors page
router.get("/delArticle/:id", function(req, res)
{
    function renderPage() {
      res.redirect("/editors"); 
      }

    ArticlesModel.deleteArticle(req.params.id, renderPage);

});

module.exports = router;
