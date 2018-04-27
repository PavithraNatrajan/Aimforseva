/*
Guidelines for Comments

Header comments for the Files
*/
/****************************************************/

// Filename : authServices.js*

//Purpose /Functionality: this is a services's file to store the all services function related to the login page(login.html) and controller(mainCtrl)
						  

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

* Author : Rajesh Kumar Ranjan(T0007) , Created on:17-feb-2018 , Purpose:
* @param
      services name : authServices
      Auth
      AuthToken
       
       this all are the services
* @return

* Change history

: **/

angular.module('authServices',[])
.factory('Auth',function($http,AuthToken)
{
	console.log('testing of services');
	var authFactory={};

	authFactory.login=function(logInData)
	{console.log('from service' ,logInData);
		return $http.post('/user/authenticate',logInData).then(function(data)
			{
				console.log('from service' ,data);
				AuthToken.setToken(data.data.token);//set the token 

				return data;
			});
	};
	authFactory.isLoggedIn=function()
	{
		
		if(AuthToken.getToken())
		{
			//console.log('get token is');
			return true;
		}
		else
		{
			//console.log('get token is false');
			return false;
		}
	};
	authFactory.getUser=function()
	{
		if(AuthToken.getToken())
		{
			return $http.post('/me');
		}
		else
		{
			$q.reject({message:'user has no token'});
		}
	};
	authFactory.logout=function()
	{
		AuthToken.setToken();
	};
	return authFactory;
})
.factory('AuthToken',function($window)
{
	var authTokenFactory={};
	authTokenFactory.setToken=function(token)
	{
		//AuthToken.setToken(token);
		if(token)
		{
			$window.localStorage.setItem('token',token);	
		}
		else
		{
			$window.localStorage.removeItem('token');
		}
	};
	authTokenFactory.getToken=function()
	{
		//AuthToken.setToken(token);
		return $window.localStorage.getItem('token');
	};
	return authTokenFactory;
})
////set the header here
.factory('AuthInterceptors',function(AuthToken)
{
	var authInterceptorsFactory={};
	authInterceptorsFactory.request=function(config)
	{
		var token=AuthToken.getToken();
		if(token)
			config.headers['x-access-token']=token;
			return config;
	}
	return authInterceptorsFactory;
});