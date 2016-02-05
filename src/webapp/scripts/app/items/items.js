'use strict';

angular.module('app')
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('items', {
    url: '/items',
    parent: 'site',
    views: {
      'content@site': {
        templateUrl: 'scripts/app/items/items.html'
      }
    }
  });
}]);
