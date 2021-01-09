const axios = require("axios")
const jsdom = require("jsdom")

axios.get("https://www.allrecipes.com/recipe/232681/char-siu-chinese-bbq-pork/")
  .then(res => {
    const { JSDOM } = jsdom
    const dom = new JSDOM(res.data)
    var body = dom.window.document.body
    console.log(body.className)

    console.log('end')
  })
  .catch(error => {
    console.log(error)
  })