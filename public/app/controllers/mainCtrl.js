(function(){
    'use strict';

    angular
        .module('mainController',['authServices'])
        .controller('mainCtrl', mainCtrl)

        mainCtrl.$inject = ['$scope', 'Auth', '$timeout', '$location', '$log', '$rootScope'];

    function mainCtrl($scope, Auth, $timeout, $location, $log, $rootScope) {
        var app             =   this;
        app.loadme          =   false;
        $rootScope.$on('$routeChangeStart', () => {
            if(Auth.isLoggedIn()){
                app.isLoggedIn              =   true;
                Auth.getUser().then((data)  =>  {
                    const {username, email} =   data.data;
                    app.username            =   username;
                    app.useremail           =   email;
                    app.loadme              =   true;
                });
            }else{
                app.username                =   '';
                app.isLoggedIn              =   false;
                app.loadme                  =   true 
            }
        })
        
        app.doLogin         =   (loginData) => {
            app.loading     =   true;
            app.errorMsg    =   false;

            Auth.login(app.loginData).then((response) => {
                if(response.data.success){
                    app.loading =   false;
                    app.successMsg  =   `${response.data.message} ...Redirecting`;
                    $timeout(() => {
                        $location.path('/about');
                        app.loginData   =   {};
                        app.successMsg  =   false;
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