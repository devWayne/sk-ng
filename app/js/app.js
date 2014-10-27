 'use strict';
 
 /* App Module */

var skApp = angular.module('skApp', [
  'ngRoute',
  'skControllers'
]);

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
  }]);
