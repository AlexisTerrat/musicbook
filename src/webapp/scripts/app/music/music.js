'use strict';

angular.module('app')
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('music', {
    url: '/music',
    parent: 'site',
    views: {
      'content@site': {
        templateUrl: 'scripts/app/music/music.html'
      },

      'filter@music': {
        templateUrl: 'scripts/app/music/filter/filter.html'
      },
      'list@music': {
        templateUrl: 'scripts/app/music/list/list.html'
      }
    }
  });
}]);
