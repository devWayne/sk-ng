/* Directives */

var skDirectives = angular.module('skDirs', []);


skDirectives.directive('dealistWannajoin', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: "<span class='wantbuy'><span ng-transclude></span>人想买</span>"
    };
});

skDirectives.directive('dealistBuy', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: "<span class='{{class}}'>{{words}}</span>",
        controller: function($scope, $element, $attrs, $transclude, $rootScope) {
            if ($rootScope.dealStatus[$scope.$parent.deal.dealId] == 0) {
                $scope.words = "抢光了";
                $scope.class = "wantbuy";

            } else {
                $scope.words = "抢"
            }
        }
    }
});

skDirectives.directive('dealBuy', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<a href="javascript:void(0)" class="deal-buy J-deal-buy-btn deal-buy-z">{{words}}</a>',
        controller: function($scope, $element, $attrs, $transclude, $rootScope) {
            if ($rootScope.dealStatus[$scope.$parent.dealId] == 0) {
                $scope.words = "抢光了";
                $scope.class = "wantbuy";

            } else {
                $scope.words = "抢"
            }
        }
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
	$scope.$parent.status=$rootScope.status;
        $scope.coming_seconds = $rootScope.init_seconds;
        var timer = setInterval(
            function() {
                count++;
                if (count > 60) {
                    $http.get('../../mock/realtime.json').success(function(data) {
                        $scope.coming_seconds = data.coming_seconds;
                    });
                    count = 0;
                }
		 $scope.coming_seconds = $scope.coming_seconds - 1000;
                if ($scope.coming_seconds < 0 || $scope.coming_seconds == 0) {
                    $scope.$parent.status = 1;
                    clearInterval(timer);
                } else {
                    $scope.$parent.status = 0;
                }
               
                $scope.hour = _div($scope.coming_seconds, hT);
                $scope.minute = _div(($scope.coming_seconds - $scope.hour * hT), mT);
                $scope.second = _div(($scope.coming_seconds - $scope.hour * hT - $scope.minute * mT), sT);
                $scope.$apply();
            }, 1000);


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
