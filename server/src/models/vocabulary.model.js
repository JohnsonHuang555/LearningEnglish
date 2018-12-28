let mongoose = require('mongoose');
var db = require('../settings/DbSettings');

var Schema = mongoose.Schema;

let VocabularySchema = new mongoose.Schema({
  Id: Schema.Types.ObjectId,
  Word: String,
}, { collection: 'Vocabulary' });

module.exports = db.model("Vocabulary", VocabularySchema);
