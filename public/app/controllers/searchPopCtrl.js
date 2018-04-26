/* Project Name :AIM for Seva
Filename : searchPopCtrl.js 
Purpose / Functionality: Performing the search operation from client-side
Author : Ankit(id:T0002)
*/

angular.module('addsearchPopctrl',['angularUtils.directives.dirPagination','commonServices'])
.controller('searchPopCtrl',function($http,$state,$timeout,$scope,commonFactory)
{

	var app=this;
	var url='searchpopup';	
	var currentUrl = $state.$current;
  	var split = currentUrl.toString().split('.');

  	$scope.activeUrl = split;

	var refresh=function()
	{
		$scope.searchpopup = []; //declare an empty array
		commonFactory.allRecord(url).then(function successCallback(response){ 
			$scope.searchpopup = response.data;
		});
		$scope.sort = function(keyname){
			$scope.sortKey = keyname;   //set the sortKey to the param passed
			$scope.reverse = !$scope.reverse; //if true make it false and vice versa
		}
	};
	
	$scope.select=function(donor_id)
		{
			$scope.donor1 = []; //declare a empty array to store all the donor details
					commonFactory.searchRecordById(url,donor_id).then (function successCallback(response){
	  				$scope.donor1 = response.data;
	  		});	 
		}

		refresh(); //calling function

	// function to perform update operation based on the donor_id
	$scope.update=function(user)
		{
			swal({ //pop-up a alert message for the confirmation 
			  title: "Are you sure?",
			  text: "you want to udpate this record !",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willUpdate) => {
			if (willUpdate) {
			  		 //rest api calling the webservices
					commonFactory.updateRecord(user,user.donor_id,url).then (function(data){
	  				refresh();
	  		});
			swal("Poof! Your record has been updated!", {
			      icon: "success",
			    });
			  } else {
			    swal("Your record is safe!");
			  }
			}); 
		}
	});