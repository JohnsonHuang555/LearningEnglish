import Vue from 'vue'
import Vuex from 'vuex'
// import { database } from 'firebase'
import moment from 'moment'
// import axios from 'axios'

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
    // setLoading(state, payload) {
    //   state.loading = payload
    // },
    // setErrorMsg(state, payload) {
    //   state.errorMsg = payload
    // },
    // setUserInfo(state, payload) {
    //   state.userInfo = payload
    // },
    // setWrongWords(state, payload) {
    //   state.wrongVocabularies = payload
    // },
    // setVocabularies(state, payload) {
    //   state.vocabularies = payload
    // },
    // addVocabulary(state, payload) {
    //   state.vocabularies.push(payload)
    // },
    // setQuizQuetions(state, payload) {
    //   state.quizQuestions = payload
    // },
    // setQuizResult(state, payload) {
    //   state.wrongVocabularies = payload
    // },
    // clearQuizQuestions(state) {
    //   state.quizQuestions = []
    // },
    // saveSettings(state, payload) {
    //   state.questionCount = payload.questionCount
    //   state.quizTime = payload.quizTime
    //   state.appLanguage = payload.language
    // },
    // setTodayVocabularyCount(state, payload) {
    //   state.todayVocabularyCount = payload
    // }
  },
  actions: {
    // getUserInfo({commit}) {
    //   commit('setLoading', true)
    //   var ref = database().ref('userInfo')
    //   ref.off()
    //   ref.on('value', data => {
    //     if (data.val() === null) {
    //       const userObj = {
    //         loginDays : 0,
    //         totalQuizzes : 0,
    //         totalWords : 0,
    //         wrongWordCount : 0
    //       }
    //       ref.set(userObj)
    //         .then(() => {
    //           commit('setUserInfo', userObj)
    //           commit('setLoading', false)
    //         })
    //         .catch(error => {
    //           console.log(error)
    //         })
    //     }
    //     commit('setUserInfo', data.val())
    //     commit('setLoading', false)
    //   })        
    // },
    // getWrongWords({commit}) {
    //   commit('setLoading', true)
    //   var ref = database().ref('wrongWords')
    //   ref.off()
    //   ref.on('value', data => {
    //     commit('setWrongWords', data.val())
    //     commit('setLoading', false)
    //   })
    // },
    // getCurrentDayVocabularies({state, commit}, payload) {
    //   commit('setLoading', true)
    //   database().ref('vocabularies').orderByChild("dateTime").equalTo(payload).once('value')
    //     .then(data => {
    //       let vocabularies = []
    //       const obj = data.val()
    //       for (let key in obj) {
    //         vocabularies.push({
    //           id: key,
    //           word: obj[key].word,
    //           partOfSpeech: obj[key].partOfSpeech,
    //           answers: obj[key].answers,
    //           quizCount: obj[key].quizCount,
    //           isFavorite: obj[key].isFavorite,
    //           dateTime: obj[key].dateTime,
    //         })
    //       }
    //       if (state.today !== payload) {
    //         vocabularies = state.vocabularies.concat(vocabularies)
    //       } else {
    //         commit('setTodayVocabularyCount', vocabularies.length)
    //       }
    //       commit('setLoading', false)
    //       commit('setVocabularies', vocabularies)
    //     })
    //     .catch(error => {
    //       console.log('getCurrentVocabularies error',error)
    //     })
    // },
    // addVocabulary({state,commit}, payload) {
    //   commit('setLoading', true)
    //   var vocabularyRef = database().ref('vocabularies')
    //   var updateWordRef = database().ref('userInfo')
    //   const vocabulary = {
    //     word: payload.word,
    //     partOfSpeech: payload.partOfSpeech,
    //     answers: payload.answers,
    //     quizCount: 0,
    //     isFavorite: false,
    //     dateTime: state.today,
    //   }
    //   vocabularyRef.push(vocabulary)
    //     .then(() => {
    //       updateWordRef.update({ totalWords:state.userInfo.totalWords + 1 })
    //         .catch(error => {
    //           console.log('update word error', error)    
    //         })
    //       commit('setTodayVocabularyCount', state.todayVocabularyCount + 1)
    //       commit('setLoading', false)
    //     })
    //     .catch((error) => {
    //       commit('setErrorMsg', 'Add fail!')
    //       commit('setLoading', false)
    //       console.log('add vocabulary error', error)
    //     })
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
    // deleteVocabulary({state,commit,dispatch} ,payload) {
    //   commit('setLoading', true)
    //   var ref = database().ref('vocabularies/' + payload)
    //   var userInfoRef = database().ref('userInfo')

    //   ref.remove()
    //     .then(() => {
    //       commit('setLoading', false)
    //       userInfoRef.update({ totalWords:state.userInfo.totalWords - 1 })
    //         .catch(error => {
    //           console.log('update word error', error)    
    //         })
    //         dispatch('getCurrentDayVocabularies', state.today)
    //       console.log('delete successfully')
    //     })
    //     .catch(error => {
    //       commit('setLoading', false)
    //       console.log('delete fail', error)
    //     })
    // },
    // saveSettings({commit}, payload) {
    //   commit('saveSettings', payload)
    // },
    // testApi() {
    //   const instance = axios.create({
    //     json: true
    //   })
  
    //   instance.get("http://localhost:5000/api/vocabulary")
    //   .then(res => {
    //     console.log(res)
    //   })
    // }
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
