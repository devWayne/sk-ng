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
        if ($rootScope.dealgroups == undefined) {
            $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/list?city_id=' + $rootScope.cityid + '&callback=JSON_CALLBACK').success(function(data) {
                $scope.now_deals = data.result.current[0].dealgroups;
                $scope.next_deals = data.result.next.dealgroups;
                $scope.coming_seconds = data.result.timer.coming_seconds * 1000;

            });
        }
        $scope.now_deals = $rootScope.dealgroups;
        $scope.next_deals = $rootScope.nextdealgroups;
    }
]);

skControllers.controller('skDealCtrl', ['$scope', '$routeParams', '$rootScope', '$http', '_',
    function($scope, $routeParams, $rootScope, $http, _) {
        $scope.dealId = $routeParams.dealId;
        $scope.checkcode_flag = 0;
        var buy_status;
        $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/detail?city_id=' + $rootScope.cityid + '&dealgroup_id=' + $scope.dealId + '&callback=JSON_CALLBACK').success(function(data) {
            if ($scope.view.details == undefined && $scope.view.tips == undefined) {
                $scope.view.detail = data.result.data.detail;
                $scope.view.tips = data.result.data.tips;
            }
            buy_status = data.status;
        });
        $rootScope.buy_status
        $scope.overlay_flag = 0;
        $scope.remind_flag = 0;
        $scope.storage_flag = 0;
        $scope.view = {};
        $scope.remind = function() {
            $scope.remind_flag = !$scope.remind_flag;
            $scope.overlay_flag = !$scope.overlay_flag;
        };
        $scope.remindajax = function() {
            $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/join?city_id='+ $rootScope.cityid +'&dealgroup_id='+ $scope.dealId+'&callback=SDFFF').success(function(data) {
		
            });

        }
    }
]);
