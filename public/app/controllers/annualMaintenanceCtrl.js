/* Project Name :AIM for Seva
Filename : annualMaintenanceCtrl.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from client-side
Author : Pavithra(id:T0002)
*/

angular.module('annualmaintenanceCtrl', ['angularUtils.directives.dirPagination', 'commonServices'])
    .controller('annualCtrl', function($http, $state, $timeout, $scope, commonFactory) {

        var app = this;
        var url = 'annual'; //calling the url to fetch the data
        $scope.enabledEdit = [];
        $scope.editState = function(index) {
            $scope.enabledEdit[index] = true;
        }

        //generate the receipt ID form the database
        var ReceiptID = function() {
            $scope.ReceiptID = [];
            commonFactory.max(url).then(function successCallback(response) {
                $scope.ReceiptID = response.data[0];

            })
        }

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

        //a function to display all the donor_id
        var allDonor = function() {
            var url = 'donor';
            $scope.allDonorRecord = []; //declare a empty to store all the donor details
            commonFactory.allRecord(url).then(function successCallback(response) {
                $scope.allDonorRecord = response.data;
            });

        };

        //a function to display the donor details based on his donor_id
        $scope.getselectedval = function() {
            $scope.donor_id = $scope.regData.selitem.donor_id;
            $scope.first_name = $scope.regData.selitem.first_name;
            $scope.last_name = $scope.regData.selitem.last_name;
            $scope.country = $scope.regData.selitem.country;
            $scope.country_code = $scope.regData.selitem.country_code;
            $scope.state = $scope.regData.selitem.state;
            $scope.state_code = $scope.regData.selitem.state_code;
            $scope.organization_name = $scope.regData.selitem.organization_name;
            $scope.address1 = $scope.regData.selitem.address1;
            $scope.address2 = $scope.regData.selitem.address2;
            $scope.address3 = $scope.regData.selitem.address3;
            $scope.city = $scope.regData.selitem.city;
            $scope.mobile_no = $scope.regData.selitem.mobile_no;
            $scope.postal_code = $scope.regData.selitem.postal_code;
            $scope.start_date = $scope.regData.selitem.start_date;
            $scope.end_date = $scope.regData.selitem.end_date;
            searchAllDonorName($scope.donor_id);

        }

        //a function to search donor details based on his id
        var annualDonor = function(donor_id) {
            $scope.annualDonation = [];
            commonFactory.searchRecordById(url, donor_id).then(function successCallback(response) {
                $scope.annualDonation = response.data;
            });
        }

        var searchAllDonorName = function(donor_id) {
            $scope.Dname = []; //declare a empty array to store the country name and state name
            commonFactory.searchRecordById(url, donor_id).then(function successCallback(response) {
                $scope.Dname = response.data[0];
            });
        }

        //function to display all the project category
        var allProject = function() {
            var url = 'ProMainType';
            $scope.allProjectMain = []; //declare a empty array to store all the project category
            commonFactory.allProjectRecord(url).then(function successCallback(response) {
                $scope.allProjectMain = response.data;
            });

        };
         ReceiptID(); //calling function
         refresh();   //calling function
         allDonor(); //calling function
         allProject(); //calling function
       

        $scope.getSelectProject = function() {
            $scope.project_category_id = $scope.regData.selitemProjectCategory.project_category_id;

            searchAllProjectMaintenance($scope.project_category_id);
        }

        //function to display the Maintenance type based on project category selected
        var searchAllProjectMaintenance = function(project_category_id) {
            var url = 'ProMainSubType';
            $scope.maintenance = []; //declare a empty array to store the Maintenance Type
            commonFactory.ProjectMaintenanceTypeRecord(url, project_category_id).then(function successCallback(response) {
                $scope.maintenance = response.data;
            });
        }

        $scope.getSelectMaintenanceId = function() {
            $scope.maintenance_id = $scope.regData.selitemMaintenance.maintenance_id;
            searchAllMaintenanceType($scope.maintenance_id);
        }

        var searchAllMaintenanceType = function(maintenance_id) {
            $scope.maintenanceType = [];
            commonFactory.ProjectSubMaintenanceTypeRecord(url, maintenance_id).then(function successCallback(response) {
                $scope.maintenanceSubType = response.data;
            });
        }

        //function to display the Sub Type based on the Project category and Maintenance Type
        $scope.getSelectMaintenanceSubId = function() {
            $scope.sub_type_id = $scope.regData.selitemSub.sub_type_id;

        }

        var searchAllMaintenanceSubType = function(sub_type_id) {
            $scope.maintenanceSubType = [];
            commonFactory.ProjectSubMaintenanceTypeRecord(url, sub_type_id).then(function successCallback(response) {
                $scope.maintenanceSubType = response.data;
            });
        }

        //functiom to display all the campaign name
        $scope.getSelectcampaignName = function() {
            $scope.campaign_id = $scope.regData.selitemcampaign.campaign_id;
        }

        var searchAllcampaignName = function() {

            $scope.campaignName = []; //declare a empty array to store all the campaign name
            commonFactory.allCampaignRecord(url).then(function successCallback(response) {
                $scope.campaignName = response.data;
            });
        }

        //function to display all the project name
        $scope.getSelectprojectData = function() {
            $scope.project_id = $scope.regData.selitemproject.project_id;

        }

        var searchAllprojectData = function() {

            $scope.projectData = []; // declare a empty array to display all the project name
            commonFactory.ProjectData(url).then(function successCallback(response) {
                $scope.projectData = response.data;
            });
        }

        //function to declare all the payment modes
        $scope.getSelectpaymentData = function() {
            $scope.payment_id = $scope.regData.selitempayment.payment_id;

        }

        var searchAllpaymentData = function() {
            var url = 'facility';
            $scope.paymentData = []; //declare a empty array to display all the payment modes
            commonFactory.allPaymentRecord(url).then(function successCallback(response) {
                $scope.paymentData = response.data;
            });
        }

         searchAllcampaignName(); //calling the function
         searchAllprojectData(); //calling the function
         searchAllpaymentData(); //calling the function          

        //function to perform insert operation from client-side
        $scope.setAnnual = function(regData) {
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
                                    $state.go('home.AnnualMaintenance');
                                }, 2000)
                                swal("Poof! Your record has been save!", {
                                    icon: "success",
                                });
                                refresh();
                            } else {
                                swal("Poof! Please check the fields !", {
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
        $scope.update=function(user)
        {
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
            commonFactory.updateRecord(user,user.state_code,url).then (function(data){
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
        $scope.remove = function(state_code) {
            swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this record !",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                     //rest api calling the webservices
                    if (willDelete) {
                        commonFactory.removeRecord(url, country_code).then(function successCallback(response) {
                            refresh();
                        });
                        swal("Poof! Your record has been deleted!", {
                            icon: "success",


                        });
                         refresh();
                         reset();
                    } else {
                        swal("Your record is safe!");
                    }
                });
        }
        //performing reset functionality
        $scope.reset = function(form) {
            $scope.regData = {};
            document.getElementById('organization_name').value = "";
            document.getElementById('first_name').value = "";
            document.getElementById('last_name').value = "";
            document.getElementById('mobile_no').value = "";
            document.getElementById('address1').value = "";
            document.getElementById('address2').value = "";
            document.getElementById('address3').value = "";
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
            document.getElementById('organization_name').value = "";
            document.getElementById('first_name').value = "";
            document.getElementById('last_name').value = "";
            document.getElementById('mobile_no').value = "";
            document.getElementById('address1').value = "";
            document.getElementById('address2').value = "";
            document.getElementById('address3').value = "";
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



   