const VocabularyModel = require('../models/vocabulary.model');
const UserInfoModel = require('../models/userInfo.model');
const express = require('express');
const router = express.Router();
const moment = require('moment');

const today = moment().format("YYYY-MM-DD");

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
      const obj = JSON.parse(JSON.stringify(doc));
      if (obj.loginLog.indexOf(today) > 0) {
        res.json(doc);
      } else {
        obj.loginLog.push(today)
        UserInfoModel.findOneAndUpdate(
          { _id: '5c6190a8d4d190b5f0eaf62e' },
          { "$inc" : { "loginDays" : 1 }}
        )
        .then((doc) => {
          console.log(doc, 'ddddd');
          
          res.json(doc);
        })
        .catch(err => {
          res.status(500).json(err);
        });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.put('/addTotalWords', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }

  UserInfoModel.findOneAndUpdate({ _id: '5c6190a8d4d190b5f0eaf62e'}, {"$inc" : { "totalWords" : 1 }})
    .then(() => {
      res.send("success");
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.put('/minusTotalWords', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }
  UserInfoModel.findOneAndUpdate({ _id: '5c6190a8d4d190b5f0eaf62e'}, {"$inc" : { "totalWords" : -1 }})
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
  
  VocabularyModel.findByIdAndRemove({ _id: req.params.id })
    .then(() => {
      res.send("success");
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.get('/getWrongWords', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }

  VocabularyModel.find({ isWrong: true })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.get('/filterWords/:word', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }

  VocabularyModel.find({ word: req.params.word })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

// mode 1
router.get('/getQuizQuestions/:mode', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }
  
  let quizWords = []
  VocabularyModel.find({ dateTime: today })
    .then(q1 => {
      const temp = q1
      VocabularyModel.aggregate([
        { $match : { dateTime : {$ne: today} } },
        { $sample: {size: 5}}
      ]).then(q2 => {
        quizWords = temp.concat(q2)
        res.json(quizWords)
      }).catch(err => {
        res.status(500).json(err);
      })
    })
    .catch(err => {
      res.status(500).json(err);
    })  
})

router.get('/setLogInfo', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }
  // console.log(today.to);
  UserInfoModel.findOneAndUpdate(
      { _id: '5c6190a8d4d190b5f0eaf62e' },
      { "$inc": { "loginDays": 1 }}
    )
    .then((doc) => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})
module.exports = router;
