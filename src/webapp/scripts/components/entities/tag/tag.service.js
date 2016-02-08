'use strict';

angular.module('app')
.factory('Tag', ['$resource', function($resource) {
  return $resource('api/tag/:id', { id: '@id' }, {
    list: {
      method: 'GET',
      url: 'api/tags',
      isArray: true
    },

    get: {
      method: 'GET'
    },
    // TODO
    create: {
      method: 'POST'
    },
    // TODO
    update: {
      method: 'PUT'
    },
    // TODO
    delete: {
      method: 'DELETE'
    }
  });
}]);
