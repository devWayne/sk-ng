/* Services */

var skServices = angular.module('skServices', []);

skServices.factory('Service', ['$http', 'baseAjaxService',

    function($http, baseAjaxService) {
        return {
            getDealist: baseAjaxService._jsonp('')
	}
    }
]);


skServices.factory('baseAjaxService', ['$http',
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

skServices.factory('popupService', function() {
    return {
	    openToast:function(title,words){
	    	return {
			title:title,
			words:words,
			words_flag:1,
			overlay_flag:1
		}
	    },
	    closeToast:function(){
	    	return{
			words_flag:0,
			overlay_flag:0
		}
	    },
	    openRemind:function(){
	    	return{
			remind_flag:1,
			overlay_flag:1	
		}
	    },
	    closeRemind:function(){
	    	return{
			remind_flag:0,
			overlay_flag:0
		}
	    }
    }
});
