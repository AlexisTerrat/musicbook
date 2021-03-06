'use strict';

angular.module('app')
.service('Item', ['$resource', 'EventHandler', function($resource, EventHandler) {
  var ItemResource = $resource('api/item/:id', { id: '@id' }, {
    list: {
      method: 'GET',
      url: 'api/items',
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

  var ItemService = {
    list: function() {
      return ItemResource.list().$promise
      .then(function(itemResources) {
        var list = {};
        _.each(itemResources, function(itemResource) {
          var item = new Item(itemResource);
          list[item.id] = item;
        });
        EventHandler.emit('item.list', list);
        return list;
      });
    },

    create: function(name) {
      var itemResource = ItemResource.create({ name: name });
      return itemResource.$promise.then(function() {
        var item = new Item(itemResource);
        EventHandler.emit('item.created', item);
        return item;
      });
    }
  }

  function Item(resource) {
    this.id = resource.id;
    this.name = resource.name;
    this.resource = resource;
  };

  Item.prototype.rename = function(name) {
    var that = this;
    this.resource.name = name;
    return this.resource.$rename()
    .then(function() {
      that.name = name;
      EventHandler.emit('item.renamed', that);
      return that;
    })
    .catch(function(err) {
      // cancel renaming of resource.name
      that.resource.name = that.name;
      throw err;
    });
  };

  Item.prototype.delete = function() {
    var that = this;
    return this.resource.$delete()
    .then(function() {
      EventHandler.emit('item.deleted', that);
    });
  };

  return ItemService;
}]);
