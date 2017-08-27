(function(){
    'use strict';

    angular
        .module('appRoutes', ['ngRoute'])
        .config(routeConfig)

        routeConfig.$inject = ['$routeProvider', '$locationProvider'];

    function routeConfig($routeProvider, $locationProvider) {
        $routeProvider
        .when('/',{
            templateUrl: 'app/views/pages/home.html'
        })
        .when('/about',{
            templateUrl: 'app/views/pages/about.html'
        })
        .when('/register',{
            templateUrl: 'app/views/pages/users/register.html',
            controller: 'regCtrl',
            controllerAs: 'register'
        })
        .when('/login',{
            templateUrl: 'app/views/pages/users/login.html',
            // controller: 'mainCtrl',
            // controllerAs: 'main'
        })
        .when('/logout',{
            templateUrl: 'app/views/pages/users/logout.html',
            // controller: 'mainCtrl',
            // controllerAs: 'main'
        })
        .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode({ enabled : true, requireBase: false}).hashPrefix('');
    }

}());