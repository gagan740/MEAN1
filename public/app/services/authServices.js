(function(){
    'use strict';

    angular
        .module('authServices',[])
        .factory('Auth', Auth)
        .factory('AuthToken', AuthToken)
        .factory('AuthInterceptors', AuthInterceptors)

    Auth.$inject                =   ['$http', 'AuthToken'];
    AuthToken.$inject           =   ['$window'];
    AuthInterceptors.$inject    =   ['AuthToken'];

    function Auth($http, AuthToken) {
        let authFactory =   {};
        authFactory.login   =   (loginData) => {
            return $http.post('/api/authenticate',loginData).then((response) => {
                AuthToken.setToken(response.data.token);
                return response;
            });
        }
        authFactory.isLoggedIn  =   () => {
            if(AuthToken.getToken('token')){
                return true;
            }else{
                return false;
            }
        }
        authFactory.getUser     =   () => {
            if (AuthToken.getToken()) {
                return $http.post('/api/me');
            } else {
                $q.reject({ message: "User has no token." });
            }
        }
        authFactory.logout      =   () => {
            AuthToken.setToken();
        }
        return authFactory;
    }

    function AuthToken($window) {
        let authTokenFactory        =   {};
        authTokenFactory.setToken   =   (token) => {
            if(token){
                $window.localStorage.setItem('token',token);
            }else{
                $window.localStorage.removeItem('token',token);
            }
        }
        authTokenFactory.getToken   =   () => $window.localStorage.getItem('token');
        return authTokenFactory;
    }

    function AuthInterceptors(AuthToken) {
        let authInterceptorsFactory     =   {};
        authInterceptorsFactory.request =   (config) => {
            let token   =   AuthToken.getToken();
            if(token){
                config.headers['x-access-token']    =   token;
            }
            return config;
        }
        return authInterceptorsFactory;
    }
})();