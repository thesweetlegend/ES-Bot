const express = require('express');
var router = express.Router();
const ArticlesModel = require('../models/articles.js');
const usersModel = require('../models/users.js');

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "45.40.136.18",
  user: "jqlghxv7_userES",
  password: "Password123",
  database: "esport_db"
});

// Register users to database
router.get("/", function (req, res) {
    writeData(req);
    console.log("In SignUp Page");
    res.render("signup", req.TPL);

});
router.post("/registerUser", function (req, res, next) {
	console.log(req.body.username);
    console.log(req.body.password);
    console.log(req.body.email);
    con.connect(function(err) {
  if (err) throw  err;
  console.log("connected");
  var sql = "INSERT INTO `Users`(`LastName`,`password`, `email`) VALUES ('"+req.body.username+"','"+req.body.password+"','"+req.body.email+"')";
  con.query(sql, function(err, result)  {
   if(err) throw err;
   console.log("table created");
  });
});

    // Insert a message that a user has successfully been created and
  // display the SignUp page again
  function createSignUpPage()
  {
    //  success message;
      
    req.TPL.message = "User successfully created as Member ";
    res.render("signup", req.TPL);
  }

  usersModel.createUser(req.body.username,req.body.password,req.body.email,'member',createSignUpPage);
});

module.exports = router;

