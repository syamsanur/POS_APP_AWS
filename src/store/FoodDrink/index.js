import axios from 'axios'
// import { url } from '../../helper/env'

const state = () => {
  return {
    all: {
      data: [],
      isLoading: false
    },
    detail: [],
    category: []
  }
}

const getters = {
  getAllProducts (state) {
    return state.all
  },
  getOneProduct (state) {
    return state.detail
    // return state.all.data.filter(e => e.id_product === 1)
  },
  getDataCategory (state) {
    return state.category
  }
}

const mutations = {
  SET_PRODUCTS (state, payload) {
    state.all.data = payload
  },
  SET_ALL_LOADING (state, payload) {
    state.all.isLoading = payload
  },
  SET_ONE_PRODUCT (state, payload) {
    state.detail = payload
  },
  SET_CATEGORY (state, payload) {
    state.category = payload
  }
}

const actions = {
  getAllProducts (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get('product/getall')
        .then((response) => {
          // console.log(response.data)
          context.commit('SET_PRODUCTS', response.data.data)
          context.commit('SET_ALL_LOADING', false)
          resolve()
        }).catch((err) => {
          context.commit('SET_ALL_LOADING', false)
          reject(err)
        })
    })
  },
  getFilter (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`/product/getall?name=${payload.name}&sorting=${payload.sorting}&page=${payload.page}`)
        .then((response) => {
          context.commit('SET_PRODUCTS', response.data.data)
          context.commit('SET_ALL_LOADING', false)
          // console.log(response.data)
          resolve()
        }).catch((err) => {
          context.commit('SET_ALL_LOADING', false)
          reject(err)
        })
    })
  },
  getOneProduct (context, payload) {
    // console.log(`${payload} dari state`)
    return new Promise((resolve, reject) => {
      axios.get(`product/getproduct/${payload}`)
        .then((response) => {
          // console.log(response.data)
          context.commit('SET_ONE_PRODUCT', response.data.data[0])
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getCategory (context) {
    return new Promise((resolve, reject) => {
      axios.get('category/getall')
        .then((response) => {
          // console.log(response.data)
          context.commit('SET_CATEGORY', response.data.data)
          resolve()
        }).catch((err) => {
          reject(err)
        })
    })
  },
  addProduct (context, payload) {
    return new Promise((resolve, reject) => {
      // console.log(`vuex ${payload}`)

      // for (var value of payload.values()) {
      //   console.log(value)
      // }

      axios.post('product/insert', payload)
        .then((response) => {
          // console.log(response)
          // console.log(response.data.message)
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  deleteProduct (context, payload) {
    // console.log(payload)
    if (confirm('Delete ?')) {
      return new Promise((resolve, reject) => {
        axios.delete(`product/delete/${payload}`)
          .then((response) => {
            // console.log(response)
            resolve(response.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  updateProduct (context, payload) {
    return new Promise((resolve, reject) => {
      const id = payload.get('id_product')
      // for (var value of payload.values()) {
      //   console.log(value)
      // }

      // console.log(`${id} dari payload`)

      axios.put(`product/update/${id}`, payload)
        .then((response) => {
          // console.log(response.data)
          resolve(response.data.message)
        }).catch((err) => {
          reject(err)
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
