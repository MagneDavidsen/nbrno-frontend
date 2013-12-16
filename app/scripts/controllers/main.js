'use strict';

angular.module('nbrnoFrontendApp')
  .controller('MainCtrl', function ($scope) {
  	$scope.predicate = ["score", "-name"];
    $scope.rappers = [{"id":2,"name":"Chirag","score":-5,"createdAt":"2013-10-13T11:37:00Z"},{"id":1,"name":"RSP","score":0,"createdAt":"2013-10-13T11:37:00Z"},{"id":3,"name":"Lars Vaular","score":2,"createdAt":"2013-10-13T11:37:00Z"}]
  });
