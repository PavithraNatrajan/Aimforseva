/* Project Name :AIM for Seva
Filename : userMasterCtrl.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from client-side
Author : Rajesh(id:T0003)
*/

angular.module('UserMaster', ['angularUtils.directives.dirPagination', 'commonServices'])
    .controller('userMasterCtrl', function($http, $state, $timeout, $scope, commonFactory) {
        var app = this;
        var url = 'user'; //calling the url to fetch the data
        var currentUrl = $state.$current;
        var split = currentUrl.toString().split('.');

        $scope.activeUrl = split;

        $scope.enabledEdit = [];
        $scope.editCountry = function(index) {
            $scope.enabledEdit[index] = true;
        }

        //refresh functionality
        var refresh = function() {
            $scope.allUser = []; //declare an empty array
            commonFactory.allRecord(url).then(function successCallback(response) {
                $scope.allUser = response.data;
            });
            $scope.sort = function(keyname) {
                $scope.sortKey = keyname; //set the sortKey to the param passed
                $scope.reverse = !$scope.reverse; //if true make it false and vice versa
            }
        };

     	//function to get all the Countries
        var countryName = function() {
            var url = 'state';
            $scope.country = []; //declare an empty array to store all the Countries
            commonFactory.countryRecord(url).then(function successCallback(response) {
                $scope.country = response.data;
            });
        };
       
        //function to store all the Donor details
        var allDonor = function() {
            $scope.allDonorRecord = []; //declare an empty array to store the donor details
            commonFactory.allRecord(url).then(function successCallback(response) {
                $scope.allDonorRecord = response.data;
            });
        };
       

        $scope.getStateShortName = function() {
            $scope.state_code = $scope.regData.selitem1.state_code;
        }

        $scope.getselectval = function() {
            $scope.donor_id = $scope.regData.selitem.donor_id;
            $scope.donor_type = $scope.regData.selitem.donor_type;
            $scope.organization_name = $scope.regData.selitem.organization_name;
            $scope.first_name = $scope.regData.selitem.first_name;
            $scope.last_name = $scope.regData.selitem.last_name;
            $scope.mobile_no = $scope.regData.selitem.mobile_no;
            $scope.landline_no = $scope.regData.selitem.landline_no;
            $scope.gender = $scope.regData.selitem.gender;
            $scope.fax_no = $scope.regData.selitem.fax_no;
            $scope.dob = $scope.regData.selitem.dob;
            $scope.email_id = $scope.regData.selitem.email_id;
            $scope.anniversary = $scope.regData.selitem.anniversary;
            $scope.website = $scope.regData.selitem.website;
            $scope.address1 = $scope.regData.selitem.address1;
            $scope.address2 = $scope.regData.selitem.address2;
            $scope.address3 = $scope.regData.selitem.address3;
            $scope.city = $scope.regData.selitem.city;
            $scope.postal_code = $scope.regData.selitem.postal_code;
            searchAllDonorName($scope.donor_id);
        }

        $scope.getSelectCountry = function() {
            $scope.country_code = $scope.regData.selitemCountry.country_code;
            searchAllStateName($scope.country_code);
        }

        //function to select a particular record by its Id
        var searchAllStateName = function(country_code) {
            var url = 'donor';
            $scope.stateName = [];
            commonFactory.stateRecordById(url, country_code).then(function successCallback(response) {
                $scope.stateName = response.data;
            });
        }

        refresh(); //calling function
        allDonor(); //calling function
        countryName(); //calling function

        //function to perform insert operation from client-side
        $scope.regUser = function(regData) {
            swal({  //pop-up a alert message for the confirmation 
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
                                    $state.go('home.userMaster');
                                }, 2000)
                                swal("Poof! Your record has been save!", {
                                    icon: "success",
                                });
                                refresh();
                                reset();
                            } else {
                                if (data.data.errno = '1292') {
                                    swal("Email id already exit !", {
                                        icon: "warning",
                                    });
                                } else if (data.data.errno = '1054') {
                                    swal("Any filed is missing !", {
                                        icon: "warning",
                                    });
                                } else if (data.data.errno = '1048') {
                                    swal("please file all mandatory filed ?", {
                                        icon: "warning",
                                    });
                                } else if (data.data.dob != data.data.anniversary) {
                                    swal("Date of birth is not greater than Anniversary date ?", {
                                        icon: "warning",
                                    });
                                } else {
                                    swal("please check ", {
                                        icon: "warning",
                                    });
                                }

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
                        commonFactory.updateRecord(user, user.user_code, url).then(function(data) {
                            refresh();
                        });
                        swal("Poof! Your record has been updated!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your record is safe!");
                    }
                });
        }

        //function to perform delete operation from client-side
        $scope.remove = function(user_code) {
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
                        commonFactory.removeRecord(url, user_code).then(function successCallback(response) {
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
        var reset = function(form) {
            $scope.regData = {};

            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            $scope.form.$setDirty();
        }
    });