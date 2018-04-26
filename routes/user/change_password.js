
var connection = require('./../../model/config');
var utils = require('./../../model/util.js');  
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer'); // Declaration of Nodemailer

router.post('/changePassword',function(req,res)
{
	
		var emailId={

			"email_id":req.body.email_id
		}
		
	utils.changePassword(emailId,connection,function(err,data)
	{
		if(err)
		{
			 		if(req.body.email_id==null||req.body.email_id==''||req.body.email_id=='undefined'){
                            res.json({
                            success:false,    
                            message:"Please fill all the field ?"
                        });
                    }
                    else
                    {
                    	err[0].email_id;
                    	if(req.body.email_id==err[0].email_id)
                    	{
                    		 var first_name=err[0].first_name;
	                         var role=err[0].role;
	                         res.json({
							 success:true,
							 data:err,
							 message:'User is available'
							});
	                         mailDetails(err[0].email_id);     
                    	}
                    	else
                    	{
                    		 res.json({
							success:false,
							data:err,
							message:'Please check email'
							});
                    	}
                    }
		}
		else
		{
			res.json({
				success:false,
				data:data,
				message:'User is not available'
			});
		}
	})

});
  function mailDetails(email) // Function Definition
  {
    
    var fs = require("fs");
          // Get content from file
          var contents = fs.readFileSync("./module/mailconfig.json");
          // Define to JSON type
          var jsonContent = JSON.parse(contents);  
         // var email_id = req.body.email_id;                                                     
          // Logic For Sending Mail
         let transporter = nodemailer.createTransport({
          service: jsonContent.service,
          secure: jsonContent.secure,
          port: jsonContent.port,
          auth:{
              user: jsonContent.useremail,
              pass: jsonContent.password
          },
          tls:{
              rejectUnauthorized:false
          }
      });
      let HelperOptions = {  // function for the details of User and Sender.;
          from: jsonContent.useremail,
          to: email,
          content: 'Change Password',
          subject: '   link'
          
      };
      transporter.sendMail(HelperOptions, (error, info) =>{ //Report information whether mail has sent or not
          if(error){
             return console.log(error);
          } 
      }); 
  } 
module.exports = router;