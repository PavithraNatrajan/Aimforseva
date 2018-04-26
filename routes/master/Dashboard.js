/* Project Name :AIM for Seva
Filename : Dashboard.js 
Purpose / Functionality: Display all the details based on the donor 
Author : Karthick, Ankit, Pavithra
*/


var connection = require('./../../model/config');
var utils = require('./../../model/util');
const express = require('express');
const router = express.Router();

//function to perform select operation to list the donor details in dashboard
router.get('/getAllList', function(req, res) {
    try {
    var flag = 'select';
    var donor_id = '000';
    utils.invokeDashboardMaster(donor_id, flag, connection, function(err, data) {
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

//function to perform select operation to list the Maintenance Sub-type from projects
router.get('/getSubTypeAllList', function(req, res) {
    try {
    var flag = 'subType';
    var donor_id = '000';
    utils.invokeDashboardMaster(donor_id, flag, connection, function(err, data) {
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

//function to perform select operation to list all the Sponsers
router.get('/getAllSponsorshipremindersList', function(req, res) {
    try {
    var flag = 'annual';
    var donor_id = '000';
    utils.invokeDashboardMaster(donor_id, flag, connection, function(err, data) {
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

//function to perform select by Id operation to select a particular Sponser
router.get('/allSponsorshipremindersRecordbyid/:id', function(req, res) {
    try {
    var flag = 'annualbyid';
    var donor_id = req.params.id;
    utils.invokeDashboardMaster(donor_id, flag, connection, function(err, data) {
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

//funto perform select by Id operation to select a particular donor
router.get('/getListById/:id', function(req, res) {
    try {
    var flag = 2;
    var donor_id = req.params.id;
    utils.invokeDashboardMaster(donor_id, flag, connection, function(err, data) {
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

//function to perform select by Id operation to select a particular Sub-type from the projects
router.get('/getsubtypeListById/:id', function(req, res) {
    try {
    var flag = 'subTypebyid';
    var receipt_no = req.params.id;
    utils.invokeDashboardMaster(receipt_no, flag, connection, function(err, data) {
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

//function to perform select operation to list all the Project details
router.get('/getAllListproject', function(req, res) {
    try {
    var flag = 1;
    var project_id = req.params.id = '000';
    utils.invokeprojectdashboard(project_id, flag, connection, function(err, data) {
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

//function to perform select by Id operation to select a particular project
router.get('/getListByIdproject/:id', function(req, res, err) {
    try {
    var flag = 2;
    var project_id = req.params.id;
    utils.invokeprojectdashboard(project_id, flag, connection, function(err, data) {
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

module.exports = router;