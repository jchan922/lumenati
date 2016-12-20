app.controller('userProfileController', ['$scope', '$location', 'usersFactory', 'markersFactory', 'groupsFactory', function($scope, $location, usersFactory, markersFactory, groupsFactory) {



// TEST ============================================================================
    $scope.test = "Angular test"







////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CURRENT USER METHODS
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET CURRENT USER =============================================================================
    var getSessionUser = function(){
        usersFactory.getSessionUser(function(user){
            $scope.session_user = user;
            $scope.userGroups = user.groups
            // console.log("**** Now useable as $scope variable", user);
        })
    };
    getSessionUser();

// LOG OUT A USER ===============================================================================
    $scope.logout = function() {
        usersFactory.logout(function(){
            $location.url('/login')
        });
    };


}]);
