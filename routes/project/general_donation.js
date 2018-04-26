/* Project Name :AIM for Seva
Filename : general_donation.js 
Purpose / Functionality: Performing the CRUD operations for Data Management from server-side
Author : Ankit(id:T0002)
*/


var connection = require('./../../model/config');
var proUtil = require('./../../model/projectUtil');
const express = require('express');
const router = express.Router();
var Report = require('fluentReports').Report;
var fs = require('fs');
var displayReport = require('./reportDisplayer');

//function to perform insert operation for General Donation from server side 
router.post('/setDataToDB', function(req, res) {
    try {
        var flag = '1',  donor_id = '000';         
        var donation_general = {
            "country_code": req.body.selitem.country_code,
            "state_code": req.body.selitem.state_code,
            "donor_id": req.body.selitem.donor_id,
            "amount": req.body.amount,
            "cheque_no": req.body.cheque_no,
            "cheque_date": "2018-03-03",
            "bank": req.body.bank,
            "project_id": req.body.selitemproject.project_id,
            "project_category_id": req.body.selitemProject.project_category_id,
            "maintenance_id": req.body.selitemMaintenance.maintenance_id,
            "sub_type_id": req.body.selitemSub.sub_type_id,
            "campaign_id": req.body.selitemcampaign.campaign_id,
            "payment_id": req.body.selitempayment.payment_id,
            "donation_date": "2018-03-03",
            "city": req.body.selitem.city,
            "postal_code": req.body.selitem.postal_code,
            "mobile_no": req.body.selitem.mobile_no,
            "notes": req.body.notes,
            "created_by": req.body.role
        }
        //calling the procedure in the name of function
        proUtil.invokeDonationgeneralInsert(donation_general, donor_id, flag, connection, function(err, data) {         
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
    var flag = 5;
    var donor_id = '000';
    proUtil.invokeGeneralDonorList(donor_id, flag, connection, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);


            /* printreport({

            image: imgLoc,
           
            data: [{
                name: "ALL INDIA MOVEMENT FOR SEVA",
               address: "Srinidhi Apartment, 4, Desika Road Mylapore, Chennai-600004",
            tel: "044-24987955/66",
            mail:"aimallindiamovement@gmail.com",
            web: "www.aimforseva.org",
            desc:"After the amendment of Section 80G existing approvals expiring on or after Octorber 01, 2009 shall be deemed to have been extended in perpetuity, unless specifically wihtdrawn"
        },{
          receipt:data[0].receipt_no,

        }

        ]
          
    });
*/



        }
    })

});

//function to perform select by Id operation to select a donor by Id from server side
router.get('/getListById/:id', function(req, res) {
    try {
    var flag = 5;
    var donor_id = req.params.id;
    proUtil.invokeGeneralDonorList(donor_id, flag, connection, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
            /* printreport({

            image: imgLoc,
           
            data: [{
                name: "ALL INDIA MOVEMENT FOR SEVA",
               address: "Srinidhi Apartment, 4, Desika Road Mylapore, Chennai-600004",
            tel: "044-24987955/66",
            mail:"aimallindiamovement@gmail.com",
            web: "www.aimforseva.org",
            desc:"After the amendment of Section 80G existing approvals expiring on or after Octorber 01, 2009 shall be deemed to have been extended in perpetuity, unless specifically wihtdrawn"
        },{
          receipt:data[0].receipt_no,
          first_name:data[0].first_name,
          last_name:data[0].last_name,
          address:data[0].address1,
          city:data[0].city,
          state:data[0].state,
          cuntry:data[0].country,
          postal:data[0].postal_code

        }

        ]
          
    });*/
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
        var maintenanceSub_id = req.params.id;
        proUtil.invokeMaintenanceList(maintenanceSub_id, flag, connection, function(err, data) {
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
router.get('/getAllProjectData', function(req, res) {
    try {
    var flag = 7;
    var project_id = '000';
    proUtil.invokeProjectDataList(project_id, flag, connection, function(err, data) {
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

//function to perform select operation to list all the payment modes from server side
router.get('/getAllPaymentList', function(req, res) {
    try {
        var flag = 2;
        var payment_id = '000';
        proUtil.invokePaymentList(payment_id, flag, connection, function(err, data) {
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

//function to perform update operation from server side
router.put('/updateById/:donor_id', function(req, res, err) {
    try {
    var donation_general = {
        "organization_name": req.body.organization_name,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "country_code": req.body.country_code,
        "state_code": req.body.state_code,
        "address1": req.body.address1,
        "address2": req.body.address2,
        "address3": req.body.address3,
        "amount": req.body.amount,
        "cheque_no": req.body.cheque_no,
        "cheque_date": req.body.cheque_date,
        "bank": req.body.bank,
        "project_category_id": req.body.project_category_id,
        "maintenance_id": req.body.maintenance_id,
        "sub_type_id": req.body.sub_type_id,
        "campaign_id": req.body.campaign_id,
        "payment_id": req.body.payment_id,
        "donation_date": req.body.donation_date,
        "city": req.body.city,
        "postal_code": req.body.postal_code,
        "mobile_no": req.body.mobile_no,
        "created_by": 'Admin',
        "created_on": '2018-03-03',
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

//function to perform delete operation to delete a record from server side
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

        /* if (options.name) rpt.print(options.name, {x: 44});
         if (options.address) rpt.print(options.address, {x: 44});
         if (options.tel) rpt.print(options.tel, {x: 44});
         if (options.mail) rpt.print(options.mail, {x: 44});
         if (options.web) rpt.print(options.web, {x: 44});
         if (options.desc) rpt.print(options.desc, {x: 74});*/
        /* if (options.mail && options.web && options.postal) {
            rpt.print(options.city + ', ' + options.state + ' ' + options.postal, {x: 44});
        }
*/
        // Print our nice Fax header
        //rpt.print('FAX', {x: 420, y: 40, fontSize: 80});




        rpt.fontSize(10);
        rpt.setCurrentY(14);

        //rpt.font('Aparajita');
        rpt.fontItalic();
        rpt.band([

            {
                data: data.name,
                width: 240
            },

            {
                data: data.desc || 2,
                width: 200,
                align: 1
            }
        ], {
            font: "Times-Roman",
            fontBold: true,
            fontItalic: true
        }); //"Aparajita"});
        rpt.newLine();
        rpt.fontNormal();

        rpt.band([

            {
                data: data.address,
                width: 240
            }

        ]);
        rpt.newLine();

        rpt.band([{
                data: 'Tel:',
                width: 78
            },
            {
                data: data.tel,
                width: 240
            }

        ]);
        rpt.newLine();
        rpt.band([{
                data: 'E-mail:',
                width: 78
            },
            {
                data: data.mail,
                width: 240
            }

        ]);
        rpt.newLine();
        rpt.band([{
                data: 'Web:',
                width: 78
            },
            {
                data: data.web,
                width: 240
            }

        ]);
        rpt.newLine();

        rpt.newLine();
        rpt.print('Donations to the trust are exempt u/s 80 (G) of I. T. Act 1961', {
            fontBold: true
        });
        rpt.print('RECEIVED WITH THANKS FROM');
        rpt.newLine();
        rpt.band([{
                data: 'Receipt:',
                width: 78
            },
            {
                data: data.receipt,
                width: 80
            },
            {
                data: 'Date:',
                width: 78
            },
            {
                data: Current_Date,
                width: 240
            }

        ]);
        rpt.newLine();
        rpt.band([{
                data: 'Mr./Mrs:',
                width: 78
            },
            {
                data: data.first_name,
                width: 84
            },
            {
                data: data.last_name,
                width: 90
            }


        ]);
        rpt.newLine();
        rpt.band([

            {
                data: data.address,
                width: 84
            },
            {
                data: data.city,
                width: 90
            },



        ]);
        rpt.newLine();
        rpt.band([

            {
                data: data.state,
                width: 84
            },
            {
                data: data.postal,
                width: 90
            },
            {
                data: data.country,
                width: 90
            },



        ]);


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
    var rndNo = Math.floor(Math.random() * 20);
    var reportName = "routes/report/general/general" + rndNo + ".pdf";
    var rpt = new Report(reportName);

    rpt
        .recordCount(recordCount)
        .margins(30)
        //.autoPrint(true)
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
    imgLoc = "./example_image.jpg";
}

//function to perform select operation to list the receipt no from server side
router.get('/getMaxReceiptNo', function(req, res, err) {
    try {
    var flag = 4, donor_id = '000';
       
    proUtil.invokeGeneralReceipt(donor_id, flag, connection, function(err, data) {
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


router.get('/generalDonorList/:id', function(req, res) {

    var flag = 6;
    var donor_id = req.params.id;
    proUtil.invokeGeneralDonorList(donor_id, flag, connection, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            if (data.length == '0') {
                res.json({
                    success: false,
                    data: data,
                    message: 'Receipt no not found'
                })
            } else {

                printreport({

                    image: imgLoc,

                    data: [{
                            name: "ALL INDIA MOVEMENT FOR SEVA",
                            address: "Srinidhi Apartment, 4, Desika Road Mylapore, Chennai-600004",
                            tel: "044-24987955/66",
                            mail: "aimallindiamovement@gmail.com",
                            web: "www.aimforseva.org",
                            desc: "After the amendment of Section 80G existing approvals expiring on or after Octorber 01, 2009 shall be deemed to have been extended in perpetuity, unless specifically wihtdrawn"
                        }, {

                            receipt: data[0].receipt_no,
                            first_name: data[0].first_name,
                            last_name: data[0].last_name,
                            address: data[0].address1,
                            city: data[0].city,
                            state: data[0].state,
                            cuntry: data[0].country,
                            postal: data[0].postal_code

                        }

                    ]

                });
            }
        }
    })

});


module.exports = router;