var winston = require('winston');
var Logger = winston.Logger;
var Console = winston.transports.Console;

module.exports = function(config) {
  var logLevel = config.logger.level;
  var logger new Logger({
    exitOnError: false,
    transports: [
      new Console({
        level: logLevel,
        timestamp: true,
        colorize: true,
        prettyPrint: true
      })
    ]
  });
  return logger;
};
