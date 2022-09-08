<template>
  <StartMenu v-if="!isStarted"/>
  <h1 v-else>Game</h1>
</template>

<script>
import StartMenu from "@/components/views/StartMenu";
export default {
  name: 'App',
  components: {
    StartMenu
  },
  computed: {
    isStarted()
    {
      return this.$store.state.started;
    }
  }
}
</script>

<style>


* {
  font-family: 'Luckiest Guy', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

button {
  cursor: pointer;
}

body {
  margin: 0;
  padding: 0;
  background: moccasin;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  box-sizing: border-box;
}
</style>
