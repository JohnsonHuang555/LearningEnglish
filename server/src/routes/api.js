let VocabularySchema = require('../models/vocabulary.model');
let express = require('express');
let router = express.Router();

router.get('/getVocabulary', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }

  VocabularySchema.find({})
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router;
