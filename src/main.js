import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import SnackbarCmp from './components/Shared/Snackbar.vue'

import animate from 'animate.css'
import trend from 'vuetrend'

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
    this.$store.dispatch('getVocabularies')
    this.$store.dispatch('getUserInfo')
  },
  render: h => h(App)
}).$mount('#app')
