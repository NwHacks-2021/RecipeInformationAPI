const mathUtil = require('../numberUtil')

measurement = [
  "tablespoon",
  "teaspoon",
  "ounce",
  "cup",
  "pint",
  "quart",
  "gallon",
  "t",
  "tsp",
  "tbl",
  "tbs",
  "tbsp",
  "fl",
  "oz",
  "gill",
  "c",
  "p",
  "pt",
  "qt",
  "g",
  "gal",
  "ml",
  "milliliter",
  "millilitre",
  "cc",
  "ml",
  "litre",
  "liter",
  "l",
  "dl",
  "deciliter",
  "decilitre",
  "lb",
  "#",
  "pound",
  "ounce",
  "oz",
  "mg",
  "milligram",
  "milligramme",
  "g",
  "gram",
  "grammme",
  "kg",
  "kilogram",
  "kilogramme",
  "mm",
  "millimeter",
  "millimetre",
  "cm",
  "centimeter",
  "centimetre",
  "m",
  "meter",
  "metre",
  "inch",
  "in",
  "\"",
  "tablespoons",
  "teaspoons",
  "ounces",
  "cups",
  "pints",
  "quarts",
  "gallons",
  "ts",
  "tsps",
  "tbls",
  "tbss",
  "tbsps",
  "fls",
  "ozs",
  "gills",
  "cs",
  "ps",
  "pts",
  "qts",
  "gs",
  "gals",
  "mls",
  "milliliters",
  "millilitres",
  "ccs",
  "mls",
  "litres",
  "liters",
  "ls",
  "dls",
  "deciliters",
  "decilitres",
  "lbs",
  "#s",
  "pounds",
  "ounces",
  "ozs",
  "mgs",
  "milligrams",
  "milligrammes",
  "gs",
  "grams",
  "grammmes",
  "kgs",
  "kilograms",
  "kilogrammes",
  "mms",
  "millimeters",
  "millimetres",
  "cms",
  "centimeters",
  "centimetres",
  "ms",
  "meters",
  "metres",
  "inchs",
  "ins",
  "\"s"
]

module.exports = class Ingredient {
  constructor(string) {
    var arr = string.split(" ")
    var wordOfMeasurementIndex = -1;
    for (var i = 0; i < arr.length; i++ ) {
      if (measurement.includes(arr[i])) {
        wordOfMeasurementIndex = i
        break
      }
    }

    if (wordOfMeasurementIndex === -1) {
      try {
        if (mathUtil.isNumber(arr[0])) {

          this.quantity = mathUtil.toRational(arr[0]);
          this.name = arr.slice(1).join(" ");
          this.measurement = undefined;

        } else {
          this.name = arr.join(" ");
        }
      } catch (err) {
        this.name = arr.join(" ");
        console.log(arr[0])
      }
    } else {
      try {
        this.quantity = mathUtil.toRational(arr[0])
        this.name = arr.slice(wordOfMeasurementIndex + 1).join(" ")
        this.measurement = arr[wordOfMeasurementIndex]
      }
      catch (e) {
        console.log(arr.slice(0, wordOfMeasurementIndex).join(" "))
      }
    }
  }
}