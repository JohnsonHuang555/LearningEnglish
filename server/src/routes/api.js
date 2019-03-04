const VocabularyModel = require('../models/vocabulary.model');
const UserInfoModel = require('../models/userInfo.model');
const express = require('express');
const router = express.Router();
const moment = require('moment');

const today = moment().format("YYYY-MM-DD");

router.get('/getVocabularies/:date', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  VocabularyModel.find({
      dateTime: req.params.date
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/addVocabulary', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  VocabularyModel.find({
      word: req.body.word
    })
    .then(doc => {
      if (doc.length > 0) {
        res.json({
          status: false,
          msg: 'Word is already exist.'
        })
      } else {
        let model = new VocabularyModel(req.body);
        model.save()
          .then(doc => {
            if (!doc || doc.length === 0) {
              return res.status(500).send(doc);
            }
          })
          .catch(err => {
            res.status(500).json(err);
          })

        UserInfoModel.findOneAndUpdate({
            _id: '5c2d6edaad96a11da0983f03'
          }, {
            "$inc": {
              "totalWords": 1
            }
          })
          .then(() => {
            res.json({
              status: true,
              msg: 'Success'
            })
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
    })
})

router.get('/getUserInfo', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  UserInfoModel.findOne()
    .then(doc => {
      const obj = JSON.parse(JSON.stringify(doc));
      if (obj.loginLog.findIndex(o => o.date === today) !== -1) {
        res.json(doc);
      } else {
        const data = {
          date: today,
          questions: [],
          score: 0
        }

        UserInfoModel.findOneAndUpdate({
            _id: '5c2d6edaad96a11da0983f03'
          }, {
            "$push": {
              loginLog: data
            },
            "$inc": {
              loginDays: 1
            }
          }, {
            new: true
          },
          (err, data) => {
            if (err) {
              res.status(500).json(err);
            }

            res.json(data);
          }
        )
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.put('/addTotalWords', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  UserInfoModel.findOneAndUpdate({
      _id: '5c2d6edaad96a11da0983f03'
    }, {
      "$inc": {
        "totalWords": 1
      }
    })
    .then(() => {
      res.send("success");
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.put('/minusTotalWords', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }
  UserInfoModel.findOneAndUpdate({
      _id: '5c2d6edaad96a11da0983f03'
    }, {
      "$inc": {
        "totalWords": -1
      }
    })
    .then(() => {
      res.send("success");
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.get('/getFavoriteWords', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  VocabularyModel.find({
      isFavorite: true
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.put('/setFavoriteVocabulary/:id', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }
  let temp;
  VocabularyModel.findOne({
      _id: req.params.id
    })
    .then(q1 => {
      temp = q1.isFavorite
      VocabularyModel.update({
          _id: req.params.id
        }, {
          isFavorite: !temp
        })
        .then(() => {
          res.send('Success')
        })
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.delete('/deleteVocabulary/:id', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  VocabularyModel.findByIdAndRemove({
      _id: req.params.id
    })
    .then(() => {
      res.send("success");
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.get('/getWrongWords', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  VocabularyModel.find({
      isWrong: true
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.get('/filterWords/:word', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  VocabularyModel.find({
      word: req.params.word
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

// mode 1
router.get('/getQuizQuestions/:mode', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  let quizWords = []
  VocabularyModel.find({
      dateTime: today
    })
    .then(q1 => {
      const temp = q1
      VocabularyModel.aggregate([{
          $match: {
            dateTime: {
              $ne: today
            }
          }
        },
        {
          $sample: {
            size: 5
          }
        }
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

router.post('/setQuizResult', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  const wrongWords = req.body.wrongAnswers.map(item => {
    return item._id
  })

  VocabularyModel.updateMany({
      _id: wrongWords
    }, {
      "$set": {
        isWrong: true
      },
      "$inc": {
        quizCount: 1
      }
    })
    .then(() => {
      UserInfoModel.findOneAndUpdate({
          _id: '5c2d6edaad96a11da0983f03',
          "loginLog.date": today
        }, {
          "$inc": {
            totalQuizzes: 1
          },
          "$set": {
            "loginLog.$.score": Math.round(req.body.score),
            "loginLog.$.questions": req.body.quizQuestions
          }
        }, {
          new: true
        })
        .then(doc => {
          res.json(doc)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    })
    .catch(err => {
      res.status(500).json(err);
    })
})
module.exports = router;