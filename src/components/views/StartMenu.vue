<template>
  <Player v-for="registeredPlayer in players" :player="registeredPlayer"/>
  <form @submit.prevent="addToPlayerList">
    <input v-model="player">
  </form>
  <input v-model="lives">
  <button @click="startGame">Done</button>
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
      if (this.$store.state.players.includes(this.player) || !validName(this.player.trim()))
        return;

      console.log("store", this.$store.state.players);
      this.$store.commit("addPlayer", this.player);
      this.player = "";
    },

    removePlayer()
    {
      console.log("remove" );

    },


    startGame()
    {
      if (Number(this.lives))
        this.$store.commit("setLives", Number(this.lives));

      start();
    }
  }
}
</script>

<style scoped>

</style>