import { clientCredentials } from '../client';

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createGame = (game) => new Promise((resolve, reject) => {
  fetch("", {})
    .then()
    .catch();
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch("", {})
    .then()
    .catch();
});

// eslint-disable-next-line import/prefer-default-export
export { getGames, createGame, getGameTypes };
