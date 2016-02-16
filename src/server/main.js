var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Connector = require('./connector.js');
var Router = require('./router.js');
var _ = require('underscore');

(function run() {
  var server = express();
  var connector = new Connector();
  var router = new Router();

  morgan.token('body', function(req, res) {
    var body = req.body;
    if (_.isUndefined(body)) {
      return "";
    }
    if (_.isString(body)) {
      return body;
    }
    return JSON.stringify(body);
  });
  morgan.token('body', function(req, res) {
    var body = req.body;
    if (_.isUndefined(body)) {
      return "";
    }
    if (_.isString(body)) {
      return body;
    }
    return JSON.stringify(body);
  });
  morgan.format('customDev', ':date[iso] :method :status :url :body');

  server.use('/', express.static('src/webapp'));
  server.use('/api', bodyParser.json());
  server.use('/api', morgan('customDev'));
  server.use('/api', connector.middleware);
  server.use('/api', router.middleware);

  return connector.init()
  .then(function() {
    server.listen(8080);
  });
})();
