var _ = require('underscore');
var when = require('when');
var mongoose = require('mongoose');
mongoose.Promise = when.promise;
var User = require('model/user.js');
var Credentials = require('model/credentials.js');
var Session = require('model/session.js');
var Tag = require('model/tag.js');
var Item = require('model/item.js');
var config = require('../../config.json');

module.exports = function(services) {
  mongoose.connect(config.db.url);
  var db = {
    connection: mongoose.connection,
    User: User,
    Credentials: Credentials,
    Session: Session,
    Tag: Tag,
    Item: Item
  };

  return when.promise(function(resolve, reject) {
    db.connection.once('error', reject);
    db.connection.once('open', resolve);
  })
  .then(function() {
    db.connection.on('error', function(err) {
      services.logger.error('DB', err);
    });
    db.logger.debug('DB', 'service started');
    return db;
  });
};
