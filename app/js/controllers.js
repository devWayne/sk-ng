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
                $rootScope.dealgroups = data.result.current[0].dealgroups;
                $rootScope.nextdealgroups = data.result.next.dealgroups;
                $rootScope.nexttime = data.result.next.time;
                $scope.now_deals = $rootScope.dealgroups;
                $scope.next_deals = $rootScope.nextdealgroups;
            });
        } else {
            $scope.now_deals = $rootScope.dealgroups;
            $scope.next_deals = $rootScope.nextdealgroups;
        }
    }
]);

skControllers.controller('skDealCtrl', ['$scope', '$routeParams', '$rootScope', '$http', '_',
    function($scope, $routeParams, $rootScope, $http, _) {
        //	$scope.status=$rootScope.status;
        $scope.dealId = $routeParams.dealId;
        $scope.checkcode_flag = 0;


        $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/detail?city_id=' + $rootScope.cityid + '&dealgroup_id=' + $scope.dealId + '&callback=JSON_CALLBACK').success(function(data) {
            $scope.title = data.result.data.title;
            $scope.description = data.result.data.description;
            $scope.current_price = data.result.data.current_price;
            $scope.list_price = data.result.data.list_price;
            $scope.view.detail = data.result.data.detail;
            $scope.view.tips = data.result.data.tips;
            $scope.thumb_photo_url = data.result.data.thumb_photo_url;
            $scope.banner_photo_url = data.result.data.banner_photo_url;
            $scope.siblings = data.result.siblings;
            if (data.result.data.status != 0) {
                $scope.buy_words = "抢";
                $scope.buy_class = "deal-buy-z";
            } else {
                $scope.buy_words = "抢光了";
                $scope.buy_class = "deal-buy-o";
            }

        });

        $scope.overlay_flag = 0;
        $scope.remind_flag = 0;
        $scope.storage_flag = 0;
        $scope.words_flag = 0;
        $scope.view = {};
        $scope.remind = function() {
            $scope.remind_flag = !$scope.remind_flag;
            $scope.overlay_flag = !$scope.overlay_flag;
        };
        $scope.checkcode = function() {
            $scope.checkcode_flag = !$scope.checkcode_flag;
            //$scope.overlay_flag = !$scope.overlay_flag;
        }
        $scope.remindajax = function() {
	    $scope.phonenum;
            $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/join?city_id=' + $rootScope.cityid + '&dealgroup_id=' + $scope.dealId + '&callback=JSON_CALLBACK').success(function(data) {
		if(data.code==201){
		    $scope.words = '设置成功';		
		}
	    	if(data.code==203){
		    $scope.words = '设置失败';		
		}
		if(data.code==400){
		    $scope.words = '123';	
		}
                $scope.words_flag = 1;
                $scope.remind_flag = 0;
                setTimeout(function() {
                    $scope.words_flag = 0;
                    $scope.overlay_flag = 0;
                }, 3000);

            });
        }
    }
]);
