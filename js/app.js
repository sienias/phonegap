angular.module('todoApp', [
  'ngTouch',
	'ngRoute',
  'ngAnimate',
	'todoApp.controllers',
  'todoApp.userControllers',
	'todoApp.services'
])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'partials/list.html'
    })
    .when('/edit/:id', {
      controller:'EditCtrl',
      templateUrl:'partials/detail.html'
    })
    .when('/new', {
      controller:'CreateCtrl',
      templateUrl:'partials/detail.html'
    })
    .when('/login', {
      controller:'UserLoginCtrl',
      templateUrl:'partials/login.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})