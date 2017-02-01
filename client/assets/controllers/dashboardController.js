//  *****************************************  //
//  *                                       *  //
//  *           DASHBOARD CONTROLLER        *  //
//  *                                       *  //
//  *****************************************  //

app.controller('dashboardController', ['$scope', '$location', '$routeParams', 'usersFactory', 'markersFactory', 'groupsFactory', function($scope, $location, routeParams, usersFactory, markersFactory, groupsFactory) {

////////////////////////////////////////////////////////////////////////////////////////////////////////
// GROUP METHODS
////////////////////////////////////////////////////////////////////////////////////////////////////////

// CREATE NEW GROUP ========================================================================
    $scope.registerGroup = function() {
        groupsFactory.create($scope.regGroup, function(returnDataFromFactory){
            if(returnDataFromFactory.hasOwnProperty('errors')){
                $scope.regErrors = returnDataFromFactory.errors;
            } else {
                var groupID = returnDataFromFactory._id;
                $scope.regGroup = {}
                $scope.join = {}
                $location.url('/profile/group/'+groupID);
            }
        });
    };

// JOIN EXISTING GROUP ======================================================================
    $scope.joinGroup = function() {
        groupsFactory.join($scope.join, function(returnDataFromFactory){
            if(returnDataFromFactory.hasOwnProperty('errors')){
                $scope.regErrors = returnDataFromFactory.errors;
            } else {
                var groupID = returnDataFromFactory._id;
                $scope.regGroup = {}
                $scope.join = {}
                $location.url('/profile/group/'+groupID);
            }
        });
    };


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CURRENT USER METHODS
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET CURRENT USER =============================================================================
    var getSessionUser = function(){
        usersFactory.getSessionUser(function(user){
            $scope.session_user = user;
            if (user.groups.length == 0) {
                $scope.userGroups = [{name: "No Groups Yet!"}];
            } else {
                $scope.userGroups = user.groups;
            }
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
