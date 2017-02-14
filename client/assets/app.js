//  *************************************   //
//  *                                   *   //
//  *     FRONT END PARTIAL ROUTES      *   //
//  *                                   *   //
//  *************************************   //

var app = angular.module('app', ['ngAnimate', 'ngRoute', 'ui.bootstrap']);

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

app.config(function ($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('loginInterceptor');
    $routeProvider
        .when('/',{
            templateUrl: 'partials/home.html'
        })
        .when('/dashboard/:username',{
            templateUrl: 'partials/dashboard.html'
        })
        .when('/profile/group/:_id',{
            templateUrl: 'partials/group_profile.html'
        })
        .when('/fb_test',{
            templateUrl: 'partials/fb_login.html'
        })
        .otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});

// *********************************************
// FACEBOOK LOGIN
// *********************************************
window.fbAsyncInit = function() {
  FB.init({
    appId      : '384999515189949',
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
