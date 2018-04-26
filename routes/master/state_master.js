/* Project Name :AIM for Seva
Filename : state_master.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Ankit(id:T0003)
*/

var connection = require('./../../model/config');
var invokeStateMaster = require('./../../model/util');
const express = require('express');
const router = express.Router();

//function to perform insert operation to add different States based on the Country from server side 
router.post('/setDataToDB', function(req, res, err) {
    try {
        var flag = '1', country_code = '000';         
        var state_master = {
            "country_code": req.body.selitem.country_code,
            "state_code": req.body.selitem1.state_code,
            "state": req.body.selitem1.state,
            "state_short_name": req.body.selitem1.state_short_name,
            "active": req.body.active,
            "created_by": req.body.role,
            "created_on": '2018-02-01'
        }
        invokeStateMaster.invokeStateMasterInsert(state_master, country_code, flag, connection, function(err, data) {
            try {
                if (err) {
                    throw err;
                } else {
                    res.json({
                        success: true,
                        message: 'Record inserted successfully'
                    })
                }
            } catch (e) {
                if (e && e.errno == '1062') {
                    res.json({
                        success: false,
                        message: 'Dublicate state'
                    });
                } else if (e && e.errno == '1364') {
                    res.json({
                        success: false,
                        message: 'Field active doesnt have a  default value'
                    });
                } else {
                    res.json(e);
                }
            }
        });
    } catch (err) {
        res.json({
            'output': err
        });
    }
});

//function to perform update operation 
router.put('/updateById/:state_code', function(req, res, err) {
    try {
        var state_master = {
            "active": req.body.active,
            "updated_by": 'Admin',
            "updated_on": '2018-02-01'
        }
        var flag = 3;
        var state_code = req.params.state_code;
        invokeStateMaster.invokeStateMasterInsert(state_master, state_code, flag, connection, function(err, data) {
            try {
                if (err) {
                    throw err;
                } else {
                    res.json({
                        success: true,
                        message: 'Record Update successfully'
                    })
                }
            } catch (ex) {
                res.json(ex);
            }
        })
    } catch (ex) {
        res.json(ex);
    }
});

//function to perform select operation to list all the Countries
router.get('/getAllList', function(req, res) {
    try {
        var flag = 2;
        var country_code = req.params.country_code = '000';
        invokeStateMaster.invokeStateMaster(country_code, flag, connection, function(err, data) {
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

//function to perform select operation to list all the Countries
router.get('/getCountryList', function(req, res) {
    try {
        var flag = 6;
        var country_code = req.params.country_code = '000';
        invokeStateMaster.invokeStateMaster(country_code, flag, connection, function(err, data) {
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

//function to perform select by Id operation to select a State by Id from server side
router.get('/getListById/:state_code', function(req, res, err) {
    try {
    var flag = 5;
    var state_code = req.params.state_code;
    invokeStateMaster.invokeStateMaster(state_code, flag, connection, function(err, data) {
        if (err) {
            res.send(err);
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

//function to perform delete operation from server side
router.delete('/deleteById/:state_code', function(req, res, err) {
    try {
    var flag = 4;
    var state_code = req.params.state_code;
    invokeStateMaster.invokeStateMaster(state_code, flag, connection, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
} catch (err) {
        res.json({
            'output': err
        });
    }
});

//function to perform select operation to list all the States available
router.get('/allStateList', function(req, res) {
    try {
        flag = 1;
        invokeStateMaster.invokeAllStateMaster(flag, connection, function(err, data) {
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

module.exports = router;