

'use Strict';
/*module definition
 * containing dependency for autocomplete, routing
 * */
angular.module("shell", ["angucomplete-alt","ngRoute", "route-segment", "view-segment","rzModule"]);

/*configuring the routing segment of the flightsearch App
 * it configures the internal routing of the template inside page
 * */
angular.module('shell').config(['$routeProvider', '$routeSegmentProvider',
    function ($routeProvider, $routeSegmentProvider) {
        $routeSegmentProvider.options.autoLoadTemplates = true;
        $routeSegmentProvider
                .when('/onewayResult', 'onewayResult')  
                .when('/twowayResult', 'twowayResult')  
                .when('/dummysplash', 'dummysplash') 
                .when('/book','book')
                .segment('onewayResult', {appLevel: 0, templateUrl: 'modules/searchComponent/views/oneWayResult.html'})                   
                .segment('twowayResult', {appLevel: 0, templateUrl: 'modules/searchComponent/views/twoWayResult.html'})                   
                .segment('dummysplash', {appLevel: 0, templateUrl: 'modules/searchComponent/views/home.html'})
                .segment('book', {appLevel: 0, templateUrl: 'modules/searchComponent/views/flightBook.html'});
        $routeProvider.otherwise({redirectTo: 'modules/searchComponent/views/home.html'});
    }
]);
/*Navigating to home template as soon as app is configured*/
angular.module('shell').run(['navigationService',
		function(navigationService) {
                   navigationService.navigateToSegment('dummysplash');
	}
]);