const state = () => {
  return {
    category: []
  }
}

const getters = {
  getCart (state) {
    return state.category
  }
}

const mutations = {
  SET_CART (state, payload) {
    state.category = payload
  }
}

const actions = {
  addToCart (context, payload, { rootGetters }) {
    console.log(payload)
    const dataProduct = rootGetters['FoodDrink/getAllProduct']
    console.log(dataProduct)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
