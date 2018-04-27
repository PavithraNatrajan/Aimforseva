
/****************************************************/

// Filename : mainCtrl.js

//Purpose /Functionality: It is a controller where the login with its functionalities are performed.
						  //controller :mainCtrl
						  //app  : mainController
						  
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
       Auth : it is a services
       $rootScope : it is use at the time of login to refresh /change the state of form
       $stateChngeStart : by using this services to change the state
       
       this all are the services
* @return

* Change history

: **/

angular.module('mainController',['authServices'])
.controller('mainCtrl',function(Auth,$timeout,$state,$rootScope,$scope)
{
	console.log('testinthe mainCtrl');
	var app=this;
	$rootScope.$on('$stateChangeStart',function()
	{   
		console.log('reading the inside of function');	

		if(Auth.isLoggedIn())
	{
		console.log('success: user is logged in.');
		app.isLoggedIn=true;
		Auth.getUser().then(function(data)
		{
			console.log(data.data.first_name);
			console.log(data.data.email_id);
			app.first_name=data.data.first_name;
			app.email_id=data.data.email_id;

		});
	}
	else
	{
		console.log('Failure: user is not logged in');
		app.isLoggedIn=false;
		app.first_name='';
	}
	});

	
	 this.doLogin=function(logInData)
	 {
	 	console.log('form submit');
	 	app.loading=true;
	 	app.errorMsg=false;
	 	Auth.login(app.logInData).then(function(data)
	 	{
	 		if(data.data.success)
	 		{
	 			app.loading=false;
	 			app.successMsg=data.data.message+'...Redirecting';
	 			$timeout(function()
	 			{
	 				$state.go('home.dashboard');
	 				app.logInData='';
	 				app.successMsg=false;

	 			},2000);
	 		}
	 		else if(data.data.role)
	 		{
	 			$state.go('home.userMaster');
				
	 		}
	 		else
	 		{
	 			app.loading=false;
	 			app.errorMsg=data.data.message;
	 			console.log(data);
				
	 		}
	 	});
	 };
	

	
	///logout codes
	this.logout=function()
	{
		Auth.logout();
		$state.go('logout');
		$timeout(function()
		{
			console.log('kjfkdlsj');
			$state.go('login');
		},1000);
	};

$scope.getLogin=function()
{

	
	$state.go('home');
	console.log("jflkfjlksdjkdjfkljflkjflkdjfjdslkfjlkd");
 }

});

