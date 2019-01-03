import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import SnackbarCmp from './components/Shared/Snackbar.vue'

// import { initializeApp } from 'firebase'
import animate from 'animate.css'
import trend from 'vuetrend'
import moment from 'moment'

Vue.config.productionTip = false
Vue.component('app-snackbar', SnackbarCmp)
Vue.use(animate)
Vue.use(trend)

new Vue({
  router,
  store,
  created() {
    // 初始化資料
    // this.$store.dispatch('getWrongWords')
    // 取當天的單字
    const today = moment().format("YYYY-MM-DD")
    this.$store.dispatch('getVocabularies', today)
    this.$store.dispatch('getUserInfo')
  },
  render: h => h(App)
}).$mount('#app')
