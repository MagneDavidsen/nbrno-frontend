'use strict';

angular.module('nbrnoFrontendApp', ['commonServices', 'rapperServices', 'userServices', 'eventBus', 'ngRoute', 'ngCookies'])
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
        $httpProvider.defaults.withCredentials = true;

        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
