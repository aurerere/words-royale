import { createStore } from 'vuex'

export default createStore({
  state: {
    players: [],
    lives: 1,
  },
  getters: {
  },
  mutations: {
    addPlayer(state, player) {
      state.players.push(player)
    },
    removePlayer(state, player) {
      state.players.shift(state.players.indexOf(player))
    },
    setLives(state, lives) {
      state.lives = lives
    },
  },
  actions: {
  },
  modules: {
  }
})
