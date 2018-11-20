import Vue from 'vue'
import Vuex from 'vuex'
import { database } from 'firebase'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vocabularies: [],
    loading: false,
    errorMsg: '',
    quizTime: 60, // 10 Minutes
    quizQuestions: [],
    today: moment("2018-11-16").format("YYYY-MM-DD"),
    questionCount: 10 // 總題數可以被設定
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setErrorMsg(state, payload) {
      state.errorMsg = payload
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
    clearQuizQuestions(state) {
      state.quizQuestions = []
    }
  },
  actions: {
    getVocabularies({commit}) {
      commit('setLoading', true)
      database().ref('vocabularies').child('2018-11-16').once('value')
        .then(data => {
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
        .catch(error => {
          console.log('get vocabularies error', error)
        })
    },
    addVocabulary({state,commit}, payload) {
      commit('setLoading', true)
      const vocabulary = {
        word: payload.word,
        partOfSpeech: payload.partOfSpeech,
        answers: payload.answers,
        quizCount: 0,
        isFavorite: false,
        dateTime: state.today
      }
      database().ref('vocabularies/' + state.today).push(vocabulary)
        .then(data => {
          // 塞入Key值
          const key = data.key
          commit('addVocabulary', {
            ...vocabulary,
            id: key
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
      database().ref('vocabularies/' + state.today).once('value')
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
    clearQuizQuestions({commit}) {
      commit('clearQuizQuestions')
    }
  },
  getters: {
    getQuizTime(state) {
      return state.quizTime
    }
  }
})
