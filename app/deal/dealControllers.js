/* Controllers */

var dealControllers = angular.module('dealControllers', ['dealServices']);


dealControllers.controller('skDealCtrl', ['$scope', '$routeParams', '$rootScope', '$http', '$location', 'popupService', 'buyService',
    function($scope, $routeParams, $rootScope, $http, $location, popupService, buyService) {
        $scope.dealId = $routeParams.dealId;
        $scope.checkcode_num = "";
        $scope.deal = {};
        $scope.toast = {};
        $scope.buy = {};

        /**
         * deal init
         */
        if ($rootScope.dealInfo[$scope.dealId] == undefined) {
            $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/detail?city_id=' + $rootScope.cityid + '&dealgroup_id=' + $scope.dealId + '&callback=JSON_CALLBACK').success(function(data) {
                $scope.deal = data.result;
                $rootScope.dealInfo[$scope.dealId] = $scope.deal;
                if ($rootScope.dealStatus[$scope.dealId] == 2) {
                    $scope.status = 0;
                } else if ($rootScope.dealStatus[$scope.dealId] == 1) {
                    $scope.buy = buyService.buyEnd();
                    $rootScope.dealStatus[$scope.dealId] = 1;
                    $scope.checkcode_open = 0;
                } else {
                    if (data.result.data.status == 1) {
                        $scope.buy = buyService.buyStart();
                    }
                    if (data.result.data.status == 2) {
                        $scope.buy = buyService.buyEnd();
                        $rootScope.dealStatus[$scope.dealId] = 1;
                        $scope.checkcode_open = 0;
                    }

                }
            });
        } else {
            $scope.deal = $rootScope.dealInfo[$scope.dealId];
            $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/detail?city_id=' + $rootScope.cityid + '&dealgroup_id=' + $scope.dealId + '&callback=JSON_CALLBACK').success(function(data) {
                if ($rootScope.dealStatus[$scope.dealId] == 2) {
                    $scope.status = 0;
                } else if ($rootScope.dealStatus[$scope.dealId] == 1) {
                    $scope.buy = buyService.buyEnd();
                    $rootScope.dealStatus[$scope.dealId] = 1;
                    $scope.checkcode_open = 0;
                } else {
                    if (data.result.data.status == 1) {
                        $scope.buy = buyService.buyStart();
                    }
                    if (data.result.data.status == 2) {
                        $scope.buy = buyService.buyEnd();
                        $rootScope.dealStatus[$scope.dealId] = 1;
                        $scope.checkcode_open = 0;
                    }
                }
            });
        }

        /**
         * listen checkcode length
         * @param {varType} checkcode_num Description
         * @param {varType} function Description
         * @return {void} description
         */
        $scope.$watch('checkcode_num', function() {
            if ($scope.checkcode_num.toString().length == 4) {
                $scope.codecheck();
            }
        });

        /**
         * checkcode
         * @return {void} description
         */
        $scope.codecheck = function() {
            $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/verify-captcha?dealgroup_id=' + $scope.dealId + '&captcha=' + $scope.checkcode_num + '&dpid=' + $rootScope.dpid + '&version=' + $rootScope.version + '&city_id=' + $rootScope.cityid + '&token=!&callback=JSON_CALLBACK').success(function(data) {
                if (data.code == 205 && data.result.advance_order_id) {
                    $scope.checkcode_close();
                    $scope.status = 2;
                    poll(data.result.advance_order_id);
                }
                else if (data.code == 201) {
                    $scope.toast = popupService.openToast('提示', '请输入正确的验证码');
                    setTimeout(function() {
                        $scope.toast = popupService.closeToast();
                        $scope.$apply();
                        $scope.checkcode_open();
                    }, 3000);
                    return;

		}
	    	else if (data.code == 207) {
                    $scope.toast = popupService.openToast('提示', '您的APP版本过低');
                    setTimeout(function() {
                        $scope.toast = popupService.closeToast();
                        $scope.$apply();
                        $scope.checkcode_open();
                    }, 3000);
                    return;

		}
	       	else {
                    $scope.checkcode_close();
                    $scope.buy = buyService.buyEnd();
                    $rootScope.dealStatus[$scope.dealId] = 1;
                    return;
                }
            })
        };

        /**
         * poll check
         * @param {varType} advance_order_id Description
         * @return {void} description
         */
        var poll = function(advance_order_id) {
            var poll_count = 0;
            var poll_timer = setInterval(function() {
                $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/poll?advance_order_id=' + advance_order_id + '&dealgroup_id=' + $scope.dealId + '&city_id=' + $rootScope.cityid + '&callback=JSON_CALLBACK').success(function(data) {
                    if (data.code == 200 && data.result.url) {
                        $scope.checkcode_flag = 0;
                        clearInterval(poll_timer);
                        location.href = data.result.url;
                        return;
                    }
	    	    else if (data.code == 201) {
                        $scope.status = 1;
                        $scope.storage_flag = 1;
                        $scope.buy = buyService.buyEnd();
                        $rootScope.dealStatus[$scope.dealId] = 1;
                        clearInterval(poll_timer);
                        $scope.checkcode_flag = 0;
                        $scope.checkcode_open = 0;
                        return;
                    }
		    else if (data.code == 205) {
                        $scope.checkcode_flag = 0;
                        if (poll_count > 5) {
                            clearInterval(poll_timer);
                        }
                        poll_count++;
                        return;
                    } else {
                        $scope.checkcode_flag = 0;
                        $scope.status = 1;
                        $scope.storage_flag = 1;
                        $scope.buy = buyService.buyEnd();
                        $rootScope.dealStatus[$scope.dealId] = 1;
                        clearInterval(poll_timer);
                        $scope.checkcode_open = 0;
                        return;
                    }
                })
            }, 2000);
        };

        /**
         * view control
         */
        $scope.storage_close = function() {
            $scope.storage_flag = 0;
        };
        $scope.storage_flag = 0;
        $scope.remind_open = function() {
            $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/join?city_id=' + $rootScope.cityid + '&dealgroup_id=' + $scope.dealId + '&mobile=' + $scope.phone_num + '&callback=JSON_CALLBACK').success(function(data) {
                if (data.code == 200) {
                    $scope.toast = popupService.openToast('设置成功', '开抢前您将收到购买提醒');
                    $scope.remind = popupService.closeRemind();
                    setTimeout(function() {
                        $scope.toast = popupService.closeToast();
                        $scope.$apply();
                    }, 3000);
                } else {
                    $scope.remind = popupService.openRemind();
                }
            });
        };
        $scope.remind_close = function() {
            $scope.remind = popupService.closeRemind();
        }
        $scope.checkcode_open = function() {
            $scope.checkcode_num = "";
            $scope.checkcode_flag = 1;
            $scope.checkcode_overlay = 1;
            $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/gen-captcha?dealgroup_id=' + $scope.dealId + '&city_id=' + $rootScope.cityid + '&token=!&callback=JSON_CALLBACK').success(function(data) {
                if (data.code == 203) {
                    $scope.checkcode_close();
		    location.href = data.result.login_url;
                    return;
                }
                if (data.code == 200) {
                    $scope.checkcode_show = data.result.code;
                }
            })
        }
        $scope.checkcode_close = function() {
            $scope.checkcode_flag = 0;
            $scope.checkcode_overlay = 0;
        }

        /**
         * remind check
         * @return {void} description
         */
        $scope.remindajax = function() {
            if (!/1[3-8]+\d{9}/.test($scope.phone_num)) {
                $scope.toast.title = '提示';
                $scope.toast.words = '请输入正确得手机号';
                $scope.toast.words_flag = 1;
                setTimeout(function() {
                    $scope.toast.words_flag = 0;
                    $scope.$apply();
                }, 3000);
                return;
            };
            $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/join?city_id=' + $rootScope.cityid + '&dealgroup_id=' + $scope.dealId + '&mobile=' + $scope.phone_num + '&callback=JSON_CALLBACK').success(function(data) {
                switch (data.code) {
                    case 200:
                        $scope.toast = popupService.openToast('设置成功', '开抢前您将收到购买提醒');
                        break;
                    case 201:

                        $scope.toast = popupService.openToast('设置成功', '您已经设置过提醒');
                        break;

                    case 202:
                        $scope.toast = popupService.openToast('设置失败', '请供手机号码');
                        break;

                    case 203:
                        $scope.remind = popupService.closeRemind();
                        location.href = data.result.login_url;
                        break;

                    case 400:
                        $scope.toast = popupService.openToast('设置失败', '参数错误');
                        break;
                }
                $scope.remind = popupService.closeRemind();
                setTimeout(function() {
                    $scope.toast = popupService.closeToast();
                    $scope.$apply();
                }, 3000);

            });
        }
    }
]);

