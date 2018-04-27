/*
Guidelines for Comments

Header comments for the Files
*/
/****************************************************/

// Filename : country_master.*

//Purpose /Functionality: in this file calling the procedure (sp_country_master) and do the process on table like 
//(insertion, updation ,deletion ,find single record etc...)


// Author : Rajesh kumar ranjan(id:T0007)

// Createdon: 17-feb-1018

// Change history:

// v1.10 date of change /Author name

/****************************************************/
/*
Block level Comments:

Block comments to document a method
*/

/**

* Author : Rajesh Kumar Ranjan(T0007) , Created on:17-feb-2018 , Purpose:in this file calling the procedure (sp_country_master) and do the process on table like 
//(insertion, updation ,deletion ,find single record etc...)

* @param
        post
            countryMaster :It is a webservices is used to in a post method to store the data into the 
            database by using store procedure(sp_country_master)
        connection.query 
            connection : it is come's from the config file for connection to the database
            query   : It is use to execute the sql query 
            sql : It is a variable of procudure 
* @return

* Change history

: **/

var connection = require('./../../model/config');
var jwt=require('jsonwebtoken');
var secret='harrypotter';

module.exports=function(router)
{

	router.post('/userMaster',function(req,res)
	{

		
		var today = new Date();
    var pass='123456';
		 var userMaster={
        "country_code":req.body.country_code,
        "state_code":req.body.state_code,
        "first_name":req.body.first_name,
        "last_name":req.body.last_name,
        "address1":req.body.address1,
        "address2":req.body.address2,
        "address3":req.body.address3,
        "city":req.body.city,
        "pin_code":req.body.pin_code,
        "dob":req.body.dob,
        "anniversary":req.body.anniversary,
        "mobile_no":req.body.mobile_no,
        "landline_no":req.body.landline_no,
        "email_id":req.body.email_id,
        "password":pass,
        "active":req.body.active,
        "created_at":today,
        "updated_at":today
    }
    if(req.body.first_name==null||req.body.first_name==''||req.body.email_id==null||req.body.email_id=='')
    {
        res.json({success: false,message: 'Please fill email id and firstName '});
    }
    else
    {
    connection.query('INSERT INTO user_master SET ?',userMaster, function (error, results, fields) {
      if (error && error.errno=='1062') {
        res.json({
            success:false,
            message:'Doublicate value found'
        })
      }
      else if(error && error.errno=='1048')
       {
        res.json({
            success:false,
            message:'Please fill the country, state and active fields'
          })
          
       }
      else if(error)
       {
        res.json({
            success:false,
            message:'there are some error with query'
          })
          
       }
      else{
          res.json({
            success:true,
            data:results,
            message:'User Inserted sucessfully'
        })
      }
    });
    }
	});

    //rest api to get all customers
router.get('/userMaster', function (req, res) {
   connection.query('select * from user_master', function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
});

//rest api to get a single customer data
router.get('/userMaster/:user_code', function (req, res) {
   connection.query('select * from user_master where user_code=?', [req.params.user_code], function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
});
/*
//rest api to update record into mysql database
router.put('/userMaster', function (req, res) {
   connection.query('UPDATE `user_master` SET `first_name`=?,`last_name`=?,`address1`=?,`address2`=?,`address3`=?,`city`=?,`pin_code`=?,`country`=?,`state`=?,`dob`=?,`anniversary`=?,`mobile_no`=?,`landline_no`=?,`email_id`=?,`active`=? where `user_code`=?', [req.body.first_name,req.body.last_name,  req.body.address1,req.body.address2,req.body.address3,req.body.city,req.body.pin_code,req.body.country,req.body.state,req.body.dob,req.body.anniversary,req.body.mobile_no,req.body.landline_no,req.body.email_id,req.body.active], function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
});*/
/*
//rest api to delete record from mysql database
router.delete('/userMaster', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `user_master` WHERE `user_code`=?', [req.body.user_code], function (error, results, fields) {
      if (error) throw error;
      res.end('Record has been deleted!');
    });
});*/

router.post('/authenticate',function(req,res)
{
var email=req.body.email_id;
    var password=req.body.password;
    console.log(email);
    //start of comment for chking
    connection.query('SELECT * FROM user_master WHERE email_id = ?',[email], function (error, results, fields) {
      if (error) {
          /*res.json({
            success:false,
            message:'there are some error with query'
            })*/
			console.log(error);
            
      }else{
        if(results.length >0){
            if(password==results[0].password){
              var first_name=results[0].first_name;
              var email_id=results[0].email_id;
              var token=jwt.sign({first_name,email_id},secret,{expiresIn: '24h'});
                res.json({
                    success:true,
                    message:'successfully authenticated',token:token
                })
            }else{
                res.json({
                  success:false,
                  message:"Email and password does not match"
                 });
            }
         
        }
        else{
          res.json({
              success:false,    
            message:"Email does not exits"

          });
          
        }
      }
    });
});

  
  router.use(function(req,res,next)
  {
    var token=req.body.token||req.body.query||req.headers['x-access-token'];
    if(token)
    {
      jwt.verify(token,secret,function(err,decoded)
        {
          if(err)
          {
            res.json({success:false,message:'token invalid'});
          }
          else
          {
            req.decoded=decoded;
            next();
          }
        });
    }
    else{
      res.json({success:false,message:'no token provided'});
      
    }
  });
  router.post('/me',function(req,res)
  {
    res.send(req.decoded);
  });

	return router;	
}