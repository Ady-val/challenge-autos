<template>
  <div class="login">
    <h1 class="title mt-4">Login in</h1>
    <div class="col-md-3" style="margin: 32px auto; background-color: #6D7E8F; ">
        <div class="mt-3">
        <form action class="form" @submit.prevent="onSubmit">
            <div align="left">
                <label class="form-label mt-3" for="#user" style="color: white;">Usuario:</label>
                <input class="form-input w-100" v-model="user" id="user" required placeholder="Usuario" style="w-auto">
            </div>
            <div align="left" class="mt-4" >
                <label class="form-label" for="#password" style="color: white;">Password:</label>
                <input class="form-input w-100" type="password" v-model="password" id="password" placeholder="Password" style="w-auto">
            </div>
            <div>
                <input class="form-submit mt-4 mb-3" type="submit" value="Login">
            </div>
        </form>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      user: '',
      password: ''
    }
  },
  methods: {
    onSubmit (evt) {
      console.log('corre')
      console.log(this.user)
      console.log(this.password)
      axios
        .get('http://3.22.221.98:3000/user/log_in/' + this.user + '/' + this.password)
        .then((response) => {
          console.log('SUCCESS')
          console.log(response)
        })
        .catch((e) => {
          console.log('ERROR')
          console.log(e)
        })
    }
  }
}
</script>
<style scope>
</style>