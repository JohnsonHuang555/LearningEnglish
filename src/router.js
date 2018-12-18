import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Vocabulary from './views/Vocabulary.vue'
import AddVocabulary from './views/AddVocabulary.vue'
import Quiz from './views/Quiz.vue'
import About from './views/About.vue'
import Settings from './views/Settings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/vocabulary',
      name: 'vocabulary',
      component: Vocabulary
    },
    {
      path: '/add-vocabulary',
      name: 'add-vocabulary',
      component: AddVocabulary
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
