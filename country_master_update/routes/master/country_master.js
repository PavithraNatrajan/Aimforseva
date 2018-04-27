/****************************************************/
// Project Name: AIM FOR SEVA.
// Filename : countryMaster.js

//Purpose /Functionality: Purpose of this file is to get the data from countrymaster form and perform CRUD operations.
        // Functionality: Webservices used to perform CRUD Operations.
                        //1.router.get('/getCountryList', function (req, res) --> For Selection.
                        //2.router.post('/setCountryList', function (req,res) --> For Updation.
                        //3.router.post('/setCountryList', function (req,res) --> For Insertion.
                        //4.router.post('/setCountryList', function (req,res) --> For Deletion.
// Author : Rahul Sai Vishnu(T0004), Pavithra Natarajan (T0002)

// Createdon: 07/03/2018.

//Version Number: 1.0.0.

//Reviewed By: Sobana and Karthick.

/****************************************************/
/*
Block level Comments:

Block comments to document a method
*/

/**

* Author : Rahul Sai Vishnu(T0004), Pavithra Natarajan (T0002) , Created on: 07/03/2018 , Purpose:
* @param
        req = getting request from the Countrymaster form.
        res = Providing response based on the request.
        err = Sends error message.
        Selectdata = collects request for Select Operation.
        Updatedata = collects request for Update Operation.
        Insertdata = collects request for Insert Operation.
        Deletedata = collects request for Delete Operation.

: **/



var connection = require('./../../model/config');
var invokeCountryMaster =require('./../../model/util');
const express = require('express');
const router = express.Router();

router.get('/getCountryList', function (req, res) {
  try{
  var flag=2;
  var country_code=req.params.country_code='000';
 invokeCountryMaster.invokeCountryMaster(country_code,flag,connection, function (err,data) {
    if (err) {
        throw err;
    } else {
        res.send(data);
    }
  })
 }
 catch(err)
 {
   res.json({'output':err});
 }
});
//change by rajesh kumar ranjan (T0007)
router.get('/getCountryListById/:country_code', function (req, res,err) {
  var flag=3;
  var country_code=req.params.country_code;
  //res.send(err);
  invokeCountryMaster.invokeCountryMaster(country_code,flag,connection, function (err,data) {
    if (err) {
        res.send(err);
    } else {
        res.send(data);
    }
  })

});
router.delete('/deleteCountryListById/:country_code', function (req, res,err) {
  var flag=5;
  var country_code=req.params.country_code;
  //res.send(err);
  invokeCountryMaster.invokeCountryMaster(country_code,flag,connection, function (err,data) {
    if (err) {
        res.send(err);
    } else {
        res.send(data);
    }
  })

});
router.put('/updateCountryListById/:country_code', function (req, res,err) {
  
  var country_master={
    "country":req.body.country,
    "country_short_name":req.body.country_short_name,
    "active":req.body.active
  }
  var flag=4;
    var country_code=req.params.country_code;
   
invokeCountryMaster.invokeCountryMasterInsert(country_master,country_code,flag,connection, function (err,data) {
    if (err) {
        res.send(err);
    } else {
        res.send(data);
    }
  })
 
});

router.post('/insertCountry', function (req, res,err) {
  try{
  var flag='1',country_code='000';
  var today=new Date();
  var country_master={
    "country":req.body.country,
    "country_short_name":req.body.country_short_name,
    "active":req.body.active,
    "created_by":'Admin',
    "created_on":'2018-02-01'
  }
   
 invokeCountryMaster.invokeCountryMasterInsert(country_master,country_code,flag,connection, function (err,data) {
  //error handler is handle by Rajesh(t0007) and Ankit(t0003)(3/9/2018) 
    try{        
    if (err) {
        throw err;
    } else {
       res.json({
        success:true,
        data:data,
        message:'Record inserted successfully'
       })
    }
    }
    catch(e)
    {
     /* if(e && e.errno=='1062')
      {
        res.json('Dublicate country');
      }
      else if(e && e.errno==''){

      }
      
      else
      {
        res.json(e);
      }*/
      res.json(e);
    }


   
  });
 }
 catch(err)
 {
  
 console.log(err);

 }
 //end of chnanges by Rajesh(t0007) and Ankit(t0003)(3/9/2018)
});



  

module.exports = router;



