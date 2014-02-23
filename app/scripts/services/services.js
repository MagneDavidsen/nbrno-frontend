'use strict';

var commonServices = angular.module('commonServices', ['rapperServices', 'eventBus'])
var rapperServices = angular.module('rapperServices', ['ngResource']);
var userServices = angular.module('userServices', ['ngResource']);
var eventBus = angular.module('eventBus', []);

var endpoint = window.location.hostname.indexOf("localhost") != -1 ? 'http://localhost:8081/api/' : 'http://nbrno-backend.herokuapp.com/api/';

commonServices.factory('Common', function (Rapper, EventBus) {

  //TODO this really should be done serverside
  function updateRappersWithVotes(){
    var rappersAndVotes = Rapper.query();

    rappersAndVotes.$promise.then(function (result) {
      var rappers = result.rappers;
      var votes = result.votes;

      for(var i = 0; i<rappers.length;i++){
        for(var o = 0; o<votes.length;o++){
          if(rappers[i].id === votes[o].rapperId) rappers[i].rating = votes[o].rating;
        }
      }
      EventBus.rappersAndVotes.rappers = rappers;
    });
  } 

  var sendUnauthorizedVote = function(votedSuccess, votedError){
    if(EventBus.unauthorizedVote != undefined){
      console.log("unauthorizedVote getting sent");
      sendVote(EventBus.unauthorizedVote.rapperId, EventBus.unauthorizedVote.voteUp)
      EventBus.unauthorizedVote = undefined;
    }
  }

  var sendVote = function(rapperId, voteUp){
    var votedSuccess = function(){
      for(var i = 0; i < EventBus.rappersAndVotes.rappers.length; i++){
        if(EventBus.rappersAndVotes.rappers[i].id == rapperId) EventBus.rappersAndVotes.rappers[i].rating = voteUp ? 1 : -1;
      }
      console.log("voted")
    }

    var votedError = function(){
      console.log("Could not vote")
      EventBus.unauthorizedVote = {rapperId: rapperId, voteUp:voteUp}
      EventBus.loginVisible = true;
    }

    console.log("Trying to vote for rapperId: " + rapperId);
    Rapper.vote({rapperId: rapperId, voteUp: voteUp}, votedSuccess, votedError);
  } 
  
  return {
    sendUnauthorizedVote: sendUnauthorizedVote,
    sendVote: sendVote,
    updateRappersWithVotes: updateRappersWithVotes
  }
});

rapperServices.factory('Rapper', ['$resource',function ($resource){
  return $resource(endpoint + 'rappers/:rapperId/:destination', {rapperId: "@rapperId" }, {
    query: {method:'GET', params: {rapperId: "", destination: ""}},
    vote: {method:'POST', params: {destination: "vote"}}

  });
}]);

userServices.factory('User', ['$resource', function ($resource){
  return $resource(endpoint + 'user/:destination', {}, {
    login: {method:'POST', params: {destination:"login"}},
    loginCookie: {method:'POST', params: {destination:"cookie"}},
    signup: {method:'POST', params: {destination:"signup"}},
    logout: {method:'POST', params: {destination:"logout"}}
  });
}]);

eventBus.factory('EventBus', function () { 
  return {
    rappersAndVotes: [], 
    unauthorizedVote: undefined, 
    loginVisible: false
  }
});
