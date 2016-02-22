'use strict';

angular.module('app', ['ui.router', 'ui.bootstrap', 'ngResource']);

angular.module('app')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('site', {
    abstract: true,
    views: {
      'navbar@': {
        templateUrl: 'scripts/app/navbar/navbar.html'
      },
      'body@': {
        templateUrl: 'scripts/app/body/body.html'
      }
    }
  });

  $urlRouterProvider.otherwise('/');
  $urlRouterProvider.when('/', '/home');
}]);
