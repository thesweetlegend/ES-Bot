const express = require('express');
var router = express.Router();
const ArticlesModel = require('../models/articles.js');
const usersModel = require('../models/users.js');
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db"),
    fs = require('fs');



function writeData(req) {
    let data = new Date() + "," + req.path + "," + req.ip + "," + JSON.stringify(req.query) + "," + JSON.stringify(req.body) + "\n";
    let path = "logs.txt";
    console.log(path);
    // var originalImage = Buffer.from(image, "base64");
    fs.appendFile(path, data, function (err) {
        if (err) {
            console.log("Data could not be written to File due to error ", err);
        }
        else {
            console.log("data written to file", data);
        }
    });
}
// Displays the login page
router.get("/", function (req, res) {
    writeData(req);
    console.log("In SignUp Page");
    res.render("signup", req.TPL);

});
router.post("/registerUser", function (req, res) {
    writeData(req);
    console.log("About to register a user");
   // console.log(req.body);
    
    // Insert a message that a user has successfully been created and
  // display the SignUp page again
  function createSignUpPage()
  {
    //  console.log("We Are Back");
      
    req.TPL.message = "User successfully created as Member ";
    res.render("signup", req.TPL);
  }

  usersModel.createUser(req.body.username,req.body.email,req.body.password,'member',createSignUpPage);
});

module.exports = router;
