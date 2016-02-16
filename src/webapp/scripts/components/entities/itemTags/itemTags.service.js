'use strict';

angular.module('app')
.service('ItemTag', ['$resource', 'EventHandler', function($resource, EventHandler) {
  var ItemTagResource = $resource('api/item/:itemId/tag/:tagId', { itemId: '@itemId', tagId: '@tagId' }, {
    list: {
      method: 'GET',
      url: 'api/item/:itemId/tags',
      isArray: true
    },
    add: {
      method: 'POST'
    },
    delete: {
      method: 'DELETE'
    }
  });

  var ItemTagService = { // TODO
    list: function() {
      return ItemTagResource.list().$promise
      .then(function(itemTagResources) {
        var list = {};
        _.each(itemTagResources, function(itemTagResource) {
          var itemTag = new ItemTag(itemTagResource);
          list[item.id] = itemTag;
        });
        EventHandler.emit('item.tag.list', list);
        return list;
      });
    },

    create: function(name) {
      var itemResource = ItemResource.create({ name: name });
      return itemResource.$promise.then(function() {
        var item = new Item(itemResource);
        EventHandler.emit('item.tag.created', item);
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
