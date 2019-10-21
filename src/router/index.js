import Vue from 'vue'
import Router from 'vue-router'
import gant from '@/gant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'gant',
      component: gant
    }
  ]
})
