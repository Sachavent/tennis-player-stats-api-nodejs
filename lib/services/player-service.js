const request = require("request-promise");
const config = require("config")
const error = require('../classes/error');

/**
 * Retrieve list of player
 */
async function queryPlayers() {
   const result = await request.get(`${config.get("playerStatServices.host")}/headtohead.json`);

   if (result === null) {
     throw new error(500, 'Error when query stat player service')
   }

   const players = JSON.parse(result).players;

   if (!Array.isArray(players)) {
     throw new error (500, 'Error when retrieve player stats')
   }

  return players;
}

/**
 * Find player matching id inside list of player
 * @param {*} players
 * @param {*} playerId
 */
function findPlayerById(players, playerId) {
  const player = players.find((tennisPlayer) => tennisPlayer.id === playerId);

  // Unknown player
  if (player === undefined) {
    throw new error(404, 'Player not found')
  }

  return player;
}

/**
 * Return player matching id
 */
module.exports.getPlayerById = async function getPlayerById(playerId) {
  const players = await queryPlayers();

  return findPlayerById(players, playerId);

}

/**
 * Return list of player sort by id
 */
module.exports.getPlayers = async function getPlayers() {
    const players = await queryPlayers();

    // Return players sorted by id
    return players.sort((player1, player2) => {
      return player1.id - player2.id;
    });
}
