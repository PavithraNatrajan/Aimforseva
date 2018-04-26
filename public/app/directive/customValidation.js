/* Project Name :AIM for Seva
Filename : customValidation.js 
Purpose / Functionality: Creating a Custom directivr for validation
Author : Rajesh(id:T0003)
*/

var app = angular.module('myApp', []);

app.controller("customValidation", function($scope) {

    $scope.reset = function(form) {
        $scope.regData = {};
        $scope.form.$setPristine();
        $scope.form.$setUntouched();
        $scope.form.$setDirty();
    };

});

app.directive("code", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.code = parseInt(attrs.code);


            element.bind("keypress", function(e) {


                if (this.value.length == scope.code) e.preventDefault();

            });
        }
    }
}]);

app.directive("cityName", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.cityName = parseInt(attrs.cityName);


            element.bind("keypress", function(e) {


                if (this.value.length == scope.cityName) e.preventDefault();

            });
        }
    }
}]);

app.directive("countryName", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.countryName = parseInt(attrs.countryName);


            element.bind("keypress", function(e) {


                if (this.value.length == scope.countryName) e.preventDefault();

            });
        }
    }
}]);

app.directive("projectCode", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.projectCode = parseInt(attrs.projectCode);


            element.bind("keypress", function(e) {


                if (this.value.length == scope.projectCode) e.preventDefault();
            });
        }
    }
}]);

app.directive("projectName", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.projectName = parseInt(attrs.projectName);


            element.bind("keypress", function(e) {


                if (this.value.length == scope.projectName) e.preventDefault();

            });
        }
    }
}]);

app.directive("maintenance_code", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.maintenance_code = parseInt(attrs.maintenance_code);


            element.bind("keypress", function(e) {


                if (this.value.length == scope.maintenance_code) e.preventDefault();

            });
        }
    }
}]);

app.directive("maintenance_type", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.maintenance_type = parseInt(attrs.maintenance_type);


            element.bind("keypress", function(e) {


                if (this.value.length == scope.maintenance_type) e.preventDefault();
            });
        }
    }
}]);

app.directive("sub_type", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.sub_type = parseInt(attrs.sub_type);


            element.bind("keypress", function(e) {


                if (this.value.length == scope.sub_type) e.preventDefault();

            });
        }
    }
}]);

app.directive("project_category_id", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.project_category_id = parseInt(attrs.project_category_id);


            element.bind("keypress", function(e) {


                if (this.value.length == scope.project_category_id) e.preventDefault();
            });
        }
    }
}]);

app.directive("smsContent", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.smsContent = parseInt(attrs.smsContent);


            element.bind("keypress", function(e) {


                if (this.value.length == scope.smsContent) e.preventDefault();

            });
        }
    }
}]);

app.directive("pincode", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.pincode = parseInt(attrs.pincode);


            element.bind("keypress", function(e) {


                if (this.value.length == scope.pincode) e.preventDefault();

            });
        }
    }
}]);

app.directive("addRess", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.addRess = parseInt(attrs.addRess);
            element.bind("keypress", function(e) {
                if (this.value.length == scope.addRess) e.preventDefault();
            });
        }
    }
}]);

app.directive("paymentCode", [function() {
    return {
        restrict: "A",
        link: function($scope, element, attrs) {
            $scope.paymentCode = parseInt(attrs.paymentCode);
            element.bind("keypress", function(e) {
                if (this.value.length == $scope.paymentCode) e.preventDefault();

            });
        }
    }
}]);

app.directive("paymentMode", [function() {
    return {
        restrict: "A",
        link: function($scope, element, attrs) {
            $scope.paymentMode = parseInt(attrs.paymentMode);
            element.bind("keypress", function(e) {
                if (this.value.length == $scope.paymentMode) e.preventDefault();
            });
        }
    }
}]);

app.directive("allowPattern", [allowPatternDirective]);

function allowPatternDirective() {
    return {
        restrict: "A",
        compile: function(tElement, tAttrs) {
            return function(scope, element, attrs) {
                // I handle key events
                element.bind("keypress", function(event) {
                    var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
                    var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.

                    // If the keyCode char does not match the allowed Regex Pattern, then don't allow the input into the field.
                    if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
                        event.preventDefault();
                        return false;
                    }

                });
            };
        }
    };
}

app.directive("roleCode", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.roleCode = parseInt(attrs.roleCode);


            element.bind("keypress", function(e) {


                if (this.value.length == scope.roleCode) e.preventDefault();

            });
        }
    }
}]);

app.directive("role", [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.role = parseInt(attrs.role);


            element.bind("keypress", function(e) {


                if (this.value.length == scope.role) e.preventDefault();

            });
        }
    }
}]);

app.directive("upperCase", [upperCaseF]);

function upperCaseF(a) {
    setTimeout(function() {
        a.value = a.value.toUpperCase();
    }, 1);
}



app.controller("customValidation", function($scope) {
    /// reset function//////

    $scope.checkFun = function(data) {


        for (var i in data) {
            if (data[i].SELECTED == 'Y') {
                $scope.selectedList.push(data[i]);
            }
            if (data[i].SELECTED == 'N') {
                $scope.selectedList.splice(data[i]);
            }
        }
    }
});