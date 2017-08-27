(function(){
    'use strict';

    angular
        .module('mainController',['authServices'])
        .controller('mainCtrl', mainCtrl)

        mainCtrl.$inject = ['$scope', 'Auth', '$timeout', '$location', '$log'];

    function mainCtrl($scope, Auth, $timeout, $location, $log) {
        let app             =   this;
        if(Auth.isLoggedIn()){
            $log.error('Success: User is logged in.');
            Auth.getUser().then((data) => {
                $log.warn(data);
            });
        }else{
            $log.error('Faliure: User in not logged in!');
        }

        app.doLogin         =   (loginData) => {
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

        app.logout  =   () => {
            Auth.logout();
            $location.path('/logout');
            $timeout(() => {
                $location.path('/');
            },2000)
        }
    }
})();