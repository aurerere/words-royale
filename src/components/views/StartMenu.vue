<template>
  <h1>WORDS <i>ROYALE</i></h1>
  <h2>Players <i>({{playersRegistered}})</i></h2>
  <div class="players">
    <Player v-for="registeredPlayer in players" :player="registeredPlayer"/>
  </div>
  <form class="add-a-player" @submit.prevent="addToPlayerList">
    <input placeholder="ENTER A NAME" v-model="player">
    <button class="add-a-player-button" type="submit">✓</button>
  </form>
  <div class="lives-wrapper">
    <button class="add-a-player-button" @click="minusLife">-</button>
    <div class="lives">{{lives}}❤️</div>
    <button class="add-a-player-button" @click="plusLife">+</button>
  </div>
  <button class="start-btn" @click="startGame">Start!</button>
</template>

<script>
import {validName} from "@/utils/regex";
import Player from "@/components/ui/StartMenu/Player";
import {start} from "@/game/main";

export default {
  name: "StartMenu",
  components: {Player},
  computed: {
    players() {
      return this.$store.state.players;
    },
    playersRegistered() {
      return this.$store.state.players.length;
    }
  },
  data() {
    return {
      player: "",
      lives: 1
    }
  },
  methods: {
    addToPlayerList()
    {
      if (this.$store.state.players.includes(this.player.trim().toUpperCase()) || !validName(this.player.trim()))
        return;

      if (this.$store.state.players.length >= 7)
        return;

      this.$store.commit("pushPlayer", this.player.trim().toUpperCase());
      this.player = "";
    },

    removePlayer()
    {
      console.log("remove" );
    },

    plusLife()
    {
      if (this.lives < 4)
        ++this.lives;
    },

    minusLife()
    {
      if (this.lives > 1)
          --this.lives;
    },

    startGame()
    {
      if (Number(this.lives))
        this.$store.commit("setLives", Number(this.lives));

      if (this.$store.state.players.length >= 3 && this.$store.state.players.length <= 7) {
        start();
        this.$store.commit('setStarted', true)
      }
    },
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  position: absolute;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: darkgreen;
}

button {
  font-size: 20px;
}

h2 {
  width: 300px;
}

input {
  text-align: center;
  font-size: 20px;
}

.players {
  height: 30vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: wheat;
  padding: 12px;
  border-radius: 12px;
  width: 300px;
  box-sizing: border-box;
}

.add-a-player {
  margin-top: 12px;
  display: flex;
  width: 300px;
  justify-content: space-between;
  box-sizing: border-box;
  gap: 4px;
}

.add-a-player input {
  width: 100%;
  padding: 12px;
  background: lightgreen;
  color: darkgreen;
  border-radius: 12px;
  outline: none;
  border: 2px solid darkgreen;
}

.add-a-player input::placeholder {
  color: darkgreen;
  opacity: 0.5;
}

.add-a-player-button {
  background: darkgreen;
  padding: 12px;
  color: white;
  border: none;
  border-radius: 12px;
}

.start-btn {
  width: 300px;
  padding: 12px;
  border: none;
  background: darkgreen;
  color: white;
  border-radius: 12px;
  margin-top: 12px ;
}

.lives-wrapper {
  margin-top: 12px;
  display: flex;
  width: 300px;
  gap: 4px;
}

.lives {
  background: lightgreen;
  color: darkgreen;
  width: 100%;
  border-radius: 12px;
  border: 2px solid darkgreen;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>