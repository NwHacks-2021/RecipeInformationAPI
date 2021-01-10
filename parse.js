const axios = require("axios")
const jsdom = require("jsdom")

const numberUtil = require("./numberUtil.js")


axios.get("https://www.foodnetwork.com/recipes/ree-drummond/cinnamon-baked-french-toast-recipe-2120484")
  .then(res => {
    const { JSDOM } = jsdom
    const dom = new JSDOM(res.data)
    var body = dom.window.document.body

    var toDo = []
    toDo.push(body)
    while (toDo.length > 0) {
      var currentElement = toDo.pop()

      containsIngredient()

      var uniform = false;
      var containsIngredient = false;

      if (currentElement.tagName !== undefined && currentElement.className.toString().toLowerCase().includes("ingredient")) {
        containsIngredient = true;
      }

      for (var i = 0; i < currentElement.childNodes.length; i++) {
        if (currentElement.childNodes[i].tagName !== undefined) {
          var uniform = true;
          var childClassName = currentElement.childNodes[i].tagName;

          if (currentElement.childNodes[i].className.toString().toLowerCase().includes("ingredient")) {
            containsIngredient = true;
          }
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

          if (startsWithNumber && containsIngredient) {
            console.log("uniform in " + currentElement.className + " " + currentElement.tagName)

            console.log(ingredientList);
          }
        }
      }
    }

    console.log('end')
  })
  .catch(error => {
    console.log(error)
  })

