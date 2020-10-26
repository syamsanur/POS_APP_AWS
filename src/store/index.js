import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import FoodDrink from './FoodDrink'
import Cart from './Cart'
import History from './History'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    FoodDrink,
    Cart,
    History
  }
})
