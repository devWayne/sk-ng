/* Services */

var dealistServices = angular.module('dealistServices', []);

dealistServices.factory('buyService', function() {
    return {
        buyEnd: function() {
            return {
                words: "抢光了",
                classStyle: "deal-buy-o"
            }
        },
        buyStart: function() {
            return {
                words: "抢",
                classStyle: "deal-buy-z"
            }
        }
    }
})
