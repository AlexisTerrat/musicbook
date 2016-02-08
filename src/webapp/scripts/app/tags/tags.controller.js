'use strict';

angular.module('app')
.controller('TagsController', ['$scope', '$q', 'Tag', function($scope, $q, Tag) {
  $scope.tags = [];

  $scope.load = function() {
    return Tag.list().$promise
    .then(function(tags) {
      $scope.tags = tags;
    });
  };

  $scope.add = function() {
    if ($scope.tagNameToAdd) {
      return Tag.create({ name: $scope.tagNameToAdd }).$promise
      .then(function() {
        return $scope.load();
        $scope.tagNameToAdd = undefined;
      });
    }
  };

  $scope.delete = function(tag) {
    return tag.$delete()
    .then(function() {
      return $scope.load();
    });
  };

  $scope.rename = function(tag) {
    tag.name = tag.newName;
    tag.newName = undefined;
    return tag.$update()
    .then(function() {
      return $scope.load();
    });
  };

  $scope.load();
}]);
