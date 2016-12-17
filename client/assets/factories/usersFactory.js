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
        // console.log("***************** Got to CLIENT usersFactory.js FACTORY.REGISTER");
        // console.log(userRegistrationObjectFromForm);
        $http.post('/register', userRegistrationObjectFromForm).then(function(returnedDataFromServer){
            // console.log("Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };

// LOG IN METHOD TO SERVER =======================================================================

    factory.login = function(userLoginObjectFromForm, callback){
        // console.log("***************** Got to CLIENT usersFactory.js FACTORY.LOGIN");
        $http.post('/login', userLoginObjectFromForm).then(function(returnedDataFromServer){
            // console.log("Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };

// LOG OUT CURRENT USER METHOD TO SERVER =============================================================
    factory.logout = function(callback){
        // console.log("***************** Got to CLIENT usersFactory.js FACTORY.LOUGOUT");
        $http.post('/logout').then(function(returnedDataFromServer){
            // console.log("USER IS LOGGED OUT");
            if(typeof(callback) == 'function'){
                callback();
            }
        });
    };

// GET SESSION USER METHOD TO SERVER =============================================================
    factory.getSessionUser = function(callback){
        // console.log("**** Got to CLIENT usersFactory.js FACTORY.GET CURRENT USER");
        $http.get('/user').then(function(returnedDataFromServer){
            // console.log("**** Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data );
            }
        });
    };

    return factory;

}]);
