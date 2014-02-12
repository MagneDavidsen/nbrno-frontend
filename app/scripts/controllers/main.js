'use strict';

angular.module('nbrnoFrontendApp')
.controller('MainCtrl', function ($scope, Rapper) {
  $scope.predicate = ['score', '-name'];
  $scope.rappersAndVotes = Rapper.query();
});
