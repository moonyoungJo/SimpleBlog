/*
  db 연결 및 서버 실행
*/
require('dotenv').config();
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');

const {
  PORT: port = 4000,
  MONGO_URI: mongoURI,
  COOKIE_SIGN_KEY: signKey
} = process.env;

//mongoDB 연결
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).then(() => {
  console.log('connected to mongodb');
}).catch((e) => {
  console.log(e);
});

//server setting
const app = new express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: signKey,
  cookie: {
    httpOnly: true,
    secure: false,
  }
}));

//router등록
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end(err.message);
});

app.listen(port, () => {
  console.log('listening to port ', port);
})