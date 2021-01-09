var express = require('express');
var router = express.Router();


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/* GET home page. */
router.get('/ingredient::url', function(req, res, next) {


  res.json({url: req.params.url})
});

module.exports = router;