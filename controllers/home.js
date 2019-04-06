const express = require('express');
var router = express.Router()

// Display the home page
router.get("/", function(req, res)
{
  res.render("home",
             req.TPL);
});

module.exports = router;
