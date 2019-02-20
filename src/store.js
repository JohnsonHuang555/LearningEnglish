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
    loadWordCount: 0, // 讀取單字次數，滾到底讀單字用
    vocabularies: [],
    myFavoriteWords: [],
    todayVocabularyCount: 0, // 當天輸入總和
    limitedVocabularies: 10, // 一天可輸入單字數
    wrongVocabularies: [], // 答錯的單字，錯誤清單
    loading: false,
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
      state.userInfo = payload
    },
    setFavoriteWords(state, payload) {
      state.myFavoriteWords = payload
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
    },
    setLoadWordCount(state, payload) {
      if (payload) {
        state.loadWordCount++
      } else {
        state.loadWordCount = 0
      }
    }
  },
  actions: {
    async getVocabularies({ state, commit }, payload) {
      if (payload === undefined) {
        return
      }

      let data = []
      // 取得所有單字，規則如下
      // 當天沒有輸入，顯示最後登入的那一天
      // 當天有輸入且有輸滿 顯示當天
      // 當天有輸入未輸滿 顯示最後登入的那一天加當天
      const limit = state.limitedVocabularies
      const logDays = payload.loginLog.length
      
      const previousDay = payload.loginLog[logDays - 2].date
      const previousDayData = await vocabularyApi.getVocabularies(previousDay)
      const todayData = await vocabularyApi.getVocabularies(state.today)
      if (todayData.length === state.questionCount) {
        commit('setQuizQuetions', todayData)
      }

      if (todayData.length === 0) {
        data = await vocabularyApi.getVocabularies(previousDay)
        commit('setLoadWordCount', true)
      } else if (todayData.length > 0 && todayData.length === limit) {
        data = await vocabularyApi.getVocabularies(state.today)
        commit('setLoadWordCount', false)
      } else if (todayData.length > 0 && todayData.length < limit) {
        data = previousDayData.concat(todayData)
        commit('setLoadWordCount', false)
      }
      commit('setTodayVocabularyCount', todayData.length)
      commit('setVocabularies', data)
    },
    async getUserInfo({ commit, dispatch }) {
      await userInfoApi.getUserInfo().then(data => {
        if (data === undefined) {
          data = {
            loginDays: 0,
            totalWords: 0,
            totalQuizzes: 0,
            wrongWordCount: 0,
            loginLog: []
          }
        }
        commit('setUserInfo', data)
        dispatch('getVocabularies', data)
      })      
    },
    async getWrongWords({ commit }) {
      const data = await vocabularyApi.getWrongWords()
      commit('setWrongWords', data)
    },
    async getQuizQuestions({ state, commit }) {
      const data = await vocabularyApi.getQuizQuestions(state.mode)
      commit('setQuizQuestions', data)
    },
    async getFavoriteWords({ commit }) {
      const data = await vocabularyApi.getFavoriteWords()
      commit('setFavoriteWords', data)
    },
    async setQuizResult({ commit, dispatch }, payload) {
      const data = await vocabularyApi.setQuizResult(payload)
      commit('setQuizResult', data)
      dispatch('getWrongWords')
    },
    clearQuizQuestions({commit}) {
      commit('clearQuizQuestions')
    },
    async setFavoriteVocabulary({ dispatch }, payload) {
      await vocabularyApi.setFavoriteVocabulary(payload)
      dispatch('getFavoriteWords')

      // update
      dispatch('getUserInfo')
    },
    async deleteVocabulary({ dispatch }, payload) {
      await vocabularyApi.deleteVocabulary(payload)
      await userInfoApi.minusTotalWords()
      
      // update
      dispatch('getUserInfo')
    },
    saveSettings({
      commit
    }, payload) {
      commit('saveSettings', payload)
    },
    // async loadedAnotherDayVocabularies({ state, commit }) {
    //   commit('setLoading', true)
    //   const day = state.loadWordCount + 1
    //   const previousDay = state.userInfo.loginLog[state.userInfo.loginLog.length - (day + 1)]
    //   const currentVocabularies = state.vocabularies
    //   await vocabularyApi.getVocabularies(previousDay)
    //     .then(res => {
    //       const data = currentVocabularies.concat(res)
    //       commit('setLoadWordCount', true)
    //       commit('setVocabularies', data)
    //       commit('setLoading', false)
    //     })
    // }
  },
  getters: {
    loadedVocabularies(state) {
      let tempVocabulary = []
      tempVocabulary = state.vocabularies.slice().sort((itemA, itemB) => {
        return moment(itemA.dateTime) > moment(itemB.dateTime)
      })
      return tempVocabulary.reverse()
    },
    errorMsg(state) {
      return state.errorMsg
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