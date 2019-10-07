// ./routes/home.js
const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const sumAmount = require('../public/javascripts/sumAmount')
const { authenticated } = require('../config/auth')

// 首頁
router.get('/', authenticated, (req, res) => {
  // '%' will match any strings
  let selectedCategory = '%'
  let selectedMonth = '%'
  if (req.query.category) selectedCategory = req.query.category
  if (req.query.month) selectedMonth = `${req.query.month}`
  console.log(selectedCategory, selectedMonth)
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      // see sequelize querying
      return Record.findAll({
        where: { UserId: req.user.id, category: { [Op.like]: selectedCategory }, date: { [Op.like]: `_____${selectedMonth}___` } }
      })
    })
    .then((records) => {
      let totalAmount = sumAmount(records)
      return res.render('index', { records, totalAmount, queryMonth: req.query.month, queryCategory: req.query.category })
    })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router