import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from 'firebase'
import SnackbarCmp from './components/Shared/Snackbar.vue'

Vue.config.productionTip = false
Vue.component('app-snackbar', SnackbarCmp)

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
    this.$store.dispatch('getVocabularies')
  },
  render: h => h(App)
}).$mount('#app')
