'use strict';

angular.module('nbrnoFrontendApp')
.controller('MainCtrl', function ($scope, Rapper, User) {
	$scope.predicate = ['score', '-name'];
	$scope.rappersAndVotes = Rapper.query();
});

angular.module('nbrnoFrontendApp')
.controller('LoginCtrl', function ($scope, $http, User) {
	$scope.loginVisible;
	$scope.loggedIn;

	$scope.loginUser = "";
	$scope.loginPassword = "";

	$scope.signupUser = "";
	$scope.signupEmail = "";
	$scope.signupPassword = "";

	$scope.error = "";

	$scope.showLogin = function () {
		$scope.loginVisible = true;
	}

	function loggedIn(){
        console.log("logged in");

        $scope.loginVisible = false;
        $scope.loggedIn = true;   
    }

    function notLoggedIn(data, status, header){
        $scope.error = "Feil brukernavn eller passord"
    }

	$scope.login = function () {

		User.login({username: $scope.loginUser, password: $scope.loginPassword}, loggedIn, notLoggedIn);		
	}

});