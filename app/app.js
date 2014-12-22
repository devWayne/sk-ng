 /* App Module */

 var skApp = angular.module('skApp', [
     'ngRoute',
     'dealDirectives',
     'dealistDirectives',
     'dealControllers',
     'dealistControllers',
     'dealServices',
     'dealistServices',
     'ngSanitize',
     'ngCookies'
 ]);


 skApp.config(['$routeProvider','$compileProvider',
     function($routeProvider,$compileProvider) {
         $routeProvider.
         when('/dealist', {
             templateUrl: 'dealist/dealist.html',
             controller: 'skDealistCtrl'
         }).
         when('/deal/:dealId', {
             templateUrl: 'deal/deal.html',
             controller: 'skDealCtrl'
         }).
         otherwise({
             redirectTo: '/dealist'
         });
	 $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|dianping):/);
     }
 ]);

 skApp.run(function($rootScope, $http, $location, $cookies) {

     //团单信息缓存
     $rootScope.dealInfo = [];
     //团购状态
     $rootScope.dealStatus = [];

     $rootScope.buy_status = [];
     $rootScope.dealgroups =[];
     $rootScope.allDeals=[];

     
     $rootScope.cityid = ($location.search()).cityid;
     $rootScope.token = ($location.search()).token ? ($location.search()).token : '';
     $rootScope.version = ($location.search()).version ? ($location.search()).version : '';
     $rootScope.dpid = ($location.search()).dpid ? ($location.search()).dpid : '';
     $rootScope.agent=  ($location.search()).agent ? ($location.search()).agent : '';
     if ($rootScope.token) $cookies.token = $rootScope.token;
 });

