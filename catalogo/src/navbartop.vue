<template>
  <div>
    <!--Barra de opciones-->
    <b-navbar type="dark" variant="dark">
        <b-navbar-nav>

            <router-link class="nav-link" to="">Inicio</router-link>
            <router-link class="nav-link" to="/register">Agregar</router-link>
            <router-link class="nav-link" to="/map">Mapa</router-link>

        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbartop'
}
</script>

<style>

</style>
