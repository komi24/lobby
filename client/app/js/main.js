(function(){

'use strict';

angular
    .module('lobbyingApp', [
      'angular.filter',
      // 'config',
      'ngRoute',
      // 'ui.bootstrap',
      'ui.router',
      'elasticui',
      'LocalStorageModule'
        ]).run(function($rootScope){})
    .config(function (localStorageServiceProvider) {
      localStorageServiceProvider
        .setPrefix('Lobbying');
    })
    .constant('euiHost', 'http://localhost:9200')
    .factory('httpRequestInterceptor', function (localStorageService) {
      return {
        request: function (config) {
          var token = localStorageService.get("auth");
          config.url =  URI(config.url).addSearch({'_auth_token':token}).toString();
          return config;
        }
      };
    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('httpRequestInterceptor');
    })
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('router', {
          url: '/router',
          template: '<div class="lockscreen" style="height: 100%"></div>',
          controller: 'MainCtrl'
        })
        .state('error', {
          url: '/error',
          template: '<div class="text-center alert alert-danger" style="margin: 100px">An error occurred.</div>'
        })
        .state('app', {
          abstract: true,
          url: '',
          template: '<div ui-view></div>',
          controller: 'LayoutCtrl'
        })
        .state('app.auth', {
          url: '/auth-redirect',
          templateUrl: 'views/auth.html',
          controller: 'AuthCtrl'
        })
        .state('app.home', {
          url: '/home',
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl'
        });
      $urlRouterProvider.otherwise('/router');
    })
    .controller('MainCtrl', function ($scope, $rootScope) {
      $scope.connected = $rootScope.connected;
    })
    .controller('AuthCtrl', function ($scope, $rootScope, $location, $http, $state, localStorageService) {
      $scope.connected = $rootScope.connected;
      console.log($location.search().code);
      $http.get("/google/redirect?code="+$location.search().code).then(function(response){
        console.log("token",response);
        localStorageService.set('auth',response.data.access_token);
        $state.go("app.home");
      }, function(response){
        console.log(response);
      });
    })
    .controller('HomeCtrl', function ($scope, $rootScope, $http, localStorageService) {
        console.log('HomeCtrl')
        $scope.connected = localStorageService.get('auth');
        $scope.mails = []
        $http.get("/google/mails")
        .then(function(response){
            console.log(response);
            $scope.mails = response.data;
        }, function(response){
            console.log(response);
        });

        var email = '';

        var headers_obj = {To: 'mickael.bolnet@gmail.com', subject: 'coucou'}
        var message = "hello";

        for(var header in headers_obj)
            email += header += ": "+headers_obj[header]+"\r\n";
      
        email += "\r\n" + message;

        // $http.post("/google/mail/send", {message: window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_') })
        // .then(function(response){
        //     console.log(response);
        //     $scope.mails = response.data;
        // }, function(response){
        //     console.log(response);
        // });

        $scope.selectAll = function(){
            this.indexVM.results.hits.hits.forEach(function(e){
                e.selected = true;
            })
        }
        $scope.unselectAll = function(){
            this.indexVM.results.hits.hits.forEach(function(e){
                e.selected = false;
            })
        }
    })
    .controller('LayoutCtrl', function ($scope, $rootScope, $http) {
      $rootScope.connected = false;
      $scope.signin = function(){
        console.log("start signing in")
        $http.get("/google/auth")
        .then(function(response){
          console.log(response);
          window.location = response.data.url;
        }, function(response){
          console.log(response);
        });
      }
    });

})()

