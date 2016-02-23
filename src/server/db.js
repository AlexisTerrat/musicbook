var _ = require('underscore');
var when = require('when');
var mongoose = require('mongoose');
mongoose.Promise = when.promise;
var User = require('models/user.js');
var Credentials = require('models/credentials.js');
var Session = require('models/session.js');
var Tag = require('models/tag.js');
var Item = require('models/item.js');

module.exports = function(config) {
  var dbUrl = config.db.url;
  return {
    User: User,
    Credentials: Credentials,
    Session: Session,
    Tag: Tag,
    Item: Item,

    connect: function() {
      var that = this;
      mongoose.connect(dbUrl);
      this.connection = mongoose.connection;

      return when.promise(function(resolve, reject) {
        that.connection.once('error', reject);
        that.connection.once('open', resolve);
      })
      .then(function() {
        return db;
      });
    }
  };
};
