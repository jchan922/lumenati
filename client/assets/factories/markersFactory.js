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
        $http.post('/marker/new', newMarkerObjectFromForm).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        });
    };


// SHOW ALL USER MARKERS METHOD TO SERVER =============================================================
    factory.showAllMarkers = function(callback){
        $http.get('/marker/show/all').then(function(returnedDataFromServer){
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
        $http.post('/marker/group/new/'+group_id, newGroupMarkerObjectFromForm).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        });
    };

// SHOW ALL GROUP MARKERS METHOD TO SERVER =============================================================
    factory.showAllGroupMarkers = function(group_id, callback){
        $http.get('/marker/group/show/all/'+group_id).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        });

    };



    return factory;

}]);
