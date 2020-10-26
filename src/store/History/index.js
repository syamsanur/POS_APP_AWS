import axios from 'axios'

const state = () => {
  return {
    history: [],
    historyJoin: []
  }
}

const getters = {
  getHistory (state) {
    return state.history
  },
  getHistoryJoin (state) {
    return state.historyJoin
  }
}

const mutations = {
  SET_HISTORY (state, payload) {
    state.history = payload
  },
  SET_HISTORY_JOIN (state, payload) {
    state.historyJoin = payload
  }
}

const actions = {
  getHistory (context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      axios.get('history/getall')
        .then((response) => {
          context.commit('SET_HISTORY', response.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  },
  getHistoryJoin (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get('history/gethistoryproduct')
        .then((response) => {
          // console.log(response.data.data)
          context.commit('SET_HISTORY_JOIN', response.data.data)
        })
        .catch((err) => {
          console.log(err)
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
