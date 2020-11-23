<template>
  <div class="container mt-5">
    <!--################### Primer renglon ####################-->
    <div class="row">
      <div class="col-md-6" align="left">
        <h4>Usurario: {{user_name}} | Tipo: {{type}}</h4>
      </div>
      <div class="col-md-6" align='right'>
        <b-button @click="logout">Logout</b-button>
      </div>
    </div>
    <div class="row">
      <!--################### inicio de formulario ####################-->
      <div class="col-md-3">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <!--Placas-->
          <div class="col-md-10" align="left">
            <b-form-group
              id="input-group-1"
              label="Placas:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.plates"
                required
                placeholder="Introduce placas"
              ></b-form-input>
            </b-form-group>
          </div>
          <!--Color-->
          <div class="col-md-10" align="left">
            <b-form-group id="input-group-2" label="Color:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.color"
                required
                placeholder="Introduce color"
              ></b-form-input>
            </b-form-group>
          </div>
          <!--Marca-->
          <div class="col-md-10" align="left">
            <b-form-group id="input-group-3" label="Marca:" label-for="input-3">
              <b-form-select
                id="input-3"
                v-model="form.model"
                :options="models"
                required
              ></b-form-select>
            </b-form-group>
          </div>
          <!--PModelo-->
          <div class="col-md-10" align="left">
            <b-form-group id="input-group-4" label="Modelo:" label-for="input-4">
              <b-form-input
                id="input-4"
                v-model="form.year"
                type="number"
                min="1970"
                required
                placeholder="Introduce modelo"
              ></b-form-input>
            </b-form-group>
          </div>
          <!--Latitud y Longitud-->
          <div class="col-md-10" align="left">
            <b-form-group id="input-group-5" label="Posición geográfica" label-for="input-5">
              <b-form-input
                  id="input-5"
                  v-model="form.lat"
                  required
                  placeholder="Longitud"
                ></b-form-input>
                <b-form-input
                  id="input-6"
                  v-model="form.lon"
                  required
                  placeholder="Latitud"
                ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-10" align="left">
            <b-button type="submit" variant="primary">Agregar</b-button>
            <b-button type="reset" variant="danger">Limpiar</b-button>
          </div>
        </b-form>
      </div>
      <!--################### fin de formulario ####################-->
      <!--################### inicio de tabla ####################-->
      <div class="col-md-9">
        <section class="data">
              <!--Cabecera de tabla-->
              <caption>Autos</caption>
              <table class="table">
                  <thead>
                      <tr>
                          <th scope="col">Placas</th>
                          <th scope="col">Color</th>
                          <th scope="col">Marca</th>
                          <th scope="col">Modelo</th>
                          <th scope="col">Latitud</th>
                          <th scope="col">Longitud</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(car, index) in cars" v-bind:key="index">
                        <!--Placas-->
                        <td>
                          <span v-if="updateForm && lisId == index">
                            <input v-model="updatePlates" class="form-control">
                          </span>
                          <span v-else>
                            {{car.plates}}
                          </span>
                        </td>
                        <!--Color-->
                        <td>
                          <span v-if="updateForm && lisId == index">
                            <input v-model="updateColor" class="form-control">
                          </span>
                          <span v-else>
                            {{car.color}}
                          </span>
                        </td>
                        <!--Marca-->
                        <td>
                          <span v-if="updateForm && lisId == index">
                            <input v-model="updateModel" :options="models" class="form-control">
                          </span>
                          <span v-else>
                            {{car.model}}
                          </span>
                        </td>
                        <!--Modelo-->
                        <td>
                          <span v-if="updateForm && lisId == index">
                            <input v-model="updateYear" type="number" min="1970" class="form-control">
                          </span>
                          <span v-else>
                            {{car.year}}
                          </span>
                        </td>
                        <!--Latitud-->
                        <td>
                          <span v-if="updateForm && lisId == index">
                            <input v-model="updateLat" class="form-control">
                          </span>
                          <span v-else>
                            {{car.lat}}
                          </span>
                        </td>
                        <!--Longitud-->
                        <td>
                          <span v-if="updateForm && lisId == index">
                            <input v-model="updateLon" class="form-control">
                          </span>
                          <span v-else>
                            {{car.lon}}
                          </span>
                        </td>
                        <!--Btn Actualizar-->
                        <td>
                          <span v-if="updateForm && lisId == index">
                            <!--Btn guardar actualizacion-->
                            <button @click="saveUpdateCar(index)" class="btn btn-success">Guardar</button>
                          </span>
                          <span v-else>
                            <!-- Btn actualizar -->
                            <button @click="updateCar(index)" class="btn btn-warning">Actualizar</button>
                            <!-- Btn borrar -->
                            <button @click="deletedCar(index)" class="btn btn-danger">Borrar</button>
                          </span>
                        </td>
                      </tr>
                  </tbody>
              </table>
          </section>
      </div>
      <!--################### fin de tabla ####################-->
    </div>
    <div class="row">
      <GmapMap :center="{lat:28.6711604, lng:-106.0996488}" :zoom="zoom" style="width:840px; height:560px; margin: 32px auto;" ref="mapRef">
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
</div>
</template>

<script>
import cookieJar from '@/logic/cookieJar'
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        plates: '',
        color: '',
        model: null,
        year: '',
        lat: '',
        lon: ''
      },
      updateForm: false,
      lisId: -1,
      updatePlates: '',
      updateColor: '',
      updateModel: null,
      updateYear: '',
      updateLat: '',
      updateLon: '',
      cars: [],
      models: [{ text: 'Seleccione uno', value: null }, 'Nissan', 'Ford', 'Chevrolet', 'Otro...'],
      show: true,
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0
      },
      zoom: 11,
      markers: [],
      getPlates: '',
      user_name: '',
      type: ''
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
    console.log(cookieJar.getUserLogged())
    if (cookieJar.getUserLogged() === 'false') {
      this.$router.replace({name: 'Inicio'})
    } else {
      console.log(cookieJar.getIdUserLogged())
      if (cookieJar.getIdUserTypeLogged() === '1') {
        this.type = 'Admin'
      } else {
        this.type = 'User'
      }
      this.user_name = cookieJar.getNameUserLogged()
      this.$refs.mapRef.$mapPromise.then(map => { this.map = map })
      axios
        .get('http://3.22.221.98:3000/catalog/get_data/' + cookieJar.getIdUserLogged())
        .then((response) => {
          const carsList = response.data.cars
          for (var i = 0; i < carsList.length; i++) {
            this.cars.push({
              plates: carsList[i].plates,
              color: carsList[i].color,
              model: carsList[i].brand,
              year: carsList[i].year,
              lat: carsList[i].lat,
              lon: carsList[i].lon
            })
            var marker = {
              lat: carsList[i].lat,
              lng: carsList[i].lon
            }
            this.markers.push({position: marker})
          }
        })
        .catch((e) => {
          console.log('----ERROR----')
          console.log(e)
        })
      let map = this.$refs.map
      map.dropMarker({lan: 28.6750, lng: -106.1031})
    }
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
  },
  methods: {
    logout () {
      console.log('corre')
      cookieJar.userLogout()
      this.$router.replace({name: 'Inicio'})
    },
    // metodo para agregar un marcador en el mapa
    addMarker (latitude, longitud) {
      const marker = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitud)
      }
      this.markers.push({position: marker})
    },
    // Guardar campos
    onSubmit (evt) {
      evt.preventDefault()
      axios
        .post('http://3.22.221.98:3000/catalog/add_car', {
          plates: this.form.plates,
          color: this.form.color,
          model: this.form.model,
          year: this.form.year,
          lat: this.form.lat,
          lon: this.form.lon,
          id_user: 1
        })
        .then((response) => {
          console.log('++++SUCCESS++++')
          console.log(response.status)
          console.log('###############')
          this.cars.push({
            plates: this.form.plates,
            color: this.form.color,
            model: this.form.model,
            year: this.form.year,
            lat: this.form.lat,
            lon: this.form.lon
          })
          this.addMarker(this.form.lat, this.form.lon)
          //
          this.form.plates = ''
          this.form.color = ''
          this.form.model = null
          this.form.year = ''
          this.form.lat = ''
          this.form.lon = ''
        }).catch((e) => {
          console.log('----ERROR----')
          console.log(e)
        })
    },
    // Limpiar campos
    onReset (evt) {
      evt.preventDefault()
      this.form.plates = ''
      this.form.color = ''
      this.form.model = null
      this.form.year = ''
      this.form.lat = ''
      this.form.lon = ''
      //
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    // actualiza los datos de la tabla
    updateCar (plates) {
      this.updateForm = true
      //
      this.lisId = plates
      //
      this.updatePlates = this.cars[plates].plates
      this.updateColor = this.cars[plates].color
      this.updateModel = this.cars[plates].model
      this.updateYear = this.cars[plates].year
      this.updateLat = this.cars[plates].lat
      this.updateLon = this.cars[plates].lon
      //
      this.getPlates = this.cars[plates].plates
    },
    // borra uno de los datos de la tabla
    deletedCar (plates) {
      axios
        .post('http://3.22.221.98:3000/catalog/delete_car/' + this.cars[plates].plates)
        .then((response) => {
          this.cars.splice(plates, 1)
          console.log(response.status)
        })
        .catch((e) => {
          console.log('----ERROR----')
          console.log(e)
        })
    },
    // guarda la actualizacion hecha en la tabla
    saveUpdateCar (plates) {
      axios
        .post('http://3.22.221.98:3000/catalog/update_car/', {
          last_plates: this.getPlates,
          plates: this.updatePlates,
          brand: this.updateModel,
          color: this.updateColor,
          year: this.updateYear,
          lat: this.updateLat,
          lon: this.updateLon
        })
        .then((response) => {
          console.log(response.status)
          //
          this.updateForm = false
          //
          this.cars[plates].plates = this.updatePlates
          this.cars[plates].color = this.updateColor
          this.cars[plates].model = this.updateModel
          this.cars[plates].year = this.updateYear
          this.cars[plates].lat = this.updateLat
          this.cars[plates].lon = this.updateLon
        })
        .catch((e) => {
          console.log('----ERROR----')
          console.log(e)
        })
    }
  }
}
</script>

<style>

</style>

