/* Project Name :AIM for Seva
Filename : navigation_master.js 
Purpose / Functionality: Selecting all modules for navigation from differnet screens
Author : Karthick
*/


var connection = require('./../../model/config');
var invokeNavigationMaster = require('./../../model/util');
const express = require('express');
const router = express.Router();


//function to perform select by Id operation to select a role fro navigation
router.get('/getListById/:id', function(req, res, err) {
    var role_id = req.params.id;
    var parentNavItems = [];
    var childNavItems = [];
    invokeNavigationMaster.invokeNavigation(role_id, connection, function(err, data) {
        try {
        if (err) {
            res.send(err);
        } else {

            for (i in data) {
                if (data[i].IS_parent == 'Y') {
                    parentNavItems.push(data[i]);
                } else {
                    childNavItems.push(data[i]);
                }
            }
            res.send({
                'parentNavItems': parentNavItems,
                'childNavItems': childNavItems
            });
        }
    } catch (err) {
        res.json({
            'output': err
        });
    }
})
});

module.exports = router;