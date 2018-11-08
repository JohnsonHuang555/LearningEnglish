import Vue from 'vue'
import Vuex from 'vuex'
import { database } from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vocabulares: []
  },
  mutations: {

  },
  actions: {
    getVocabularies() {
      database().ref('vocabularies').once('value')
        .then(data => {
          const obj = data.val()
          console.log(obj)
        })
        .catch(error => {
          console.log('get vocabularies error', error)
        })
    },
    addVocabulary() {
      database().ref('vocabularies').set({
        word: 'apple',
        partOfSpeech: 'n.',
        answer: '蘋果',
        quizCount: 0,
        isFavorite: false
      }, error => {
        if (error) {
          console.log('add vocabulary error', error)
        } else {
          console.log('add successfully!')
        }
      })
    }
  }
})
