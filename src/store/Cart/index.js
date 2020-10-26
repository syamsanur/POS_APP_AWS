import axios from 'axios'

const state = () => {
  return {
    cart: []
  }
}

const getters = {
  getCart (state) {
    return state.cart
  },
  getTotal (state) {
    let total = null
    total = state.cart.reduce((a, { amount }) => a + amount, 0)
    return total
  }
}

const mutations = {
  SET_CART (state, payload) {
    state.cart = payload
  }
}

const actions = {
  addCart (context, payload) {
    context.commit('SET_CART', payload)
  },
  insert (context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      axios.post('history/insert', payload)
        .then((response) => {
          resolve(response.data.message)
          // console.log(response.data.message)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
