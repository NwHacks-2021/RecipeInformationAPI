module.exports = {
  isNumber,
  toRational
}

function isNumber(string) {
  if (string === undefined) {
    return false
  }
  const letter = string.charAt(0)
  if (letter > '9' || letter < '0') {
    if (letter < '\u00BC' || letter > '\u00BE') {
      if (letter < '\u2150' || letter > '\u215E') {
        return false;
      }
    }
  }
  return true;
}

function toRational(string) {
  string = string + "/1"
  var n;
  var d;
  var i;
  return ([n,d]=string.split(/\D/),d)?(n||1)/d:'131111121234151357'[i=string.charCodeAt()%63%20]/-~'133689224444557777'[i]
}

/**
console.log(toRational('¾'))
console.log(toRational('3'))
console.log(toRational('1515'))
console.log(toRational('⅒'))

console.log(isNumber('0'))
console.log(isNumber('1'))
console.log(isNumber('2'))
console.log(isNumber('3'))
console.log(isNumber('4'))
console.log(isNumber('5'))
console.log(isNumber('6'))
console.log(isNumber('7'))
console.log(isNumber('8'))
console.log(isNumber('9'))
console.log(isNumber('¼'))
console.log(isNumber('½'))
console.log(isNumber('¾'))

console.log("Should all be false here")
console.log(isNumber('a'))
console.log(isNumber('z'))
console.log(isNumber('A'))
console.log(isNumber('Z'))
console.log(isNumber('\n'))
console.log(isNumber('\s'))
 */