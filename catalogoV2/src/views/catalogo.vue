<template>
  <div class="container mt-5">
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
                  type="number"
                  required
                  placeholder="Longitud"
                ></b-form-input>
                <b-form-input
                  id="input-6"
                  v-model="form.lon"
                  type="number"
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
                            <input v-model="updateLat" type="number" class="form-control">
                          </span>
                          <span v-else>
                            {{car.lat}}
                          </span>
                        </td>
                        <!--Longitud-->
                        <td>
                          <span v-if="updateForm && lisId == index">
                            <input v-model="updateLon" type="number" class="form-control">
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
  </div>
</template>

<script>
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
      show: true
    }
  },
  methods: {
    // Guardar campos
    onSubmit (evt) {
      evt.preventDefault()
      this.cars.push({
        plates: this.form.plates,
        color: this.form.color,
        model: this.form.model,
        year: this.form.year,
        lat: this.form.lat,
        lon: this.form.lon
      })
      //
      this.form.plates = ''
      this.form.color = ''
      this.form.model = null
      this.form.year = ''
      this.form.lat = ''
      this.form.lon = ''
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
    },
    // borra uno de los datos de la tabla
    deletedCar (plates) {
      this.cars.splice(plates, 1)
    },
    // guarda la actualizacion hecha en la tabla
    saveUpdateCar (plates) {
      this.updateForm = false
      //
      this.cars[plates].plates = this.updatePlates
      this.cars[plates].color = this.updateColor
      this.cars[plates].model = this.updateModel
      this.cars[plates].year = this.updateYear
      this.cars[plates].lat = this.updateLat
      this.cars[plates].lon = this.updateLon
    }
  }
}
</script>

<style>

</style>

