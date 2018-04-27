/*
Guidelines for Comments

Header comments for the Files
*/
/****************************************************/

// Filename : countryMasterCtrls.*

//Purpose /Functionality: it is a controller file of country_master file that is placed in the model for of app
						  //it is a angular file and it have a controller
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
angular.module('userServices',[])
.factory('Country',function($http)
{
	
	userFactory={};
	//user.create(regData); 
	userFactory.create=function(regData)
	{
		
		
		return $http.post('/countryMaster',regData);
	}
	return userFactory;
});
