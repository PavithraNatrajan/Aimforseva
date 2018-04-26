/* Project Name :AIM for Seva
Filename : notificationMasterCtrl.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from client-side
Author : Mythreyi(id:T0003)
*/

angular.module('notificationmasterctrl', ['angularUtils.directives.dirPagination', 'commonServices'])
    .controller('notificationCtrl', function($http, $state, $timeout, $scope, commonFactory) {

        var app = this;
        var url = 'template'; //calling the url to fetch the data
        var currentUrl = $state.$current;
        var split = currentUrl.toString().split('.');

        $scope.activeUrl = split;
        $scope.enabledEdit = [];
        $scope.editTemp = function(index) {
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

        var allTemp = function() {
            $scope.allTMaster = []; //declare an empty array to store all the Template names for sending notification
            MasterFactory.allRecord(url).then(function successCallback(response) {
                $scope.allTMaster = response.data;
            });
        };

        //function to display the Template Content
        $scope.getselectedval = function() {
            $scope.template_id = $scope.regData.selitem.template_id;
            $scope.email_sub = $scope.regData.selitem.email_sub;
            $scope.email_content = $scope.regData.selitem.email_content;
            $scope.sms_content = $scope.regData.selitem.sms_content;
            searchAllTempName($scope.template_id);
        }

        //function to search a template by its Id
        var searchAllTempName = function(template_id) {
            $scope.tname = [];
            commonFactory.searchRecordById(url, template_id).then(function successCallback(response) {
                $scope.tname = response.data;
            });
        }

        //function to display the donor details to send the notification
        var allDonor = function() {
            var url = 'donor';
            $scope.allDMaster = []; //declare an empty array
            MasterFactory.allRecord(url).then(function successCallback(response) {
                $scope.allDMaster = response.data;
            });
        };
        $scope.getselectedval1 = function() {
            $scope.donor_id = $scope.regData.selitem1.donor_id;
            $scope.first_name = $scope.regData.selitem1.first_name;
            $scope.email_id = $scope.regData.selitem1.email_id;
            $scope.last_name = $scope.regData.selitem1.last_name;
            $scope.mobile_no = $scope.regData.selitem1.mobile_no;
            //searchAllDonorName($scope.donor_id);
        }

        refresh(); //calling function
        allTemp(); //calling function
        allDonor(); //calling function

        //function to perform insert operation from client-side
        $scope.setTemplate = function(regData) {
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
                                    $state.go('home.notificationMaster');
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
                        commonFactory.updateRecord(user, user.template_id, url).then(function(data) {
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
        $scope.remove = function(template_id) {
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
                        commonFactory.removeRecord(url, template_id).then(function successCallback(response) {
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

        //function to send E-mail to the particular donor 
        $scope.send = function(regData) {
            swal({
                    title: "Are you sure?",
                    text: "Once you send its sent",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willSend) => {
                    if (willSend) {
                    	//rest api calling the webservices
                        commonFactory.sendmail(regData.selitem1.email_id, regData.selitem.email_content, regData.selitem.email_sub, url).then(function successCallback(response) {
                            refresh();
                        });
                        swal("Poof! Your mail has been sent!", {
                            icon: "success",
                        });
                    } else {
                        swal("Aborted...!");
                    }
                });
        }

        //function to send SMS to the particular donor
        $scope.sendsms = function(regData) {
            swal({
                    title: "Are you sure?",
                    text: "Once you send its sent",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willSend) => {
                    if (willSend) {
                    	//rest api calling the webservices
                        commonFactory.sendsms(regData.selitem1.mobile_no, regData.selitem.sms_content, url).then(function successCallback(response) {
                            refresh();
                        });
                        swal("Poof! Your sms has been sent!", {
                            icon: "success",
                        });
                    } else {
                        swal("Aborted...!");
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