import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import SnackbarCmp from './components/Shared/Snackbar.vue'

import { initializeApp } from 'firebase'
import animate from 'animate.css'
import trend from 'vuetrend'
// import moment from 'moment'

Vue.config.productionTip = false
Vue.component('app-snackbar', SnackbarCmp)
Vue.use(animate)
Vue.use(trend)

new Vue({
  router,
  store,
  created() {
    initializeApp({
      apiKey: "AIzaSyBuEUef6Mj8Si7E-vAww9ulyMXh-a0FvCU",
      authDomain: "learning-app-4c136.firebaseapp.com",
      databaseURL: "https://learning-app-4c136.firebaseio.com",
      projectId: "learning-app-4c136",
      storageBucket: "learning-app-4c136.appspot.com",
      messagingSenderId: "440174769740"
    }),
    // 初始化資料
    // this.$store.dispatch('getUserInfo')
    // this.$store.dispatch('getWrongWords')
    this.$store.dispatch('testApi')
    // 取當天的單字
    // const today = moment().format("YYYY-MM-DD")
    // this.$store.dispatch('getCurrentDayVocabularies', today)
  },
  render: h => h(App)
}).$mount('#app')
