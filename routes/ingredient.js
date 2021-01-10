var express = require('express');
var router = express.Router();
var parser = require('../parseIngredient');
var Ingredient = require('../model');


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/* GET home page. */
router.get('/ingredient::url', function(req, res, next) {

  parser.getAllIngredients(req.params.url)
    .then(
      (rawArray) => {
        retVal = []
        for (var i = 0; i < rawArray.length; i++) {
          retVal.push(new Ingredient(rawArray[i]))
        }
        res.json(retVal)
      }
    )
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
});

module.exports = router;