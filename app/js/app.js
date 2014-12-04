 /* App Module */

 var skApp = angular.module('skApp', [
     'ngRoute',
     'skDirs',
     'skFilters',
     'skControllers',
     'skServices',
     'ngSanitize',
     'ngCookies'
 ]);

 var lodash = angular.module('lodash', []);
 lodash.factory('_', function() {
     return window._;
 });
 skApp.config(['$routeProvider',
     function($routeProvider) {
         $routeProvider.
         when('/dealist', {
             templateUrl: 'views/dealist.html',
             controller: 'skDealistCtrl'
         }).
         when('/deal/:dealId', {
             templateUrl: 'views/deal.html',
             controller: 'skDealCtrl'
         }).
         otherwise({
             redirectTo: '/dealist'
         });
      }
 ]);

 skApp.run(function($rootScope, $http, $location, $cookies) {
	 $rootScope.dealInfo = [];
         $rootScope.dealStatus = [];
         $rootScope.buy_status = [];

     $rootScope.cityid = ($location.search()).cityid;
     $rootScope.token = ($location.search()).token?($location.search()).token:'';
     $rootScope.version = ($location.search()).version?($location.search()).version:'';
     $rootScope.dpid = ($location.search()).dpid?($location.search()).dpid:'';
     if ($rootScope.token) $cookies.token = $rootScope.token;
 });
