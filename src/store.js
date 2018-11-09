import Vue from 'vue'
import Vuex from 'vuex'
import { database } from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vocabularies: []
  },
  mutations: {
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
    addVocabulary({commit}) {
      const vocabulary = {
        word: 'apple',
        partOfSpeech: 'n.',
        answer: [],
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
        })
        .catch((error) => {
          console.log('add vocabulary error', error)
        })
    }
  }
})
