<template>
  <div class="letters-wrapper">
    <div v-for="letter in letters" class="letter">{{letter}}</div>
  </div>
</template>

<script>
export default {
  name: "Letters",
  computed: {
    letters() {
      return this.$store.state.letters;
    }
  }
}
</script>

<style scoped>
.letters-wrapper {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 12px;
  justify-content: center;
}
.letter {
  padding: 12px;
  border-radius: 12px;
  background: white;
}
</style>