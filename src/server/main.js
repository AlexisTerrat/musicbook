var when = require('when');
var loggerFactory = require('service/logger/logger.js');
var dbFactory = require('service/db/db.js');
var authenticatorFactory = require('service/authenticator.js');
var authorizerFactory = require('service/authorizer/authorizer.js');
var apiFactory = require('service/api/api.js');
var webFactory = require('service/web/web.js');

(function run() {
  var startOrders = [ // ordered by start priority
    { name: 'logger', factory: loggerFactory },
    { name: 'db', factory: dbFactory },
    { name: 'authenticator', factory: authenticatorFactory },
    { name: 'authorizer', factory: authorizerFactory },
    { name: 'api', factory: apiFactory },
    { name: 'web', factory: webFactory },
  ];

  var startTasks = _.map(startOrders, function(order) {
    return function(services) {
      return when.lift(order.factory)() // promisify the return of factory
      .then(function(service) {
        services[order.name] = service;
        return services;
      });
    };
  });

  return when.pipeline(startTasks, {})
  .then(function(services) {
    services.logger.info('server successfully started');
  });
})();
