var winston = require('winston');
var Logger = winston.Logger;
var Console = winston.transports.Console;
var config = require('../../config.json');

module.exports = function() {
  return new Logger({
    exitOnError: false,
    transports: [
      new Console({
        level: config.logger.level,
        timestamp: true,
        colorize: true,
        prettyPrint: true
      })
    ]
  });
};
