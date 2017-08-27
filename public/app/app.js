(function(){
    'use strict';

    angular
        .module('userApp',[
            'appRoutes',
            'userControllers',
            'userServices',
            'ngAnimate',
            'mainController',
            'authServices'
        ])
        .config(headerConfig)
        headerConfig.$inject = ['$httpProvider'];
        
        function headerConfig($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptors');
        }

}());