/*
  유저
*/
const mongoose = require('mongoose');
const {Schema} = mongoose;

const User = new Schema({
  userid: String,
  password: String,
  username: String,
  email: String,
});

module.exports = mongoose.model('User', User);