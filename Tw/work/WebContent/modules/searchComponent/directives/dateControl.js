
angular.module("shell").directive('dateCtrl', [function () {
        return{
            "restrict": "EA",
            "scope": {
                "dateObj": "="
            },
            "link": function (scope, elem, attr) {
                var elem = angular.element(elem);

                elem.datepicker({
                    minDate: 0,
                    maxDate: (365),
                    onSelect: function (dateText, inst) {
                        var dateAsString = dateText; //the first parameter of this function
                        var dateAsObject = $(this).datepicker('getDate'); //the getDate method
                        scope.dateObj = dateAsObject;
                        scope.$apply();
                    },
                    beforeShowDay: function (d) {
                        var a = new Date(2016, 5, 01);
                        var b = new Date(2016, 5, 05);
                        return [true, a <= d && d <= b ? "my-class" : ""];
                    }});

                scope.$on('delDate', function (event, args) {
                    scope.dateObj = null;
                    elem.val('');
                     scope.$apply();
                    // do what you want to do
                });


            }
        }
    }]);