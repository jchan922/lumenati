//  *****************************************  //
//  *                                       *  //
//  *           LOGIN CONTROLLER            *  //
//  *                                       *  //
//  *****************************************  //

app.controller('loginController', ['$scope', '$location', '$anchorScroll', '$uibModal', '$log', '$document', 'usersFactory', function($scope, $location, $anchorScroll, $uibModal, $log, $document, usersFactory) {

// TEST FOR ANGULAR =======================================================================
    $scope.test = "Angular is Working";
    $scope.FBLogin = function() {
        FB.login(function(response) {
            if(response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                    console.log(response);
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    };
    $scope.FBLogout = function() {
        FB.logout(function(response) {
            console.log('User logged out.');
        });
    };

    $scope.animationsEnabled = true;

    $scope.open = function (size) {
        console.log("TEST");
        var modalInstance = $uibModal.open({
            animation: this.animationsEnabled,
            templateUrl: 'loginModal.html',
            controller: 'modalInstanceController',
            size: size,
        });

        modalInstance.result.then(function (selectedItem) {
           $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
     };



// PROGRAMATICALLY REMOVE MODAL ==========================================================================
    var removeModal = function() {
        var modal = angular.element(document.querySelector('.modal-backdrop'));
        modal.remove();
    }

// SCROLL TO ==========================================================================
    $scope.scrollTo = function(id) {
        $location.hash(id);
        $anchorScroll();
    }


// LOG OUT A USER ==========================================================================
    $scope.logout = function() {
        usersFactory.logout(function(){
            $location.url('/login')
        });
    };

}]);
