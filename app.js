/* -----require needed middlewares and others----- */
const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const bodyParser = require('body-parser')

/* -----db connecting----- */
const db = require('./models')
const Record = db.Record
const User = db.User

/* -----middleware setting----- */
app.use(express.static('public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
const Handlebars = require("handlebars")
Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
// require('./config/passport')(passport)
app.use(flash())
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

/* -----route setting----- */
// app.use('/', require('./routes/home'))
// app.use('/records', require('./routes/record'))
// app.use('/users', require('./routes/user'))
// app.use('/auth', require('./routes/auths'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('app.js is running')
})