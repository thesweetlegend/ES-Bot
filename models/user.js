var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

function userLogin(user, callback)
{
  db.all("SELECT count(*) as counter, level FROM 'Users' where username = ? and password = ?;",
  [user.username, user.password],
  	     function(err,results) { callback(results); });
}

function userAdd(user)
{
    db.run("INSERT INTO Users VALUES (?,?,'member');",
    [user.username, user.password],
    function(err) {});
}

function getUser(callback)
{
  db.all("SELECT rowid, * FROM 'Users';",
  function(err,results) { callback(results); });
}

function deleteUser(id,callback)
{
  db.run("DELETE FROM Users WHERE username=?", id,
         function(err) { callback(id); });
}

module.exports = {userLogin, userAdd, getUser, deleteUser};
