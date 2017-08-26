(function(){
    'use strict';

    angular
        .module('authServices',[])
        .factory('Auth', Auth)

    Auth.$inject = ['$http'];

    function Auth($http) {
        let authFactory =   {};
        authFactory.login   =   (loginData) => {
            return $http.post('/api/authenticate',loginData);
        }
        return authFactory;
    }
})();