/* Directives */

var skDirectives = angular.module('skDirs', []);


skDirectives.directive('dealistWannajoin', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: "<span class='wantbuy'><span ng-transclude></span>人想买</span>"
    };
})

skDirectives.directive('dealistBuy', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: "<span ng-click='redirect()' class='wantbuy' ng-click=''>抢</span>",
        controller: function($scope, $element, $attrs, $transclude, $location) {
            $scope.redirect = function() {
                // $location.path('http://www.baidu.com');
            };
        }
    };
})


skDirectives.directive('timer', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: "<div class='timer'><span class='transfer-hour'>{{hour}}</span>时<span class='transfer-minute'>{{minute}}</span>分<span class='transfer-second'>{{second}}</span>秒</div>",
        controller: function($scope, $element, $attrs, $transclude, $http) {

            var hT = 60 * 60 * 1000,
                mT = 60 * 1000,
                sT = 1000,
                count = 61;

            var timer=setInterval(
                function() {
                    count++;
                    if (count > 60) {
                        $http.get('../../mock/realtime.json').success(function(data) {
                         $scope.coming_seconds = data.coming_seconds;
                        });
                        count = 0;
                    }
                    if ($scope.coming_seconds == 0) {
                        $scope.$parent.status = 1;
			clearInterval(timer);
                    }
		    else{
		    	$scope.$parent.status = 0;
		    }
                    $scope.coming_seconds = $scope.coming_seconds - 1000;

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
    };
})
