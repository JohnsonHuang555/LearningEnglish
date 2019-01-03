let VocabularyModel = require('../models/vocabulary.model');
let UserInfoModel = require('../models/userInfo.model');
let express = require('express');
let router = express.Router();

router.get('/getVocabularies/:date', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }

  VocabularyModel.find({ dateTime: req.params.date })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/addVocabulary', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }

  let model = new VocabularyModel(req.body);
  model.save()
    .then(doc => {
      if(!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }

      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

router.get('/getUserInfo', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }

  UserInfoModel.findOne()
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.put('/updateTotalWords', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }

  UserInfoModel.findOneAndUpdate({ _id: '5c2d6edaad96a11da0983f03'}, {"$inc" : { "totalWords" : 1 }})
    .then(() => {
      res.send("success");
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.get('/getFavoriteWords', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }

  VocabularyModel.find({ isFavorite: true })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.delete('/deleteVocabulary/:id', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }
  console.log(req.params.id)
  VocabularyModel.findByIdAndRemove({ _id: req.params.id })
    .then(() => {
      res.send("success");
    })
    .catch(err => {
      res.status(500).json(err);
    });
})
module.exports = router;
