/* Project Name :AIM for Seva
Filename : countryMasterCtrl.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from client-side
Author : Karthick, Ankit, Pavithra
*/

angular.module('dashboardCtrl', ['angularUtils.directives.dirPagination', 'commonServices'])
    .controller('dashCtrl', function($http, $state, $timeout, $scope, commonFactory) {

        var app = this;
        var url = 'dashboard';

        var refresh = function() {
            $scope.DOBRemider = []; //declare an empty array to store all the birthday and anniversary of the donors
            commonFactory.allRecord(url).then(function successCallback(response) {
                $scope.DOBRemider = response.data;
            });

        };
        refresh(); // calling function

        var refresh1 = function() {
            $scope.genralRemider = []; //declare an empty array to store all the Miantenance Sub-type of the donors
            commonFactory.allSubTypeRecord(url).then(function successCallback(response) {
                $scope.genralRemider = response.data;
            });
        };
        refresh1(); //calling function

        var refresh2 = function() {
            $scope.Sponsorshipreminders = []; //declare an empty array to store all the Sponsership details
            commonFactory.allSponsorshipremindersRecord(url).then(function successCallback(response) {
                $scope.Sponsorshipreminders = response.data;
            });
        };
        refresh2();

        $scope.select1 = function(donor_id) {
            $scope.project2 = []; //declare an empty array to search a project by Its Id
            commonFactory.allSponsorshipremindersRecordbyid(url, donor_id).then(function successCallback(response) {
                $scope.project2 = response.data;
            });
        }

        //function to search a record by its Id
        $scope.selectAllRecord = function(donor_id) {
            $scope.DOB = []; //declare an empty array
            commonFactory.searchRecordById(url, donor_id).then(function successCallback(response) {
                $scope.DOB = response.data;
            });
        }

         //function to search a record by its Id
        $scope.selectAllSubtypeRecord = function(donor_id) {;
            $scope.Subtype = [];
            commonFactory.searchRecordSubtypeById(url, donor_id).then(function successCallback(response) {
                $scope.Subtype = response.data;
            });

        }

        //function to search a record by its Id
        $scope.allSponsorshipremindersRecord = function(donor_id) {
            $scope.Sponsorshipreminders = [];
            commonFactory.allSponsorshipremindersRecord(url, donor_id).then(function successCallback(response) {
                $scope.Sponsorshipreminders = response.data;
            });

        }

        // added by karthi for project table
        var refresh = function() {
            $scope.project = []; //declare an empty array
            commonFactory.allRecordproject(url).then(function successCallback(response) {
                $scope.project = response.data;
            });

            $scope.sort = function(keyname) {
                $scope.sortKey = keyname; //set the sortKey to the param passed
                $scope.reverse = !$scope.reverse; //if true make it false and vice versa
            }

        } 
        refresh(); //calling function
 
        //function to select a project by its Id
        $scope.select = function(project_id) {
            $scope.project1 = []; //declare an empty array
            commonFactory.searchRecordByIdproject(url, project_id).then(function successCallback(response) {
                $scope.project1 = response.data;
            });
        }
    });