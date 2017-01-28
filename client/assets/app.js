//  *************************************   //
//  *                                   *   //
//  *     FRONT END PARTIAL ROUTES      *   //
//  *                                   *   //
//  *************************************   //

var app = angular.module('app', ['ngRoute']);

app.factory('loginInterceptor', ['$q','$location',function($q, $location){
    return{
        'responseError': function(rejection){
            if (rejection.status == 401){
                $location.url('/login');
            }
            return $q.reject(rejection);
        }
    }
}]);

app.config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('loginInterceptor');
    $routeProvider
        .when('/home',{
            templateUrl: 'partials/home.html'
        })
        .when('/dashboard/:username',{
            templateUrl: 'partials/dashboard.html'
        })
        .when('/profile/:_id',{
            templateUrl: 'partials/user_profile.html'
        })
        .when('/profile/group/:_id',{
            templateUrl: 'partials/group_profile.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
});
