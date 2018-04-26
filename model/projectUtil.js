/* Project Name :AIM for Seva
Filename : projectUtil.js 
Purpose / Functionality: Declare multiple functions to pass the procedure for project modules from the server-side
*/

var proUtil = { 
    //calling the Donor procedure inside a function to perform insert operation 
    invokeDonorInsert: function(donor, donor_id, flag, connection, callback) {
        var sql = 'call sp_donor(' + "'" + JSON.stringify(donor) + "'," + flag + "," + donor_id + ')';
        connection.query(sql, function(error, results, fields) {
            if (error) {
                callback(error);
            } else {
                callback(null, results[0]);
            }
        });
    },

    //calling the Donor procedure inside a function to perform select operation 
    invokeDonorList: function(donor_id, flag, connection, mycallback) {
        var sql = 'call sp_donor(' + "'" + JSON.stringify({}) + "'," + flag + "," + donor_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Land Donor procedure inside a function to perform select operation 
    invokeDonorReceipt: function(donor_id, flag, connection, mycallback) {
        var sql = 'call sp_land_donor(' + "'" + JSON.stringify({}) + "'," + flag + "," + donor_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the General Donation procedure inside a function to perform select operation 
    invokeGeneralReceipt: function(donor_id, flag, connection, mycallback) {
        var sql = 'call sp_general_donation(' + "'" + JSON.stringify({}) + "'," + flag + "," + donor_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the General Donation procedure inside a function to perform select operation 
    invokeGeneralDonorList: function(donor_id, flag, connection, mycallback) {
        var sql = 'call sp_general_donation(' + "'" + JSON.stringify({}) + "'," + flag + "," + donor_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Project Category procedure inside a function to perform insert operation 
    invokeCategoryInsert: function(project_category, project_category_id, flag, connection, callback) {
        var sql = 'call sp_project_category(' + "'" + JSON.stringify(project_category) + "'," + flag + "," + project_category_id + ')';
        connection.query(sql, function(error, results, fields) {
            if (error) {
                callback(error);
            } else {
                callback(null, results[0]);
            }
        });
    },

    //calling the Project Category procedure inside a function to perform select operation 
    invokeCategoryList: function(project_category_id, flag, connection, mycallback) {
        var sql = 'call sp_project_category(' + "'" + JSON.stringify({}) + "'," + flag + "," + project_category_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Annual Maintenance procedure inside a function to perform select operation 
    invokeAnnualReceiptno: function(donor_id, flag, connection, mycallback) {
        var sql = 'call sp_annual_maintenance(' + "'" + JSON.stringify({}) + "'," + flag + "," + donor_id + ')';
        console.log(sql);
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Building Donor procedure inside a function to perform select operation 
    invokeBuildingReceiptno: function(donor_id, flag, connection, mycallback) {
        var sql = 'call sp_building_donor(' + "'" + JSON.stringify({}) + "'," + flag + "," + donor_id + ')';
        console.log(sql);
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Maintenance Type procedure inside a function to perform select operation 
    invokeProjectMaintenanceType: function(maintenance_id, flag, connection, callback) {
        var sql = 'call sp_maintenance_type(' + "'" + JSON.stringify({}) + "'," + flag + "," + maintenance_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results[0]);
            }

        });
    },

    //calling the Maintenance Type procedure inside a function to perform insert operation 
    invokeProjectMaintenanceTypeInsert: function(projectMaintenanceType, maintenance_id, flag, connection, mycallback) {
        var sql = 'call sp_maintenance_type(' + "'" + JSON.stringify(projectMaintenanceType) + "'," + flag + "," + maintenance_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the Facility Management procedure inside a function to perform select operation 
    invokeFacilityReceipt: function(receipt_no, flag, connection, mycallback) {
        var sql = 'call sp_facility_management(' + "'" + JSON.stringify({}) + "'," + flag + "," + receipt_no + ')';
        console.log(sql);
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Maintenance Sub-type procedure inside a function to perform select operation 
    invokeProjectMaintenanceSubType: function(sub_type_id, flag, connection, callback) {
        var sql = 'call sp_maintenance_sub_type(' + "'" + JSON.stringify({}) + "'," + flag + "," + sub_type_id + ')';
        console.log(sql);
        connection.query(sql, function(error, results) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results[0]);
            }

        });
    },

    //calling the Maintenance Sub-type procedure inside a function to perform insert operation 
    invokeProjectMaintenanceSubTypeInsert: function(projectMaintenanceSubType, sub_type_id, flag, connection, mycallback) {
        var sql = 'call sp_maintenance_sub_type(' + "'" + JSON.stringify(projectMaintenanceSubType) + "'," + flag + "," + sub_type_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the Project procedure inside a function to perform insert operation 
    invokeProjectInsert: function(project, project_code, flag, connection, mycallback) {
        var sql = 'call sp_project(' + "'" + JSON.stringify(project) + "'," + flag + "," + project_code + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the Project procedure inside a function to perform select operation 
    invokeProjectList: function(project_code, flag, connection, mycallback) {
        var sql = 'call sp_project(' + "'" + JSON.stringify({}) + "'," + flag + "," + project_code + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the Project Category procedure inside a function to perform select operation 
    invokeprojectCategoryList: function(project_category_id, flag, connection, mycallback) {

        var sql = 'call sp_project(' + "'" + JSON.stringify({}) + "'," + flag + "," + project_category_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the Annual Maintenance procedure inside a function to perform insert operation 
    invokeAnnualInsert: function(annual_maintenance, donor_id, flag, connection, callback) {
        var sql = 'call sp_annual_maintenance(' + "'" + JSON.stringify(annual_maintenance) + "'," + flag + "," + donor_id + ')';
        connection.query(sql, function(error, results, fields) {
            if (error) {
                callback(error);
            } else {
                callback(null, results[0]);
            }
        });
    },

    //calling the Annual Maintenance procedure inside a function to perform select operation 
    invokeAnnualList: function(donor_id, flag, connection, mycallback) {
        var sql = 'call sp_annual_maintenance(' + "'" + JSON.stringify({}) + "'," + flag + "," + donor_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Facility Management procedure inside a function to perform insert operation 
    invokeFacilityInsert: function(facility_management, donor_id, flag, connection, callback) {
        var sql = 'call sp_facility_management(' + "'" + JSON.stringify(facility_management) + "'," + flag + "," + donor_id + ')';
        connection.query(sql, function(error, results, fields) {
            if (error) {
                callback(error);
            } else {
                callback(null, results[0]);
            }
        });
    },

    //calling the Facility Management procedure inside a function to perform select operation 
    invokeFacilityList: function(receipt_no, flag, connection, mycallback) {
        var sql = 'call sp_facility_management(' + "'" + JSON.stringify({}) + "'," + flag + "," + donor_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Campaign procedure inside a function to perform select operation 
    invokeCampaignList: function(campaign_id, flag, connection, mycallback) {
        var sql = 'call sp_campaign_master(' + "'" + JSON.stringify({}) + "'," + flag + "," + campaign_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Maintenance Sub-type procedure inside a function to perform select operation 
    invokeMaintenanceList: function(maintenance_id, flag, connection, mycallback) {
        var sql = 'call sp_maintenance_sub_type(' + "'" + JSON.stringify({}) + "'," + flag + "," + maintenance_id + ')';

        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Project procedure inside a function to perform select operation 
    invokeProjectList: function(project_id, flag, connection, mycallback) {
        var sql = 'call sp_project(' + "'" + JSON.stringify({}) + "'," + flag + "," + project_id + ')';
        // console.log(sql);
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Payment procedure inside a function to perform select operation 
    invokePaymentData: function(payment_id, flag, connection, mycallback) {
        var sql = 'call sp_payment_master(' + "'" + JSON.stringify({}) + "'," + flag + "," + payment_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Donation-General procedure inside a function to perform insert operation 
    invokeDonationgeneralInsert: function(donation_general, donor_id, flag, connection, callback) {
        var sql = 'call sp_general_donation(' + "'" + JSON.stringify(donation_general) + "'," + flag + "," + donor_id + ')';
        connection.query(sql, function(error, results, fields) {
            if (error) {
                callback(error);
            } else {
                callback(null, results[0]);
            }
        });
    },

    //calling the Land Donor procedure inside a function to perform insert operation 
    invokelandDonorInsert: function(landdonor, flag, donor_id, connection, callback) {
        var sql = 'call sp_land_donor(' + "'" + JSON.stringify(landdonor) + "'," + flag + "," + donor_id + ')';
        console.log(sql);
        connection.query(sql, function(error, results, fields) {
            if (error) {
                callback(error);
            } else {
                callback(null, results[0]);
            }
        });
    },

    //calling the Project procedure inside a function to perform select operation 
    invokeProjectDataList: function(project_id, flag, connection, mycallback) {
        var sql = 'call sp_project(' + "'" + JSON.stringify({}) + "'," + flag + "," + project_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Building Donor procedure inside a function to perform insert operation 
    invokeBuildingInsert: function(building_donor, receipt_no, flag, connection, mycallback) {

        var sql = 'call sp_building_donor(' + "'" + JSON.stringify(building_donor) + "'," + flag + "," + receipt_no + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },
    
    //calling the Donor procedure inside a function to perform select operation
    invokeDonorDetails: function(donor_id, flag, connection, mycallback) {
        var sql = 'call sp_donor(' + "'" + JSON.stringify({}) + "'," + flag + "," + donor_id + ')';

        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Maintenance Sub-type procedure inside a function to perform select operation
    invokeMaintenanceList: function(maintenance_id, flag, connection, mycallback) {
        var sql = 'call sp_maintenance_sub_type(' + "'" + JSON.stringify({}) + "'," + flag + "," + maintenance_id + ')';
        console.log(maintenance_id, flag);
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Maintenance Sub-type procedure inside a function to perform select operation
    invokeAllProject: function(sub_type_id, flag, connection, callback) {
        var sql = 'call sp_maintenance_sub_type(' + "'" + JSON.stringify({}) + "'," + flag + "," + sub_type_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results[0]);
            }
        });
    },

    //calling the Campaign procedure inside a function to perform select operation
    invokeCampaignList: function(campaign_id, flag, connection, mycallback) {
        var sql = 'call sp_campaign_master(' + "'" + JSON.stringify({}) + "'," + flag + "," + campaign_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Project procedure inside a function to perform select operation
    invokeprojectNameList: function(project_id, flag, connection, mycallback) {
        var sql = 'call sp_project(' + "'" + JSON.stringify({}) + "'," + flag + "," + project_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the Building Donor procedure inside a function to perform select operation
    invokepaymentList: function(payment_id, flag, connection, mycallback) {
        var sql = 'call sp_building_donor(' + "'" + JSON.stringify({}) + "'," + flag + "," + payment_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },
}
module.exports = proUtil;