<template>
  <div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-lg-6">
            <b-jumbotron class="vh-100">
            </b-jumbotron>
          </div>
          <div class="col-12 col-lg-6 align-items-center">
            <div class="col p-3">
              <b-card title="Login" class="mb-2">
                <b-card-body>
                  <b-form @submit.prevent="onLogin()">
                    <b-form-group label-cols="4" label="Email">
                      <b-form-input v-model="form.email_users" type="email" required></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols="4" label="Password">
                      <b-form-input v-model="form.password_users" type="password" required></b-form-input>
                    </b-form-group>
                    <div class="col float-right">
                      <div class="row">
                        <div class="col">
                          <b-btn v-b-modal.registermodal variant="success" block class="ml-2 mr-2">Register</b-btn>
                        </div>
                        <div class="col">
                          <!-- <router-link to="/home"> -->
                            <b-btn type="submit" variant="primary" block class="ml-2 mr-2">Login</b-btn>
                          <!-- </router-link> -->
                        </div>
                      </div>
                    </div>
                  </b-form>
                </b-card-body>
                </b-card>
            </div>
            <div class="col">
              <div class="row ">
                <div class="col">
                  <b-img
                    class=""
                    src="https://smartplanning.co.uk/wp-content/uploads/2019/05/coffee-shop-11.jpg"
                    fluid alt="Responsive image">
                  </b-img>
                </div>
              </div>
            </div>
          </div>
        </div>
            <RegisterModal/>
      </div>
  </div>
</template>

<script>
import RegisterModal from '../components/RegisterModal'
import { mapActions } from 'vuex'

export default {
  components: {
    RegisterModal
  },
  data () {
    return {
      form: {
        email_users: '',
        password_users: ''
      }
    }
  },
  methods: {
    onLogin () {
      // console.log(this.form)
      this.actionLogin(this.form)
        .then((response) => {
          // alert(response)
          if (response === 'Success Login') {
            window.location = '/home'
          } else {
            alert('Wrong Username or Password')
            window.location = '/'
          }
        })
        .catch((err) => {
          alert(err)
        })
    },
    ...mapActions({
      actionLogin: 'auth/login'
    })
  }
}
</script>

<style scoped>
.jumbotron {
  background-image: url('https://i0.wp.com/surakartadaily.com/wp-content/uploads/2019/11/20786021_1964885550462647_3189575152413374824_o.0.jpg?ssl=1');
  background-size: cover;
  min-height: 100vh;
}

/* img {
  max-height: 100vh;
} */
</style>
