const axios = require("axios")
const jsdom = require("jsdom")

const numberUtil = require("../numberUtil.js")

module.exports = function getAllIngredients(url) {
  return axios.get(url)
    .then(res => {

      retVal = []

      const {JSDOM} = jsdom
      const dom = new JSDOM(res.data)
      var document = dom.window.document

      var rawLd = document.querySelector('script[type="application/ld+json"]').innerHTML

      ingredientArr = JSON.parse(rawLd.match(/(?<="recipes?[Ii]ngredient?":\s)\[[^\]]*\]/)[0])

      return ingredientArr
    })
    .catch(error => {
      throw error
    })
}
