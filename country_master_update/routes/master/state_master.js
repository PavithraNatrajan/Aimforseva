/*
Guidelines for Comments

Header comments for the Files
*/
/****************************************************/

// Filename : state_master.*

//Purpose /Functionality: in this file calling the procedure (sp_state_master) and do the process on table like 
//(insertion, updation ,deletion ,find single record etc...)


// Author : Ankit(id:T0003)

// Createdon: 9-3-1018

// Change history:

// v1.10 date of change /Author name

/****************************************************/
/*
Block level Comments:

Block comments to document a method
*/


var connection = require('./../../model/config');
var invokeStateMaster =require('./../../model/util');
const express = require('express');
const router = express.Router();


router.post('/insertState', function (req, res,err) {
  try{
  var flag='1',country_code='000';
  var state_master={
    "country_code":req.body.country_code,
    "state":req.body.state,
    "state_short_name":req.body.state_short_name,
    "active":req.body.active,
    "created_by":'Admin',
    "created_on":'2018-02-01'
  }
   
 invokeStateMaster.invokeStateMasterInsert(state_master,country_code,flag,connection, function (err,data) {
 
    try{        
    if (err) {
        throw err;
    } else {
        //res.send(data);
        res.json({
          success:true,
          message:'Record inserted successfully'
        })
    }
    }
    catch(e)
    {
      if(e && e.errno=='1062')
      {
        res.json(
          {success:false,
            message:'Duplicate country'});
      }
      else if(e && e.errno==''){

      }
      
      else
      {
        res.json(e);
      }
    }

   
  });
 }
 catch(err)
 {
  
 console.log(err);

 }
 
});

router.put('/updateStateListById/:state_code', function (req, res,err) {
  try{
  var state_master={
    "country_code":req.body.country_code,
    "state":req.body.state,
    "state_short_name":req.body.state_short_name,
    "active":req.body.active,
    "updated_by":'Admin',
    "updated_on":'2018-02-01'
  }
  var flag=3;
    var state_code=req.params.state_code;
   
invokeStateMaster.invokeStateMasterInsert(state_master,state_code,flag,connection, function (err,data) {
  try{
    if (err) {
         throw err;
    } else {
        res.json({
          success:true,
          message:'Record Update successfully'
        })
    }
  }catch(ex){
    res.json(ex);

  }
  })
      
 }catch(ex){
  res.json(ex);

 }
});

router.get('/getStateList', function (req, res) {
  try{
  var flag=2;
  var state_code=req.params.state_code='000';
 invokeStateMaster.invokeStateMaster(state_code,flag,connection, function (err,data) {
  try{
    if (err) {
        throw err;
    } else {
         res.json({
          success:true,
          message:'Deleted successfully'
        })
    }
  }catch(ex){
    res.json(ex);

  }
  })
 }
 catch(err)
 {
   res.json({'output':err});
 }
});

router.get('/getStateListById/:state_code', function (req, res,err) {
  var flag=5;
  var state_code=req.params.state_code;
  //res.send(err);
  invokeStateMaster.invokeStateMaster(state_code,flag,connection, function (err,data) {
    if (err) {
        res.send(err);
    } else {
        res.json(data);
    }
  })

});

router.delete('/deleteStateListById/:state_code', function (req, res,err) {
  var flag=4;
  var state_code=req.params.state_code;
  //res.send(err);
  invokeStateMaster.invokeStateMaster(state_code,flag,connection, function (err,data) {
    if (err) {
        res.send(err);
    } else {
        res.send(data);
    }
  })

});




module.exports = router;
