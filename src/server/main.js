// lib dependencies
var fs = require('fs');
var https = require('https');
var when = require('when');
var _ = require('underscore');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var churchill = require('churchill');

var config = require('../../config.json');

// services
var Logger = require('logger.js');
var Db = require('db.js');

// middlewares
var authenticator = require('middlewares/authenticator.js');
// authorizer checks for expired session & wrong user:id in req
var authorizer = require('middlewares/authorizer.js');

// controllers
var login = require('controllers/login.js');
var item = require('controllers/item.js');
var tag = require('controllers/tag.js');

(function main() {
  var app = express();
  initServices(app)
  .then(initApp)
  .then(listen);
})();

function initServices(app) {
  var logger = Logger(config);
  var db = Db(config);
  app.set('config', config);
  app.set('logger', logger);
  app.set('db', db);

  return db.connect()
  .then(function() {
    db.connection.on('error', function(err) {
      logger.error('DB service error:', err);
    });
    return app;
  });
}

function initApp(app) {
  app.use(helmet);
  app.use(churchill.add(app.get('logger')));

  // TODO clean route & middleware structure

  // static
  app.use('/', express.static('src/webapp'));

  // api
  var api = express.Router();
  api.use(bodyParser.json());
  api.use(cookieParser());
  api.use(authenticator(app)); // populates req.session & req.user, handles cookies

  // api public routes
  api.use(login(app));

  // api private routes
  var restrictedApi = express.Router();
  restrictedApi.use('/item', item(app));
  restrictedApi.use('/tag', tag(app));
  api.use('/user/:userId', authorizer(app), restrictedApi);

  app.use('/api', api);
  return app;
}

function listen(app) {
  var logger = app.get('logger');
  var keyFile = fs.readFileSync(config.ssl.key);
  var certFile = fs.readFileSync(config.ssl.cert);
  var server = https.createServer({
    key: keyFile,
    cert: certFile
  }, app);

  server.listen(config.port, function(err) {
    if (err) {
      logger.error('HTTP server error:', err);
      return;
    }
    logger.info('server started, listening on port:', config.port);
  });
}
