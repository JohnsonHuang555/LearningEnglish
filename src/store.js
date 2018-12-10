import Vue from 'vue'
import Vuex from 'vuex'
import { database } from 'firebase'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    vocabularies: [],
    wrongVocabularies: [], // 答錯的單字，錯誤清單
    loading: false,
    errorMsg: '',
    quizQuestions: [],
    today: moment("2018-11-26").format("YYYY-MM-DD"),
    questionCount: 10, // 總題數
    quizTime: 600, // 考試時間 (秒)
    appLanguage: 0, // 0 En, 1 zh-tw
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setErrorMsg(state, payload) {
      state.errorMsg = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    setWrongWords(state, payload) {
      state.wrongVocabularies = payload
    },
    setVocabularies(state, payload) {
      state.vocabularies = payload
    },
    addVocabulary(state, payload) {
      state.vocabularies.push(payload)
    },
    setQuizQuetions(state, payload) {
      state.quizQuestions = payload
    },
    setQuizResult(state, payload) {
      state.wrongVocabularies = payload
    },
    clearQuizQuestions(state) {
      state.quizQuestions = []
    },
    saveSettings(state, payload) {
      state.questionCount = payload.questionCount
      state.quizTime = payload.quizTime
      state.appLanguage = payload.language
    }
  },
  actions: {
    getUserInfo({commit}) {
      commit('setLoading', true)
      var ref = database().ref('userInfo')
      ref.off()
      ref.on('value', data => {
        commit('setUserInfo', data.val())
        commit('setLoading', false)
      })        
    },
    getWrongWords({commit}) {
      commit('setLoading', true)
      var ref = database().ref('wrongWords')
      ref.off()
      ref.on('value', data => {
        commit('setWrongWords', data.val())
        commit('setLoading', false)
      })
    },
    getVocabularies({commit}) {
      // 預設為當天
      commit('setLoading', true)
      var ref = database().ref('vocabularies')
      ref.off()
      ref.on('value', data => {
        const vocabularies = []
        const obj = data.val()
        for (let key in obj) {
          vocabularies.push({
            id: key,
            word: obj[key].word,
            partOfSpeech: obj[key].partOfSpeech,
            answers: obj[key].answers,
            quizCount: obj[key].quizCount,
            isFavorite: obj[key].isFavorite
          })
        }
        commit('setLoading', false)
        commit('setVocabularies', vocabularies)
      })
    },
    addVocabulary({state,commit}, payload) {
      commit('setLoading', true)
      var vocabularyRef = database().ref('vocabularies')
      var updateWordRef = database().ref('userInfo')
      const vocabulary = {
        word: payload.word,
        partOfSpeech: payload.partOfSpeech,
        answers: payload.answers,
        quizCount: 0,
        isFavorite: false,
        dateTime: state.today
      }
      vocabularyRef.push(vocabulary)
        .then(data => {
          // 塞入Key值
          const key = data.key
          commit('addVocabulary', {
            ...vocabulary,
            id: key
          })

          updateWordRef.update({ totalWords:state.userInfo.totalWords + 1 })
            .catch(error => {
              console.log('update word error', error)    
            })
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setErrorMsg', 'Add fail!')
          commit('setLoading', false)
          console.log('add vocabulary error', error)
        })
    },
    getQuizQuestions({state, commit}) {
      commit('setLoading', true)
      var ref = database().ref('vocabularies').orderByChild('dateTime').equalTo(state.today)
      ref.once('value')
        .then(data => {
          const questions = []
          const obj = data.val()
          for(let key in obj) {
            // 問題為中文，答案為英文
            questions.push({
              id: key,
              questions: obj[key].answers,
              answer: obj[key].word,
              quizCount: obj[key].quizCount,
              isFavorite: obj[key].isFavorite,
              partOfSpeech: obj[key].partOfSpeech,
              word: obj[key].word, // 為了共用Vocabulary component 需改寫
              answers: obj[key].answers
            })
          }
          
          commit('setLoading', false)
          commit('setQuizQuetions', questions)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    setQuizResult({state,commit}, payload) {
      commit('setLoading', true)
      var updateRef = database().ref('userInfo')
      var createRef = database().ref('wrongWords')
      updateRef.update({
        wrongWordCount: state.userInfo.totalQuizzes + payload.length,
        totalQuizzes: state.userInfo.totalQuizzes + 1
      })
      .then(() => {
        commit('setQuizResult', payload)
        commit('setLoading', false)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })

      createRef.set(payload)
      .catch(error => {
        console.log('create wrong words error', error)
      })
    },
    clearQuizQuestions({commit}) {
      commit('clearQuizQuestions')
    },
    deleteVocabulary({state,commit} ,payload) {
      commit('setLoading', true)
      var ref = database().ref('vocabularies/' + payload)
      var userInfoRef = database().ref('userInfo')

      ref.remove()
        .then(() => {
          commit('setLoading', false)
          userInfoRef.update({ totalWords:state.userInfo.totalWords - 1 })
            .catch(error => {
              console.log('update word error', error)    
            })
          console.log('delete successfully')
        })
        .catch(error => {
          commit('setLoading', false)
          console.log('delete fail', error)
        })
    },
    saveSettings({commit}, payload) {
      commit('saveSettings', payload)
    }
  },
  getters: {
    loadedVocabularies(state) {
      return state.vocabularies
    },
    quizQuestions(state) {
      return state.quizQuestions
    },
    getQuizTime(state) {
      return state.quizTime
    },
    questionCount(state) {
      return state.questionCount
    },
    quizTime(state) {
      return state.quizTime / 60
    },
    language(state) {
      return state.appLanguage
    }
  }
})
