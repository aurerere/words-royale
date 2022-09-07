import { Player } from "@/game/players";
import store from "@/store";

let playersInGame = [];

export function start()
{

    for (let i = 0; i < store.state.players.length; i++) {
        playersInGame.push(new Player(store.state.lives, store.state.players[i]));
    }

    console.log(playersInGame);

    console.log(playersInGame[0] === playersInGame[7]);
}



export async function checkIfExists (tester, tested, word)
{
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
        .then(response => response.json())
        .then(data => {
            if (data.title === "No Definitions Found") {
                tester.loseLife();
                return false;
            }
            else {
                tested.loseLife();
                return true;
            }
        })
}