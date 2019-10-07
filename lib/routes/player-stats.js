const express = require('express');
const router = express.Router();
const error = require('../classes/error');
const playerService = require('../services/player-service');

function wrapAsync (fnc) {
  return function(req, res, next) {
    fnc(req, res, next).catch(next);
  };
}

/**
 * Convert param to integer and check it is an integer
 * @param {*} param
 */
function convertInteger(param) {
  const parsed = parseInt(param, 10);

  if (isNaN(parsed)) {
    throw new error(400, "Player id should be an integer")
  }
  return parsed;
}

/**
 * Get player by id
 */
router.get('/:playerId', wrapAsync (async (req, res, next) => {
  const idPlayer = convertInteger(req.params.playerId);

  return res.status(200).send(await playerService.getPlayerById(idPlayer));
}));

/**
 * Get players sorted by id
 */
router.get('/', wrapAsync (async (req, res, next) => {
  return res.status(200).send(await playerService.getPlayers());
}));

module.exports = router;
