//  *****************************************   //
//  *                                       *   //
//  *           MARKERS FACTORY             *   //
//  *                                       *   //
//  *****************************************   //
// console.log('Client>Assets>Controllers>markersFactory.js is running!!');

app.factory('markersFactory', ['$http', '$routeParams', function($http, $routeParams) {
    var factory = {};

// CREATE NEW MARKER METHOD TO SERVER =============================================================
    factory.addMarker = function(newMarkerObjectFromForm, callback){
        // console.log("**** Got to CLIENT usersFactory.js FACTORY.POST ADD MARKER");
        // console.log(newMarkerObjectFromForm);
        $http.post('/marker/new', newMarkerObjectFromForm).then(function(returnedDataFromServer){
            // console.log("**** Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data );
            }
        });
    };


// SHOW ALL MARKERS METHOD TO SERVER =============================================================
    factory.showAllMarkers = function(callback){
        // console.log("**** Got to CLIENT usersFactory.js FACTORY.POST SHOW ALL MARKERS");
        $http.get('/marker/show/all').then(function(returnedDataFromServer){
            // console.log("**** Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        });
    };

// FILTER FOOD MARKERS METHOD TO SERVER =============================================================
    factory.filterFood = function(callback){
        // console.log("**** Got to CLIENT usersFactory.js FACTORY.POST SHOW ALL MARKERS");
        $http.get('/marker/show/filter/food').then(function(returnedDataFromServer){
            // console.log("**** Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        });
    };

    return factory;

}]);
