var express = require('express');
var _ = require('underscore');

function Router() {
  var middleware = express.Router();
  var controllerPaths = [
    './controllers/tagController.js',
    './controllers/itemController.js'
  ];
  _.each(controllerPaths, function(controllerPath) {
    var controller = require(controllerPath);
    middleware.use(controller);
  });

  this.middleware = middleware;
}

module.exports = Router;
