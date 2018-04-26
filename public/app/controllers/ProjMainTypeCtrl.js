/* Project Name :AIM for Seva
Filename : ProjMainTypeCtrl.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from client-side
Author : Pavithra(id:T0002)
*/

angular.module('maintenancetypeapp', ['angularUtils.directives.dirPagination', 'commonServices'])
    .controller('MaintenanceTypeCtrl', function($http, $state, $timeout, $scope, commonFactory) {
        var app = this;
        var url = 'ProMainType'; //calling the url to fetch the data
        var currentUrl = $state.$current;
        var split = currentUrl.toString().split('.');

        $scope.activeUrl = split;
        $scope.enabledEdit = [];

        $scope.editTemp = function(index) {
            $scope.enabledEdit[index] = true;
        }

        var allPro = function() {
            $scope.allPMaster = []; //declare a empty to store all the Project Category
            MasterFactory.allProjectRecord(url).then(function successCallback(response) {
                $scope.allPMaster = response.data;
            });
        };

         //a function to display the Project Category based on project category_id
        $scope.getselectedvalue = function() {
            $scope.project_category_id = $scope.regData.selitem.project_category_id;
            searchAllProName($scope.project_category_id);
        }

        //a function to search a project category based on the id
        var searchAllProName = function(project_category_id) {
            var url = 'ProMainType';
            $scope.pname = [];
            MasterFactory.searchRecordById(url, project_category_id).then(function successCallback(response) {
                $scope.pname = response.data;
            });
        }

        //refresh functionality
        var refresh = function() {
            $scope.projectMaintenanceType = []; //declare an empty array
            commonFactory.allRecord(url).then(function successCallback(response) {
                $scope.projectMaintenanceType = response.data;
            });
            $scope.sort = function(keyname) {
                $scope.sortKey = keyname; //set the sortKey to the param passed
                $scope.reverse = !$scope.reverse; //if true make it false and vice versa
            }
        };

        refresh(); //calling function
        allPro(); //calling function

        //function to perform insert operation from client-side
        $scope.setProjectMaintenanceType = function(regData) {
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
                                    $state.go('home.projectMaintenanceType');
                                }, 2000)
                                swal("Your record has been saved!", {
                                    icon: "success",
                                });
                                refresh();
                            } else {
                                swal("check the data!", {
                                    icon: "warning",
                                });
                            }
                        });
                    } else {
                        swal({
                            title: "Your Record Is Not Saved",
                            text: "No New Record Added....!",
                            icon: "warning",
                            button: "OK",
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
                        commonFactory.updateRecord(user, user.maintenance_id, url).then(function(data) {
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
        $scope.remove = function(maintenance_id) {
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
                        commonFactory.removeRecord(url, maintenance_id).then(function successCallback(response) {
                            refresh();
                        });
                        swal("Your record has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your record is safe!");
                    }
                });
        }

        //function to refresh the input fields after adding a record successfully
        $scope.reset = function(form) {
            $scope.regData = {};
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            $scope.form.$setDirty();
        };
    });
