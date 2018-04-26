/* Project Name :AIM for Seva
Filename : country_master.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Rajesh(id:T0003)
*/

var Report = require('fluentReports').Report;
var fs = require('fs');
var displayReport = require('./../project/reportDisplayer');
var connection = require('./../../model/config');
var invokeCountryMaster = require('./../../model/util');
const express = require('express');
var request = require('request');
const router = express.Router();

//function to perform select operation to list all the Countries
router.get('/getAllList', function(req, res) {
    try {
        var flag = 2;
        var country_code = req.params.country_code = '000';
        invokeCountryMaster.invokeCountryMaster(country_code, flag, connection, function(err, data) {
            if (err) {
                throw err;
            } else {
                res.send(data);
                for (i = 0; i < data.length; i++) {
                }
            }
        })
    } catch (err) {
        res.json({
            'output': err
        });
    }
});

//function to perform select by Id operation to select a Campaign by Id from server side
router.get('/getListById/:country_code', function(req, res, err) {
    try {
    var flag = 3;
    var country_code = req.params.country_code;
    invokeCountryMaster.invokeCountryMaster(country_code, flag, connection, function(err, data) {
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
router.delete('/deleteById/:country_code', function(req, res, err) {
    try {
    var flag = 5;
    var country_code = req.params.country_code;
    invokeCountryMaster.invokeCountryMaster(country_code, flag, connection, function(err, data) {
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

//function to perform update operation by selecting the Id
router.put('/updateById/:country_code', function(req, res, err) {
    try {
    var country_master = {
        "country": req.body.country,
        "country_short_name": req.body.country_short_name,
        "active": req.body.active,
        "updated_by": req.body.role
    }
    var flag = 4;
    var country_code = req.params.country_code;
    invokeCountryMaster.invokeCountryMasterInsert(country_master, country_code, flag, connection, function(err, data) {
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

//function to perform insert operation for adding Countries from server side 
router.post('/setDataToDB', function(req, res, err) {
    try {
        var flag = '1', country_code = '000';
        var country_master = {
            "country_code": req.body.selitem.country_code,
            "country": req.body.selitem.country,
            "country_short_name": req.body.selitem.country_short_name,
            "active": req.body.active,
            "created_by": req.body.role,
            "created_on": '2018-02-01'
        }
        invokeCountryMaster.invokeCountryMasterInsert(country_master, country_code, flag, connection, function(err, data) {            
            try {
                if (err) {
                    throw err;
                } else {
                    res.json({
                        success: true,
                        data: data,
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

//function to perform select operation to list all the Countries
router.get('/allCountryList', function(req, res) {
    try {
        flag = 1;
        invokeCountryMaster.invokeAllCountryMaster(flag, connection, function(err, data) {
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

//print functionality
function printreport(options) {
    'use strict';
    options = options || {};

    var Current_Date = new Date().toDateString();

    var header = function(rpt, data) {

        // Confidential text, we need this first because everything else prints on top of it
        rpt.print('AIM FOR SEVA', {
            x: 40,
            y: 610,
            rotate: 310,
            opacity: 0.5,
            textColor: '#EEEEEE',
            width: 1000,
            fontSize: 127
        });
        // Company Info - Top Left
        rpt.setCurrentY(14);

        if (options.image && fs.existsSync(options.image)) {
            rpt.image(options.image, {
                width: 200
            });
        }
        rpt.setCurrentY(rpt.getCurrentY() - 10);

        if (options.address) rpt.print(options.address, {
            x: 44
        });
        if (options.address2) rpt.print(options.address2, {
            x: 44
        });
        if (options.city && options.state && options.postal) {
            rpt.print(options.city + ', ' + options.state + ' ' + options.postal, {
                x: 44
            });
        }

        // Print our nice Fax header
        rpt.print('FAX', {
            x: 420,
            y: 40,
            fontSize: 80
        });

        rpt.fontSize(13);
        rpt.setCurrentY(170);
        rpt.fontItalic();
        rpt.band([{
                data: 'Date:',
                width: 78
            },
            {
                data: Current_Date,
                width: 240
            },
            {
                data: '# of Pages:',
                width: 78
            }, 
            {
                data: data.number_of_pages || 2,
                width: 200,
                align: 1
            }
        ], {
            font: "Times-Roman",
            fontBold: true,
            fontItalic: true
        }); 
        rpt.newLine();
        rpt.fontNormal();

        rpt.band([{
                data: 'To:',
                width: 78
            },
            {
                data: data.faxTo,
                width: 240
            },
            {
                data: 'Attention:',
                width: 78
            },
            {
                data: data.attention,
                width: 200
            }
        ]);
        rpt.newLine();

        rpt.band([{
                data: 'From:',
                width: 78
            },
            {
                data: data.from,
                width: 240
            },
            {
                data: 'Phone:',
                width: 78
            },
            {
                data: data.phone,
                width: 200
            }
        ]);
        rpt.newLine();

        rpt.newLine();
        rpt.print('Comments:', {
            fontBold: true
        });
        rpt.print(data.comments);
    };

    var footer = function(rpt) {
        rpt.print(['This material is for the intended recipient.'], {
            fontBold: true,
            fontSize: 8,
            y: 740
        });
    };

    // If you change the callback to FALSE the report will be cancelled!
    var recordCount = function(count, callback) {
        callback(null, true);
    };

    // You don't have to pass in a report name; it will default to "report.pdf"
    var reportName = "demo3.pdf";
    var rpt = new Report(reportName);

    rpt
        .recordCount(recordCount)
        .margins(30)
        .header(header)
        .pageFooter(footer)
        .registerFont("Aparajita", {
            normal: './aparaj.ttf',
            bold: './aparajb.ttf',
            'italic': './aparaji.ttf'
        })
        .data(options.data);

    // Debug output is always nice (Optional, to help you see the structure)
    rpt.printStructure();

    // This does the MAGIC...  :-)
    rpt.render(function(err, name) {
        if (name === false) {
        } else {
            displayReport(err, name);
        }
    });

}

var imgLoc = "";

// Depending on where the report is run from, the image location might be in the wrong folder; so we fix it here
if (fs.existsSync("./example_image.jpg")) {
    imgLoc = "./example_image.jpg";
} else {
    imgLoc = "./examples/example_image.jpg";
}



module.exports = router;