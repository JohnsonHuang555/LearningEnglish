import api from './settings'

export default {
  getUserInfo() {
    return api.execute('get', '/getUserInfo')
  },
  addTotalWords() {
    return api.execute('put', '/addTotalWords')
  },
  minusTotalWords() {
    return api.execute('put', '/minusTotalWords')
  }
}
