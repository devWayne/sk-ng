/* Controllers */

var skControllers =angular.module('skControllers',['underscore']);

skControllers.controller('skDealistCtrl',['$scope','$http','_',function($scope,$http,_){
	$http.get('../../mock/init.json').success(function(data){
		$scope.deals=data.initDealInfo;
		$http.get('../../mock/realtime.json').success(function(data){
			$scope.joins=data.realTimeInfo;
			_.each($scope.deals,function(val,idx){
				val.currentJoins=$scope.joins[idx].currentJoin;
				val.wannaJoins=$scope.joins[idx].wannaJoin;
			});
		})
		$scope.status=1;
	});
}]);


skControllers.controller('skDealCtrl',['$scope','$routeParams',function($scope,$routeParams){
	$scope.phoneId=$routeParams.phoneId;
}]);
