(function(){
    'use strict';

    angular
        .module('userControllers',['userServices'])
        .controller('regCtrl', regCtrl)

        regCtrl.$inject = ['$scope', '$log', '$http', '$location', '$timeout', 'User'];

    function regCtrl($scope, $log, $http, $location, $timeout, User) {
        let app     =   this;

        app.regUser    =   (regData) => {
            app.loading     =   true;
            app.errorMsg    =   false;
            User.create(app.regData).then( (response) =>{
                if(response.data.success){
                    app.loading     =   false;
                    app.successMsg  =   `${response.data.message} ...Reditecting`;
                    $timeout(() => {
                        $location.path('/');
                    },2000);
                }else{
                    app.loading     =   false;
                    app.errorMsg    =   response.data.message;
                }
            })
        }
    }
})();