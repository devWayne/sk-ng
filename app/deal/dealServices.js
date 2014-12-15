/* Services */

var dealServices = angular.module('dealServices', []);

dealServices.factory('popupService', function() {
    return {
        openToast: function(title, words) {
            return {
                title: title,
                words: words,
                words_flag: 1,
                overlay_flag: 1
            }
        },
        closeToast: function() {
            return {
                words_flag: 0,
                overlay_flag: 0
            }
        },
        openRemind: function() {
            return {
                remind_flag: 1,
                overlay_flag: 1
            }
        },
        closeRemind: function() {
            return {
                remind_flag: 0,
                overlay_flag: 0
            }
        }
    }
});


