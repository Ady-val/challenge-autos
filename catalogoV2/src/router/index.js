import Vue from 'vue'
import Router from 'vue-router'
import Cat from '@/views/catalogo'
import Map from '@/views/map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cat',
      name: 'Cat',
      component: Cat
    },
    {
      path: '/',
      name: 'Map',
      component: Map
    }
  ]
})
