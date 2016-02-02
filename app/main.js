var express = require('express');
var bodyParser = require('body-parser');
var Connector = require('./connector.js');
var Router = require('./router.js');

(function run() {
  var server = express();
  var connector = new Connector();
  var router = new Router();

  server.use('/', express.static('./public'));
  server.use('/api', bodyParser.json());
  server.use('/api', connector.middleware);
  server.use('/api', router.middleware);

  return connector.init()
  .then(function() {
    server.listen(8080);
  });
})();
