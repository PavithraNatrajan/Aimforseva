var connection = require('./model/config');
module.exports=function(router)
{

	router.post('/campaignMaster',function(req,res)
	{
		//var today = new Date();
    var  today='2018-02-15 13:47:00.620';

		 var campaignMaster={
        "country_code":req.body.country_code,
        "state_code":req.body.state_code,
        "campaign_name":req.body.campaign_name,
		"date_from":req.body.date_from,
        "date_to":req.body.date_to,
		"notes":req.body.notes,
		"created_at":today,
        "updated_at":today
		"created_by":'Admin',
        "updated_by":'Admin'
        
    }

    if(req.body.campaign_name==null||req.body.campaign_name==''||req.body.date_from==null||req.body.date_from==''||req.body.date_to==null||req.body.date_to==''||req.body.active==null||req.body.active==''||req.body.notes==null||req.body.notes=='')
    {
        res.json({success: false,message: 'Please fill the all detail'});
    }
    else
    {
      
      var sql='call sp_campaign_master('+"'"+JSON.stringify(campaignMaster)+"'"+')';
      console.log(campaignMaster);
      
   // connection.query('INSERT INTO campaign_master SET ?',campaignMaster, function (error, results, fields) {
      //connection.query('call sp_camapign(?, ?, ?,?,?)', [countryMaster.country, countryMaster.country_short_name, countryMaster.created_at,countryMaster.updated_at,countryMaster.active],function (error, results, fields) {
        connection.query(sql,campaignMaster,function (error, results, fields) {
      if (error && error.errno=='1062') {
        res.json({
            success:false,
            message:'Duplicate value found'

        })
        //res.send(error);
      }
      else if(error)
       {
        res.json({
            success:false,
            message:'there are some error with query'
          })
          
          //res.send(error);
       }
      else{
          res.json({
            success:true,
            data:results,
            message:'Campaign Inserted sucessfully'
        })
      }
    });
    }
	});

    //rest api to get all customers
router.get('/campaignMaster', function (req, res) {
   connection.query('select * from campaign_master', function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
});

//rest api to get a single customer data
router.get('/campaignMaster/:campaign_code', function (req, res) {
   connection.query('select * from campaign_master where campaign_code=?', [req.params.campaign_code], function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
});
//rest api to update record into mysql database
router.put('/campaignMaster', function (req, res) {
   connection.query('UPDATE `campaign_master` SET `campaign`=?,`date_from`=?,`date_to`=?,`active`=?,`notes`=? where `campaign_code`=?', [req.body.campaign_code,req.body.campaign, req.body.country, req.body.state, req.body.date_from, req.body.date_to, req.body.active, req.body.notes ], function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
});

//rest api to delete record from mysql database
router.delete('/campaignMaster', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `campaign_master` WHERE `campaign_code`=?', [req.body.campaign_code], function (error, results, fields) {
      if (error) throw error;
      res.end('Record has been deleted!');
    });
});
	return router;	
}