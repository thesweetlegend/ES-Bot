const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

db.serialize(function(){

  // Create an initial table of users
  db.run("DROP TABLE IF EXISTS Users");
  db.run("CREATE TABLE Users (username TEXT, password TEXT, level TEXT, email TEXT)");
  db.run("INSERT INTO Users VALUES (?,?,?,?)", ['mem1', 'mem1', 'member', 'mem1@email.com']);
  db.run("INSERT INTO Users VALUES (?,?,?,?)", ['mem2', 'mem2', 'member', 'mem2@email.com']);
  db.run("INSERT INTO Users VALUES (?,?,?,?)", ['admin1', 'admin1', 'admin', 'admin1@email.com']);
  db.run("INSERT INTO Users VALUES (?,?,?,?)", ['admin2', 'admin2', 'admin', 'admin2@email.com']);

  // create an initial table of articles
  db.run("DROP TABLE IF EXISTS Articles");
  db.run("CREATE TABLE Articles (title TEXT, username TEXT, content TEXT)");
  db.run("INSERT INTO Articles VALUES (?,?,?)",
          ["My favourite places to eat",
           "mem1",
            "<p>My favourite places to eat are The Keg, Boston Pizza and" +
            "   McDonalds</p><p>What are your favourite places to eat?</p>"]);
  db.run("INSERT INTO Articles VALUES (?,?,?)",
          ["Tips for NodeJS",
           "mem2",
            "<p>The trick to understanding NodeJS is figuring out how " +
            "async I/O works.</p> <p>Callback functions are also very " +
            "important!</p>"]);
  db.run("INSERT INTO Articles VALUES (?,?,?)",
          ["Ontario's top hotels",
           "edit1",
            "<p>The best hotel in Ontario is the Motel 8 on highway 234</p>" +
            "<p>The next best hotel is The Sheraton off main street.</p>"]);

});
