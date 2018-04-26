/* Project Name :AIM for Seva
Filename : campaignMasterCtrl.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from client-side
Author : Ankit(id:T0003)
*/

angular.module('campaignmasterctrl', ['angularUtils.directives.dirPagination', 'commonServices'])
    .controller('campaignCtrl', function($http, $state, $timeout, $scope, commonFactory) {

        var app = this;
        var url = 'campaign'; //calling the url to fetch the data
        var currentUrl = $state.$current;
        var split = currentUrl.toString().split('.');

        $scope.activeUrl = split;
        $scope.enabledEdit = [];
        $scope.editCampign = function(index) {
            $scope.enabledEdit[index] = true;
        }

        var countryName = function() {
            var url = 'state';
            $scope.country = []; //declare an empty array to store the countries and state
            commonFactory.countryRecord(url).then(function successCallback(response) {
                $scope.country = response.data;
            });

        };
        var campaignId = function() {
            $scope.campaignMax = []; // declare an empty array to store all the Campaign to be held
            commonFactory.max(url).then(function successCallback(response) {
                $scope.campaignMax = response.data[0];

            })
        }
       
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

        //function to get all the State short name
        $scope.getStateShortName = function() {

            $scope.state_code = $scope.regData.selitem1.state_code;
        }

        $scope.getselectval = function() {
            $scope.country_code = $scope.regData.selitem.country_code;
            $scope.country_name = $scope.regData.selitem.country_name;
            searchAllStateName($scope.country_code);
        }

        var searchAllStateName = function(country_code) {
            var url = 'donor';
            $scope.stateName = [];
            commonFactory.stateRecordById(url, country_code).then(function successCallback(response) {
                $scope.stateName = response.data;
            });
        }

        refresh(); //calling function
        campaignId(); //calling function
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
                        if (regData.start_date > regData.end_date) {
                            swal("End date is cannot be less than start Date", {
                                icon: "warning",
                            });
                        } else {
                            commonFactory.create(regData, url).then(function(data) {
                                if (data.data.success) {
                                    $timeout(function() {
                                        $state.go('home.Campaign');
                                    }, 2000)
                                    swal("Poof! Your record has been save!", {
                                        icon: "success",
                                    });
                                    campaignId();
                                    refresh();
                                    reset();

                                } else {
                                    swal("Poof! Please check Country or State already available !", {
                                        icon: "warning",
                                    });

                                }
                            });
                        }
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
                        commonFactory.updateRecord(user, user.campaign_id, url).then(function(data) {
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
        $scope.remove = function(campaign_id) {
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
                        commonFactory.removeRecord(url, campaign_id).then(function successCallback(response) {
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

                    } else {
                        swal("Your record is safe!");
                    }
                });
        }
        //performing reset functionality
        $scope.reset = function(form) {
            $scope.regData = {};
            document.getElementById('country').value = "";
            document.getElementById('country_code').value = "";
            document.getElementById('state').value = "";
            document.getElementById('state_code').value = "";
            document.getElementById('city').value = "";
            document.getElementById('postal_code').value = "";
            document.getElementById('start_date').value = "";
            document.getElementById('end_date').value = "";
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            $scope.form.$setDirty();
        };

        var reset = function(form) {
            $scope.regData = {};
            document.getElementById('country').value = "";
            document.getElementById('country_code').value = "";
            document.getElementById('state').value = "";
            document.getElementById('state_code').value = "";
            document.getElementById('city').value = "";
            document.getElementById('postal_code').value = "";
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            $scope.form.$setDirty();
        }
    });