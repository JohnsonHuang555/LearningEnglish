let mongoose = require('mongoose');
var db = require('../settings/DbSettings');

let UserInfoSchema = new mongoose.Schema({
  loginDays: Number,
  totalWords: Number,
  totalQuizzes: Number,
  wrongWordCount: Number,
  loginLog: Array
}, { collection: 'User' });

module.exports = db.model('User', UserInfoSchema);
