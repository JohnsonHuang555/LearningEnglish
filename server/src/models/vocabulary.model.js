let mongoose = require('mongoose');
var db = require('../settings/DbSettings');

let VocabularySchema = new mongoose.Schema({
  word: String,
  partOfSpeech: String,
  answers: Array,
  quizCount: Number,
  isFavorite: Boolean,
  dateTime: String,
  isWrong: Boolean
}, { collection: 'Vocabulary' });

module.exports = db.model('Vocabulary', VocabularySchema);
