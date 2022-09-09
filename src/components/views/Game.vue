<template>
  <h1>WORDS <i>ROYALE</i></h1>
  <div class="wrapper">
    <div class="players">
      <Player v-for="(player, index) in playersInGame"
              :name="player.name"
              :lives="player.lives"
              :dead="player.lives === 0"
              :playing-now="currentPlayer === index"
      />
    </div>
    <div class="letters-input">
      <Letters/>
      <div class="continue" v-if="!lies">
        <form @submit.prevent="submitLetter">
          <input placeholder="ENTER A LETTER" v-model="letter" v-bind="letterTemplate">
          <button class="submit-btn" type="submit">✓</button>
        </form>
        <button class="lie" v-if="previousPlayer !== false" @click="iLost">I think we are done</button>
        <button class="lie" v-if="previousPlayer !== false" @click="lieAccusation">I think {{ previousPlayerName }} is bluffing</button>
      </div>
      <div class="continue" v-else>
        <h3>Is {{ previousPlayerName }} lying? - Tell us {{ previousPlayerName }}</h3>
        <form @submit.prevent="submitWordEnd" v-if="!loading">
          <input placeholder="FINISH THE WORD" v-model="wordEnd">
          <button class="submit-btn" type="submit">✓</button>
        </form>
        <div class="lds-ellipsis" v-else><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  </div>
</template>

<script>
import Player from "@/components/ui/Game/Player";
import Letters from "@/components/ui/StartMenu/Letters";
import {validLetter} from "@/utils/regex";
import {checkIfExists, randomLetter, setNextTurn} from "@/game/main";
export default {
  name: "Game",
  components: {Letters, Player},
  data() {
    return {
      letter: "",
      letterTemplate: {
        type: "text",
        maxlength: 1,
        minlength: 1,
        required: true,
        pattern: "[a-zA-Z]",
        autocomplete: "off",
      },
      lies: false,
      wordEnd: "",
      loading: false,
    }
  },
  computed: {
    playersInGame() {
      return this.$store.state.playersInGame;
    },
    previousPlayer() {
      return this.$store.state.turn[0];
    },
    currentPlayer() {
      return this.$store.state.turn[1];
    },
    nextPlayer() {
      return this.$store.state.turn[2];
    },
    previousPlayerName() {
      return this.$store.state.playersInGame[this.previousPlayer].name;
    }
  },
  methods: {
    submitLetter() {
      console.log(this.letter);
      if (!validLetter(this.letter) && this.letter.length !== 1) {
        this.letter= "";
        return;
      }
      this.$store.commit("pushLetter", this.letter.toUpperCase());
      setNextTurn();
      console.log(this.$store.state.turn);
      this.letter= "";
    },
    lieAccusation() {
      alert("lie accusation!\n" + this.previousPlayerName + " needs to tell us what he thought");
      this.lies = true;
    },
    iLost() {
      this.$store.commit("playerLoseLife", this.currentPlayer);
      if (this.$store.state.playersInGame[this.currentPlayer].lives === 0) {
        setNextTurn();
      }
      randomLetter();
    },
    submitWordEnd() {
      this.loading = true;
      let word = this.$store.state.letters.join('') + this.wordEnd;
      checkIfExists(word, (exists) => {
        if (exists) {
          this.$store.commit("playerLoseLife", this.currentPlayer);
          if (this.$store.state.playersInGame[this.currentPlayer].lives === 0) {
            setNextTurn();
          }
        }
        else {
          this.$store.commit("playerLoseLife", this.previousPlayer);
          if (this.$store.state.playersInGame[this.previousPlayer].lives === 0) {
            setNextTurn();
          }
        }
        randomLetter();
        this.lies = false;
        this.loading = false;
        this.wordEnd = "";
      })
    }
  }
}
</script>

<style scoped>
.letters-input {
  width: 300px;
}

.wrapper {
  display: flex;
  align-items: center;
  gap: 24px;
}
input {
  width: 100%;
  padding: 12px;
  background: lightgreen;
  color: darkgreen;
  border-radius: 12px 0 0 12px;
  outline: none;
  border: 2px solid darkgreen;
  text-align: center;
  font-size: 20px;
}
input::placeholder {
  color: darkgreen;
  opacity: 0.5;
}

.submit-btn {
  background: darkgreen;
  padding: 12px;
  color: white;
  border: none;
  border-radius: 0 12px 12px 0;
  font-size: 20px;
}

form {
  display: flex;
}

.lie {
  width: 100%;
  padding: 12px;
  border: none;
  background: darkred;
  color: white;
  border-radius: 12px;
  margin-top: 12px ;
  font-size: 20px;
}

dialog {

}
</style>