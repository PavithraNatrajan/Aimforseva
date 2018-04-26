/* Project Name :AIM for Seva
Filename : stateMastterCtrl.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from client-side
Author : Ankit(id:T0003)
*/


angular.module('statemasterctrl', ['angularUtils.directives.dirPagination', 'commonServices'])
    .controller('stateCtrl', function($http, $state, $timeout, $scope, commonFactory) {

        var app = this;
        var url = 'state';  //calling the url to fetch the data
        $scope.enabledEdit = [];

        var currentUrl = $state.$current;
        var split = currentUrl.toString().split('.');

        $scope.activeUrl = split;
        $scope.editState = function(index) {
            $scope.enabledEdit[index] = true;
        }
  
        var countryName = function() {
            $scope.country = []; //declare an empty array
            commonFactory.countryRecord(url).then(function successCallback(response) {
                $scope.country = response.data;
            });

        };

        //refresh functionality
        var refresh = function() {
            $scope.stateMaster = []; //declare an empty array
            commonFactory.allRecord(url).then(function successCallback(response) {
                $scope.stateMaster = response.data;
            });
            $scope.sort = function(keyname) {
                $scope.sortKey = keyname; //set the sortKey to the param passed
                $scope.reverse = !$scope.reverse; //if true make it false and vice versa
            }
        };
   
       //function to get all the State Code and State Short Name
        $scope.getStateShortName = function() {
            $scope.state_code = $scope.regData.selitem1.state_code;
            $scope.state_short_name = $scope.regData.selitem1.state_short_name;
        }

        $scope.getselectval = function() {
            $scope.state = $scope.regData.selitem.state;
            $scope.country_code = $scope.regData.selitem.country_code;
             searchAllStateName($scope.country_code);
        }
        

        var searchAllStateName = function(country_code) {
            $scope.stateName = []; //declare a empty array to store all the States
            commonFactory.searchRecordById(url, country_code).then(function successCallback(response) {
                $scope.stateName = response.data;
            });
        }

        refresh(); //calling function
        countryName(); //calling function
       
        //function to perform insert operation from client-side
        $scope.setStateMaster = function(regData) {
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
                                    $state.go('home.stateMaster');
                                }, 2000)
                                swal("Poof! Your record has been save!", {
                                    icon: "success",
                                });
                                refresh();
                                reset();

                            } else {
                                swal("Poof! Please check Country or State already available !", {
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
                    text: "Once updated, Current record will update !",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                    	//rest api calling the webservices
                        commonFactory.updateRecord(user, user.state_code, url).then(function(data) {

                            refresh();
                        });
                    } else {
                        swal("Your record is not update!");
                    }
                });

        }

        //function to perform delete operation from client-side
        $scope.remove = function(state_code) {
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
                        commonFactory.removeRecord(url, state_code).then(function successCallback(response) {
                            if (response.data.errno == '1451') {
                                swal("This record cannot be delete it is present in other screen!", {
                                    icon: "warning",
                                });
                            } else {
                                swal("Poof! Your record has been deleted!", {
                                    icon: "success",
                                });
                                refresh();
                            }
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
        var reset = function(form) {
            $scope.regData = {};
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            $scope.form.$setDirty();
        }

    });