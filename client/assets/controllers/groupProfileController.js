app.controller('groupProfileController', ['$scope', '$location', '$routeParams', 'usersFactory', 'markersFactory', 'groupsFactory', function($scope, $location, $routeParams, usersFactory, markersFactory, groupsFactory) {


// SHOW ALL GROUP MARKERS ==================================================================
    var showAllGroupMarkers = function() {
        console.log("***************** Got to CLIENT dashboardController.js showAllMarkers");
        markersFactory.showAllGroupMarkers($routeParams._id, function(returnDataFromFactory){
            if(returnDataFromFactory.hasOwnProperty('errors')){
                $scope.showAllMarkersErrors = returnDataFromFactory.errors;
            } else {
                $scope.currentGroup = returnDataFromFactory
                if(returnDataFromFactory.markers != undefined){
                    $scope.markers_array = returnDataFromFactory.markers;
                    $scope.markers = [];
                        var markers_array = $scope.markers_array;
                        var infoWindow = new google.maps.InfoWindow();
                        var createMarker = function (info){
                            var marker = new google.maps.Marker({
                                position: new google.maps.LatLng(info.latitude, info.longitude),
                                map: $scope.map,
                                animation: google.maps.Animation.DROP,
                                title: info.title,
                                address: info.address,
                                description: info.description,
                                url: info.url,
                                category: info.category,
                                list: info.list,
                                createdAt: info.createdAt
                            });
                            google.maps.event.addListener(marker, 'click', function(){
                                if (marker.url){
                                    infoWindow.setContent('<p><b>' + marker.title + '</b></p><p>' + marker.address + '</p><p><u>Category</u>: ' +  marker.category + '</p><p><u>Notes</u>: ' + marker.description + '</p><a href='+marker.url+'>Website</a>');
                                } else {
                                    infoWindow.setContent('<p><b>' + marker.title + '</b></p><p>' + marker.address + '</p><p><u>Category</u>: ' +  marker.category + '</p><p><u>Notes</u>: ' + marker.description + '</p>');
                                }
                                infoWindow.open($scope.map, marker);
                            });
                            $scope.markers.push(marker);
                        }
                        for (i = 0; i < markers_array.length; i++){
                            createMarker(markers_array[i]);
                    }
                }
            }
        })
    }
    showAllGroupMarkers();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GOOGLE MAPS API METHODS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// INITIALIZE GOOGLE MAPS
    var initMap = function(){
        // Find HTML5 geolocation.
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            var map = new google.maps.Map(document.getElementById('map'), {
                    center: pos,
                    zoom: 18,
                });
            var marker = new google.maps.Marker({
                    map: map,draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: pos,
                    title: "Current Location!",
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });
            // CURRENT LOCATION EVENT LISTENER
            var infoWindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h3>Current Location!</h3>');
                infoWindow.open($scope.map, marker);
            });

            map.setCenter(pos);
            marker.addListener('click', toggleBounce);
            marker.setPosition(pos);
            $scope.map = map;
            showAllGroupMarkers();
        });
    }
    initMap();

    var toggleBounce = function() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    };

    var handleLocationError = function(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                                'Error: Could not find current location.' :
                                'Error: Your browser doesn\'t support geolocation.');
    };




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


////////////////////////////////////////////
// MISC. FUNCTIONS
///////////////////////////////////////////

    $scope.cancel = function (group_id) {
        console.log(group_id);
        var reg = document.getElementsByClassName("modal-backdrop fade in");
        console.log(reg);
        reg[0].parentNode.removeChild(reg[0]);
        console.log(reg);
        $location.url('/profile/group/'+group_id)
        $scope.regGroup = {}
        $scope.join = {}
    };

}]);
