/* Project Name :AIM for Seva
Filename : role_master.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Karthick(id:T0003)
*/

var connection = require('./../../model/config');
var invokeRoleMaster = require('./../../model/util');
const express = require('express');
const router = express.Router();

//function to perform select operation to list all the roles
router.get('/getAllList', function(req, res) {
    try {
        var flag = 2;
        var role_id = req.params.role_id = '000';
        invokeRoleMaster.invokeALLRoleMaster(role_id, flag, connection, function(err, data) {
            if (err) {
                throw err;
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

//function to perform select by Id operation to select a role by Id from server side
router.get('/getListById/:id', function(req, res, err) {
    try {
    var flag = 3;
    var role_id = req.params.id;
    invokeRoleMaster.invokeRoleMaster(role_id, flag, connection, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
}catch (err) {
        res.json({
            'output': err
        });
    }
});

//function to perform delete operation from server side
router.delete('/deleteById/:id', function(req, res, err) {
    try {
    var flag = 5;
    var role_id = req.params.id;
    invokeRoleMaster.invokeRoleMaster(role_id, flag, connection, function(err, data) {
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

//function to perform update operation 
router.put('/updateById/:id', function(req, res, err) {
    try {
    var role_master = {
        "role_code": req.body.role_code,
        "role": req.body.role,
        "updated_by": req.body.role1,
        "active": req.body.active
    }
    var flag = 4;
    var role_id = req.params.id;
    invokeRoleMaster.invokeRoleMasterInsert(role_master, role_id, flag, connection, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
}catch (err) {
        res.json({
            'output': err
        });
    }
});

//function to perform insert operation too add a Role from server side 
router.post('/setDataToDB', function(req, res, err) {
    try {
        var flag = '1',
            role_id = '000';
        var today = new Date();
        var role_master = {
            "role_code": req.body.role_code,
            "role": req.body.role,
            "created_by": req.body.roleName,
            "active": req.body.active
        }
        invokeRoleMaster.invokeRoleMasterInsert(role_master,role_id,flag,connection, function (err,data) {
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