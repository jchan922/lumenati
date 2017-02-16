//  *****************************************  //
//  *                                       *  //
//  *           LOGIN CONTROLLER            *  //
//  *                                       *  //
//  *****************************************  //

app.controller('modalInstanceController', ['$scope', '$location', '$uibModalInstance', 'usersFactory', function ($scope, $location, $uibModalInstance, usersFactory) {

  var ok = function () {
    $uibModalInstance.close();
  };

  var cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  // REGISTER A USER ========================================================================
    $scope.registerUser = function() {
        usersFactory.register($scope.regUser, function(returnDataFromFactory){
            if(returnDataFromFactory.hasOwnProperty('errors')){
                $scope.regErrors = returnDataFromFactory.errors;
                $scope.regUser = {};
                cancel();
            } else {
                var username = $scope.regUser.username;
                ok();
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
                cancel();
            } else {
                var username = $scope.loginUserAttempt.username;
                ok();
                $location.url('/dashboard/'+username);
            }
        });
    };

}]);
