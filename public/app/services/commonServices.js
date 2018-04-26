angular.module('commonServices', [])
    .factory('commonFactory', function($http) {

        MasterFactory = {};

        MasterFactory.create = function(regData, url) {

            return $http.post('/' + url + '/setDataToDB', regData);
        }
        MasterFactory.updateRecord = function(user, id, url) {
        
            return $http.put('/' + url + '/updateById' + '/' + id, user);
        }
        MasterFactory.removeRecord = function(url, id) {
            
            return $http.delete('/' + url + '/deleteById' + '/' + id);
        }
        MasterFactory.allRecord = function(url) {


            return $http.get('/' + url + '/getAllList');
        }
        MasterFactory.countryRecord = function(url) {


            return $http.get('/' + url + '/getCountryList');
        }
        MasterFactory.stateRecordById = function(url, id) {


            return $http.get('/' + url + '/getStateById' + '/' + id);
        }
        MasterFactory.searchRecordById = function(url, id) {


            return $http.get('/' + url + '/getListById' + '/' + id);
        }
        MasterFactory.forgotPass = function(email, url) {

            return $http.post('/' + url + '/changePassword', email);
        }
        MasterFactory.allProjectRecord = function(url) {


            return $http.get('/' + url + '/getProjectList');
        }
        MasterFactory.allMaintenanceRecord = function(url) {


            return $http.get('/' + url + '/getMaintenanceList');
        }
        MasterFactory.ProjectMaintenanceTypeRecord = function(url, id) {

            return $http.get('/' + url + '/getProjectMaintenanceTypeList' + '/' + id);
        }
        MasterFactory.ProjectMaintenanceSubTypeRecord = function(url, id) {


            return $http.get('/' + url + '/getProjectMaintenanceSubTypeList' + '/' + id);
        }
        MasterFactory.allprojectcategorynameRecord = function(url) {


            return $http.get('/' + url + '/getAllCategoryNameList');
        }

        MasterFactory.allCampaignRecord = function(url) {


            return $http.get('/' + url + '/getAllCampaignList');
        }

        MasterFactory.ProjectData = function(url) {


            return $http.get('/' + url + '/getAllProjectData');
        }
        MasterFactory.allPaymentRecord = function(url) {

            return $http.get('/' + url + '/getAllPaymentList');
        }
        MasterFactory.ProjectSubMaintenanceTypeRecord = function(url, id) {
         
            return $http.get('/' + url + '/getProjectSubMaintenanceTypeList' + '/' + id);
        }
        MasterFactory.allProjectData = function(url) {


            return $http.get('/' + url + '/getAllProjectData');
        }
        MasterFactory.searchRecordSubtypeById = function(url, id) {

            return $http.get('/' + url + '/getsubtypeListById' + '/' + id);
        }
        MasterFactory.allSubTypeRecord = function(url) {


            return $http.get('/' + url + '/getSubTypeAllList');
        }

        MasterFactory.allSponsorshipremindersRecord = function(url) {


            return $http.get('/' + url + '/getAllSponsorshipremindersList');
        }
        MasterFactory.allSponsorshipremindersRecordbyid = function(url, id) {
           
            return $http.get('/' + url + '/allSponsorshipremindersRecordbyid' + '/' + id);
        }
        MasterFactory.max = function(url) {


            return $http.get('/' + url + '/getMaxReceiptNo');
        }
        MasterFactory.allRecordproject = function(url) {


            return $http.get('/' + url + '/getAllListproject');
        }

        MasterFactory.searchRecordByIdproject = function(url, id) {


            return $http.get('/' + url + '/getListByIdproject' + '/' + id);
        }

        MasterFactory.sendmail = function(email_id, content, sub, url) {

            return $http.post('/' + url + '/sendmail/' + email_id + "/" + content + "/" + sub);
        }
        // Added a new common service for role user & screen mapping start here
        MasterFactory.getAllUser = function(url) {

            return $http.get('/' + url + '/getAllUser');
        }
        MasterFactory.getAllScreen = function(url) {

            return $http.get('/' + url + '/getAllScreen');
        }
        MasterFactory.setDataToScreenmap = function(regData, role_id, url) {
            return $http.post('/' + url + '/setDataToScreenmap/' + role_id, regData);
        }
        MasterFactory.allpaymentRecord = function(url) {


            return $http.get('/' + url + '/getAllPaymentList');
        }
        MasterFactory.allprojectnameRecord = function(url) {


            return $http.get('/' + url + '/getAllProjectNameList');
        }
       
        // Added a new common service for role user & screen mapping end here
        MasterFactory.setDataToRolemap = function(x, x1, url) //added newly for role user bug insert
        {
            return $http.post('/' + url + '/setDataToRolemap/' + x + '/' + x1);
        }
        MasterFactory.landDonorById = function(url, donorid) {
            return $http.get('/' + url + '/landDonorList/' + donorid);
        }
        MasterFactory.generalDonorById = function(url, donorid) {
            return $http.get('/' + url + '/generalDonorList/' + donorid);
        }
        
        return MasterFactory;
    });