(function(){
    'use strict';

    angular
        .module('userServices',[])
        .factory('User', User)

        User.$inject = ['$http'];

    function User($http) {
        let userFactory = {};
        userFactory.create  =   (regData) => {
            return $http.post('/api/users', regData);
        }
        return userFactory;
    }
})();