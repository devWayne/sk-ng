/* Services */

var baseServices = angular.module('baseServices', []);

baseServices.factory('Service', ['$http', 'baseAjaxService',

    function($http, baseAjaxService) {
        return {
            getDealist: baseAjaxService._jsonp('')
        }
    }
]);


baseServices.factory('baseAjaxService', ['$http',
    function($http) {
        return {
            _jsonp: function(url) {
                return $http.jsonp(url);
            },
            _psost: function(url, params) {
                return $http.get(url, {
                    params: params
                });
            }
        }
    }
]);


