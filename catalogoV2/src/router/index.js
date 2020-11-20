import Vue from 'vue'
import Router from 'vue-router'
import Cat from '@/views/catalogo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cat',
      component: Cat
    }
  ]
})
