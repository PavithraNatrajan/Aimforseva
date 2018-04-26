/* Project Name :AIM for Seva
Filename : landdonor.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Ankit(id:T0003)
*/

var connection = require('./../../model/config');
var proUtil = require('./../../model/projectUtil');
const express = require('express');
const router = express.Router();


//function to perform insert operation for Land Donation from server side 
router.post('/setDataToDB', function(req, res) {
    try {
        var flag = '1',  donor_id = '000';           
        var landdonor = {
            "receipt_no": req.body.receipt_no,
            "donor_id": req.body.selitem.donor_id,
            "country_code": req.body.selitem.country_code,
            "state_code": req.body.selitem.state_code,
            "donation_date": "2018-03-03",
            "amount": req.body.amount,
            "payment_id": req.body.selitempayment.payment_id,
            "cheque_no": req.body.cheque_no,
            "cheque_date": "2019-03-03",
            "bank": req.body.bank,
            "project_category_id": req.body.selitemProject.project_category_id,
            "maintenance_id": req.body.selitemMaintenance.maintenance_id,
            "sub_type_id": req.body.selitemSub.sub_type_id,
            "notes": req.body.notes,
            "campaign_id": req.body.selitemcampaign.campaign_id,
            "donated": req.body.donated,
            "leased": req.body.leased,
            "build_up_area": req.body.build_up_area,
            "vacant_area": req.body.vacant_area,
            "location": req.body.location,
            "project_id": req.body.selitemproject.project_id,
            "year_of_donation": req.body.year_of_donation,
            "leased_period": req.body.leased_period,
            "credit_or_debit_card_no": req.body.credit_or_debit_card_no,
            "txn_id": req.body.txn_id,
            "created_by": req.body.role

        }
        //calling the procedure in the name of function
        proUtil.invokelandDonorInsert(landdonor, flag, donor_id, connection, function(err, data) {
            //error handler is handle by Rajesh(t0007) and Ankit(t0003)(3/9/2018) 
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

//function to perform select operation to list all the donor details
router.get('/getAllList', function(req, res) {
    try {
        var flag = 2;
        var donor_id = '000';
        proUtil.invokeDonorList(donor_id, flag, connection, function(err, data) {
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

//function to perform select operation to list all the donor details
router.get('/getAllList', function(req, res) {
    try {
        var flag = 11;
        var donor_id = '000';
        proUtil.invokeDonorList(donor_id, flag, connection, function(err, data) {
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

//function to perform select by Id operation to select a donor by Id from server side
router.get('/getListById/:id', function(req, res) {
    try {
        var flag = 3;
        var donor_id = req.params.id;
        proUtil.invokeDonorList(donor_id, flag, connection, function(err, data) {
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

//function to perform update operation from server side
router.put('/updateById/:donor_id', function(req, res, err) {
    try {
    var landdonor = {
        "donation_date": req.body.donation_date,
        "amount": req.body.amount,
        "payment_id": req.body.payment_id,
        "cheque_no": req.body.cheque_no,
        "cheque_date": req.body.cheque_date,
        "bank": req.body.bank,
        "project_category_id": req.body.project_category_id,
        "maintenance_id": req.body.maintenance_id,
        "sub_type_id": req.body.sub_type_id,
        "notes": req.body.notes,
        "campaign_id": req.body.campaign_id,
        "donated": req.body.donated,
        "leased": req.body.leased,
        "build_up_area": req.body.build_up_area,
        "vacant_area": req.body.vacant_area,
        "location": req.body.location,
        "year_of_donation": req.body.year_of_donation,
        "leased_period": req.body.leased_period,
        "credit_or_debit_card_no": req.body.credit_or_debit_card_no,
        "txn_id": req.body.txn_id,
        "created_by": 'Admin',
        "created_on": '2018-03-03',
        "updated_by": req.body.updated_by,
        "updated_on": req.body.updated_on
    }

    var flag = 4;
    var donor_id = req.params.donor_id;
    proUtil.invokeDonorInsert(donor, donor_id, flag, connection, function(err, data) {
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
router.delete('/deleteById/:donor_id', function(req, res, err) {
    try {
    var flag = 5;
    var donor_id = req.params.donor_id;
    proUtil.invokeDonorList(donor_id, flag, connection, function(err, data) {
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

//function to perform select operation to list all the payment modes from server side
router.get('/getAllPaymentList', function(req, res) {
    try {
        var flag = 2;
        var payment_id = req.params.payment_id = '000';
        proUtil.invokePaymentData(payment_id, flag, connection, function(err, data) {
            if (err) {
                throw err;
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

//function to perform select operation to list the receipt no from server side
router.get('/getMaxReceiptNo', function(req, res, err) {
    try {
    var flag = 6, donor_id = '000';       
    proUtil.invokeDonorReceipt(donor_id, flag, connection, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
} catch (err) {
        res.json({
            'output': err
        });
    }
})

module.exports = router;