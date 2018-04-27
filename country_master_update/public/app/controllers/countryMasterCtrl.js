
/****************************************************/

// Filename : insertCountryCtrl.*

//Purpose /Functionality: It is a file used for performing the country-master functionalities.
						  //controller :countryCtrl
						  //app  :insertCountryctrl
						  //pagination path :angularUtils.directives.dirPagination

// Author : Rajesh kumar ranjan(id:T0007)

// Createdon: 17-feb-1018

/****************************************************/
/*
Block level Comments:

Block comments to document a method
*/

/**

* Author : Rajesh Kumar Ranjan(T0007) , Created on:17-feb-2018 , Purpose:
* @param
       $http : it take the rest api
       $state : it is use to open the new file or go to the new page 
       $timeout: it is use for timeing
       $scope :services 
       this all are the services
* @return

* Change history:

: **/


angular.module('countrymasterctrl',['commonServices'])
.controller('countryCtrl',function($http,$state,$timeout,$scope,Country,$log)
{
	var app=this;

// $scope.setinsertCountry=function(regData)
// 	{
// 		form.$setUntouched();
// 		form.$setPristine();
// 		form.$setdirty();
// 	}
	$scope.reset=function(form)
	{
		form.$setUntouched();
		form.$setPristine();
		form.$setDirty();
	}
			

// regData parameter is used to collect data from html page
	$scope.setinsertCountry=function(regData)
	{
		//logger.info('inside of set insertCountry function');
		//console.log('inside of set insertCountry function');
		var url='insertCountry';
//swal : it is a npm for pop messaging
	swal({
				  title: "Are you sure you want to save ?",
				  icon: "success",
				  buttons: true,
				  dangerMode: true,
				})
				.then((willSave) => {
				  if (willSave) {
				  	//rest api calling the webservices
				  	Country.create(regData,url).then (function(data)
						{   
							if(data.data.success)
							{
								$timeout(function()
									{
										$state.go('home.CountryMaster');
									},2000)	
								swal("Poof! Your record has been save!", {
							      icon: "success",
							    });
							}
							else
							{
								swal("Poof! Please check Country already available !", {
							      icon: "warning",
							    });
							}
							
				
						});
				    
				  } else {
						 swal({
							  title: "Not save!",
							  text: "You clicked the button!",
							  icon: "warning",
							  button: "ok!",
						});
				  }
				});
	
	};
	/////////////////update///////////////
	$scope.edit = function(country_code) {
  	
  	$http.get('insertCountry/' + country_code).success(function(response) {
    	$scope.contact = response;
  		});
	}; 

	////////////////end of update////////
	////////////////delete///////////////

	$scope.remove = function(country_code) {
		logger.log(country_code);
		//console.log(country_code);

		swal({
		  title: "Are you sure?",
		  text: "Once deleted, you will not be able to recover this record !",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  		$http.delete('insertCountry/' + country_code).success(function(response) {
		    		refresh();
		  		});
		    swal("Poof! Your record has been deleted!", {
		      icon: "success",


		    });
		  } else {
		    swal("Your record is safe!");
		  }
		});  	

	};

	////////////////end of delete.////////////

});