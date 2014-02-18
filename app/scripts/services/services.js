'use strict';

var rapperServices = angular.module('rapperServices', ['ngResource']);
var userServices = angular.module('userServices', ['ngResource']);

var endpoint = 'http://localhost:8081/api/';

rapperServices.factory('Rapper', ['$resource',
  function($resource){
    return $resource(endpoint + 'rappers/', {}, {
      query: {method:'GET'}
    });
  }]);

userServices.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

userServices.factory('User', ['$resource',
  function($resource){
    return $resource(endpoint + 'user/login', {}, {
      login: {method:'POST'},
    });
  }]);
