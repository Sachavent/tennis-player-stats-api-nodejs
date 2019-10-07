const bunyan = require('bunyan');

// Instantiate logger
const logger = bunyan.createLogger({
  name: 'tennis-stats-api'
});

module.exports = logger;
