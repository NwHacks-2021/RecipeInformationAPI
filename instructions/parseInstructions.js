const axios = require("axios")
const jsdom = require("jsdom")

module.exports = function getInstruction(url) {
  return axios.get(url)
    .then(res => {
      retVal = []

      const {JSDOM} = jsdom
      const dom = new JSDOM(res.data)
      var document = dom.window.document

      var rawLd = document.querySelector('script[type="application/ld+json"]').innerHTML

      instructionArr = JSON.parse(rawLd.match(/(?<="recipes?[Ii]nstructions?":\s)\[[^\]]*\]/)[0])

      for (var i = 0; i < instructionArr.length; i++) {
        longestString = ""
        for (var key in instructionArr[i]) {
          if (instructionArr[i].hasOwnProperty(key) && instructionArr[i][key].toString().length > longestString.length) {
            longestString = instructionArr[i][key].toString();
          }
        }
        retVal.push(longestString)
      }

      return retVal
    })
    .catch(error => {
      throw error;
    })
}