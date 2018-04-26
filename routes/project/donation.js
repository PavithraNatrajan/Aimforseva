/* Project Name :AIM for Seva
Filename : donation.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Pavithra(id:T0002)
*/

var connection = require('./../../model/config');
var proUtil = require('./../../model/projectUtil');
const express = require('express');
const router = express.Router();

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


module.exports = router;



