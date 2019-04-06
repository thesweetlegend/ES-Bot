var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

// Return all of the articles
function getAllArticles(callback)
{
  db.all("SELECT * FROM Articles",
  	     function(err,results) { callback(results); });
}

function deleteUserArticle(username, callback)
{
  db.all("DELETE FROM Articles WHERE username = ? ;",username,
  	     function(err,results) { callback(); });
}

// Create a new article given a title, content and username
function createArticle(article,username,callback)
{
  db.run("INSERT INTO Articles VALUES (?,?,?)",
         [article.title, username, article.content],
         function(err)
         {
           callback();
         });
}

function getArticleInfo(user,callback)
{
  db.all("SELECT rowid, title, username FROM 'Articles';",
  	     function(err,results) { callback(user,results); });
}

function deleteArticle(id,callback)
{
  db.run("DELETE FROM Articles WHERE rowid=?", id,
         function(err) { callback(); });
}

module.exports = {getAllArticles, createArticle, getArticleInfo, deleteArticle, deleteUserArticle};
