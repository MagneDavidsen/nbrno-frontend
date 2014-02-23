'use strict';

angular.module('nbrnoFrontendApp')
.controller('MainCtrl', function ($scope, Rapper, User, EventBus, Common) {
	$scope.predicate = ['score', '-name'];
	EventBus.rappersAndVotes = Rapper.query();
	$scope.eventBus = EventBus
	$scope.vote = Common.sendVote;

});

angular.module('nbrnoFrontendApp')
.controller('LoginCtrl', function ($scope, $http, User, EventBus, Common) {
	$scope.eventBus = EventBus
	$scope.loggedIn;

	$scope.loginUser = "";
	$scope.loginPassword = "";

	$scope.signupUser = "";
	$scope.signupEmail = "";
	$scope.signupPassword = "";

	$scope.error = "";

	$scope.showLogin = function () {
		EventBus.loginVisible = true;
	}

	function loggedIn(){
        console.log("logged in");

        EventBus.loginVisible = false;
        $scope.loggedIn = true;   

        Common.sendUnauthorizedVote(notSignedup, notSignedup)
        Common.updateRappersWithVotes()
    }

    function notLoggedIn(data, status, header){
        $scope.error = "Feil brukernavn eller passord"
    }

    function notSignedup(data, status, header){
        $scope.error = "Brukernavnet er ikke ledig"
    }

    function loginAfterSignup(){
        $scope.loginUser = $scope.signupUser;
        $scope.loginPassword = $scope.signupPassword;
        $scope.login();
    }

    function loggedOut(data, status, header){
        console.log("logged out")

        $scope.loginUser = ""
        $scope.loginPassword = ""

        $scope.signupUser = ""
        $scope.signupEmail = ""
        $scope.signupPassword = ""

        $scope.loggedIn = false;
    }

    function notLoggedOut(data, status, header){
        console.log("could not log out")
    }

	$scope.login = function () {User.login({username: $scope.loginUser, password: $scope.loginPassword}, loggedIn, notLoggedIn);}
	$scope.signup = function () {User.signup({username: $scope.signupUser, email: $scope.signupEmail, password: $scope.signupPassword}, loginAfterSignup, notSignedup);}
	$scope.logout = function () {User.logout({username: $scope.loginUser}, loggedOut, notLoggedOut);}

});