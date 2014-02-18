'use strict';

angular.module('nbrnoFrontendApp', ['rapperServices', 'userServices', 'ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })      
      .otherwise({
        redirectTo: '/'
      });
  }]).
  directive("loginHeader", function () {
    return {
      restrict: 'E',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      replace: true
    };}).
  config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
