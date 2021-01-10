var express = require('express');
var router = express.Router();
var parseIngredient = require('../ingredient/parseIngredient');
var parseInstruction = require('../instructions/parseInstructions');
var parseTitle = require('../instructions/parseTitle');
var Route = require('../ingredient/model');
const path = require('path')

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('sending build')
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

router.get('/ingredient::url', function(req, res, next) {

  parseIngredient(req.params.url)
    .then(
      (rawArray) => {
        retVal = []
        for (var i = 0; i < rawArray.length; i++) {
          retVal.push(new Route(rawArray[i]))
        }
        console.log(retVal)
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
        console.log(rawArray)
        res.json(rawArray)
      }
    )
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
});

router.get('/title::url', function (req, res, next) {
  parseTitle(req.params.url)
    .then(
      (rawArray) => {
        console.log(rawArray)
        res.json(rawArray)
      }
    )
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
});

module.exports = router;