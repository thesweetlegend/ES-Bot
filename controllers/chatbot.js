const express = require('express');
var router = express.Router()

// Display the home page

router.get("/", function(req, res)
{
  res.render("chatbot",
             req.TPL);
});

module.exports = router;
