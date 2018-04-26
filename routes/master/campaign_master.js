/* Project Name :AIM for Seva
Filename : campaign_master.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Ankit(id:T0003)
*/

var connection = require('./../../model/config');
var invokeCampaignMaster = require('./../../model/util');
const express = require('express');
const router = express.Router();

//function to perform insert operation for Annual Maintenance from server side 
router.post('/setDataToDB', function(req, res, err) {
    try {
        var flag = '1',  campaign_id = '000';          
        var campaign_master = { //variable to store all the donor-details
            "campaign_code": req.body.code,
            "campaign_name": req.body.campaign_name,
            "country_code": req.body.selitem.country_code,
            "state_code": req.body.selitem1.state_code,
            "start_date": req.body.start_date,
            "end_date": req.body.end_date,
            "active": req.body.active,
            "created_by": req.body.role,

        }
        //calling the procedure in the name of function
        invokeCampaignMaster.invokeCampaignMasterInsert(campaign_master, campaign_id, flag, connection, function(err, data) {
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

//function to perform update operation by selecting the Id
router.put('/updateById/:campaign_id', function(req, res, err) {
    try {
    var campaign_master = {
        "campaign_code": req.body.campaign_code,
        "campaign_name": req.body.campaign_name,
        "country_code": req.body.country_code,
        "state_code": req.body.state_code,
        "start_date": req.body.start_date,
        "end_date": req.body.end_date,
        "active": req.body.active,
        "updated_by": req.body.updated_by
    }
    var flag = 3;
    var campaign_id = req.params.campaign_id;
    invokeCampaignMaster.invokeCampaignMasterInsert(campaign_master, campaign_id, flag, connection, function(err, data) {
        if (err) {
            throw err;
        } else {
            res.json({
                success: true,
                message: 'Record Update successfully'
            })
        }
    })
} catch (err) {
    res.json({
        'output' :err
    });
}
});

//function to perform select operation to list all the Campaign details from Server side
router.get('/getAllList', function(req, res) {
    try {
        var flag = 2;
        var campaign_id = req.params.campaign_id = '000';
        invokeCampaignMaster.invokeCampaignMaster(campaign_id, flag, connection, function(err, data) {
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

//function to perform select by Id operation to select a Campaign by Id from server side
router.get('/getListById/:campaign_id', function(req, res, err) {
    try {
    var flag = 5;
    var campaign_id = req.params.campaign_id;
    invokeCampaignMaster.invokeCampaignMaster(campaign_id, flag, connection, function(err, data) {
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
router.delete('/deleteById/:campaign_id', function(req, res, err) {
    try {
    var flag = 4;
    var campaign_id = req.params.campaign_id;
    invokeCampaignMaster.invokeCampaignMaster(campaign_id, flag, connection, function(err, data) {
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

//function to perform select operation to list the receipt no from server side
router.get('/getMaxReceiptNo', function(req, res, err) {
    try {
    var flag = 7, campaign_id = '000';     
    invokeCampaignMaster.invokeCampaignMaster(campaign_id, flag, connection, function(err, data) {
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
});


module.exports = router;