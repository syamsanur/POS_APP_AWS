import axios from 'axios'

const state = () => {
  return {
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null
  }
}

const getters = {
  isLogin (state) {
    if (state.token !== null) {
      return true
    } else {
      return false
    }
  },
  getToken (state) {
    return state.token
  },
  getRefreshToken (state) {
    return state.refreshToken
  }
}

const mutations = {
  SET_NEW_TOKEN (state, payload) {
    state.token = payload
  }
}

const actions = {
  login (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post('users/login', payload)
        .then((response) => {
          // console.log(response.data)
          localStorage.setItem('token', response.data.data.token)
          localStorage.setItem('refreshToken', response.data.data.refreshToken)
          resolve(response.data.message)
        }).catch((err) => {
          console.log(err.message)
          // reject(err.message)
        })
    })
  },
  refresh (context, { getters }, payload) {
    console.log('test')
    // console.log(getters.getRefreshToken)
    // return new Promise((resolve) => {
    // })
  },
  logout (context) {
    return new Promise((resolve) => {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken ')
      resolve()
    })
  },
  register (context, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios.post('users/register', payload)
        .then((response) => {
          resolve(response.data.message)
        })
        .catch((err) => {
          reject(err.message)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
