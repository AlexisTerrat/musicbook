'use strict';

angular.module('app')
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('home', {
    url: '/home',
    parent: 'site',
    views: {
      'content@site': {
        templateUrl: 'scripts/app/home/home.html'
      }
    }
  });
}]);
