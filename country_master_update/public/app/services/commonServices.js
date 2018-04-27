
/****************************************************/

// Filename : countryMasterCtrls.*

//Purpose /Functionality: it is a services file for country_master.
						  //it is a angular file with countryMaster Services
						  //services :countryMasterServices
						  //app  : services
						  

// Author : Rajesh kumar ranjan(id:T0007)

// Createdon: 17-feb-1018

// Change history:

// v1.10 date of change /Author name

/****************************************************/


/**

* Author : Rajesh Kumar Ranjan(T0007) , Created on:17-feb-2018 , Purpose:
* @param
       Auth : it is services regarding the countryMaster.
       $rootScope : it is use at the time of login to refresh /change the state of form
       $stateChngeStart : by using this services to change the state
       
       this all are the services
* @return

* Change history

: **/
angular.module('commonServices',[])
.factory('Country',function($http)
{
	
	countryMasterFactory={};
	//user.create(regData); 
	countryMasterFactory.create=function(regData,url)
	{
		
		return $http.post('/'+url,regData);
	}
	
	return countryMasterFactory;
});
