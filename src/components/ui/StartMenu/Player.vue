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

</style>