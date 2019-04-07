const express = require('express');
const fs = require('fs');
var router = express.Router()

// Display the home page

router.get("/", function(req, res)
{
  res.render("chatbot",
             req.TPL);
});

// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/chat", function(req, res)
{
 
  fs.appendFile('/log'+'log.txt', data, function (err) {
    if (err) throw err;
    console.log(data);
    console.log('Saved!');
  });

});


module.exports = router;
