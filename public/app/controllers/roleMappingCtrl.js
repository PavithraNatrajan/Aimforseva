/* Project Name :AIM for Seva
Filename : roleMappingCtrl.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from client-side
Author : Karthick(id:T0003)
*/


angular.module('roleMapctrl', ['angularUtils.directives.dirPagination', 'commonServices'])
    .controller('rolemappingCtrl', function($http, $state, $timeout, $scope, commonFactory) {
        var app = this;
        var url = 'rolemapping';
        var currentUrl = $state.$current;
        var split = currentUrl.toString().split('.');

        $scope.activeUrl = split;
        $scope.enabledEdit = [];
        $scope.editRolemapping = function(index) {
            $scope.enabledEdit[index] = true;
        }

        //refresh functionality
        var refresh = function() {
            $scope.RoleMapping = []; //declare an empty array
            commonFactory.allRecord(url).then(function successCallback(response) {
                $scope.RoleMapping = response.data;
            });
            $scope.sort = function(keyname) {
                $scope.sortKey = keyname; //set the sortKey to the param passed
                $scope.reverse = !$scope.reverse; //if true make it false and vice versa
            }
        };

        var allUserName = function() {
            $scope.userName = []; //declare an empty array to store all the User details
            commonFactory.getAllUser(url).then(function successCallback(response) {
                $scope.userName = response.data;
            });

        };
     
        var allRoles = function() {
            $scope.allRoleMaster = []; //declare an empty array
            $http.get("/rolemapping/getAllList").then(function successCallback(response) {
                $scope.allRoleMaster = response.data;
            });
        }
      
        var allScreens = function() {
            $scope.allScreens = []; //declare an empty array
            $http.get("/rolemapping/getAllScreen").then(function successCallback(response) {
                $scope.allScreens = response.data;
            });
        }

        allUserName(); //calling function
        allRoles(); //calling function
        refresh(); //calling function
        allScreens(); //calling function
        screenbyid(); //calling function

        var screenbyid = function(role_id) {
            $scope.screens = []; //declare an empty array
            commonFactory.searchRecordById(url, role_id).then(function successCallback(response) {
                $scope.screens = response.data;
            });

        }; 

        //function to select a role by its Id
        $scope.select = function(role_id) {
            $scope.role_id = role_id;
            screenbyid($scope.role_id);
        }

        $scope.selectuser = function(user_code) {
            $scope.user_code = user_code;
        }

        $scope.check = function(data, role_id) {
            var arr = [];
            for (var i in data) {
                if (data[i].SELECTED === 'YES') {
                    arr.push(data[i].nav_id);
                }

            }
            setScreenmapping(arr, role_id, url).then(function(results) {
            })
        }

        //function to perform insert operation from client-side
        var setScreenmapping = function(regData, role_id) {         
            swal({ //pop-up a alert message for the confirmation 
                title: "Are you sure you want to save ?",
                icon: "success",
                buttons: true,
                dangerMode: true,
            }).then((willSave) => {
                if (willSave) {
                	 //rest api calling the webservices
                    commonFactory.setDataToScreenmap(regData, role_id, url).then(function(data) {
                        if (data.data.success) {
                            $timeout(function() {
                                $state.go('home.RoleMapping');
                            }, 2000)
                            swal("Poof! Your record has been saved!", {
                                icon: "success",
                            });
                            refresh();
                        } else {
                            swal("Poof! Please Check User Role Already Available !", {
                                icon: "warning",
                            });
                        }
                    });
                } else {
                    swal({
                        title: "Not save!",
                        text: "You clicked the button!",
                        icon: "warning",
                        button: "ok!",
                    });
                }
            });
        }

        //function to perform insert operation from client-side
        $scope.setRolemapping = function(regData) {
            var x = document.getElementById("role_id").value;
            var x1 = document.getElementById("user_code").value;
            swal({
                    title: "Are you sure you want to save ?",
                    icon: "success",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willSave) => {
                    if (willSave) {
                        //rest api calling the webservices
                        commonFactory.setDataToRolemap(x, x1, url).then(function(data) {
                            if (data.data.success) {
                                $timeout(function() {
                                    $state.go('home.RoleMapping');
                                }, 2000)
                                swal("Poof! Your record has been saved!", {
                                    icon: "success",
                                });
                                refresh();
                            } else {
                                swal("Poof! Please Check Role Name Already Available !", {
                                    icon: "warning",
                                });
                            }
                        });
                    } else {
                        swal({
                            title: "Not save!",
                            text: "You clicked the button!",
                            icon: "warning",
                            button: "ok!",
                        });
                    }
                });
        }

        //function to reset the input fields once a record in added successfully
        $scope.reset = function(form) {
            $scope.regData = {};
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            $scope.form.$setDirty();
        };

    });