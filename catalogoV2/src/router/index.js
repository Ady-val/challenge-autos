import Vue from 'vue'
import Router from 'vue-router'
import Cat from '@/views/catalogo'
import Map from '@/views/map'
import Inicio from '@/inicio'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Cat',
      name: 'Cat',
      component: Cat
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    }
  ]
})
