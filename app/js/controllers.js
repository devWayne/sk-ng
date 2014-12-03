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
        $scope.checkcode_num;
        $scope.deal = {};

        if ($rootScope.dealInfo[$scope.dealId] == undefined) {
            $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/detail?city_id=' + $rootScope.cityid + '&dealgroup_id=' + $scope.dealId + '&callback=JSON_CALLBACK').success(function(data) {
                $scope.deal.title = data.result.data.title;
                $scope.deal.description = data.result.data.description;
                $scope.deal.current_price = data.result.data.current_price;
                $scope.deal.list_price = data.result.data.list_price;
                $scope.deal.detail = data.result.data.detail;
                $scope.deal.tips = data.result.data.tips;
                $scope.deal.thumb_photo_url = data.result.data.thumb_photo_url;
                $scope.deal.banner_photo_url = data.result.data.banner_photo_url;
                $scope.deal.siblings = data.result.siblings;
		$scope.deal.shop_count=data.result.shop_count;
		$scope.deal.shops_url=data.resule.shops_url;
                $rootScope.dealInfo[$scope.dealId] = $scope.deal;
                if (data.result.data.status != 0) {
                    $scope.buy_words = "抢";
                    $scope.buy_class = "deal-buy-z";
                } else {
                    $scope.storage_flag = 1;
                    $scope.buy_words = "抢光了";
                    $scope.buy_class = "deal-buy-o";
                    $rootScope.dealStatus[$scope.dealId] = 1;
                }
            });
        } else {
            $scope.deal = $rootScope.dealInfo[$scope.dealId];
            $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/detail?city_id=' + $rootScope.cityid + '&dealgroup_id=' + $scope.dealId + '&callback=JSON_CALLBACK').success(function(data) {
                if (data.result.data.status != 0) {
                    $scope.buy_words = "抢";
                    $scope.buy_class = "deal-buy-z";
                } else {
                    $scope.storage_flag = 1;
                    $scope.buy_words = "抢光了";
                    $scope.buy_class = "deal-buy-o";
                    $rootScope.dealStatus[$scope.dealId] = 1;
                }

            });
        }


        $scope.$watch('checkcode_num', function() {
            if ($scope.checkcode_num.toString().length == 4) {
                alert('123');
            }
        })

        $scope.overlay_flag = 0;
        $scope.remind_flag = 0;
        $scope.storage_flag = 0;
        $scope.words_flag = 0;
        $scope.remind = function() {
            $scope.remind_flag = !$scope.remind_flag;
            $scope.overlay_flag = !$scope.overlay_flag;
        };
        $scope.checkcode = function() {
            $scope.checkcode_flag = !$scope.checkcode_flag;
            //$scope.overlay_flag = !$scope.overlay_flag;
        }
        $scope.remindajax = function() {
            if (!/1[3-8]+\d{9}/.test($scope.phone_num)) {
                $scope.words = '请输入正确的手机号';
                $scope.overlay_flag = 1;
                $scope.words_flag = 1;
                setTimeout(function() {
                    $scope.words_flag = 0;
                    $scope.overlay_flag = 0;
                    $scope.$apply();
                }, 3000);
                return;
            };

            $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/join?city_id=' + $rootScope.cityid + '&dealgroup_id=' + $scope.dealId + '&callback=JSON_CALLBACK').success(function(data) {
                if (data.code == 201) {
                    $scope.words = '设置成功';
		    return;
                }
                if (data.code == 203) {
                    $scope.words = '设置失败';
                }
                if (data.code == 400) {
                    $scope.words = '123';
                }
                $scope.overlay_flag = 1;
                $scope.words_flag = 1;
                $scope.remind_flag = 0;
                setTimeout(function() {
                    $scope.words_flag = 0;
                    $scope.overlay_flag = 0;
                    $scope.$apply();
                }, 3000);

            });
        }
    }
]);
