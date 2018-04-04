angular.module("shell").factory('flightService',['$http','$q','$log',function($http,$q,$log){
	 return {
		
		    getFlightData: function() {		
		      var deferred = $q.defer();		
		      $http.get('modules/searchComponent/models/flightModels.json')		
		        .success(function(data) { 		        	
		           deferred.resolve(data);		
		        }).error(function(msg, code) {		 
		           deferred.reject(msg);		
		           $log.error(msg, code);		
		        });		
		      return deferred.promise;		
		    }
		
		   }

}]);