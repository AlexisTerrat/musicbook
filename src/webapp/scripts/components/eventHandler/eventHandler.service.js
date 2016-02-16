'use strict';

angular.module('app').service('EventHandler', [function() {
  var nextSubId = 1;
  var subs = {};

  function Sub(channel, callback) {
    this.id = nextSubId;
    ++nextSubId;

    this.channel = channel;
    this.callback = callback;
  }

  Sub.prototype.unsub = function() {
    var channelSubs = _.omit(subs[this.channel], this.id);
    if (_.isEmpty(channelSubs)) {
      subs = _.omit(subs, this.channel);
    } else {
      subs[this.channel] = channelSubs;
    }
  };

  this.on = function(channel, callback) {
    if (_.isUndefined(subs[channel])) {
      subs[channel] = {};
    }

    var sub = new Sub(channel, callback);
    subs[channel][sub.id] = sub;
    return sub;
  };

  this.emit = function(channel) {
    var channelSubs = subs[channel];
    var args = Array.prototype.slice.call(arguments, 1);
    if (_.isUndefined[channelSubs]) {
      return;
    }
    _.each(channelSubs, function(sub) {
      sub.callback.apply(null, args);
    });
  };
}]);
