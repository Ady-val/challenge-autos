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
      <GmapMap :center="{lat:myCoordinates.lat, lng:myCoordinates.lng}" :zoom="zoom" style="width:640px; height:360px; margin: 32px auto;" ref="mapRef">
          <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
            />
      </GmapMap>
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
      zoom: 7,
      markers: [
        {position: {
          lat: 28.8481,
          lng: -106.2738
        },
        /* eslint-disable-next-line */
        position: {
          lat: 29.9581,
          lng: -106.2738
        }}
      ]
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