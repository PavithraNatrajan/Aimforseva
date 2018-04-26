/* Project Name :AIM for Seva
Filename : paymentCtrl.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from client-side
Author : Karthick(id:T0003)
*/

angular.module('addPaymentctrl', ['angularUtils.directives.dirPagination', 'commonServices'])
    .controller('paymentCtrl', function($http, $state, $timeout, $scope, commonFactory) {
        var app = this;
        var url = 'payment'; //calling the url to fetch the data
        var currentUrl = $state.$current;
        var split = currentUrl.toString().split('.');

        $scope.activeUrl = split;
        $scope.enabledEdit = [];
        $scope.editPayment = function(index) {
            $scope.enabledEdit[index] = true;
        }

        //refresh functionality
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
        refresh();

        //function to perform insert operation from client-side
        $scope.setPayment = function(regData) {
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
                                    $state.go('home.paymentMode');
                                }, 2000)
                                swal("Poof! Your record has been save!", {
                                    icon: "success",
                                });
                                refresh();
                            } else {
                                swal("Poof! Please Check Payment Mode Already Available !", {
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
                        commonFactory.updateRecord(user, user.payment_id, url).then(function(data) {
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
        $scope.remove = function(payment_id) {
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
                        commonFactory.removeRecord(url, payment_id).then(function successCallback(response) {
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