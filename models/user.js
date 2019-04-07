var mysql = require('mysql');

var db = mysql.createConnection({
  host: "45.40.136.18",
  user: "jqlghxv7_userES",
  password: "Password123",
  database: "esport_db"
});

db.connect(function(err) {
  if (err) throw err;
  db.query("SELECT * FROM Users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

function userLogin(user, callback)
{
  db.all("SELECT count(*) as counter, level FROM 'Users' where username = ? and password = ?;",
  [user.username, user.password],
  	     function(err,results) { callback(results); });
}

function userAdd(user)
{
    db.run("INSERT INTO Users VALUES (?,?,'member');",
    [user.username, user.password, user.email],
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
