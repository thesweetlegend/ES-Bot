const express = require('express');
var router = express.Router()
const ArticlesModel = require('../models/articles.js')
const UserModel = require('../models/user.js')

// Displays the login page
router.get("/", function(req, res)
{
  // if we had an error during form submit, display it, clear it from session
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";

  // render the login page
  res.render("login",req.TPL);
});

// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/attemptlogin", function(req, res)
{

  function setSession(info){
      console.log(info);
    // is the username and password OK?
    if (info[0].counter != "0")
    {
      // set a session key username to login the user
      req.session.username = req.body.username;
      if(info[0].level == "member"){
        // re-direct the logged-in user to the members page
        req.session.level = "member";
        res.redirect("/members");
      }else{
        // re-direct the logged-in user to the members page
        req.session.level = "editor";
        res.redirect("/editors");
      }
    }
    else
    {
      // if we have an error, reload the login page with an error
      req.TPL.errmsg = "Invalid username and/or password!";
       // render the login page
       res.render("login",req.TPL);
    }
  }
  UserModel.userLogin(req.body,setSession);

});

// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/addUser", function(req, res)
{
 
  if (req.body.username.length > 0 && req.body.password.length > 0)
  {
    UserModel.userAdd(req.body);
    res.render("signup",{valRed : true});
  }
  else
  {
    // if we have an error, reload the login page with an error
    req.session.login_error = "Username/password cannot be blank!";
    res.redirect("/login/signup");
  }

});

// Displays the login page
router.get("/signup", function(req, res)
{
  // if we had an error during form submit, display it, clear it from session
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";

  // render the login page
  res.render("signup",req.TPL);
});
// Logout a user
// - Destroys the session key username that is used to determine if a user
// is logged in, re-directs them to the home page.
router.get("/logout", function(req, res)
{
  delete(req.session.username);
  res.redirect("/home");
});

module.exports = router;
