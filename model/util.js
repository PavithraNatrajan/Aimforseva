/* Project Name :AIM for Seva
Filename : util.js 
Purpose / Functionality: Declare multiple functions to pass the procedure for master modules from the server-side
*/

var utils = {

    //calling the User master procedure inside a function to perform insert operation 
    setUserMaster: function(userMaster, user_code, flag, connection, callback) {
        var sql = 'call sp_user_master(' + "'" + JSON.stringify(userMaster) + "'," + flag + "," + user_code + ')'; ///this is store procedure to store the data by using into the json format
        connection.query(sql, function(error, results, fields) {
            if (error) {
                callback(error);
            } else {
                callback(null, results[0]);
            }
        });
    },

    //calling the User master procedure inside a function to send the notification 
    showUserMaster: function(userEmail, connection, callback) {
        var sql = 'call sp_user_master(' + "'" + JSON.stringify(userEmail) + "'," + "'Select'," + "000" + ')';
        connection.query(sql, function(error, results, fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(results[0], null);

            }
        });
    },

    //calling the User master procedure inside a function to send the notification 
    selectRecord: function(userEmail, connection, callback) {
        var sql = 'call sp_user_master(' + "'" + JSON.stringify(userEmail) + "'," + "'Select1'," + "000" + ')';
        connection.query(sql, function(error, results, fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(results[0], null);

            }
        });
    },


    invokeUserMaster: function(user_code, flag, connection, callback) {
        var sql = 'call sp_user_master(' + "'" + JSON.stringify({}) + "'," + flag + "," + user_code + ')';
        connection.query(sql, function(error, results, fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(results[0], null);

            }
        });
    },

    //calling the login_master procedure for the authentication 
    updateLoginTime: function(loginData, connection, callback) {
        var sql = 'call sp_login_master(' + "'" + JSON.stringify(loginData) + "'," + "1," + "000" + ')';

        connection.query(sql, function(error, results, fields) {
            if (error) {
                callback(error);
            } else {
                callback(results[0]);
            }
        });
    },

    //calling the change password procedure for the user to change the password
    changePassword: function(emailId, connection, callback) {
        var sql = 'call sp_change_password(' + "'" + JSON.stringify(emailId) + "'," + "1," + "000" + ')';
        connection.query(sql, function(error, results, fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(results[0], null);


            }
        });
    },

    //calling the Country procedure to list all the Countries available
    invokeAllCountryMaster: function(flag, connection, callback) {
        var sql = 'call sp_all_country(' + "'" + JSON.stringify({}) + "'," + flag + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results[0]);
            }

        });
    },

    //calling the State procedure to list all the States available
    invokeAllStateMaster: function(flag, connection, callback) {
        var sql = 'call sp_all_state(' + "'" + JSON.stringify({}) + "'," + flag + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results[0]);
            }

        });
    },

    //calling the Country Master procedure to list the Countries added by the admin
    invokeCountryMaster: function(country_code, flag, connection, mycallback) {
        var sql = 'call sp_country_master(' + "'" + JSON.stringify({}) + "'," + flag + "," + country_code + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the country master procedure to insert a Country which is not available
    invokeCountryMasterInsert: function(country_master, country_code, flag, connection, mycallback) {
        var sql = 'call sp_country_master(' + "'" + JSON.stringify(country_master) + "'," + flag + "," + country_code + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the State master procedure to list the states added by the admin
    invokeStateMaster: function(state_code, flag, connection, mycallback) {
        var sql = 'call sp_state_master(' + "'" + JSON.stringify({}) + "'," + flag + "," + country_code + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the state master procedure to display the states based on the Country selected
    invokeStateMaster: function(state_code, flag, connection, mycallback) {
        var sql = 'call sp_state_master(' + "'" + JSON.stringify({}) + "'," + flag + "," + state_code + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the state master procedure to insert a State which is not available
    invokeStateMasterInsert: function(state_master, state_code, flag, connection, mycallback) {
        var sql = 'call sp_state_master(' + "'" + JSON.stringify(state_master) + "'," + flag + "," + state_code + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the campaign master procedure to Organize a Campaign 
    invokeCampaignMasterInsert: function(campaign_master, campaign_id, flag, connection, mycallback) {
        var sql = 'call sp_campaign_master(' + "'" + JSON.stringify(campaign_master) + "'," + flag + "," + campaign_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the campaign master procedure to display all the Campaign organized
    invokeCampaignMaster: function(campaign_id, flag, connection, mycallback) {
        var sql = 'call sp_campaign_master(' + "'" + JSON.stringify({}) + "'," + flag + "," + campaign_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the payment master procedure to display all the Payment Modes
    invokeALLPaymentMaster: function(payment_id, flag, connection, mycallback) {
        var sql = 'call sp_payment_master(' + "'" + JSON.stringify({}) + "'," + flag + "," + 0 + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        })
    },

    //calling the payment master procedure to display all the Payment Modes
    invokePaymentMaster: function(payment_id, flag, connection, mycallback) {
        var sql = 'call sp_payment_master(' + "'" + JSON.stringify({}) + "'," + flag + "," + payment_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the payment master procedure to insert a new Payment Mode 
    invokePaymentMasterInsert: function(payment_master, payment_id, flag, connection, mycallback) {
        var sql = 'call sp_payment_master(' + "'" + JSON.stringify(payment_master) + "'," + flag + "," + payment_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the role master procedure to display all the roles available
    invokeALLRoleMaster: function(role_id, flag, connection, mycallback) {
        var sql = 'call sp_role_master(' + "'" + JSON.stringify({}) + "'," + flag + "," + 0 + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

     //calling the role master procedure to display all the roles available
    invokeRoleMaster: function(role_id, flag, connection, mycallback) {
        var sql = 'call sp_role_master(' + "'" + JSON.stringify({}) + "'," + flag + "," + role_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

     //calling the role master procedure to insert a new role for the Users
    invokeRoleMasterInsert: function(role_master, role_id, flag, connection, mycallback) {
        var sql = 'call sp_role_master(' + "'" + JSON.stringify(role_master) + "'," + flag + "," + role_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },
  
    //calling the search pop-up procedure to search a particular record
    invokeSearchpopupbyid: function(donor_id, flag, connection, mycallback) {
        var sql = 'call sp_search_popup(' + donor_id + "," + flag + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the notification master procedure inside a function to display all the templates avaialble to send the notification
    invokeNotificationMaster: function(template_id, flag, connection, mycallback) {
        var sql = 'call sp_notification_master(' + "'" + JSON.stringify({}) + "'," + flag + "," + template_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }
        });
    },

    //calling the notification procedure inside a procedure to insert a new template
    invokeNotificationMasterInsert: function(notification_master, template_id, flag, connection, mycallback) {
        var sql = 'call sp_notification_master(' + "'" + JSON.stringify(notification_master) + "'," + flag + "," + template_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }
        });
    },
 
    //calling the dashboard procedure to display some donor details in the home page
    invokeDashboardMaster: function(donor_id, flag, connection, mycallback) {
        var sql = 'call sp_dashboard(' + "'" + JSON.stringify({}) + "','" + flag + "'," + donor_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error, null);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the dashboard procedure to display all the Sponsers based on the project
    invokeprojectdashboard: function(project_id, flag, connection, mycallback) {
        var sql = 'call sp_dashboard_project_sub_reminder(' + project_id + "," + flag + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },
 
    //calling the navigation procedure inside a function to assign the roles
    invokeNavigation: function(role_id, connection, mycallback) {
        var sql = 'call sp_navigation(' + role_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },
    
    //calling the role mapping procedure inside a function to assign the roles for the user
    invokeALLRoleMapping: function(flag, roleid, connection, mycallback) {
        var sql = 'call sp_role_mapping(' + "'" + JSON.stringify({}) + "'," + 0 + "," + flag + "," + 0 + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the role mapping procedure inside a function to insert a new role
    invokeRoleMappingInsert: function(role_mapping, roleid, flag, connection, mycallback) {
        var sql = 'call sp_role_mapping(' + "'" + JSON.stringify(role_mapping) + "'," + roleid + "," + flag + "," + 0 + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },

    //calling the role mapping procedure inside a function to map user with different roles
    invokeRoleMappingbyid: function(user_id, roleid, flag, connection, mycallback) {
        var sql = 'call sp_role_mapping(' + "'" + JSON.stringify({}) + "'," + 0 + "," + flag + "," + user_id + ')';
        connection.query(sql, function(error, results) {
            if (error) {
                mycallback(error);
            } else {
                mycallback(null, results[0]);
            }

        });
    },
}
module.exports = utils;