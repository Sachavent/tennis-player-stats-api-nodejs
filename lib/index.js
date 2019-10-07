const express = require('express');
const server = express();
const logger = require('./utils/logger.js');
const error = require('./classes/error');
const port = 8001;

const onError = function(err, req, res, next) {
  if (err instanceof error) {
    logger.error(err);
    return res.status(err.statusCode).send({message: err.message})
  }

  // Unexpected error
  logger.error('Error', err);
  return res.status(500).send({message: "Internal server error"});
}

// Log before each API call
server.use(function (req, res, next) {
  logger.info(`route called : ${req.path}`);
  next();
});

// Register routes
server.use('/players', require('./routes/player-stats'));

// Log on every error
server.use(onError);

server.listen(port, function() {
  logger.info(`Server started on port ${port}`)
});
