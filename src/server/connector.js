var _ = require('underscore');
var express = require('express');
var when = require('when');
var mongoose = require('mongoose');
mongoose.Promise = when.promise;

function Connector() {
  var that = this;

  that.Item = mongoose.model('Item', require('./schemas/item.js'));
  that.Tag = mongoose.model('Tag', require('./schemas/tag.js'));

  function middleware(req, res, next) {
    req.connector = that;
    next();
  }

  that.middleware = middleware;
}

Connector.prototype.init = function() {
  var that = this;

  mongoose.connect('mongodb://db/musicbook');
  that.db = mongoose.connection;
  that.db.on('error', console.log.bind(console));

  return when.promise(function(resolve, reject) {
    that.db.once('error', reject);
    that.db.once('open', resolve);
  });
};

module.exports = Connector;
