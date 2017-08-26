(function(){
    'use strict';

    angular
        .module('mainController',['authServices'])
        .controller('mainCtrl', mainCtrl)

        mainCtrl.$inject = ['$scope', 'Auth', '$timeout', '$location'];

    function mainCtrl($scope, Auth, $timeout, $location) {
        let app             =   this;
        
        app.doLogin        =   (loginData) => {
            app.loading     =   true;
            app.errorMsg    =   false;

            Auth.login(app.loginData).then((response) => {
                if(response.data.success){
                    app.loading =   false;
                    app.successMsg  =   `${response.data.message} ...Redirecting`;
                    $timeout(() => {
                        $location.path('/about');
                    },2000);
                }else{
                    app.loading =   false;
                    app.errorMsg    =   response.data.message;
                }
            })
        }
    }
})();