import api from './settings'

export default {
  getVocabularies(today) {
    return api.execute('get', `/getVocabularies/${today}`)
  },
  addVocabulary(data) {
    return api.execute('post', '/addVocabulary', data)
  },
  deleteVocabulary(id) {
    return api.execute('delete', `/deleteVocabulary/${id}`)
  },
  getFavoriteWords() {
    return api.execute('get', '/getFavoriteWords')
  },
  filterWords(word) {
    return api.execute('get', `/filterWords/${word}`)
  },
  getWrongWords() {
    return api.execute('get', '/getWrongWords')
  },
  getQuizQuestions(mode) {
    return api.execute('get', `/getQuizQuestions/${mode}`)
  }
}
