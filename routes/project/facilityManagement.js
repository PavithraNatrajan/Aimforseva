/* Project Name :AIM for Seva
Filename : facilityManagement.js 
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
    var facility_management = {
        "donor_id": req.body.selitem.donor_id,
        "donation_date": "2018-09-09",
        "amount": req.body.amount,
        "payment_id": req.body.selitempayment.payment_id,
        "project_id": req.body.selitemproject.project_id,
        "cheque_no": req.body.cheque_no,
        "cheque_date": "2018-08-07",
        "bank": req.body.bank,
        "project_category_id": req.body.selitemProjectCategory.project_category_id,
        "maintenance_id": req.body.selitemMaintenance.maintenance_id,
        "sub_type_id": req.body.selitemSub.sub_type_id,
        "notes": req.body.notes,
        "campaign_id": req.body.selitemcampaign.campaign_id,
        "city": req.body.selitem.city,
        "postal_code": req.body.selitem.postal_code,
        "mobile_no": req.body.selitem.mobile_no,
        "created_by": req.body.role
    }
    //calling the procedure in the name of function
    proUtil.invokeFacilityInsert(facility_management, receipt_no, flag, connection, function(err, data) {
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
        })
    }
});

//function to perform select operation to list all the donor details
router.get('/getAllList', function(req, res) {
    try {
        var flag = 10;
        var donor_id = req.params.donor_id = '000';
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
    try{
    var flag = 3;
    var donor_id = req.params.id;
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
        })
    }
});

//function to perform select by Id operation for maintenance type from server side
router.get('/getProjectMaintenanceTypeList/:id', function(req, res) {
    try {
        var flag = 9;
        var maintenance_id = req.params.id;
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
    var flag = 11, donor_id = '000';       
    proUtil.invokeFacilityReceipt(donor_id, flag, connection, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
})

module.exports = router;