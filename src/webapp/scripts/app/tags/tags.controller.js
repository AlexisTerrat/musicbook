'use strict';

angular.module('app')
.controller('TagsController', ['$scope', 'Tag', 'EventHandler', function($scope, Tag, EventHandler) {

  $scope.Tag = Tag;
  $scope.tags = {};

  var createdTagSub = EventHandler.on('tag.created', function(tag) {
    console.log('tag created', tag);
    $scope.tags[tag.id] = tag;
  });

  var renamedTagSub = EventHandler.on('tag.renamed', function(tag) {
    console.log('tag renamed', tag);
    $scope.tags[tag.id] = tag;
  });

  var deletedTagSub = EventHandler.on('tag.deleted', function(tag) {
    console.log('tag deleted', tag);
    $scope.tags = _.omit($scope.tags, tag.id);
  });

  var subs = [createdTagSub, renamedTagSub, deletedTagSub];
  $scope.$on('destroy', function() {
    _.each(subs, function(sub) {
      sub.unsub();
    });
  });

  Tag.list()
  .then(function(tags) {
    $scope.tags = tags;
  });
}]);
