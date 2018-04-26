/* Project Name :AIM for Seva
Filename : ProMainSubType.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Rahul(id:T0002)
*/

var connection = require('./../../model/config');
var proUtil = require('./../../model/projectUtil');
var util = require('./../../model/util');
const express = require('express');
const router = express.Router();

//function to perform insert operation for Projects from server side 
router.post('/setDataToDB', function(req, res) {
    try {
        var flag = '1', project_code = '000';         
        var project = {
            "project_code": req.body.project_code,
            "project_name": req.body.project_name,
            "country_code": req.body.country_code,
            "state_code": req.body.state_code,
            "address1": req.body.address1,
            "address2": req.body.address2,
            "address3": req.body.address3,
            "city": req.body.city,
            "postal_code": req.body.postal_code,
            "report_subm_period": req.body.report_subm_period,
            "active": req.body.active,
            "created_by": 'Admin',
            "created_on": '2018-03-03',
        }
        proUtil.invokeProjectInsert(project, project_code, flag, connection, function(err, data) {
            try {
                if (err) {
                    throw err;
                } else {
                    res.json({
                        success: true,
                        data: data,
                        message: 'Record updated successfully'
                    })
                }
            } catch (e) {
                res.json({
                    success: false,
                    message: e
                })
            }
        });
    } catch (err) {
        res.json({
            'output': err
        });
    }
});

//function to perform select operation to list all the Project details
router.get('/getAllList', function(req, res) {
    try {
        var flag = 2;
        var project_code = '000';
        proUtil.invokeProjectList(project_code, flag, connection, function(err, data) {
            if (err) {
                throw err;
            } else {
                res.json(data);
            }
        })
    } catch (err) {
        res.json({
            'output': err
        });
    }
});

//function to perform select by Id operation to select a project from server side
router.get('/getListById/:id', function(req, res) {
    try {
        var flag = 3;
        var project_code = req.params.id;
        proUtil.invokeProjectList(project_code, flag, connection, function(err, data) {
            if (err) {
                throw err;
            } else {
                res.json(data);
            }
        })
    } catch (err) {
        res.json({
            'output': err
        });
    }
});

//function to perform update operation based on the Id from server side
router.put('/updateById/:id', function(req, res, err) {
    try {
    var project = {
        "project_code": req.body.project_code,
        "project_name": req.body.project_name,
        "country_code": req.body.selitem.country_code,
        "state_code": req.body.selitem1.state_code,
        "address1": req.body.address1,
        "address2": req.body.address2,
        "address3": req.body.address3,
        "city": req.body.city,
        "postal_code": req.body.postal_code,
        "updated_by": req.body.updated_by,
        "active": req.body.active
    }
    var flag = 4;
    var project_code = req.params.id;
    proUtil.invokeProjectInsert(project, project_code, flag, connection, function(err, data) {
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

//function to perform delete operation from server side
router.delete('/deleteById/:id', function(req, res, err) {
    try {
    var flag = 5;
    var project_code = req.params.id;
    proUtil.invokeProjectList(project_code, flag, connection, function(err, data) {
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

//function to perform select operation to list all the Countries from server side
router.get('/allCountryList', function(req, res) {
    try {
        flag = 1;
        invokeCountryMaster.invokeAllCountryMaster(flag, connection, function(err, data) {
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

//function to perform select operation to display all the Project Categopry List from server side
router.get('/getAllCategoryNameList', function(req, res) {
    var flag = 8;
    var project_category_id = '000';
    proUtil.invokeprojectCategoryList(project_category_id, flag, connection, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })

})

module.exports = router;

