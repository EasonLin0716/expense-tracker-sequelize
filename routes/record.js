const express = require('express')
const router = express.Router()
const Records = require('../models/record')
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

  const records = new Records({
    name: req.body.name,
    merchant: req.body.merchant,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount,
    userId: req.user._id
  })
    .save(err => {
      if (err) return console.error(err)
      res.redirect('/')
    })
})
// 修改 Record 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  console.log(`req.params.id: ${req.params.id}`)
  Records.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    res.render('edit', { record })
  })
})
// 修改 Record
router.put('/:id', authenticated, (req, res) => {
  console.log(`req.params.id: ${req.params.id}`)
  Records.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    record.name = req.body.name
    record.merchant = req.body.merchant
    record.category = req.body.category
    record.date = req.body.date
    record.amount = req.body.amount
    record.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})
// 刪除 Record
router.delete('/:id', authenticated, (req, res) => {
  Records.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router