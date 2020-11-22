<template>
  <div>
      <div style="display: flex; align-items: center; justify-content: space-between">
        <div>
            <h1>Tu posicion:</h1>
            <p>{{myCoordinates.lat}} Latitud, {{myCoordinates.lng}} Longitud</p>
        </div>
        <div>
            <h1>Coordenadas del mapa:</h1>
            <p>{{mapCoordinates.lat}} Latitud, {{mapCoordinates.lng}} Longitud</p>
        </div>
      </div>
      <GmapMap :center="{lat:myCoordinates.lat, lng:myCoordinates.lng}" :zoom="zoom" style="width:640px; height:360px; margin: 32px auto;" ref="mapRef"></GmapMap>
  </div>
</template>

<script>
export default {
  data () {
    return {
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0
      },
      zoom: 7
    }
  },
  created () {
    this.$getLocation({})
      .then(coordinates => {
        this.myCoordinates = coordinates
      })
      .catch(err => alert(err))
  },
  mounted () {
    this.$refs.mapRef.$mapPromise.then(map => { this.map = map })
  },
  computed: {
    mapCoordinates () {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0
        }
      }

      return {
        lat: this.map.getCenter().lat().toFixed(4),
        lng: this.map.getCenter().lng().toFixed(4)
      }
    }
  }
}
</script>

<style>

</style>