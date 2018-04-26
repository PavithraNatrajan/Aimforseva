/* Project Name :AIM for Seva
Filename : donorCtrl.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from client-side
Author : Rajesh(id:T0002)
*/

angular.module('addDonorctrl', ['angularUtils.directives.dirPagination', 'commonServices'])
    .controller('donorCtrl', function($http, $state, $timeout, $scope, commonFactory) {

        var app = this;
        var url = 'donor'; //calling the url to fetch the data
        var currentUrl = $state.$current;
        var split = currentUrl.toString().split('.');

        $scope.activeUrl = split;
        $scope.enabledEdit = [];
        $scope.editCountry = function(index) {
            $scope.enabledEdit[index] = true;
        }

        var donorId = function() {
            $scope.donorMax = [];
            commonFactory.max(url).then(function successCallback(response) {
                $scope.donorMax = response.data[0];
            })
        }
       
        var refresh = function() {
            $scope.allDonor = []; //declare an empty array
            commonFactory.allRecord(url).then(function successCallback(response) {
                $scope.allDonor = response.data;
            });
            $scope.sort = function(keyname) {
                $scope.sortKey = keyname; //set the sortKey to the param passed
                $scope.reverse = !$scope.reverse; //if true make it false and vice versa
            }
        };

      
        var countryName = function() {
            var url = 'state';
            $scope.country = []; //declare an empty array
            commonFactory.countryRecord(url).then(function successCallback(response) {
                $scope.country = response.data;
            });
        };
      
        //a function to display all the donor_id
        var allDonor = function() {
            $scope.allDonorRecord = []; //declare a empty to store all the donor details
            commonFactory.allRecord(url).then(function successCallback(response) {
                $scope.allDonorRecord = response.data;
            });
        };  

        $scope.getStateShortName = function() {
            $scope.state_code = $scope.regData.selitem1.state_code;
        }

      	//a function to display the donor details based on his donor_id
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
            $scope.country = $scope.regData.selitem.country;
            $scope.state = $scope.regData.selitem.state;
            searchAllDonorName($scope.donor_id);
            landDonor($scope.donor_id);
            generalDonor($scope.donor_id);
        }

        $scope.getSelectCountry = function() {
            $scope.country_code = $scope.regData.selitemCountry.country_code;
            searchAllStateName($scope.country_code);
        }

        var searchAllDonorName = function(donor_id) {
            $scope.DonorDtl = []; //declare a empty array to store the country name and state name
            commonFactory.searchRecordById(url, donor_id).then(function successCallback(response) {
                $scope.DonorDtl = response.data[0];
                if ($scope.DonorDtl.gender == '1') {
                    $scope.DonorDtl.gender = 'Male';
                } else {
                    $scope.DonorDtl.gender = 'Female';
                }
            });
        }
        var searchAllStateName = function(country_code) {
            $scope.stateName = []; //declare a empty array to store the country name and state name
            commonFactory.stateRecordById(url, country_code).then(function successCallback(response) {
                $scope.stateName = response.data;
            });
        }

        donorId(); //calling function
        allDonor(); //calling function 
        countryName(); //calling function
        refresh(); //calling function

         //function to perform insert operation from client-side
        $scope.setDonor = function(regData) {
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
                                    $state.go('home.addDonor');
                                }, 2000)
                                swal("Poof! Your record has been save!", {
                                    icon: "success",
                                });
                                refresh();
                            } else {
                                if (data.data.message.errno = '1292') {
                                    swal("Donor Id Or Date is not valid !", {
                                        icon: "warning",
                                    });
                                } else if (data.data.message.errno = '1062') {
                                    swal("Dublicate value !", {
                                        icon: "warning",
                                    });
                                } else if (data.data.message.errno = '1054') {
                                    swal("Any filed is missing !", {
                                        icon: "warning",
                                    });
                                } else if (data.data.message.errno = '1048') {
                                    swal("please file all mandatory filed ?", {
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
                        commonFactory.updateRecord(user, user.donor_id, url).then(function(data) {
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
        $scope.remove = function(donor_id) {
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
                        commonFactory.removeRecord(url, donor_id).then(function successCallback(response) {
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

        //declaring a function for the validation 
        $scope.myFunction = function() {
            var x = document.getElementById("capitalize");
            x.value = x.value.toUpperCase();
        }

        var landDonor = function(donor_id) {
            $scope.landDonor = [];
            commonFactory.landDonorById(url, donor_id).then(function successCallback(response) {
                $scope.landDonor = response.data;
            });
        }

        var generalDonor = function(donor_id) {
            $scope.generalDonor = [];
            commonFactory.generalDonorById(url, donor_id).then(function successCallback(response) {
                $scope.generalDonor = response.data;
            });
        }

        $scope.reset = function(form) {
            $scope.regData = {};

            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            $scope.form.$setDirty();
        };
    });