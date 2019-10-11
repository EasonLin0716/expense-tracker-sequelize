// routes/user.js
const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')


// 登入頁面
router.get('/login', (req, res) => {
  try {
    return res.render('login')
  }
  catch {
    err => {
      console.error('something went wrong: ', err)
      return res.render('error')
    }
  }
})

// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: req.flash('warning_msg', `帳號或密碼錯誤，請重新輸入或 <a href="/users/register">按此註冊</a> 一個帳號`)
  })(req, res, next)
})

// 註冊頁面
router.get('/register', (req, res) => {
  try {
    return res.render('register')
  }
  catch {
    err => {
      console.error('something went wrong: ', err)
      return res.render('error')
    }
  }
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []
  if (!name || !email || !password || !password2) {
    errors.push({ message: 'You must fill every column!' })
  }
  if (password !== password2) {
    errors.push({ message: 'Please check 2 passwords you typed!' })
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        req.flash('warning_msg', `User already exists.`)
        res.render('register', {
          name,
          email,
          password,
          password2
        })
      } else {
        const newUser = new User({
          name,
          email,
          password,
        })
        bcrypt.genSalt(10, (err, salt) =>
          // combine salt with password output hash
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => console.log(err))
          }))
      }
    })
  }
})
// logout
router.get('/logout', (req, res) => {
  try {
    req.logout()
    return res.redirect('/users/login')
  }
  catch {
    err => {
      console.error('something went wrong: ', err)
      return res.render('error')
    }
  }
})
module.exports = router