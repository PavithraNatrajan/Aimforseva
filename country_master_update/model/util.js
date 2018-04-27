/*****************************************************/
// Project Name: AIM FOR SEVA.
// Filename : util.js

//Purpose /Functionality: Purpose of this file is to get the data from countrymaster.js form and implements the stored procedure of countrymaster form.
        // Functionality: To invoke Countrymaster stored procedure.
// Author : Rahul Sai Vishnu(T0004), Pavithra Natarajan (T0002)

// Createdon: 06/03/2018.

//Version Number: 1.0.0.

//Reviewed By: Sobana and Karthick.

/****************************************************/
/*
Block level Comments:

Block comments to document a method
*/

/**

* Author : Rahul Sai Vishnu(T0004), Pavithra Natrajan (T0002) , Created on: 06/03/2018 , Purpose:
* @param
        connection    = It calls connection function from config.js.
        inputJson     = 
        flag          = It stores the user request.
        mycallback    = It is used to display the results on the country master screen.

: **/



/*var invokeCountryMaster = function(flag,connection,mycallback)
{
      var sql='call sp_country_master(?,?,?)';
  
   var inputJson=('{"country_name":"rajesh","country_short_name":"rrr","created_at":"2018-02-15 13:47:00.620","active":"1","created_by":"Admin"}');
 console.log(inputJson);
    connection.query(sql,[inputJson,flag,0],function (error, results) {
        if(error) {
             console.log(error);                                                                                       
         mycallback(error,null);
         
                                                                                                     
       }else{
                                                                    
      
       mycallback(null,results[0]);
      }
      
  });                                                 
}2*/
//done by rajesh kumar ranjan (t0007)
var utils={
invokeCountryMaster : function(country_code,flag,connection,mycallback)
{ 

      var sql='call sp_country_master('+"'"+JSON.stringify({})+"',"+flag+","+country_code+')';
      connection.query(sql,function (error, results) {
        if(error) {
         mycallback(error,null);
       }else{
       mycallback(null,results[0]);
      }
      
  });                                                 
},
 invokeCountryMasterInsert : function(country_master,country_code,flag,connection,mycallback)
{ 
     
      var sql='call sp_country_master('+"'"+JSON.stringify(country_master)+"',"+flag+","+country_code+')';
      connection.query(sql,function (error, results) {
        if(error) {
         mycallback(error);
       }else{
       mycallback(null,results[0]);
      }
      
  });                                                 
},


//end of utils
//end by rajesh kumar ranjan (t0007)

invokeStateMaster : function(state_code,flag,connection,mycallback)
{ 

      var sql='call sp_state_master('+"'"+JSON.stringify({})+"',"+flag+","+country_code+')';
      connection.query(sql,function (error, results) {
        if(error) {
         mycallback(error,null);
       }else{
       mycallback(null,results[0]);
      }
      
  });                                                 
},

invokeStateMasterInsert : function(state_master,state_code,flag,connection,mycallback)
{ 
     
      var sql='call sp_state_master('+"'"+JSON.stringify(state_master)+"',"+flag+","+state_code+')';
      connection.query(sql,function (error, results) {
        if(error) {
         mycallback(error);
       }else{
       mycallback(null,results[0]);
      }
      
  });                                                 
},
invokeStateMaster : function(state_code,flag,connection,mycallback)
{ 
     
      var sql='call sp_state_master('+"'"+JSON.stringify({})+"',"+flag+","+state_code+')';
      connection.query(sql,function (error, results) {
        if(error) {
         mycallback(error);
       }else{
       mycallback(null,results[0]);
      }
      
  });                                                 
},

};

module.exports =utils;