/* Directives */

var skDirectives=angular.module('skDirs',[]);

skDirectives.directive('popupShare',function(){
	return{
	restrict:'E',
	replace:true,
	template:"<div class='ng-modal' ng-show='show'>ng-transclude<div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content'></div></div></div>"	
	};
});


skDirectives.directive('dealistWannajoin',function(){
	return{
	restrict:'E',
	replace:true,
	transclude:true,
	template:"<span class='wantbuy'><span ng-transclude></span>人想买</span>"	
	};
})

skDirectives.directive('dealistBuy',function(){
	return{
	restrict:'E',
	replace:true,
	transclude:true,
	template:"<span class='wantbuy' ng-click=''>抢</span>",
	link: function(scope, elem, attrs, ctrl) { 
       		scope.setDirection = function(){
                    location.href="http://www.baidu.com";
                };
	}
	};
})
