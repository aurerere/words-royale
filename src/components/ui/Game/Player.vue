<template>
  <div :class="playingNow ? 'player playing-now' : dead ? 'player dead' : 'player'">
    <div class="player__name">{{name}}</div>
    <div class="player__name">{{dead ? '💀' : lives + '❤️'}}</div>
  </div>
</template>

<script>
export default {
  name: "Player",
  props: {
    name: String,
    lives: Number,
    playingNow: Boolean,
    dead: Boolean
  },
}
</script>

<style scoped>
.player {
  display: flex;
  justify-content: space-between;
  width: 200px;
  background: lightyellow;
  margin-top: 12px;
  padding: 12px;
  border-radius: 12px;
  font-size: 20px;
}

.playing-now {
  background: lightgreen;
}

.dead {
  background: gray;
}
</style>