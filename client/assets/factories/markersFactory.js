//  *****************************************   //
//  *                                       *   //
//  *           MARKERS FACTORY             *   //
//  *                                       *   //
//  *****************************************   //
// console.log('Client>Assets>Controllers>markersFactory.js is running!!');

app.factory('markersFactory', ['$http', '$routeParams', function($http, $routeParams) {
    var factory = {};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SINGLE USER MARKERS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CREATE NEW MARKER METHOD TO SERVER =============================================================
    factory.addMarker = function(newMarkerObjectFromForm, callback){
        // console.log("**** Got to CLIENT usersFactory.js FACTORY.POST ADD MARKER");
        // console.log(newMarkerObjectFromForm);
        $http.post('/marker/new', newMarkerObjectFromForm).then(function(returnedDataFromServer){
            // console.log("**** Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        });
    };


// SHOW ALL USER MARKERS METHOD TO SERVER =============================================================
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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GROUP MARKERS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CREATE NEW GROUP MARKER METHOD TO SERVER =============================================================
    factory.addGroupMarker = function(group_id, newGroupMarkerObjectFromForm, callback){
        // console.log("**** Got to CLIENT usersFactory.js FACTORY.POST ADD MARKER");
        // console.log(group_id, newGroupMarkerObjectFromForm);
        $http.post('/marker/group/new/'+group_id, newGroupMarkerObjectFromForm).then(function(returnedDataFromServer){
            // console.log("**** Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        });
    };

// SHOW ALL GROUP MARKERS METHOD TO SERVER =============================================================
    factory.showAllGroupMarkers = function(group_id, callback){
        $http.get('/marker/group/show/all/'+group_id).then(function(returnedDataFromServer){
            console.log("**** Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        });

    };



    return factory;

}]);
