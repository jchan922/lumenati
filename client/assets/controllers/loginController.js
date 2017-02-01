//  *****************************************  //
//  *                                       *  //
//  *           LOGIN CONTROLLER            *  //
//  *                                       *  //
//  *****************************************  //

app.controller('loginController', ['$scope', '$location', 'usersFactory', function($scope, $location, usersFactory) {

// TEST FOR ANGULAR =======================================================================
    $scope.test = "Angular is Working";

// REGISTER A USER ========================================================================
    $scope.registerUser = function() {
        usersFactory.register($scope.regUser, function(returnDataFromFactory){
            if(returnDataFromFactory.hasOwnProperty('errors')){
                $scope.regErrors = returnDataFromFactory.errors;
                $scope.regUser = {};
            } else {
                var username = $scope.regUser.username;
                removeModal();
                $location.url('/dashboard/'+username);
            }
        });
    };

// LOG IN A USER ==========================================================================
    $scope.loginUser = function() {
        usersFactory.login($scope.loginUserAttempt, function(returnDataFromFactory){
            if(returnDataFromFactory.hasOwnProperty('errors')){
                $scope.loginErrors = returnDataFromFactory.errors;
                $scope.loginUserAttempt = {};
            } else {
                var username = $scope.loginUserAttempt.username;
                removeModal();
                $location.url('/dashboard/'+username);
            }
        });
    };

// PROGRAMATICALLY REMOVE MODAL ==========================================================================
    var removeModal = function() {
        var modal = angular.element(document.querySelector('.modal-backdrop'));
        modal.remove();
    }

// LOG OUT A USER ==========================================================================
    $scope.logout = function() {
        usersFactory.logout(function(){
            $location.url('/login')
        });
    };

}]);
