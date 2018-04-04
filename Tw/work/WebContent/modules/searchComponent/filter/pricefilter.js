
angular.module("shell").filter('rangeFilter', function() {
    return function( items, rangeInfo ) {
    	console.log(rangeInfo)
        var filtered = [];
         var min = parseInt(rangeInfo.minValue);
         var max = parseInt(rangeInfo.maxValue);
//         // If time is with the range
        angular.forEach(items, function(item) {
            if( item.price >= min && item.price <= max ) {
                filtered.push(item);
            }
        });
        console.log(filtered);
        return filtered;
    };
});