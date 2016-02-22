angular.module('todoApp.controllers',[])

  .controller('ListCtrl', function($scope, $rootScope, $http, $location, Todos) {
    
    // over here should check auth status if not login, or user anonymous
    // redirect to login page
    $scope.checkLogin = function() {

      
      FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          //alert('logged in');
          console.log("logged in bro");
        } 
        else {
          // alert('not logged in');
          $location.path('/login');
          if(!$scope.$$phase) $scope.$apply();
        }
      });
      

      /*
      facebookConnectPlugin.getLoginStatus(function(response) {
        alert(response);
        if (response.status == 'connected') {
          //alert('logged in');
          console.log("logged in bro");
          $location.path('/');
          if(!$scope.$$phase) $scope.$apply();
        } 
        else {
          // alert('not logged in');
          $location.path('/login');
          if(!$scope.$$phase) $scope.$apply();
        }
      }); 
    */

    }
    $scope.checkLogin();

    $scope.logout = function () {
      alert('logging out');
      // this is the desktop version
      
      /*
      FB.logout(function(response) {
        alert('logged out');
        $location.path('/login');
        if(!$scope.$$phase) $scope.$apply();
      });
      */

      
      // this is the PhoneGap version
      facebookConnectPlugin.logout(function(response) {
        alert('logged out');
        $location.path('/login');
        if(!$scope.$$phase) $scope.$apply();
      });
      

    }


    Todos.getAll().success(function(data) {
      $rootScope.todos = data['todos'];
    })
    
    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? false : true;
      });
      return count;
    };

  })
   
  .controller('CreateCtrl', function($scope, $rootScope, $location, $timeout, Todos) {
    $scope.todoText = "";
    $scope.todoDetails = "";
    $scope.save = function() {
      var todo = {
        text:$scope.todoText, 
        done:false, 
        details:$scope.todoDetails
      };
      console.log($rootScope.todos);
      $rootScope.todos.push(todo);
      console.log($rootScope.todos);

      Todos.save(todo);
      //$scope.todos.push(todo);
      $location.path('/');
      // window.location = '/'
    };
  })
   
  .controller('EditCtrl',
    function($scope, $rootScope, $location, $routeParams, Todos) {
      //$scope.todos = Todos;
      console.log($location.$$path.split("/"));
      var id = $location.$$path.split("/")[2];
      var result = Todos.getTodo(id).success(function(data) {
        console.log(" and the returned data is ");
        console.log(data);
        $scope.todoText = data.text;
        $scope.todoDetails = data.details;
        return data;
      })
      $scope.save = function() {
        var todo = {
          id:$location.$$path.split("/")[2],
          text:$scope.todoText,
          details:$scope.todoDetails,
          done:true
        }
        console.log("================");
        console.log(todo);
        Todos.edit(id, todo);
        $location.path('/');
      }

  });