// ./routes/home.js
const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
// const sumAmount = require('../public/javascripts/sumAmount')
const { authenticated } = require('../config/auth')

// 首頁
router.get('/', authenticated, (req, res) => {
  res.render('index')
})

module.exports = router