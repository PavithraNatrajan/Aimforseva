/* Project Name :AIM for Seva
Filename : category.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Pavithra(id:T0002)
*/


var connection = require('./../../model/config');
var proUtil = require('./../../model/projectUtil');
const express = require('express');
const router = express.Router();

//function to perform insert operation for Project Category from server side 
router.post('/setDataToDB', function(req, res, err) {
    try {
        var flag = '1', project_category_id = '000';
        var project_category = {
            "project_code": req.body.project_code,
            "project_category": req.body.project_category,
            "created_by": 'Admin',
            "created_on": '2018-03-03',
            "active": req.body.active
        }
        proUtil.invokeCategoryInsert(project_category, project_category_id, flag, connection, function(err, data) {
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
        })
    }
});

//function to perform select operation to list all the category
router.get('/getAllList', function(req, res) {
    try {
        var flag = 2;
        var project_category_id = '000';
        proUtil.invokeCategoryList(project_category_id, flag, connection, function(err, data) {
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

//function to perform select by Id operation to select a category by Id from server side
router.get('/getListById/:id', function(req, res) {
    try {
        var flag = 3;
        var project_category_id = req.params.id;
        proUtil.invokeCategoryList(project_category_id, flag, connection, function(err, data) {
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

//function to perform update operation by selecting a category Id from server side
router.put('/updateById/:id', function(req, res, err) {
    try {
    var project_category = {
        "project_code": req.body.project_code,
        "project_category": req.body.project_category,
        "created_by": 'Admin',
        "created_on": '2018-03-03',
        "active": req.body.active
    }
    var flag = 4;
    var project_category_id = req.params.id;
    proUtil.invokeCategoryInsert(project_category, project_category_id, flag, connection, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
} catch (err) {
        res.json({
            'output': err
        })
    }
});

//function to perform delete operation to delete a record from server side
router.delete('/deleteById/:id', function(req, res, err) {
    try {
    var flag = 5;
    var project_category_id = req.params.id;
    proUtil.invokeCategoryList(project_category_id, flag, connection, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
} catch (err) {
        res.json({
            'output': err
        })
    }
});


module.exports = router;