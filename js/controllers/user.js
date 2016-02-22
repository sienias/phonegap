// primarily onclick than do an onclick on facebook login.
angular.module('todoApp.userControllers',[])

  .controller('UserLoginCtrl', function($scope, $rootScope, $http, $location, Todos) {
    
    
    $scope.login = function() {

      
      // place where the user just click and login
      var fbLoginSuccess = function(userData) {
      	alert("UserInfo: " + JSON.stringify(userData));
		$location.path('/');
	    if(!$scope.$$phase) $scope.$apply();

      }


      
      // this is used for PhoneGaP ver
      facebookConnectPlugin.login(["basic_info"], 
	      fbLoginSuccess,
	      function (error) { alert("" + error) }
	  ); 
	  
	  
	
	 // so this is for desktop testing
	 /*
	 FB.login(function(response) {
	   if (response.authResponse) {
	     console.log('Welcome!  Fetching your information.... ');
	     FB.api('/me', function(response) {
	       console.log('Good to see you, ' + response.name + '.');
	       $location.path('/');
	       if(!$scope.$$phase) $scope.$apply()
	     });
	   } else {
	     console.log('User cancelled login or did not fully authorize.');
	   }
	 });
	 */
	 
	
    };

  })