<template>
  <div class="player">
    <div class="player__name">{{player}}</div>
    <button class="player__remove" @click="removePlayer">X</button>
  </div>
</template>

<script>
export default {
  name: "Player",
  props: {
    player: String,
  },
  methods: {
    removePlayer()
    {
      this.$store.commit("removePlayer", this.player);
    }
  }
}
</script>

<style scoped>
.player {
  width: 100% ;
  display: flex;
  justify-content: space-between;
  background: lightgreen;
  padding: 12px;
  border-radius: 12px;
  box-sizing: border-box;
}

.player__name {
  color: darkgreen;
  font-size: 20px;
}

.player__remove {
  border-radius: 50%;
  background: lightcoral;
  border: none;
  color: darkred;
}
</style>