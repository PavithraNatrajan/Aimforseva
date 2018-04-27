/*
Guidelines for Comments

Header comments for the Files
*/
/****************************************************/

// Filename : countryMasterCtrls.*

//Purpose /Functionality: it is a controller where the user functionalities are performed.
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
angular.module('usermasterctrl',[])
.controller('regCtrl',function($http,$state,$timeout)
{
	var app=this;
	//console.log('testing the controller');
	this.regUser=function(regData)
	{
		app.loading=true;
		app.errorMsg=false;
		//user.create(regData); 
		console.log('form is submitted');
		console.log(this.regData);
		$http.post('/user',this.regData).then (function(data)
		{
			console.log(data.data.success);
			console.log(data.data.message);
			if(data.data.success)
			{
				app.loading=false;
				app.successMsg=data.data.message;
				$timeout(function()
				{
					$state.go('/');
				},2000)
				
			}
			else
			{
				app.loading=false;
				app.errorMsg=data.data.message;
			}
		});
	}
});

