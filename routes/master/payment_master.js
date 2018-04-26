/* Project Name :AIM for Seva
Filename : payment_master.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Karthick(id:T0003)
*/

var connection = require('./../../model/config');
var invokePaymentMaster = require('./../../model/util');
const express = require('express');
const router = express.Router();

//function to perform select operation to list all the payment modes
router.get('/getAllList', function(req, res) {
    try {
        var flag = 2;
        var payment_id = req.params.id = '000';
        invokePaymentMaster.invokeALLPaymentMaster(payment_id, flag, connection, function(err, data) {
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

//function to perform select by Id operation to select a template by Id from server side
router.get('/getListById/:id', function(req, res, err) {
    try {
    var flag = 3;
    var payment_id = req.params.id;
    invokePaymentMaster.invokePaymentMaster(payment_id, flag, connection, function(err, data) {
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
    var payment_id = req.params.id;
    invokePaymentMaster.invokePaymentMaster(payment_id, flag, connection, function(err, data) {
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

//function to perform update operation from server side
router.put('/updateById/:id', function(req, res, err) {
    try {
    var payment_master = {
        "payment_code": req.body.payment_code,
        "payment_mode": req.body.payment_mode,
        "updated_by": req.body.role1,
        "active": req.body.active
    }
    var flag = 4;
    var payment_id = req.params.id;
    invokePaymentMaster.invokePaymentMasterInsert(payment_master, payment_id, flag, connection, function(err, data) {
        if (err) {
            res.josn(err);
        } else {
            res.json(data);

        }
    })
}catch (err) {
        res.json({
            'output': err
        });
    }
});

//function to perform insert operation to add a Payment Mode from server side 
router.post('/setDataToDB', function(req, res, err) {
    try {
        var flag = 1, payment_id = 0;           
        var today = new Date();
        var payment_master = {
            "payment_code": req.body.payment_code,
            "payment_mode": req.body.payment_mode,
            "created_by": req.body.roleName,
            "active": req.body.active
        }
        invokePaymentMaster.invokePaymentMasterInsert(payment_master, payment_id, flag, connection, function(err, data) {
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