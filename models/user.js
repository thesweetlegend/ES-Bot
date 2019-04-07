var mysql = require('mysql');

var db = mysql.createConnection({
  host: "45.40.136.18",
  user: "jqlghxv7_userES",
  password: "Password123",
  database: "esport_db"
});
/** 
db.connect(function(err) {
  if (err) throw err;
  db.query("SELECT * FROM Users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
*/

function userLogin(user, callback)
{
  
  db.query("SELECT count(*) as counter, level FROM Users where username = ? and password = ?;",
  [user.username, user.password],
         function(err,results) {callback(results); });
 
}

function userAdd(user)
{
    db.query("INSERT INTO `esport_db`.`Users` (`email`, `password`, `username`, `level`) VALUES (?, ?, ?,'member');",
    [user.email, user.password, user.username],
    function(err) {});
}

function getUser(callback)
{
  db.query("SELECT rowid, * FROM 'Users';",
  function(err,results) { callback(results); });
}

function deleteUser(id,callback)
{
  db.query("DELETE FROM Users WHERE username=?", id,
         function(err) { callback(id); });
}

module.exports = {userLogin, userAdd, getUser, deleteUser};
