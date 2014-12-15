/* Controllers */

var dealistControllers = angular.module('dealistControllers', ['dealistServices']);

dealistControllers.controller('skDealistCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {

        /** share popup **/
        $scope.share_visable = false;
        $scope.now_deals = [];
        $scope.share = function() {
            $scope.share_visable = !$scope.share_visable;
        }


        /**
         *  dealist init
         */
        if ($rootScope.dealgroups.length == 0) {
            $http.jsonp('http://tgapp.51ping.com/qiang/ajax/nt/list?city_id=' + $rootScope.cityid + '&callback=JSON_CALLBACK').success(function(data) {
                if (data.result == undefined) {
                    return;
                }
                if (data.result.current[0] != undefined) {
                    $rootScope.dealgroups[0] = data.result.current[0].dealgroups;
                    $rootScope.allDeals = angular.extend($rootScope.allDeals, $rootScope.dealgroups[0]);
                }

                angular.forEach($rootScope.dealgroups[0], function(idx, value) {
                    if (idx.status == 2) {
                        $rootScope.dealStatus[idx.id] = 1;
                    }
                });
                if (data.result.current[1] != undefined) {
                    $rootScope.dealgroups[1] = data.result.current[1].dealgroups;
                    $rootScope.allDeals = angular.extend($rootScope.allDeals, $rootScope.dealgroups[1]);
                }
                $rootScope.nextdealgroups = data.result.next.dealgroups;
                $rootScope.allDeals = angular.extend($rootScope.allDeals, $rootScope.nextdealgroups);
                angular.forEach($rootScope.nextdealgroups, function(idx, value) {
                    $rootScope.dealStatus[idx.id] = 2;
                })
                $rootScope.nexttime = data.result.next.time;
                $scope.rich_buttons = data.result.rich_buttons;
                $scope.now_deals[0] = $rootScope.dealgroups[0];
                $scope.now_deals[1] = $rootScope.dealgroups[1];
                $scope.next_deals = $rootScope.nextdealgroups;
            });
        } else {
            $scope.now_deals[0] = $rootScope.dealgroups[0];
            $scope.now_deals[1] = $rootScope.dealgroups[1];
            $scope.next_deals = $rootScope.nextdealgroups;
        }
    }
]);

      
