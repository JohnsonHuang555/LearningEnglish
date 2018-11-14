import Vue from 'vue'
import Vuex from 'vuex'
import { database } from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vocabularies: [],
    loading: false,
    errorMsg: ''
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
    }
  },
  actions: {
    getVocabularies({commit}) {
      database().ref('vocabularies').once('value')
        .then(data => {
          const vocabularies = []
          const obj = data.val()
          for (let key in obj) {
            vocabularies.push({
              id: key,
              word: obj[key].word,
              partOfSpeech: obj[key].partOfSpeech,
              answer: obj[key].answer,
              quizCount: obj[key].quizCount,
              isFavorite: obj[key].isFavorite
            })
          }
          commit('setVocabularies', vocabularies)
        })
        .catch(error => {
          console.log('get vocabularies error', error)
        })
    },
    addVocabulary({commit}, payload) {
      commit('setLoading', true)
      const vocabulary = {
        word: payload.word,
        partOfSpeech: payload.partOfSpeech,
        answers: payload.answers,
        quizCount: 0,
        isFavorite: false
      }
      database().ref('vocabularies').push(vocabulary)
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
    }
  }
})
