var express = require('express');
var router = express.Router();
var middlewares = require('../server/middlewares');


router.get('/',function(req,res,next){
	res.render('index',{title:'Express'});
})

     /*  error handler by ankit 7/3/208 */
    const functionThatThrowsError=function(){
    throw new Error('Something doesnt work');
};
 

    router.get('/test',(req,res,next)=>{
    	functionThatThrowsError();

    });


   

  router.use(middlewares.logError);
  router.use(middlewares.errorHandler);
/*    end error handler by ankit 7/3/2018  */

module.exports = router;
