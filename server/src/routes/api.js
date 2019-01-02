let VocabularyModel = require('../models/vocabulary.model');
let express = require('express');
let router = express.Router();

router.get('/getVocabulary', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }

  VocabularyModel.find()
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.post('/addVocabulary', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }

  let model = new VocabularyModel(req.body);
  model.save()
    .then(doc => {
      if(!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }

      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('getUserInfo', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }

  
})

module.exports = router;
