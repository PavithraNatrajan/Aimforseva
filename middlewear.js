const express = require('express')
const app=express()

app.use(function(request,response,next) {
     console.log(request.headers)
    
     next()
})

app.use(function(request,response,next) {
     request.chance = Math.random()
     next()
})

var middlewear = function(req,res,next){

}
app.get('/login',middlewear,function(request,response){

	response.json({
		response:request.chance
	})
})

