'use strict'
/* Controllers */

var skControllers =angular.module('skControllers',[]);

skControllers.controller('skDealistCtrl',['$scope','$http',function($scope,$http){
	$http.get(../../mock/json.js).success(function(data){
		$scope.deals=data;
		
	});
}]);


skControllers.controller('skDealCtrl',['$scope','$routeParams',function($scope,$routeParams){
	$scope.phoneId=$routeParams.phoneId;
}]);
