/* Project Name :AIM for Seva
Filename : addDonor.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Rajesh(id:T0002)
*/

var connection = require('./../../model/config');
var proUtil = require('./../../model/projectUtil');
const express = require('express');
const router = express.Router();

//function to perform insert operation for Annual Maintenance from server side 
router.post('/setDataToDB', function(req, res) {
    try {
        var flag = '1', donor_id = '000';
        var donor = {  //variable to store all the donor-details
            "donor_code": req.body.donor_code,
            "donor_type": req.body.donor_type,
            "country_code": req.body.selitemCountry.country_code,
            "state_code": req.body.selitem1.state_code,
            "organization_name": req.body.organization_name,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "city": req.body.city,
            "gender": req.body.gender,
            "dob": "2018-03-03",
            "anniversary": "2018-03-03",
            "postal_code": req.body.postal_code,
            "mobile_no": req.body.mobile_no,
            "landline_no": req.body.landline_no,
            "fax_no": req.body.fax_no,
            "email_id": req.body.email_id,
            "website": req.body.website,
            "address1": req.body.address1,
            "address2": req.body.address2,
            "address3": req.body.address3,
            "created_by": 'Admin',
            "created_on": '2018-03-03',
            "active": req.body.active
        }
        //calling the procedure in the name of function
        proUtil.invokeDonorInsert(donor, donor_id, flag, connection, function(err, data) {
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

//function to perform select by Id operation to select a donor by Id from server side
router.get('/getListById/:id', function(req, res) {
    try {
    var flag = 3;
    var donor_id = req.params.id;
    proUtil.invokeDonorList(donor_id, flag, connection, function(err, data) {
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

//function to perform update operation for a donor from server side
router.put('/updateById/:donor_id', function(req, res, err) {
    try {
    var donor = {
        "donor_code": req.body.donor_code,
        "donor_type": req.body.donor_type,
        "country_code": req.body.country_code,
        "state_code": req.body.state_code,
        "organization_name": req.body.organization_name,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "city": req.body.city,
        "gender": req.body.gender,
        "dob": "2018-03-03",
        "anniversary": "2018-03-03",
        "postal_code": req.body.postal_code,
        "mobile_no": req.body.mobile_no,
        "landline_no": req.body.landline_no,
        "fax_no": req.body.fax_no,
        "email_id": req.body.email_id,
        "website": req.body.website,
        "address1": req.body.address1,
        "address2": req.body.address2,
        "address3": req.body.address3,
        "updated_by": 'Admin',
        "updated_on": '2018-03-03',
        "active": req.body.active
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

//function to perform delete operation from server side
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

//function to perform select by Id operation to select the state names based on the country from server side
router.get('/getStateById/:id', function(req, res) {
    try {
        var flag = 11;
        var country_id = req.params.id;
        proUtil.invokeDonorList(country_id, flag, connection, function(err, data) {
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

//function to perform select operation to list the receipt no from server side
router.get('/getMaxReceiptNo', function(req, res, err) {
    try {
    var flag = 12, donor_id = '000';      
    proUtil.invokeDonorList(donor_id, flag, connection, function(err, data) {
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

//function to perform select by Id operation to select the land details based on the donor from server side
router.get('/landDonorList/:id', function(req, res, err) {
    try {
    var flag = 13;
    var donor_id = req.params.id;
    proUtil.invokeDonorList(donor_id, flag, connection, function(err, data) {
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

//function to perform select by Id operation to select the General doantion details based on the donor from server side
router.get('/generalDonorList/:id', function(req, res, err) {
    try {
    var flag = 14;
    var donor_id = req.params.id;
    proUtil.invokeDonorList(donor_id, flag, connection, function(err, data) {
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