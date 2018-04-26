/* Project Name :AIM for Seva
Filename : buildingDonor.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Deekshitha(id:T0002)
*/


var connection = require('./../../model/config');
var proUtil = require('./../../model/projectUtil');
var util = require('./../../model/util');
const express = require('express');
const router = express.Router();

//function to perform insert operation for Building Donor from server side 
router.post('/setDataToDB', function(req, res) {
    try {
   var flag = '1',receipt_no = '000';
    var building_donor = {  //variable to store all the donor-details
        "donor_id": req.body.selitem1.donor_id,
        "donation_date": req.body.donation_date,
        "amount": req.body.amount,
        "payment_id": req.body.selitempayment.payment_id,
        "cheque_no": req.body.cheque_no,
        "cheque_date": req.body.cheque_date,
        "bank": req.body.bank,
        "project_category_id": req.body.selitemProject.project_category_id,
        "maintenance_id": req.body.selitemMaintenance.maintenance_id,
        "project_id": req.body.selitemproject.project_id,
        "sub_type_id": req.body.selitemSub.sub_type_id,
        "notes": req.body.notes,
        "campaign_id": req.body.selitemcampaign.campaign_id,
        "full_building": req.body.full_building,
        "ground_floor": req.body.ground_floor,
        "first_floor": req.body.first_floor,
        "second_floor": req.body.second_floor,
        "third_floor": req.body.third_floor,
        "location": req.body.location,
        "size": req.body.size,
        "year_of_construction": req.body.year_of_construction,
        "year_of_completion": req.body.year_of_completion,
        "upload_photo": req.body.upload_photo,
        "credit_or_debit_card_no": req.body.credit_or_debit_card_no,
        "txn_id": req.body.txn_id,
        "created_by": req.body.role
    }
    //calling the procedure in the name of function
    proUtil.invokeBuildingInsert(building_donor, receipt_no, flag, connection, function(err, data) {
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

//function to perform select by Id operation to select a donor by Id from server side
router.get('/getListById/:id', function(req, res) {
    try {
    var flag = 3;
    var receipt_no = req.params.id;
    proUtil.invokeBuildingList(receipt_no, flag, connection, function(err, data) {
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

//function to perform select operation to list all the donor details
router.get('/getAllList', function(req, res) {
    try {
        var flag = 11;
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

//function to perform select by Id operation for maintenance type from server side
router.get('/getProjectMaintenanceTypeList/:id', function(req, res) {
    try {
    var flag = 9;
    var maintenance_id = req.params.id;
    proUtil.invokeMaintenanceList(maintenance_id, flag, connection, function(err, data) {
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
        var campaign_id = '000';
        proUtil.invokeCampaignList(campaign_id, flag, connection, function(err, data) {
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

//function to perform select operation to list all the project from server side
router.get('/getAllProjectNameList', function(req, res) {
    try {
        var flag = 7;
        var project_id = '000';
        proUtil.invokeprojectNameList(project_id, flag, connection, function(err, data) {
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
})

//function to perform select operation to list all the payment modes from server side
router.get('/getAllPaymentList', function(req, res) {
    try {
        var flag = 2;
        var payment_id = '000';
        proUtil.invokepaymentList(payment_id, flag, connection, function(err, data) {
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
})

//function to perform select operation to list the receipt no from server side
router.get('/getMaxReceiptNo', function(req, res, err) {
    try {
    var flag = 3, receipt_no = '000';      
    proUtil.invokeBuildingReceiptno(receipt_no, flag, connection, function(err, data) {
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