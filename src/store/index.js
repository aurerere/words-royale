import { createStore } from 'vuex'

export default createStore({
  state: {
    players: [],
    lives: 1,
    started: false,
  },
  getters: {
  },
  mutations: {
    addPlayer(state, player) {
      state.players.push(player)
    },
    removePlayer(state, player) {
      state.players.splice(state.players.indexOf(player), 1
      )
    },
    setLives(state, lives) {
      state.lives = lives
    },

    setStarted(state, is) {
      state.started = is
    }
  },
  actions: {
  },
  modules: {
  }
})
