/* Filters */

var skFilters = angular.module('skFilters',[]);

skFilters.filter('listBtn',function(){
	return function(input){
	  var join=parseInt(input);
  	  return '<span class="wantbuy"><span>1107</span>人想买</span>';	  
	}
})
