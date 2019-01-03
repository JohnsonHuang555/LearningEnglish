import api from './settings'

export default {
  getUserInfo() {
    return api.execute('get', '/getUserInfo')
  },
  updateTotalWords() {
    return api.execute('put', '/updateTotalWords')
  }
}
