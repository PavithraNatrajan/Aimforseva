/* Project Name :AIM for Seva
Filename : role_user_map.js 
Purpose / Functionality: Mapping different roles for a particular user based on the functionalities
Author : Karthick(id:T0003)
*/

var connection = require('./../../model/config');
var invokeRoleMapping = require('./../../model/util');
const express = require('express');
const router = express.Router();

//function to perform select operation to list all the Roles available
router.get('/getAllList', function(req, res) {
    try {
        var flag = '1';
        var roleid = 0;
        invokeRoleMapping.invokeALLRoleMapping(flag, roleid, connection, function(err, data) {
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

//function to perform select by Id operation to select a Role by Id from server side
router.get('/getListById/:id', function(req, res, err) {
    try {
    var flag = 6;
    var user_id = req.params.id;
    invokeRoleMapping.invokeRoleMappingbyid(user_id, 0, flag, connection, function(err, data) {
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

//function to perform select operation to list all the User details
router.get('/getAllUser', function(req, res, err) {
    try {
    var flag = '3';
    var roleid = 0;
    var user_id = req.params.id = '000';
    invokeRoleMapping.invokeRoleMappingbyid(user_id, roleid, flag, connection, function(err, data) {
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

//function to perform select operation to list all the Modules present
router.get('/getAllScreen', function(req, res, err) {
    try {
    var flag = '4';
    var roleid = 0;
    var user_id = req.params.id = '000';
    invokeRoleMapping.invokeRoleMappingbyid(user_id, roleid, flag, connection, function(err, data) {
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

router.post('/setDataToRolemap/:id/:id2', function(req, res, err) {
    try {
        var flag = '2';
        var today = new Date();
        var roleid = 0;
        var role_mapping = {
            "role_id": req.params.id,
            "user_code": req.params.id2,
            "created_by": req.body.roleName = 'raju',
            "active": req.body.active = 'Y'
        }
        invokeRoleMapping.invokeRoleMappingInsert(role_mapping, roleid, flag, connection, function(err, data) {
            try {
                if (err) {
                    throw err;
                } else {
                    res.json({
                        success: true,
                        data: data,
                        message: 'Record inserted successfully'
                    })
                }
            } catch (e) {
                res.json(e);
            }
        });
    } catch (err) {
        res.json({
            'output': err
        });
    }
});

router.post('/setDataToScreenmap/:id', function(req, res, err) {
    try {
        var flag = '5';
        var today = new Date();
        var roleid = req.params.id;
        var role_mapping = {
            "role_id": req.body.role_id = '000',
            "nav_id": req.body,
            "user_code": req.body.user_code = '000',
            "created_by": req.body.role1 = 'raju',
            "active": req.body.active = 'Y'
        }
        invokeRoleMapping.invokeRoleMappingInsert(role_mapping, roleid, flag, connection, function(err, data) {
            try {
                if (err) {
                    throw err;
                } else {
                    res.json({
                        success: true,
                        data: data,
                        message: 'Record inserted successfully'
                    })
                }
            } catch (e) {
                res.json(e);
            }
        });
    } catch (err) {
        res.json({
            'output': err
        });
    }
});


module.exports = router;