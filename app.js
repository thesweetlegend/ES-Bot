const express = require('express');
const app = express();
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const fs = require('fs');
// Include the mustache engine to help us render our pages
app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// We use the .urlencoded middleware to process form data in the request body,
// which is something that occurs when we have a POST request.
app.use(express.urlencoded({extended: false}));

// Use the session middleware
app.use(session({secret: 'keyboard cat'
                ,resave: false
                ,saveUninitialized:false}))

// Create a middleware to populate an initial template array
app.use(function(req,res,next) {

  // reset the template obect to a blank object on each request
  req.TPL = {};

  // decide whether to display the login or logout button in the navbar
  req.TPL.displaylogin = !req.session.username;
  req.TPL.displaylogout = req.session.username;

  next();
});

// Create middlewares for setting up navigational highlighting
// - we could condense this significantly, for example by having one middleware
// that looks at the URL and decides based on a configuration array... but it
// would come at the cost of readability (which matters more right now since
// we are learning middlewares for the first time).
app.use("/home",
        function(req,res,next) { req.TPL.homenav = true; next(); });
app.use("/articles",
        function(req,res,next) { req.TPL.articlesnav = true; next(); });
app.use("/members",
        function(req,res,next) { req.TPL.membersnav = true; next(); });
app.use("/editors",
        function(req,res,next) { req.TPL.editorsnav = true; next(); });
app.use("/login",
        function(req,res,next) { req.TPL.loginnav = true; next(); });
app.use("/enterchat",
        function(req,res,next) { req.TPL.enternav = true; next(); });
app.use("/chatbot",
        function(req,res,next) { req.TPL.enternav = true; next(); });

// protect access to the members page, re-direct user to home page if nobody
// is logged in...
app.use("/members", function(req,res,next) {

  if (req.session.username) next();
  else res.redirect("/home");

});

// Include Controllers
//
// - We define all of our routes inside our controllers, and include them in
// our main app script.
//
// - This could present a problem in that we are defining our routes in
// multiple files, and perhaps the same route could be defined in multiple
// controller files.  Some versions of the MVC pattern actually define all
// routes in a separate route file (or multiple route files organized by some
// convention), and the routes reference controller methods.  This approach
// is not better or worse strictly speaking, but it may be best for very
// large/complex applications.
//
// - We define our routes in each controller file.  Each controller file will
// be responsible for the functionality of an individual page of our
// application (this is a common, reasonable way to split things up).  To make
// sure that our controllers do not "step on each other's toes" by using the
// same routes, we will follow a convention that controller routes should be
// as follows: /controller_name[/action_name/url_parameters]
// where the action_name is optional (the root/default method for rendering a
// page), and url_parameters are optional (the action might have parameters or
// not have parameters).
//
// - Note that because we have, app.use("/controllername", ... ) then routes
// defined in the controller files will begin with "/controllername", rather
// then repeating /controllername for each route defined in the file (this
// also makes it easier to change, because it's defined once here).
//
app.use("/",logHistory);
app.use("/home", require("./controllers/home"),logHistory);
app.use("/articles", require("./controllers/articles"),logHistory);
app.use("/members", require("./controllers/members"),logHistory);
app.use("/editors", require("./controllers/editors"),logHistory);
app.use("/login", require("./controllers/login"),logHistory);
app.use("/enterchat", require("./controllers/enterchat"),logHistory);
app.use("/chatbot", require("./controllers/chatbot"),logHistory);



function logHistory(req,res,next){
var fs = require("fs");
   var tstamp = new Date();
   var data = tstamp+','+req.path+','+req.ip+','+JSON.stringify(req.query)+','+JSON.stringify(req.body)+'\n';
   fs.appendFile('log.txt', data, function (err) {
        if (err) throw err;
        console.log(data);
      });
   next();
}

// - We route / to redirect to /home by default
app.get("/", function(req, res) {
  res.redirect("/home");
});

// Catch-all router case
app.get(/^(.+)$/, function(req,res) {
  res.sendFile(__dirname + req.params[0]);
});

// Start the server
var server = app.listen(8081, function() {console.log("Server listening...");})
