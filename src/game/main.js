import { Player } from "@/game/players";
import store from "@/store";


export function start()
{
    store.commit('resetPlayersInGame');

    for (let i = 0; i < store.state.players.length; i++) {
        store.commit('pushPlayersInGame', new Player(store.state.lives, store.state.players[i]));
    }

    resetTurns();
    randomLetter();

    console.log(store.state.playersInGame);
    console.log(store.state.turn);
    console.log(store.state.letters);

}



export function checkIfExists (word, callback)
{
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return callback(!data.title);
        })
}


export function resetTurns() {
    store.commit("setNextTurn", false);
    store.commit("setNextTurn", 0);
    store.commit("setNextTurn", 1);
}


export function randomLetter() {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let letter = letters.charAt(Math.floor(Math.random() * letters.length));
    store.commit("resetFirstTurn")
    store.commit("resetLetters");
    store.commit("pushLetter", letter);
}


export function setNextTurn()
{
    let inGame = 0;
    let potentialWinner = 0;

    for (let i = 0; i < store.state.playersInGame.length; i++) {
        if (store.state.playersInGame[i].lives > 0) {
            console.log("player " + i + " is in game");
            ++inGame;
            potentialWinner = i;
        }
        console.log(inGame);
    }

    if (inGame === 1) {
        let winner = store.state.playersInGame[potentialWinner].name;
        store.commit('resetPlayersInGame');
        store.commit('setStarted', false);
        alert(winner + " has won the game!");
        return;
    }

    function getNextTurn(currentNextTurn)
    {
        let nextTurn = currentNextTurn + 1;

        if (nextTurn >= store.state.playersInGame.length) {
            if (store.state.playersInGame[0].lives > 0)
                return 0;
            else
                return getNextTurn(0);
        }

        console.log("next turn is " + nextTurn);
        if (store.state.playersInGame[nextTurn].lives > 0)
            return nextTurn;
        else
            return getNextTurn(nextTurn);
    }

    store.commit("setNextTurn", getNextTurn(store.state.turn[2]));
}