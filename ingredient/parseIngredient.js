module.exports = {
  getAllIngredients
}

const axios = require("axios")
const jsdom = require("jsdom")

const numberUtil = require("./numberUtil.js")

function containsIngredient(element) {
  toDo = []
  toDo.push(element)

  while (toDo.length > 0) {
    var currentElement = toDo.pop()
    if (currentElement.className !== undefined && currentElement.className.toString().toLowerCase().includes("ingredient")) {
      return true;
    }

    for (var i = 0; i < currentElement.childNodes.length; i++) {
      toDo.push(currentElement.childNodes[i])
    }
  }

  return false;
}

function getAllIngredients(url) {
  return axios.get(url)
    .then(res => {
      retVal = []

      const {JSDOM} = jsdom
      const dom = new JSDOM(res.data)
      var body = dom.window.document.body

      var toDo = []
      toDo.push(body)
      while (toDo.length > 0) {
        var currentElement = toDo.pop()

        if (containsIngredient(currentElement)) {

          for (var i = 0; i < currentElement.childNodes.length; i++) {
            if (currentElement.childNodes[i].tagName !== undefined) {
              var uniform = true;
              var childClassName = currentElement.childNodes[i].tagName;
            }

            toDo.push(currentElement.childNodes[i])
          }

          if (uniform) {

            var oldArray = []

            for (i = 0; i < currentElement.childNodes.length; i++) {
              if (currentElement.childNodes[i].innerHTML !== undefined) {

                oldArray.push(currentElement.childNodes[i])

                if (childClassName !== currentElement.childNodes[i].tagName) {
                  uniform = false;
                }
              }
            }

            if (uniform && oldArray.length > 2) {
              var ingredientList = []

              for (i = 0; i < oldArray.length; i++) {
                ingredientList.push(oldArray[i].textContent.trim().replace(/\s+/g, " "))
              }

              var startsWithNumber = true;

              for (i = 0; i < ingredientList.length; i++) {
                if (!numberUtil.isNumber(ingredientList[i])) {
                  startsWithNumber = false;
                  break;
                }
              }

              if (startsWithNumber) {
                for (i = 0; i < ingredientList.length; i++) {
                  retVal.push(ingredientList[i])
                }
              }
            }
          }
        }
      }

      return retVal;

    })
    .catch(error => {
      console.log(error)
    })
}
