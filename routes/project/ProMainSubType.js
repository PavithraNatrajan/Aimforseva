/* Project Name :AIM for Seva
Filename : ProMainSubType.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Rahul(id:T0002)
*/


var connection = require('./../../model/config');
var invokeProjectMaintenanceSubType =require('./../../model/projectUtil');
const express = require('express');
const router = express.Router();

//function to perform select operation to list all the Project Maintenance Sub-type
router.get('/getAllList', function (req, res) {
  try{
  var flag=2;
  var sub_type_id=req.params.sub_type_id='000';
 invokeProjectMaintenanceSubType.invokeProjectMaintenanceSubType(sub_type_id,flag,connection, function (err,data) {
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

//function to perform select operation to list all the Project Maintenance Sub-type
router.get('/getProjectList', function (req, res) {
  try{
  var flag=6;
  var sub_type_id=req.params.sub_type_id='000';
 invokeProjectMaintenanceSubType.invokeProjectMaintenanceSubType(sub_type_id,flag,connection, function (err,data) {
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

//function to perform select by Id operation to list the Maintenance list by Id from server side
router.get('/getMaintenanceList/:id', function (req, res) {
  try{
  var flag=7;
  var sub_type_id=req.params.id;
 invokeProjectMaintenanceSubType.invokeProjectMaintenanceSubType(sub_type_id,flag,connection, function (err,data) {
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

//function to perform select by Id operation to list the Maintenance list by Id from server side
router.get('/getProjectMaintenanceTypeList/:id', function (req, res) {
    try{
    var flag=8;
    var sub_type_id=req.params.id;
   invokeProjectMaintenanceSubType.invokeProjectMaintenanceSubType(sub_type_id,flag,connection, function (err,data) {
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

//function to perform select by Id operation to list the Maintenance Sub-Type List by Id from server side
router.get('/getProjectMaintenanceSubTypeList/:id', function (req, res) {
  try{
  var flag=9;
  var sub_type_id=req.params.id;
 invokeProjectMaintenanceSubType.invokeProjectMaintenanceSubType(sub_type_id,flag,connection, function (err,data) {
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

//function to perform select by Id operation to list the Maintenance Sub-Type list by Id from server side
router.get('/getListById/:id', function (req, res,err) {
  try {
  var flag=3;
  var sub_type_id=req.params.id;
  invokeProjectMaintenanceSubType.invokeProjectMaintenanceSubType(sub_type_id,flag,connection, function (err,data) {
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

//function to perform select by Id operation to list the Maintenance Sub-Type list by Id from server side
router.delete('/deleteById/:id', function (req, res,err) {
  try {
  var flag=4;
  var  sub_type_id = req.params.id;
  invokeProjectMaintenanceSubType.invokeProjectMaintenanceSubType(sub_type_id,flag,connection, function (err,data) {
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

//function to perform update by Id operation to modify the records from server side
router.put('/updateById/:id', function (req, res,err) {
  try {
  var  projectMaintenanceSubType ={
    "sub_type":req.body.sub_type,
    "active":req.body.active
  }
  var flag=5;
  var sub_type_id=req.params.id;
  invokeProjectMaintenanceSubType.invokeProjectMaintenanceSubTypeInsert(projectMaintenanceSubType,sub_type_id,flag,connection, function (err,data) {
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

//function to perform insert operation for Project Maintennace Sub-Type from server side 
router.post('/setDataToDB', function (req, res,err) {
  try{
  var flag='1',sub_type_id='000';
  var today=new Date();
  var projectMaintenanceSubType =  {
    "project_category_id":req.body.selitem.project_category_id,
    "maintenance_id":req.body.selitem1.maintenance_id,
    "sub_type":req.body.sub_type,
    "active":req.body.active,
    "created_by":"Admin",
    "created_on":"2018-03-19"
  }
  invokeProjectMaintenanceSubType.invokeProjectMaintenanceSubTypeInsert(projectMaintenanceSubType,sub_type_id,flag,connection, function (err,data) {
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



