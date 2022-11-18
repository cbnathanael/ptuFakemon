import { createStore } from 'vuex'
import authentication from './modules/authentication'
import pokemon from './modules/pokemon'
import moves from './modules/moves'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication,
    pokemon,
    moves,
  }
})
