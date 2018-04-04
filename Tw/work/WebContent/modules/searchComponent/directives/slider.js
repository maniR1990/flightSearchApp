
"use strict";
angular.module("shell").directive('slider',[function(){
        return{
            "restrict":"EA",
            "scope":{                
            },
            "link":function(scope,elem,attr){
                var elem = angular.element(elem);
                elem.slider({
                    range:true,
                    min:400,
                    max:10000,
                    values: [ 750, 10000 ]
                });
                
            }
        }
}]);

