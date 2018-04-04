
"use strict";
/*
 *  defined scope constant for passenger list, point of travel.
 *  defined form value for oneway and return search 
 *  get the generated static json data from flightService
 *  form validation from json data 
 *  search manipulation from json data 
 */

/* search controller Manages overAll functionality of the App. 
 * it manages following functionality 
 *                  1.constant
 *                  2.formvalues
 *                  3.getFlightService
 *                  4.Navigation
 *                  5.search operation
 *                      5.a. filterFLightData by Date
 *                      5.b. filter the above filtered data by from and to place
 *                  6.validation
 *                  7.book operation
 *                  */

angular.module("shell").controller('searchControl', function ($scope, flightService, $log, $filter, navigationService) {

    /*----defined scope constant for passenger list, point of travel.----*/
    $scope.passenger = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    $scope.places = [{"title": "Chennai", "code": "MAA"},
        {"title": "Delhi", "code": "DEL"}, {"title": "Bengaluru", "code": "BLR"},
        {"title": "Mumbai", "code": "BOM"}
    ]
    /*----------------------------------------------------------------------------*/
    /*----get the static json data  from flightService----*/
    $scope.getFlightData = flightService.getFlightData();
    $scope.getFlightData.then(function (data) {
        $scope.flightData = data;
    });
    /*----------------------------------------------------------------------------*/
    /*----Defining form Model object----*/
    /*oneWay Search Form Model obj, range control object*/
    $scope.oneWay = {
        "travelfrom": "",
        "travelto": "",
        "depatureDate": "",
        "passengerCount": ""
    };
    /*twoWay Search Form Model obj*/
    $scope.twoWay = {
        "travelfrom": "",
        "travelto": "",
        "depatureDate": "",
        "returnDate": "",
        "passengerCount": ""
    };
    $scope.slider = {
			  minValue: 1000,
			  maxValue: 8008,
			  options: {
			    floor: 1000,
			    ceil: 10000,
			    draggableRange: true
			  }
			};
    /*----------------------------------------------------------------------------*/
    /*---------------- validation part for one/two way form  -------------------*/
    /*the following below  method  gives the  selected value from the autocomplete list
     *methodName: oneWayFrom, oneWayTo, twoWayFrom, twoWayTo
     **All these method does the validation part, so that both the origin and destination places cannot be same**/

    $scope.oneWayFrom = function (selection) {
        if ($scope.oneWay.travelto) {
            if (selection !== undefined) {
                $scope.oneWay.travelfrom = selection.originalObject;
                if ($scope.oneWay.travelfrom.code == $scope.oneWay.travelto.code) {
                    alert("Origin and destination place cannot be same, please try again");
                    $scope.clearInput("ex1");
                    $scope.oneWay.travelfrom = "";
                }
            }
        } else {
            if (selection !== undefined) {
                $scope.oneWay.travelfrom = selection.originalObject;
            }
        }
    };
    /*the following below  method  gives the  selected value from the autocomplete list
     *methodName: oneWayFrom, oneWayTo, twoWayFrom, twoWayTo
     **All these method does the validation part, so that both the origin and destination places cannot be same**/

    $scope.oneWayTo = function (selection) {
        if (selection !== undefined) {
            $scope.oneWay.travelto = selection.originalObject;
            if ($scope.oneWay.travelfrom.code == $scope.oneWay.travelto.code) {
                alert("Origin and destination place cannot be same, please try again");
                $scope.clearInput("ex2");
                $scope.oneWay.travelto = "";
            }
        }
        ;
    };
    /*the following below  method  gives the  selected value from the autocomplete list
     *methodName: oneWayFrom, oneWayTo, twoWayFrom, twoWayTo
     **All these method does the validation part, so that both the origin and destination places cannot be same**/

    $scope.twoWayFrom = function (selection) {
        if ($scope.twoWay.travelto) {
            if (selection !== undefined) {
                $scope.twoWay.travelfrom = selection.originalObject;
                if ($scope.twoWay.travelfrom.code == $scope.twoWay.travelto.code) {
                    alert("Origin and destination place cannot be same, please try again");
                    $scope.clearInput("ex3");
                    $scope.twoWay.travelfrom = "";
                }
            }
        } else {
            if (selection !== undefined) {
                $scope.twoWay.travelfrom = selection.originalObject;
            }
        }
    };
    /*the following below  method  gives the  selected value from the autocomplete list
     *methodName: oneWayFrom, oneWayTo, twoWayFrom, twoWayTo
     **All these method does the validation part, so that both the origin and destination places cannot be same**/
    $scope.twoWayTo = function (selection) {
        if (selection !== undefined) {
            $scope.twoWay.travelto = selection.originalObject;
            if ($scope.twoWay.travelfrom.code == $scope.twoWay.travelto.code) {
                alert("Origin and destination place cannot be same, please try again");
                $scope.clearInput("ex4");
                $scope.twoWay.travelto = "";
            }
        }
        ;
    };

    /* this method is used to clear autocomplete text box 
     * used while validation */
    $scope.clearInput = function (id) {
        if (id) {
            $scope.$broadcast('angucomplete-alt:clearInput', id);
        }
    };
    /*----------------------------------------------------------------------------*/
    /*---------------- search operation for one/two way form  -------------------*/

    $scope.oneWayForm = function () {
        if ($scope.oneWay.travelfrom) {
            if ($scope.oneWay.travelto) {
                var filteredDateObj = [];
                var filteredFromObj = [];
                var filteredToObj = [];
                var seatAvail = [];
                var oneWayDeptDate = new Date($scope.oneWay.depatureDate);
                angular.forEach($scope.flightData, function (value, key) {
                    var filterDate = $filter('date')(new Date(value.travelfromdatetime), "MM/dd/yyyy");
                    var deptDate = new Date(filterDate);
                    if (oneWayDeptDate.getTime() == deptDate.getTime()) {
                        filteredDateObj.push(value);
                    }
                });


                angular.forEach(filteredDateObj, function (value, key) {
                    if (value.travelfrom == $scope.oneWay.travelfrom.code) {
                        filteredFromObj.push(value);
                    }
                    ;
                });

                angular.forEach(filteredFromObj, function (value, key) {
                    if (value.travelto == $scope.oneWay.travelto.code) {
                       
                        filteredToObj.push(value);
                    }
                    ;
                });

                $scope.oneWayData = filteredToObj;
                navigationService.navigateToSegment('onewayResult');
            }
            else {
                alert("please select destination");
            }
        }
    };
    $scope.twoWayForm = function () {
        var filteredDeptDateObj = [];
        var filteredDeptFromObj = [];
        var filteredDeptToObj = [];
        var filteredArrDateObj = [];
        var filteredArrFromObj = [];
        var filteredArrToObj = [];

        var twoWayDeptDate = new Date($scope.twoWay.depatureDate);
        var twoWayArrDate = new Date($scope.twoWay.returnDate);

        if (twoWayArrDate.getTime() >= twoWayDeptDate.getTime()) {
            angular.forEach($scope.flightData, function (value, key) {
                var filterDate = $filter('date')(new Date(value.travelfromdatetime), "MM/dd/yyyy");
                var deptDate = new Date(filterDate);
                if (twoWayDeptDate.getTime() == deptDate.getTime()) {
                    filteredDeptDateObj.push(value);
                }
            });

            angular.forEach(filteredDeptDateObj, function (value, key) {
                if (value.travelfrom == $scope.twoWay.travelfrom.code) {
                    filteredDeptFromObj.push(value);
                }
                ;
            });

            angular.forEach(filteredDeptFromObj, function (value, key) {
                if (value.travelto == $scope.twoWay.travelto.code) {

                    filteredDeptToObj.push(value);
                }
                ;
            });
            $scope.twoWayOnwardData = filteredDeptToObj;
            /*----------------------------------------------------------------------------*/
            angular.forEach($scope.flightData, function (value, key) {
                var filterDate = $filter('date')(new Date(value.travelfromdatetime), "MM/dd/yyyy");
                var arrDate = new Date(filterDate);
                if (twoWayArrDate.getTime() == arrDate.getTime()) {
                    filteredArrDateObj.push(value);
                }
            });

            angular.forEach(filteredArrDateObj, function (value, key) {
                if (value.travelfrom == $scope.twoWay.travelto.code) {
                    filteredArrFromObj.push(value);
                }
                ;
            });

            angular.forEach(filteredArrFromObj, function (value, key) {
                if (value.travelto == $scope.twoWay.travelfrom.code) {
                    filteredArrToObj.push(value);
                }
                ;
            });



            $scope.twoWayReturnData = filteredArrToObj;
            navigationService.navigateToSegment('twowayResult')
        }
        else {
            alert("arrival date cannot be lesser than departure Date");
        }
    };

    $scope.bookFlight = function () {
        $scope.oneWay = {
            "travelfrom": "",
            "travelto": "",
            "depatureDate": null,
            "passengerCount": ""
        };
        $scope.twoWay = {
            "travelfrom": "",
            "travelto": "",
            "depatureDate": null,
            "returnDate": null,
            "passengerCount": ""
        };

        $scope.$broadcast('delDate');
        $scope.$broadcast('angucomplete-alt:clearInput');
        navigationService.navigateToSegment('book')
    };
});
