/* Project Name :AIM for Seva
Filename : projectCtrl.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from client-side
Author : Deekshitha(id:T0002)
*/

angular.module('projectmasterctrl', ['angularUtils.directives.dirPagination', 'commonServices'])
    .controller('projectCtrl', function($http, $state, $timeout, $scope, commonFactory) {
        var app = this;
        var url = 'project'; //calling the url to fetch the data
        var currentUrl = $state.$current;
        var split = currentUrl.toString().split('.');

        $scope.activeUrl = split;
        $scope.enabledEdit = [];
        $scope.editproj = function(index) {
            $scope.enabledEdit[index] = true;
        }

        var countryName = function() {
            var url = 'state';
            $scope.country = []; //declare an empty array
            commonFactory.countryRecord(url).then(function successCallback(response) {
                $scope.country = response.data;
            });
        };
      
        $scope.getselectval = function() {
            $scope.country_code = $scope.regData.selitem.country_code;
            searchAllStateName($scope.country_code);
        }

        var searchAllStateName = function(country_code) {
            var url = 'donor';  
            $scope.stateName = []; //declare a empty array to store donor details
            commonFactory.stateRecordById(url, country_code).then(function successCallback(response) {
                $scope.stateName = response.data;
            });
        }

        $scope.getSelectcategoryName = function() {
            $scope.project_category_id = $scope.regData.selitemcategory.project_category_id;
        }

        var searchAllprojectcategoryName = function() {
            $scope.projectcategoryName = []; //declare a array to store all the project details
            commonFactory.allprojectcategorynameRecord(url).then(function successCallback(response) {
                $scope.projectcategoryName = response.data;
            });
        }
    
        //reset functionality
        var refresh = function() {
            $scope.countryMaster = []; //declare an empty array
            commonFactory.allRecord(url).then(function successCallback(response) {
                $scope.countryMaster = response.data;
            });
            $scope.sort = function(keyname) {
                $scope.sortKey = keyname; //set the sortKey to the param passed
                $scope.reverse = !$scope.reverse; //if true make it false and vice versa
            }
        };

        refresh(); //calling function
        countryName(); //calling function
        searchAllprojectcategoryName(); //calling function

        //function to perform insert operation from client-side
        $scope.setProject = function(regData) {
            swal({ //pop-up a alert message for the confirmation
                    title: "Are you sure you want to save ?",
                    icon: "success",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willSave) => {
                    if (willSave) {
                        //rest api calling the webservices
                        commonFactory.create(regData, url).then(function(data) {
                            if (data.data.success) {
                                $timeout(function() {
                                    $state.go('home.project');
                                }, 2000)
                                swal("Poof! Your record has been save!", {
                                    icon: "success",
                                });
                                refresh();
                            } else {
                                swal("Poof! Please check Project values!", {
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

        //function to perform update operation from client-side
        $scope.update = function(user) {
            swal({
                    title: "Are you sure?",
                    text: "you want to udpate this record !",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willUpdate) => {
                    if (willUpdate) {
                         //rest api calling the webservices
                        commonFactory.updateRecord(user, user.project_id, url).then(function(data) {
                            refresh();
                        });
                        swal("Your record has been updated!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your record is safe!");
                    }
                });
        }
        
        //function to perform delete operation from client-side
        $scope.remove = function(project_id) {
            swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this record !",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        //rest api calling the webservices
                        commonFactory.removeRecord(url, project_id).then(function successCallback(response) {
                            refresh();
                        });
                        swal("Poof! Your record has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your record is safe!");
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