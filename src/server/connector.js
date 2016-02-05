var express = require('express');
var Sequelize = require('sequelize');
var _ = require('underscore');

function Connector() {
  var that = this;

  function middleware(req, res, next) {
    req.connector = that;
    next();
  }

  that.middleware = middleware;
}

Connector.prototype.init = function() {
  var that = this;
  var sequelize = new Sequelize('database', 'user', 'password', {
    'host': 'db',
    'port': '5432',
    'dialect': 'postgres'
  });
  var modelPaths = [
    './models/item.js',
    './models/tag.js'
  ];
  var models = {};
  that.sequelize = sequelize;

  _.each(modelPaths, function(modelPath) {
    var model = sequelize.import(modelPath);
    models[model.name] = model;
  });

  _.extend(that, models);

  _.each(models, function(model) {
    if ('onload' in model) {
      model.onload(that);
    }
  });

  return sequelize.authenticate()
  .then(function() {
    return sequelize.sync();
  });
};

module.exports = Connector;
