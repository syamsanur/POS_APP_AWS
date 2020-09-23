import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import store from './store'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { url } from '../src/helper/env'

axios.defaults.headers = {
  token: localStorage.getItem('token')
}

axios.interceptors.response.use((response) => {
  return response
}, (err) => {
  const status = err.response.status
  // console.log(status)
  if (status === 405) {
    const refreshToken = localStorage.getItem('refreshToken')
    axios.post('users/refresh',
      { refreshToken })
      .then((result) => {
        localStorage.setItem('token', result.data.data.token)
        window.location('/home')
        // console.log(result.data.data.token)
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    window.location('/')
  }
})

axios.defaults.baseURL = url

// axios.defaults.baseURL = 'http://127.0.0.1:4000/POSAPP/'
// VUE_APP_URL = http://54.165.103.215:3001/POSAPP/ BUAT ENV

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
