module.exports = function fontawesomeTranslator(target) {
  const fontawesomeRef = {
    "home": "fas fa-home",
    "shuttle-van": "fas fa-shuttle-van",
    "grin-beam": "fas fa-grin-beam",
    "utensils": "fas fa-utensils",
    "pen": "fas fa-pen"
  }

  target.forEach(item => {
    item.home = fontawesomeRef.home
  })
}