/* Controllers */

var skControllers = angular.module('skControllers', ['lodash']);

skControllers.controller('skDealistCtrl', ['$scope', '$http', '_', '$rootScope',
    function($scope, $http, _, $rootScope) {
        /** share popup **/
        console.log(_);
        $scope.share_visable = false;
        $scope.share = function() {
            $scope.share_visable = !$scope.share_visable;
        }
        $scope.deals = $rootScope.dealgroups;
    }
]);

skControllers.controller('skDealCtrl', ['$scope', '$routeParams', '$rootScope', '$http', '_',
    function($scope, $routeParams, $rootScope, $http, _) {
        $scope.dealId = $routeParams.dealId;
	var buy_status;
        $http.get('../../mock/detail.json').success(function(data) {
            $scope.view.details = data.details;
            $scope.view.tips = data.tips;
 	    buy_status=data.status;
        });
	$rootScope.buy_status
        $scope.overlay_flag = 0;
        $scope.remind_flag = 0;
        $scope.storage_flag = 0;
        $scope.view = {};
        $scope.remind = function() {
            $scope.remind_flag = !$scope.remind_flag;
            $scope.overlay_flag = !$scope.overlay_flag;
        }
    }
]);
