 /* App Module */

 var skApp = angular.module('skApp', [
     'lodash',
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

 skApp.run(function($rootScope, $http, $location,$cookies) {
     $rootScope.dealStatus = [];
     $rootScope.buy_status = [];
     // $rootScope.current.dealroups[1001] = 0;
     $rootScope.cityid = ($location.search()).cityid;
     $rootScope.token=($location.search()).token;
     if($rootScope.token)$cookies.token=$rootScope.token;



  /*   $http.get('../../mock/realtime.json').success(function(data) {
         $rootScope.init_seconds = data.coming_seconds;
         if ($rootScope.init_seconds > 0) {
             $rootScope.status = 0;
         } else {
             $rootScope.status = 1;
         }

     });
     */
     $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/list?city_id=' + $rootScope.cityid + '&callback=JSON_CALLBACK').success(function(data) {
         $rootScope.dealgroups = data.result.current[0].dealgroups;
	 $rootScope.nextdealgroups = data.result.next.dealgroups;
	 $rootScope.init_seconds = data.result.timer.coming_seconds;
	 $rootScope.nexttime=data.result.next.time;
         if ($rootScope.init_seconds > 0) {
             $rootScope.status = 0;
         } else {
             $rootScope.status = 1;
         }
     });

 })
