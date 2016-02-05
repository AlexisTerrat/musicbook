'use strict';

angular.module('app', ['ui.router', 'ui.bootstrap', 'ngResource']);

angular.module('app')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('site', {
    abstract: true,
    views: {
      'navbar@': {
        templateUrl: 'scripts/components/navbar/navbar.html'
      },
      'body@': {
        templateUrl: 'scripts/components/body/body.html'
      },
      'footer@': {
        templateUrl: 'scripts/components/footer/footer.html'
      }
    }
  });

  $urlRouterProvider.otherwise('/');
  $urlRouterProvider.when('/', '/home');
}]);
