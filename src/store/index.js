import { createStore } from 'vuex'

export default createStore({
  state: {
    players: [],
    lives: 1,
    started: false,
    playersInGame: [],
    turn: [],
    letters: [],
  },
  getters: {
  },
  mutations: {
    pushPlayer(state, player) {
      state.players.push(player);
    },
    removePlayer(state, player) {
      state.players.splice(state.players.indexOf(player), 1);
    },
    setLives(state, lives) {
      state.lives = lives;
    },
    pushPlayersInGame(state, player) {
      state.playersInGame.push(player);
    },
    resetPlayersInGame(state) {
      state.playersInGame = [];
    },
    setStarted(state, is) {
      state.started = is;
    },
    resetFirstTurn(state) {
      state.turn[0] = false;
    },
    setNextTurn(state, player) {
      if (state.turn.length === 3) {
        state.turn.shift();
      }
      state.turn.push(player);
    },
    resetLetters(state) {
      state.letters = [];
    },
    pushLetter(state, letter) {
      state.letters.push(letter);
    },
    playerLoseLife(state, player) {
      console.log(state.playersInGame[player])
      state.playersInGame[player].loseLife();
    },
  },
  actions: {
  },
  modules: {
  }
})
