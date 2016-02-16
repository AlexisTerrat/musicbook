'use strict';

angular.module('app')
.service('Tag', ['$resource', 'EventHandler', function($resource, EventHandler) {
  var TagResource = $resource('api/tag/:id', { id: '@id' }, {
    list: {
      method: 'GET',
      url: 'api/tags',
      isArray: true
    },
    get: {
      method: 'GET'
    },
    create: {
      method: 'POST'
    },
    rename: {
      method: 'PUT'
    },
    delete: {
      method: 'DELETE'
    }
  });

  var TagService = {
    list: function() {
      return TagResource.list().$promise
      .then(function(tagResources) {
        var list = {};
        _.each(tagResources, function(tagResource) {
          var tag = new Tag(tagResource);
          list[tag.id] = tag;
        });
        EventHandler.emit('tag.list', list);
        return list;
      });
    },

    create: function(name) {
      var tagResource = TagResource.create({ name: name });
      return tagResource.$promise.then(function() {
        var tag = new Tag(tagResource);
        EventHandler.emit('tag.created', tag);
        return tag;
      });
    }
  }

  function Tag(resource) {
    this.id = resource.id;
    this.name = resource.name;
    this.resource = resource;
  };

  Tag.prototype.rename = function(name) {
    var that = this;
    this.resource.name = name;
    return this.resource.$rename()
    .then(function() {
      that.name = name;
      EventHandler.emit('tag.renamed', that);
      return that;
    })
    .catch(function(err) {
      // cancel renaming of resource.name
      that.resource.name = that.name;
      throw err;
    });
  };

  Tag.prototype.delete = function() {
    var that = this;
    return this.resource.$delete()
    .then(function() {
      EventHandler.emit('tag.deleted', that);
    });
  };

  return TagService;
}]);
