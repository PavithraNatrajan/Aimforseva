/* Error handler by ankit 8/3/2018     */


const errorHandler=(error,request,response,next)=>{

	response.send('oops something bad happend');
};


const logError=(error,request,response,next)=>{
	console.error(error.stack)
	next(error);
};

module.exports={errorHandler,logError};