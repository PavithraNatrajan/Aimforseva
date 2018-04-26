/* Project Name :AIM for Seva
Filename : user_master.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Rajesh(id:T0003)
*/

const verifyToken = require('./verifyToken');
var connection = require('./../../model/config');
var express = require('express');
var router = express.Router();
var utils = require('./../../model/util.js');
var jwt = require('jsonwebtoken');
global.config = require('./../../model/secret_code');

var token;

//function to perform insert operation to add a new User from server side 
router.post('/setDataToDB', function(req, res) {
    var flag = 1,  user_code = '000';       
    var pass = '123456';
    var userMaster = {
        "country_code": req.body.selitemCountry.country_code,
        "state_code": req.body.selitem1.state_code,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "address1": req.body.address1,
        "address2": req.body.address2,
        "address3": req.body.address3,
        "city": req.body.city,
        "postal_code": req.body.postal_code,
        "dob": req.body.dob,
        "anniversary": req.body.anniversary,
        "mobile_no": req.body.mobile_no,
        "landline_no": req.body.landline_no,
        "email_id": req.body.email_id,
        "password": pass,
        "active": req.body.active,
        "created_by": req.body.role
    }
    try {
        utils.setUserMaster(userMaster, user_code, flag, connection, function(err, data) {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    success: true,
                    message: 'User Inserted sucessfully'
                })
            }
        });
    } catch (ex) {
        console.log('error');
    }
});

//function to perform select operation to list all the Users available
router.get('/getAllList', function(req, res) {

    var flag = 2;
    var user_id = '000';
    utils.invokeUserMaster(user_id, flag, connection, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })

});

//function to perform select by Id operation to select a User by its Id from server side
router.get('/getListById/:id', function(req, res) {

    var flag = 3;
    var user_code = req.params.id;

    utils.invokeUserMaster(user_id, flag, connection, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })

});

//function to perform update operation 
router.put('/updateById/:user_code', function(req, res, err) {
    var userMaster = {
        "first_name": req.body.first_name,
        "mobile_no": req.body.mobile_no,
        "email_id": req.body.email_id,
        "updated_by": req.body.role_update
    }

    var flag = 4;
    var user_code = req.params.user_code;
    utils.setUserMaster(userMaster, user_code, flag, connection, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

//function to perform delete operation from server side
router.delete('/deleteById/:user_code', function(req, res, err) {
    var flag = 5;
    var user_code = req.params.user_code;
    utils.invokeUserMaster(user_code, flag, connection, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })

});

router.post('/getUser', function(req, res) {
    var userEmail = {
        "email_id": req.body.email_id,
        "password": req.body.password
    }

    var result = utils.showUserMaster(userEmail, connection, function(err, data) {
        if (err) {
            if (req.body.email_id == null || req.body.email_id == '' || req.body.password == null || req.body.password == '') {
                res.json({
                    success: false,
                    message: "Email does not exits"
                });
            } else {
                if (err[0].password != null || err[0].password == null) {
                    utils.selectRecord(userEmail, connection, function(err, data) {
                        if (err) {
                            if (err.length == '0') {
                                res.json({
                                    success: false,
                                    message: "Role is not assign"
                                });
                            } else {
                                if (req.body.password == err[0].password) {
                                    var first_name = err[0].first_name;
                                    var role = err[0].role;
                                    var role_id = err[0].role_id;

                                    token = jwt.sign({
                                        first_name,
                                        role,
                                        role_id
                                    }, global.config.secret, {
                                        expiresIn: '24h'
                                    });
                                    res.json({
                                        success: true,
                                        data: err,
                                        message: 'successfully authenticated',
                                        token: token
                                    })
                                    if (err[0].role == null || err[0].role == '') {
                                        res.json({
                                            success: false,
                                            message: 'Role is not define'
                                        });
                                    } else {
                                        var today = '2018-03-07 14:16:03';
                                        var loginData = {
                                            "user_code": err[0].user_code,
                                            "login_time": today
                                        }

                                        var result = utils.updateLoginTime(loginData, connection, function(err, data) {
                                            if (err) {
                                                res.json({
                                                    success: false,
                                                    message: 'Email and password field canot be empty'
                                                });
                                            } else {
                                                res.json(data);
                                            }
                                        });
                                    }
                                } else {
                                    res.json({
                                        success: false,
                                        message: "Email, password and Role does not match"
                                    });
                                }

                            }
                        } else {
                            res.json(data);
                        }
                    })
                } else {
                    if (req.body.password == err[0].password) {
                        var first_name = err[0].first_name;
                        var role = err[0].role;
                        var role_id = err[0].role_id;

                        token = jwt.sign({
                            first_name,
                            role,
                            role_id
                        }, global.config.secret, {
                            expiresIn: '24h'
                        });
                        res.json({
                            success: true,
                            data: err,
                            message: 'successfully authenticated',
                            token: token
                        })
                        if (err[0].role == null || err[0].role == '') {
                            res.json({
                                success: false,
                                message: 'Role is not define'
                            });
                        } else {
                            var today = '2018-03-07 14:16:03';
                            var loginData = {
                                "user_code": err[0].user_code,
                                "login_time": today
                            }

                            var result = utils.updateLoginTime(loginData, connection, function(err, data) {
                                if (err) {
                                    res.json({
                                        success: false,
                                        message: 'Email and password field canot be empty'
                                    });
                                } else {
                                    res.json(data);
                                }
                            });
                        }
                    } else {
                        res.json({
                            success: false,
                            message: "Email, password and Role does not match"
                        });
                    }
                }
            }
        } else {
            res.json({
                success: false,
                message: "Role is not assign"
            });
       }
    });
});

router.use(function(req, res, next) {
    token = req.body.token || req.body.query || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, global.config.secret, function(err, decoded) {
            if (err) {
                console.log('invalid');
                res.json({
                    success: false,
                    message: 'token invalid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({
            success: false,
            message: 'no token provided'
        });
    }
});
router.post('/me', function(req, res) {
    res.send(req.decoded);
});


module.exports = router;