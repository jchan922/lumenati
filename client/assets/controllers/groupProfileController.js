app.controller('groupProfileController', ['$scope', '$location', '$routeParams', 'usersFactory', 'markersFactory', 'groupsFactory', function($scope, $location, $routeParams, usersFactory, markersFactory, groupsFactory) {

// GET LAST MARKER CREATED ==========================================================================
    var getLastMarkerCreated = function() {
        groupsFactory.getLastMarkerCreated($routeParams._id, function(returnDataFromFactory){
            if(returnDataFromFactory.hasOwnProperty('errors')){
                $scope.showAllMarkersErrors = returnDataFromFactory.errors;
            } else {
                if(!returnDataFromFactory){
                    $scope.noMarkers = "NO MARKERS YET!!"
                    initMap(34.1375902,-118.3551984);
                } else {
                    $scope.lastMarker = returnDataFromFactory
                    console.log(returnDataFromFactory);
                    initMap(returnDataFromFactory.latitude,returnDataFromFactory.longitude);
                }
            }
        })
    }
    getLastMarkerCreated()

// SHOW ALL GROUP MARKERS ==================================================================
    var showAllGroupMarkers = function() {
        markersFactory.showAllGroupMarkers($routeParams._id, function(returnDataFromFactory){
            if(returnDataFromFactory.hasOwnProperty('errors')){
                $scope.showAllMarkersErrors = returnDataFromFactory.errors;
            } else {
                $scope.currentGroup = returnDataFromFactory
                if(returnDataFromFactory.markers != undefined){
                    $scope.markers_array = returnDataFromFactory.markers;
                    console.log(returnDataFromFactory.markers);
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
    };

// CHANGE GROUP STATUS
    $scope.changeGroupStatus = function () {
        groupsFactory.changeGroupStatus($scope.groupStatus, $routeParams._id, function(returnDataFromFactory){
            if(returnDataFromFactory.hasOwnProperty('errors')){
                $scope.showAllMarkersErrors = returnDataFromFactory.errors;
            } else {
                $scope.currentStatus = returnDataFromFactory;
                $scope.groupStatus = {}
            }
        })



    }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GOOGLE MAPS API METHODS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// INITIALIZE GOOGLE MAPS
    var initMap = function(latitude,longitude){
        // Find HTML5 geolocation.
            var pos = {
                    lat: latitude,
                    lng: longitude
                };
            var map = new google.maps.Map(document.getElementById('map'), {
                    center: pos,
                    zoom: 15,
                    styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}],
                });
            map.setCenter(pos);
            $scope.map = map;
            showAllGroupMarkers();
    }

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
        var reg = document.getElementsByClassName("modal-backdrop fade in");
        reg[0].parentNode.removeChild(reg[0]);
        $location.url('/profile/group/'+group_id)
        $scope.regGroup = {}
        $scope.join = {}
    };



}]);
