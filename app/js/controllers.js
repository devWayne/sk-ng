/* Controllers */

var skControllers = angular.module('skControllers', ['underscore']);

skControllers.controller('skDealistCtrl', ['$scope', '$http', '_','$rootScope',
    function($scope, $http, _,$rootScope) {
        /** share popup **/
        $scope.share_visable = false;
        $scope.share = function() {
            $scope.share_visable = !$scope.share_visable;
        }
        $scope.deals = $rootScope.initDealInfo;

    }
]);

skControllers.controller('skDealCtrl', ['$scope', '$routeParams','$rootScope',
    function($scope, $routeParams,$rootScope) {
        $scope.overlay_flag = 0;
        $scope.dealId = $routeParams.dealId;
    }
]);

skControllers.controller('skCtrl', function($scope) {
    
});
