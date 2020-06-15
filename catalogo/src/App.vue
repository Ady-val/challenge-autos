<template>
  <div id="app">
    <navbartop></navbartop>
    <!--img src="./assets/logo.png"-->
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
//
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//
import navbartop from './navbartop.vue'
Vue.use(BootstrapVue)
export default {
  name: 'App',
  components: {
    navbartop
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
