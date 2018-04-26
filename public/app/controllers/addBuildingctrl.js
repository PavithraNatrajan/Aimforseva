/* Project Name :AIM for Seva
Filename : addBuildingCtrl.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from client-side
Author : Deekshitha(id:T0002)
*/

angular.module('addBuildingctrl', ['angularUtils.directives.dirPagination', 'commonServices'])
    .controller('buildingCtrl', function($http, $state, $timeout, $scope, commonFactory) {

        var app = this;
        var url = 'buildingdonor';
        var currentUrl = $state.$current;
        var split = currentUrl.toString().split('.');
        $scope.Current_Date = new Date().toDateString();
        $scope.activeUrl = split;
        $scope.enabledEdit = [];

        $scope.editproj = function(index) {
            $scope.enabledEdit[index] = true;
        }
        var refresh = function() {
            $scope.countryMaster = [];
            MasterFactory.allRecord(url).then(function successCallback(response) {
                $scope.countryMaster = response.data;
            });
            $scope.sort = function(keyname) {
                $scope.sortKey = keyname; //set the sortKey to the param passed
                $scope.reverse = !$scope.reverse; //if true make it false and vice versa
            }
        };

        var receiptNo = function() {
            $scope.receiptNo = [];
            commonFactory.max(url).then(function successCallback(response) {
                $scope.receiptNo = response.data[0];

            })
        }
        
        var countryName = function() {

            $scope.country = [];  //declare an empty array
            commonFactory.countryRecord(url).then(function successCallback(response) {
                $scope.country = response.data;
            });
           
        };

        var allDonor = function() {
            var url = 'donor';
            $scope.allDMaster = []; //declare a empty to store all the donor details
            MasterFactory.allRecord(url).then(function successCallback(response) {
                $scope.allDMaster = response.data;
            });
        };        
       
        //a function to display the donor details based on his donor_id
        $scope.getselectedval = function() {
            $scope.donor_id = $scope.regData.selitem1.donor_id;
            $scope.first_name = $scope.regData.selitem1.first_name;
            $scope.last_name = $scope.regData.selitem1.last_name;
            $scope.address1 = $scope.regData.selitem1.address1;
            $scope.address2 = $scope.regData.selitem1.address2;
            $scope.address3 = $scope.regData.selitem1.address3;
            $scope.city = $scope.regData.selitem1.city;
            $scope.organization_name = $scope.regData.selitem1.organization_name;
            $scope.postal_code = $scope.regData.selitem1.postal_code;
            $scope.mobile_no = $scope.regData.selitem1.mobile_no;
            $scope.country = $scope.regData.selitem1.country;
            $scope.state = $scope.regData.selitem1.state;
        }

        //function to display all the project category
        var allProject = function() {
            var url = 'ProMainType';
            $scope.allProjectMain = []; //declare a empty array to store all the project category
            commonFactory.allProjectRecord(url).then(function successCallback(response) {
                $scope.allProjectMain = response.data;
            });

        };

        $scope.getselectedval1 = function() {
            $scope.sub_type_id = $scope.regData.selitem.sub_type_id;
            $scope.maintenance_type = $scope.regData.selitem.maintenance_type;
            $scope.project_category_id = $scope.regData.selitem.project_category_id;

            searchAllCategory($scope.sub_type_id);
        }

        var searchAllDonorName = function(donor_id) {
            $scope.dname = [];
            MasterFactory.searchRecordById(url, donor_id).then(function successCallback(response) {
                $scope.dname = response.data;
            });
        }

        $scope.getSelectProject = function() {
            $scope.project_category_id = $scope.regData.selitemProject.project_category_id;
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
            searchAllMaintenanceSubType($scope.maintenance_id);
        }

        //function to display the Sub Type based on the Project category and Maintenance Type
        $scope.getSelectMaintenanceSubId = function() {
            $scope.sub_type_id = $scope.regData.selitemSub.sub_type_id;
        }


        var searchAllMaintenanceSubType = function(sub_type_id) {
            $scope.maintenanceSubType = []; //declare a empty array to store all the Sub-type
            commonFactory.ProjectSubMaintenanceTypeRecord(url, sub_type_id).then(function successCallback(response) {
                $scope.maintenanceSubType = response.data;
            });
        }

        //function to display all the campaign name
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
        $scope.getSelectprojectName = function() {
            $scope.project_id = $scope.regData.selitemproject.project_id;
        }

        var searchAllprojectName = function() {

            $scope.projectName = []; // declare a empty array to display all the project name
            commonFactory.allprojectnameRecord(url).then(function successCallback(response) {
                $scope.projectName = response.data;
            });
        }

        //function to declare all the payment modes
        $scope.getpaymentName = function() {
            $scope.payment_id = $scope.regData.selitempayment.payment_id;
        }

        var searchAllpaymentName = function() {

            $scope.paymentName = []; //declare a empty array to display all the payment modes
            commonFactory.allpaymentRecord(url).then(function successCallback(response) {
                $scope.paymentName = response.data;
            });
        }

        receiptNo(); //calling the function
        allProject(); //calling the function
        refresh(); //calling the function
        allDonor(); //calling the function
        countryName(); //calling function
        searchAllpaymentName(); //calling the function
        searchAllcampaignName(); //calling the function
        searchAllprojectName(); //calling the function

        //function to perform insert operation from client-side
        $scope.setbuilding = function(regData) {
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
                                    $state.go('home.buildingdonor');
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
                                commonFactory.updateRecord(user, user.state_code, url).then(function(data) {
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
                        if (willDelete) {
                        	//rest api calling the webservices
                            commonFactory.removeRecord(url, country_code).then(function successCallback(response) {
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