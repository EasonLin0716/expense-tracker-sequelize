// ./routes/home.js
const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User
// const sumAmount = require('../public/javascripts/sumAmount')
const { authenticated } = require('../config/auth')

// 首頁
router.get('/', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      // get current user's todo list
      return Record.findAll()
    })
    .then((records) => { return res.render('index', { records: records }) })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router