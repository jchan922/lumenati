app.controller('userProfileController', ['$scope', '$location', 'usersFactory', 'markersFactory', 'groupsFactory', function($scope, $location, usersFactory, markersFactory, groupsFactory) {


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GOOGLE MAPS API METHODS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// INITIALIZE GOOGLE MAPS
    var initMap = function(){
        console.log("WE OUT HERE");
        // Find HTML5 geolocation.
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            var map = new google.maps.Map(document.getElementById('map'), {
                    center: pos,
                    zoom: 16,
                    zoomControl: true,
                    scaleControl: true,
                    fullscreenControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}],
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
            // showAllMarkers();

            // GOOGLE PLACES API AUTOCOMPLETE
            // Get the HTML input element for search for the autocomplete search box
            var input = document.getElementById('pac-input');
            // Create the autocomplete object.
            var autocomplete = new google.maps.places.Autocomplete(input);
            // Event Listener for a Places API search
            google.maps.event.addListener(autocomplete, 'place_changed', function(){
                var infoWindow = new google.maps.InfoWindow({map: map});
                var place = autocomplete.getPlace();
                var contentString = '<p><b>'+place.name+'</b></p>'+
                                    '<p>'+place.formatted_address+'</p>';
                var pos = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng()
                    };
                fillInForm(place);

                map.setCenter(pos);
                infoWindow.setPosition(pos);
                infoWindow.setContent(contentString);
            });
        });
    }
    initMap();

// SHOW ALL CURRENT USERS MARKERS ==================================================================
    var showAllMarkers = function() {
        // console.log("***************** Got to CLIENT dashboardController.js showAllMarkers");
        markersFactory.showAllMarkers(function(returnDataFromFactory){
            if(returnDataFromFactory.hasOwnProperty('errors')){
                $scope.showAllMarkersErrors = returnDataFromFactory.errors;
            } else {
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
        })
    }

    var toggleBounce = function() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
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


}]);
