var mysql = require('mysql');

var db = mysql.createConnection({
  host: "45.40.136.18",
  user: "jqlghxv7_userES",
  password: "Password123",
  database: "esport_db"
});

// Return all of the articles
function getAllArticles(callback)
{
  db.query("SELECT * FROM Team;",
  	     function(err,results) { callback(results); });
}

function deleteUserArticle(username, callback)
{
  db.query("DELETE FROM Articles WHERE username = ? ;",username,
  	     function(err,results) { callback(); });
}

// Create a new article given a title, content and username
function createArticle(article,username,callback)
{
  db.query("INSERT INTO Articles VALUES (?,?,?)",
         [article.title, username, article.content],
         function(err)
         {
           callback();
         });
}

function getArticleInfo(user,callback)
{
  db.query("SELECT rowid, title, username FROM 'Articles';",
  	     function(err,results) { callback(user,results); });
}

function deleteArticle(id,callback)
{
  db.query("DELETE FROM Articles WHERE rowid=?", id,
         function(err) { callback(); });
}

module.exports = {getAllArticles, createArticle, getArticleInfo, deleteArticle, deleteUserArticle};
