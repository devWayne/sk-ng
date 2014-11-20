/* Controllers */

var skControllers = angular.module('skControllers', ['underscore']);

skControllers.controller('skDealistCtrl', ['$scope', '$http', '_',
    function($scope, $http, _) {

        var statusList = ['即将开抢', '抢购中'];
	/** tiemr **/
	//$scope.timer=[];

        /** share popup **/
        $scope.share_visable = false;
        $scope.share = function() {
            $scope.share_visable = !$scope.share_visable;
        }

        /** init deals info **/
        $http.get('../../mock/init.json').success(function(data) {
            $scope.deals = data.initDealInfo;
            /**$http.get('../../mock/realtime.json').success(function(data) {
                $scope.joins = data.realTimeInfo;
                _.each($scope.deals, function(val, idx) {
                    val.currentJoins = $scope.joins[idx].currentJoin;
                    val.wannaJoins = $scope.joins[idx].wannaJoin;
                });
            })**/
            $scope.statusWords = statusList[$scope.status];
        });

    }
]);


skControllers.controller('skDealCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
	$scope.overlay_flag=0;
        $scope.phoneId = $routeParams.phoneId;
    }
]);
