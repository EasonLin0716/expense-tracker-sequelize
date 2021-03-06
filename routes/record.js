const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User
const { authenticated } = require('../config/auth')

// 列出全部 Record
router.get('/', authenticated, (req, res) => {
  res.send('列出所有 Record')
})
// 新增一筆 Record 頁面
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})
// 新增一筆 Record
router.post('/', authenticated, (req, res) => {
  console.log(req.body)

  const dateReg = /^((19|20)?[0-9]{2}[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01]))*$/

  if (!req.body.name || !req.body.date || !req.body.category || !req.body.amount) {
    req.flash('warning_msg', '*為必填，請重新確認')
    return res.redirect('/records/new')
  } else if (!dateReg.test(req.body.date)) {
    req.flash('warning_msg', '日期格式錯誤，請輸入 YYYY/MM/DD 或點選日曆以選擇日期')
    return res.redirect('/records/new')
  }

  Record.create({
    name: req.body.name,
    category: req.body.category,
    merchant: req.body.merchant,
    amount: req.body.amount,
    date: req.body.date,
    userId: req.user.id
  })
    .then((record) => {
      return res.redirect('/')
    })
    .catch((error) => { return res.status(422).json(error) })
})
// 修改 Record 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  console.log(`req.params.id: ${req.params.id}`)
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      return Record.findOne({
        where: {
          Id: req.params.id,
          UserId: req.user.id,
        }
      })
    })
    .then((record) => { return res.render('edit', { record: record }) })
    .catch((error) => { return res.status(422).json(error) })
})
// 修改 Record
router.put('/:id', authenticated, (req, res) => {
  Record.findOne({
    where: {
      Id: req.params.id,
      userId: req.user.id,
    }
  }).then((record) => {
    record.name = req.body.name
    record.category = req.body.category
    record.merchant = req.body.merchant
    record.amount = req.body.amount
    record.date = req.body.date
    return record.save()
  })
    .then((record) => {
      res.redirect('/')
    }).catch((error) => { return res.status(422).json(error) })
})
// 刪除 Record
router.delete('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      return Record.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((record) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router