/* Project Name :AIM for Seva
Filename : annualMaintenance.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Pavithra(id:T0002)
*/


var connection = require('./../../model/config');
var proUtil = require('./../../model/projectUtil');
const express = require('express');
const router = express.Router();

//function to perform insert operation for Annual Maintenance from server side 
router.post('/setDataToDB', function(req, res, err) {
    try {
        var flag = '1', receipt_no = '000';
        var annual_maintenance = {   //variable to store all the donor-details
            "country_code": req.body.selitem.country_code,
            "state_code": req.body.selitem.state_code,
            "donor_id": req.body.selitem.donor_id,
            "donation_date": req.body.donation_date,
            "amount": req.body.amount,
            "payment_id": req.body.selitempayment.payment_id,
            "project_id": req.body.selitemproject.project_id,
            "cheque_no": req.body.cheque_no,
            "cheque_date": req.body.cheque_date,
            "bank": req.body.bank,
            "project_category_id": req.body.selitemProjectCategory.project_category_id,
            "maintenance_id": req.body.selitemMaintenance.maintenance_id,
            "sub_type_id": req.body.selitemSub.sub_type_id,
            "notes": req.body.notes,
            "upload_document": req.body.upload_document,
            "campaign_id": req.body.selitemcampaign.campaign_id,
            "credit_or_debit_card_no": req.body.credit_or_debit_card_no,
            "txn_id": req.body.txn_id,
            "start_date": req.body.selitemcampaign.start_date,
            "end_date": req.body.selitemcampaign.end_date,
            "created_by": req.body.role,
            "active": req.body.selitem.active
        }
         //calling the procedure in the name of function
        proUtil.invokeAnnualInsert(annual_maintenance, receipt_no, flag, connection, function(err, data) {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    success: true,
                    data: data,
                    message: 'Record updated successfully'
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
        var flag = 10;
        var donor_id = req.params.donor_id = '000';
        //calling the procedure in the name of function
        proUtil.invokeDonorDetails(donor_id, flag, connection, function(err, data) {
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

//function to perform select by Id operation to select a donor by Id from server side
router.get('/getListById/:id', function(req, res, err) {
    try {
    var flag = 3;
    var donor_id = req.params.id;
     //calling the procedure in the name of function
    proUtil.invokeDonorDetails(donor_id, flag, connection, function(err, data) {
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

//function to perform select by Id operation for maintenance type from server side
router.get('/getProjectMaintenanceTypeList/:id', function(req, res) {
    try {
        var flag = 9;
        var maintenance_id = req.params.id;
         //calling the procedure in the name of function
        proUtil.invokeMaintenanceList(maintenance_id, flag, connection, function(err, data) {
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

//function to perform select by Id operation for maintenance sub-type from server side
router.get('/getProjectSubMaintenanceTypeList/:id', function(req, res) {
    try {
        var flag = 10;
        var maintenance_id = req.params.id;
         //calling the procedure in the name of function
        proUtil.invokeMaintenanceList(maintenance_id, flag, connection, function(err, data) {
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

//function to perform select operation to list all the project category from server side
router.get('/getProjectList', function(req, res) {
    try {
        var flag = 8;
        var sub_type_id = '000';
        proUtil.invokeAllProject(sub_type_id, flag, connection, function(err, data) {
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

//function to perform select operation to list all the campaign from server side
router.get('/getAllCampaignList', function(req, res) {
    try {
        var flag = 6;
        var campaign_id = req.params.campaign_id = '000';
        proUtil.invokeCampaignList(campaign_id, flag, connection, function(err, data) {
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

//function to perform select operation to list all the project from server side
router.get('/getAllProjectData', function(req, res) {
    try {
        var flag = 7;
        var project_id = req.params.project_id = '000';
        proUtil.invokeProjectList(project_id, flag, connection, function(err, data) {
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

//function to perform select operation to list all the payment modes from server side
router.get('/getPaymentData', function(req, res) {
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
    var flag = 4, receipt_no = '000';
       

    proUtil.invokeAnnualReceiptno(receipt_no, flag, connection, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
} catch (err) {
        res.json({
            'output': err
        })
    }
});

module.exports = router;