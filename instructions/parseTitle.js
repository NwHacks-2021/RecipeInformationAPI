const axios = require("axios")
const jsdom = require("jsdom")

module.exports = function getInstruction(url) {
  return axios.get(url)
    .then(res => {
      retVal = []

      const {JSDOM} = jsdom
      const dom = new JSDOM(res.data)
      var document = dom.window.document

      return  document.getElementsByTagName("head")[0].getElementsByTagName("title")[0].textContent
    })
    .catch(error => {
      return error;
    })
}