import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import _ from 'lodash'

import vocabularyApi from './api/vocabulary'
import userInfoApi from './api/userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    vocabularies: [],
    todayVocabularyCount: 0, // 當天輸入總和
    wrongVocabularies: [], // 答錯的單字，錯誤清單
    loading: false,
    errorMsg: '',
    quizQuestions: [],
    today: moment().format("YYYY-MM-DD"),
    questionCount: 10, // 總題數
    quizTime: 600, // 考試時間 (秒)
    appLanguage: 0, // 0 En, 1 zh-tw
    limitedVocabularies: 10 // 一天可輸入單字數
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    // setErrorMsg(state, payload) {
    //   state.errorMsg = payload
    // },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    // setWrongWords(state, payload) {
    //   state.wrongVocabularies = payload
    // },
    setVocabularies(state, payload) {
      state.vocabularies = payload
    },
    deleteVocabulary(state, payload) {
      const i = _.findIndex(state.vocabularies, v => {
        return v._id === payload
      })
      state.vocabularies.splice(i, 1)
    },
    // setQuizQuetions(state, payload) {
    //   state.quizQuestions = payload
    // },
    // setQuizResult(state, payload) {
    //   state.wrongVocabularies = payload
    // },
    // clearQuizQuestions(state) {
    //   state.quizQuestions = []
    // },
    saveSettings(state, payload) {
      state.questionCount = payload.questionCount
      state.quizTime = payload.quizTime
      state.appLanguage = payload.language
    },
    setTodayVocabularyCount(state, payload) {
      state.todayVocabularyCount = payload
    }
  },
  actions: {
    async getVocabularies({ state, commit }, payload) {
      commit('setLoading', true)

      let data = await vocabularyApi.getVocabularies(payload)
      if (state.today !== payload) {
        data = state.vocabularies.concat(data)
      } else {
        commit('setTodayVocabularyCount', data.length)
      }

      commit('setVocabularies', data)
      commit('setLoading', false)
    },
    async getUserInfo({ commit }) {
      commit('setLoading', true)
      const data = await userInfoApi.getUserInfo()

      commit('setUserInfo', data)
      commit('setLoading', false)
    },
    async addVocabulary({ state, commit }, payload) {
      commit('setLoading', true)
      const vocabulary = {
        word: payload.word,
        partOfSpeech: payload.partOfSpeech,
        answers: payload.answers,
        quizCount: 0,
        isFavorite: false,
        dateTime: state.today,
      }

      await vocabularyApi.addVocabulary(vocabulary)
      await userInfoApi.updateTotalWords()

      commit('setTodayVocabularyCount', state.todayVocabularyCount + 1)

      // fatch all
      const words = await vocabularyApi.getVocabularies(state.today)
      commit('setVocabularies', words)

      const user = await userInfoApi.getUserInfo()
      commit('setUserInfo', user)

      commit('setLoading', false)
    },
    // getWrongWords({commit}) {
    //   commit('setLoading', true)
    //   var ref = database().ref('wrongWords')
    //   ref.off()
    //   ref.on('value', data => {
    //     commit('setWrongWords', data.val())
    //     commit('setLoading', false)
    //   })
    // },
    // getQuizQuestions({state, commit}) {
    //   commit('setLoading', true)
    //   var ref = database().ref('vocabularies').orderByChild('dateTime').equalTo(state.today)
    //   ref.once('value')
    //     .then(data => {
    //       const questions = []
    //       const obj = data.val()
    //       for(let key in obj) {
    //         // 問題為中文，答案為英文
    //         questions.push({
    //           id: key,
    //           questions: obj[key].answers,
    //           answer: obj[key].word,
    //           quizCount: obj[key].quizCount,
    //           isFavorite: obj[key].isFavorite,
    //           partOfSpeech: obj[key].partOfSpeech,
    //           word: obj[key].word, // 為了共用Vocabulary component 需改寫
    //           answers: obj[key].answers
    //         })
    //       }
          
    //       commit('setLoading', false)
    //       commit('setQuizQuetions', questions)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       commit('setLoading', false)
    //     })
    // },
    // setQuizResult({state,commit}, payload) {
    //   commit('setLoading', true)
    //   var updateRef = database().ref('userInfo')
    //   var createRef = database().ref('wrongWords')
    //   updateRef.update({
    //     wrongWordCount: state.userInfo.totalQuizzes + payload.length,
    //     totalQuizzes: state.userInfo.totalQuizzes + 1
    //   })
    //   .then(() => {
    //     commit('setQuizResult', payload)
    //     commit('setLoading', false)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     commit('setLoading', false)
    //   })

    //   createRef.set(payload)
    //   .catch(error => {
    //     console.log('create wrong words error', error)
    //   })
    // },
    // clearQuizQuestions({commit}) {
    //   commit('clearQuizQuestions')
    // },
    async deleteVocabulary({ commit } ,payload) {
      commit('setLoading', true)
      await vocabularyApi.deleteVocabulary(payload)

      commit('deleteVocabulary', payload)
      commit('setLoading', false)
      // commit('setLoading', true)
      // var ref = database().ref('vocabularies/' + payload)
      // var userInfoRef = database().ref('userInfo')

      // ref.remove()
      //   .then(() => {
      //     commit('setLoading', false)
      //     userInfoRef.update({ totalWords:state.userInfo.totalWords - 1 })
      //       .catch(error => {
      //         console.log('update word error', error)    
      //       })
      //       dispatch('getCurrentDayVocabularies', state.today)
      //     console.log('delete successfully')
      //   })
      //   .catch(error => {
      //     commit('setLoading', false)
      //     console.log('delete fail', error)
      //   })
    },
    saveSettings({commit}, payload) {
      commit('saveSettings', payload)
    }
  },
  getters: {
    loadedVocabularies(state) {
      let tempVocabulary = []
      tempVocabulary = state.vocabularies.slice().sort((itemA, itemB) => {
        return moment(itemA.dateTime) < moment(itemB.dateTime)
      })
      return tempVocabulary
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
