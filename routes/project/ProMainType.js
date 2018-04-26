/* Project Name :AIM for Seva
Filename : ProMainType.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Rahul(id:T0002)
*/


var connection = require('./../../model/config');
var invokeProjectMaintenanceType =require('./../../model/projectUtil');
const express = require('express');
const router = express.Router();

//function to perform select operation to list all the Project Maintenance Type
router.get('/getAllList', function (req, res) {
  try{
  var flag=2;
  var maintenance_id=req.params.maintenance_id='000';
 invokeProjectMaintenanceType.invokeProjectMaintenanceType(maintenance_id,flag,connection, function (err,data) {
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

//function to perform select operation to list all the Project Maintenance Type
router.get('/getProjectList', function (req, res) {
  try{
  var flag=6;
  var maintenance_id=req.params.maintenance_id='000';
 invokeProjectMaintenanceType.invokeProjectMaintenanceType(maintenance_id,flag,connection, function (err,data) {
    if (err) {
        throw err;
    } else {
        res.json(data);
    }
  })
 }
 catch(err)
 {
   res.json({'output':err});
 }
});

//function to perform select operation to list all the Project Maintenance Type
router.get('/getMaintenanceList', function (req, res) {
  try{
  var flag=7;
  var maintenance_id=req.params.maintenance_id='000';
 invokeProjectMaintenanceType.invokeProjectMaintenanceType(maintenance_id,flag,connection, function (err,data) {
    if (err) {
        throw err;
    } else {
        res.json(data);
    }
  })
 }
 catch(err)
 {
   res.json({'output':err});
 }
});

//function to perform select by Id operation to select a maintenance type by Id from server side
router.get('/getListById/:id', function (req, res,err) {
  try {
  var flag=3;
  var maintenance_id=req.params.id;
  invokeProjectMaintenanceType.invokeProjectMaintenanceType(maintenance_id,flag,connection, function (err,data) {
    if (err) {
        res.send(err);
    } else {
        res.send(data);
    }
  })

} catch (err) {
        res.json({
            'output': err
        });
      }
});

//function to perform delete operation to delete a record from server side
router.delete('/deleteById/:id', function (req, res,err) {
  try {
  var flag=4;
  var  maintenance_id = req.params.id;
  invokeProjectMaintenanceType.invokeProjectMaintenanceType(maintenance_id,flag,connection, function (err,data) {
    if (err) {
        res.send(err);
    } else {
        res.send(data);
    }
  })

} catch (err) {
        res.json({
            'output': err
        });
      }
  });

//function to perform update operation from server side
router.put('/updateById/:id', function (req, res,err) {
  try {
  var  projectMaintenanceType ={
    "maintenance_code" : req.body.maintenance_code,
    "project_category_id":req.body.project_category_id,
    "maintenance_type":req.body.maintenance_type,
    "active":req.body.active
  }
  var flag=5;
  var maintenance_id=req.params.id;
  invokeProjectMaintenanceType.invokeProjectMaintenanceTypeInsert(projectMaintenanceType,maintenance_id,flag,connection, function (err,data) {
    if (err) {
        res.send(err);
    } else {
        res.send(data);
    }
  })
} catch (err) {
        res.json({
            'output': err
        });
      }
  });

//function to perform insert operation for Maintenance Type from server side 
router.post('/setDataToDB', function (req, res,err) {
  try{
  var flag='1', maintenance_id='000';
  var today=new Date();
  var projectMaintenanceType =  {
    "maintenance_code":req.body.maintenance_code,
    "maintenance_id": req.body.maintenance_id,
    "project_category_id":req.body.selitem.project_category_id,
    "maintenance_type":req.body.maintenance_type,
    "created_by":"Admin",
    "created_on":"2018-03-19",
    "active":req.body.active
  }
  invokeProjectMaintenanceType.invokeProjectMaintenanceTypeInsert(projectMaintenanceType,maintenance_id,flag,connection, function (err,data) {
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
      res.json(e);
    }  
  });
 }
 catch (err) {
        res.json({
            'output': err
        });
    }
});
  

module.exports = router;



