import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

import vocabularyApi from './api/vocabulary'
import userInfoApi from './api/userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      loginDays: 0,
      totalWords: 0,
      totalQuizzes: 0,
      wrongWordCount: 0,
      loginLog: []
    },
    vocabularies: [],
    todayVocabularyCount: 0, // 當天輸入總和
    limitedVocabularies: 10, // 一天可輸入單字數
    wrongVocabularies: [], // 答錯的單字，錯誤清單
    loading: false,
    errorMsg: '',
    quizQuestions: [],
    today: moment().format("YYYY-MM-DD"),
    questionCount: 15, // 總題數 五題為錯誤清單 + 之前的單字
    quizTime: 600, // 考試時間 (秒)
    appLanguage: 0, // 0 En, 1 zh-tw
    mode: 1 // Mode 1: wordCount 10, quizQuestions: 15 ... Mode 2: wordCount: 20, quizQuestions: 25
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
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
    setQuizQuestions(state, payload) {
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
    },
    setTodayVocabularyCount(state, payload) {
      state.todayVocabularyCount = payload
    }
  },
  actions: {
    async getVocabularies({
      state,
      commit
    }) {
      let data = []
      // 取得所有單字，規則如下
      // 當天沒有輸入，顯示最後登入的那一天
      // 當天有輸入且有輸滿 顯示當天
      // 當天有輸入未輸滿 顯示最後登入的那一天加當天
      const limit = state.limitedVocabularies
      const logDays = state.userInfo.loginLog.length
      const previousDay = state.userInfo.loginLog[logDays - 1]
      const previousDayData = await vocabularyApi.getVocabularies(previousDay)
      const todayData = await vocabularyApi.getVocabularies(state.today)
      if (todayData.length === state.questionCount) {
        commit('setQuizQuetions', todayData)
      }

      if (todayData.length === 0) {
        data = await vocabularyApi.getVocabularies(previousDay)
      } else if (todayData.length > 0 && todayData.length === limit) {
        data = await vocabularyApi.getVocabularies(state.today)
      } else if (todayData.length > 0 && todayData.length < limit) {
        data = previousDayData.concat(todayData)
      }

      commit('setTodayVocabularyCount', todayData.length)
      commit('setVocabularies', data)
    },
    async getUserInfo({ commit, dispatch }) {
      const data = await userInfoApi.getUserInfo()
      commit('setUserInfo', data)
      dispatch('getVocabularies')
    },
    async addVocabulary({ state, dispatch }, payload) {
      const vocabulary = {
        word: payload.word,
        partOfSpeech: payload.partOfSpeech,
        answers: payload.answers,
        quizCount: 0,
        isFavorite: false,
        dateTime: state.today,
      }

      await vocabularyApi.addVocabulary(vocabulary)
      await userInfoApi.addTotalWords()

      // update
      dispatch('getUserInfo')
    },
    async getWrongWords({ commit }) {
      const data = await vocabularyApi.getWrongWords()
      commit('setWrongWords', data)
    },
    async getQuizQuestions({ state, commit }) {
      const data = await vocabularyApi.getQuizQuestions(state.mode)
      commit('setQuizQuestions', data)
    },
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
    clearQuizQuestions({commit}) {
      commit('clearQuizQuestions')
    },
    async deleteVocabulary({
      dispatch
    }, payload) {
      await vocabularyApi.deleteVocabulary(payload)
      await userInfoApi.minusTotalWords()
      
      // update
      dispatch('getUserInfo')
    },
    saveSettings({
      commit
    }, payload) {
      commit('saveSettings', payload)
    }
  },
  getters: {
    loadedVocabularies(state) {
      let tempVocabulary = []
      tempVocabulary = state.vocabularies.slice().sort((itemA, itemB) => {
        return moment(itemA.dateTime) > moment(itemB.dateTime)
      })
      return tempVocabulary.reverse()
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