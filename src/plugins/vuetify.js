import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#3F8ED2',
    secondary: '#666',
    accent: '#BBB',
    info: '#F5F5F5',
    error: '#D2583F',
    success: '#79D23F',
    warning: '#D2923F'
  }
})
