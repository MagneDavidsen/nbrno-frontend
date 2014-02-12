'use strict';

var rapperServices = angular.module('rapperServices', ['ngResource']);

var endpoint = 'http://localhost:8081/api/';

rapperServices.factory('Rapper', ['$resource',
  function($resource){
    return $resource(endpoint + 'rappers/', {}, {
      query: {method:'GET'}
    });
  }]);