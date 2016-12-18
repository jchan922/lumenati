//  *************************************   //
//  *                                   *   //
//  *     FRONT END PARTIAL ROUTES      *   //
//  *                                   *   //
//  *************************************   //

var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

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
            templateUrl: 'partials/profile.html'
        })
        // .when('/orders',{
        //     templateUrl: 'partials/orders.html'
        // })
        // .when('/products',{
        //     templateUrl: 'partials/products.html'
        // })
        .otherwise({
            redirectTo: '/home'
        });
});
