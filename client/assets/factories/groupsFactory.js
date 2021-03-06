//  *****************************************   //
//  *                                       *   //
//  *           GROUPS FACTORY              *   //
//  *                                       *   //
//  *****************************************   //

app.factory('groupsFactory', ['$http', '$routeParams', function($http, $routeParams) {
    var factory = {};

// REGISTER METHOD TO SERVER ====================================================================
    factory.create = function(groupRegistrationObjectFromForm, callback){
        $http.post('/group/new', groupRegistrationObjectFromForm).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };

// JOIN METHOD TO SERVER ====================================================================
    factory.join = function(groupJoinObjectFromForm, callback){
        $http.post('/group/join', groupJoinObjectFromForm).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };

// LAST GROUP MARKER CREATED TO SERVER ====================================================================
    factory.getLastMarkerCreated = function(group_id,callback){
        $http.get('/group/lastmarker/'+group_id).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };

// GROUP STATUS UPDATE TO SERVER ====================================================================
    factory.changeGroupStatus = function(statusToUpdate, group_id, callback){
        $http.post('/group/status/'+group_id, statusToUpdate).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };

// GROUP STATUS UPDATE TO SERVER ====================================================================
    factory.currentGroupInfo = function(group_id, callback){
        $http.get('/group/info/'+group_id).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };


    return factory;

}]);
