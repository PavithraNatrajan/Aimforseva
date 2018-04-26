/* Project Name :AIM for Seva
Filename : search_popup.js 
Purpose / Functionality: Performing search operation based on the donor_id
Author : Karthick
*/


var connection = require('./../../model/config');
var invokeSearchpopup = require('./../../model/util');
const express = require('express');
const router = express.Router();

//function to perform select by Id operation to select a Donor by its Id
router.get('/getListById/:id', function(req, res, err) {
    try {
    var donor_id = req.params.id;
    var flag = 1;
    invokeSearchpopup.invokeSearchpopupbyid(donor_id, flag, connection, function(err, data) {
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

//function to perform select operation to list all the donor details
router.get('/getAllList', function(req, res) {
    try {
        var flag = 2;
        var donor_id = req.params.donor_id = '000';
        console.log(flag);
        invokeSearchpopup.invokeSearchpopupbyid(donor_id, flag, connection, function(err, data) {
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

module.exports = router;