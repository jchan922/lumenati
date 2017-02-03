//  *****************************************   //
//  *                                       *   //
//  *           USERS FACTORY               *   //
//  *                                       *   //
//  *****************************************   //
// console.log('Client>Assets>Controllers>usersFactory.js is running!!');

app.factory('usersFactory', ['$http', '$routeParams', function($http, $routeParams) {
    var factory = {};

// REGISTER METHOD TO SERVER ====================================================================
    factory.register = function(userRegistrationObjectFromForm, callback){
        $http.post('/register', userRegistrationObjectFromForm).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };

// LOG IN METHOD TO SERVER =======================================================================

    factory.login = function(userLoginObjectFromForm, callback){
        $http.post('/login', userLoginObjectFromForm).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };

// LOG OUT CURRENT USER METHOD TO SERVER =============================================================
    factory.logout = function(callback){
        $http.post('/logout').then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback();
            }
        });
    };

// GET SESSION USER METHOD TO SERVER =============================================================
    factory.getSessionUser = function(callback){
        $http.get('/user').then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data );
            }
        });
    };

    return factory;

}]);
