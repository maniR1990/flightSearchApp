/**
 * navigationService
 */
angular.module('shell').service('navigationService', ['$rootScope', '$log','$route','$routeSegment', '$window', '$location',

    function navigationService($rootScope,$log, $route,$routeSegment, $window, $location) {
        var self = this;
        this.toString = function(state) {
            angular.forEach(this.registry.history, function(value, key) {
                $log.warn('key : value==> ' + key + ": " + value);
            });
        };

        this.registry = {
            currentRoute: {
            },
            searchParams:null,
            history: [],
            allowTraversal: false
        };

        this.navigate = function(url, searchContext){
            $location.path(url).search(searchContext);
        };        

        this.navigateToSegment = function(segmentName, routeContext,searchContext) {
        	//alert("nav"+segmentName);
                var url = "#";
                var searchContext = searchContext || {};
                var routeContext  = routeContext || {};
                url = $routeSegment.getSegmentUrl(segmentName,routeContext);
                $location.path(url).search(searchContext);
          };
        
        this.addToHistory = function(route) {
            var lastRecordedRoute = _.last(this.registry.history);
            if ( lastRecordedRoute== null ||
                 lastRecordedRoute.segmentName !== route.segmentName  ||
                 lastRecordedRoute.routeParams !== route.routeParams  ||
                 lastRecordedRoute.searchParams !== route.searchParams  ||
                 lastRecordedRoute.url !== route.url){
                this.registry.history.push(route);
            }
            this.registry.currentRoute = route;
            this.registry.currentRoute.level = findAppHierarchyLevel(route.segmentName, route.routeSegmentInfo);
        };
        
        var navigateWithState = function(history){
            self.navigateToSegment (history.segmentName, history.routeParams, history.searchParams);
        };
        var findAppHierarchyLevel = function(segmentName,routeSegmentInfo) {
            var appHierarchyLevel = 0;
            if(segmentName== null)
                return 0;
            if(routeSegmentInfo!= null)
            {
              var lastSegment = _.last(routeSegmentInfo);
              appHierarchyLevel = lastSegment.params.appLevel; 
            }
            //"Layout="+routeSegmentInfo.length;
            return  appHierarchyLevel ; 
        };
  
        this.goBack = function() {
            // TODO:Do we need to ask ? && additional checks
            // When do we reset history.          
            this.registry.history.pop();
            var previousContext = _.last(this.registry.history);
            if(previousContext != null ) {
                //$window.history.back();
                //Another Pop is required 
                //because we are not using browser back.
                this.registry.history.pop();
               // $rootScope.$emit("showPacsView", false, null);
                //navigateWithState(previousContext); //TODO: reintroduce when back US going to be implemented
            }
         };

        this.canGoBack = function() {
            return (this.registry.history.length > 1);
        };

        this.backFunc = function() {
            if (self.canGoBack()) {
                if (typeof ($window.history) !== "undefined") {
                    self.goBack();
                }
            }
            else {
            	//LMD-10662 - application close 
                //WL.App.close();
            }
        };

    }
]);