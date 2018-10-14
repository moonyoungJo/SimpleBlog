/*
  db에 query할 모델
*/
const mongoose = require('mongoose');
const {Schema} = mongoose;

const Post = new Schema({
  title: String,
  body: String,
  tags: [String],
  publicshedDate: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Post', Post);