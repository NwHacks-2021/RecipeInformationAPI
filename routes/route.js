var express = require('express');
var router = express.Router();
var parseIngredient = require('../ingredient/parseIngredient');
var parseInstruction = require('../instructions/parseInstructions');
var Route = require('../ingredient/model');


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/* GET home page. */
router.get('/ingredient::url', function(req, res, next) {

  parseIngredient(req.params.url)
    .then(
      (rawArray) => {
        console.log(rawArray)

        retVal = []
        for (var i = 0; i < rawArray.length; i++) {
          retVal.push(new Route(rawArray[i]))
        }
        res.json(retVal)
      }
    )
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
});

router.get('/instruction::url', function (req, res, next) {

  parseInstruction(req.params.url)
    .then(
      (rawArray) => {
        res.json(rawArray)
      }
    )
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
});

module.exports = router;