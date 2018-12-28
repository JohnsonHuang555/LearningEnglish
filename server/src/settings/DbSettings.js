let mongoose = require('mongoose');

// const server = '';
const database = 'LearningAppDB';
// const user = '';
// const password = '';

mongoose.connect(`mongodb://127.0.0.1/${database}`, { useNewUrlParser: true });

mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database Connected.");
});

module.exports = db;
