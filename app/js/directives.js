/* Directives */

var skDirectives = angular.module('skDirs', [])

skDirectives.directive('dealistBuy', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: "<span class='dealist-buy'>抢</span>",
        controller: function($scope, $element, $attrs, $transclude, $rootScope) {
           if ($rootScope.dealStatus[$scope.$parent.deal.dealId] == 1) {
                $scope.words = "抢光了";
                $scope.class = "wantbuy";

            } else {
                $scope.words = "抢"
                $scope.class = "dealist-buy"
            }    
	}
    }
});

skDirectives.directive('dealBuy', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<a href="javascript:void(0)" ng-click="checkcode_open()" class="deal-buy J-deal-buy-btn {{buy_class}}">{{buy_words}}</a>',
        link: function($scope, $element, $attrs, $transclude, $rootScope) {}
    }
});

skDirectives.directive('countdown', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: "<div class='timer'><span class='transfer-hour'>{{hour}}</span>时<span class='transfer-minute'>{{minute}}</span>分<span class='transfer-second'>{{second}}</span>秒</div>",
        controller: 'timer'
    };
});

skDirectives.controller('timer', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        var hT = 60 * 60 * 1000,
            mT = 60 * 1000,
            sT = 1000,
            count = 1;

        $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/timer?city_id=' + $rootScope.cityid + '&callback=JSON_CALLBACK').success(function(data) {
            $scope.coming_seconds = data.result.coming_seconds * 1000;
            if ($scope.coming_seconds > 0) {
                $rootScope.status = 0;
                $scope.$parent.status = $rootScope.status;
                var timer = setInterval(
                    function() {
                        count++;
                        if (count > 60) {
                            count = 0;
                        }
                        $scope.coming_seconds = $scope.coming_seconds - 1000;
                        if ($scope.coming_seconds < 0 || $scope.coming_seconds == 0) {
                            $scope.$parent.status = 1;
                            $rootScope.status = 1;
                            $rootScope.init_seconds = $scope.coming_seconds;
                            clearInterval(timer);
                        } else {
                            $scope.$parent.status = 0;
                            $rootScope.status = 0;
                            $rootScope.init_seconds = $scope.coming_seconds;

                        }

                        $scope.hour = _div($scope.coming_seconds, hT);
                        $scope.minute = _div(($scope.coming_seconds - $scope.hour * hT), mT);
                        $scope.second = _div(($scope.coming_seconds - $scope.hour * hT - $scope.minute * mT), sT);
                        $scope.$apply();
                    }, 1000);


            } else {
                $rootScope.status = 1;
                $scope.$parent.status = $rootScope.status;
            }
        });

        /** 整除 **/
        function _div(exp1, exp2) {
            var n1 = Math.round(exp1); //四舍五入   
            var n2 = Math.round(exp2); //四舍五入  
            var rslt = n1 / n2; //除  
            if (rslt >= 0) {
                rslt = Math.floor(rslt); //返回小于等于原rslt的最大整数。   
            } else {
                rslt = Math.ceil(rslt); //返回大于等于原rslt的最小整数。   
            }
            return rslt;
        }
    }
]);

skDirectives.controller('win_position',
    function($scope, $element, $attrs, $rootScope, $window) {
        $scope.width = 270;
        $scope.height = 80;
        $scope.top = ($window.innerHeight - $scope.height) / 2;
        $scope.left = ($window.innerWidth - $scope.width) / 2;
        $scope.overlayHeight = $window.innerHeight;
        $scope.overlayWidth = $window.innerWidth;

    });

/* toast */
skDirectives.directive('toast', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
	controller:'win_position',
        template: '<div style="font-size:14px;text-align:center;vertical-align:middle;background-color:rgba(0,0,0,1);z-index:1000;position:fixed;width:{{width}}px;height:{{height}}px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;color:#fff;line-height:40px;left:{{left}}px;top:{{top}}px;padding:10px 0px;"><h3>{{toast.title}}</h3><p>{{toast.words}}</p></div>',
        link: function($scope, $element, $attrs) {

        }
    }
});

skDirectives.directive('remindPopup', function() {
    return {
	    template: '<div class="remind-pop"  style="left:{{left}}px;position:fixed"><h3>请输入手机号码</h3><p>提醒短信会在开抢前10分钟发出</p><p><input type="tel" maxlength="13" class="J-mobileno-remind-input" ng-model="phone_num"></p><div class="buttons"><a href="javascript:void(0);" ng-click="remind_close()" class="J-cancel-remind-btn">取消</a><a href="javascript:void(0);" ng-click="remindajax()" class="J-submit-remind-btn">发送</a></div></div>',
	controller:'win_position',
	restrict: 'E',
        replace: true,
        link: function($scope, $element, $attrs) {

        }

    }
});

/* scroll popup */
skDirectives.directive("scroll", function($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 300) {
                scope.scrollBlk = true;
            } else {
                scope.scrollBlk = false;
            }
            scope.$apply();
        });
    };
});
