 /* App Module */

var skApp = angular.module('skApp', [
  'underscore',
  'ngRoute',
  'skDirs',
  'skFilters',
  'skControllers'
]);

var underscore=angular.module('underscore',[]);
underscore.factory('_',function(){
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
  }]);
