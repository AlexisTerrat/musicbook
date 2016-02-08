'use strict';

angular.module('app')
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('tags', {
    url: '/tags',
    parent: 'site',
    views: {
      'content@site': {
        templateUrl: 'scripts/app/tags/tags.html',
        controller: 'TagsController'
      }
    }
  });
}]);
