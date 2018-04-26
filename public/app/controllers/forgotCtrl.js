
angular.module('forgotPasswordCtrl',['commonServices'])
.controller('forgot',function($http,$state,$timeout,$scope,commonFactory)
{
	var url='changePsw';
	var app=this;
	
	 
	$scope.forgotPassword=function(forgot)
	{
		app.loading=true;
	 	app.errorMsg=false;
		commonFactory.forgotPass(forgot,url).then (function successCallback(response)
		{	
			if(response.data.success)
			{
				app.loading=false;
	 			app.successMsg=response.data.message+'...Redirecting';
	 			$timeout(function()
	 			{
	 				//$state.go('home.dashboard');
	 				app.logInData='';
	 				app.successMsg=false;
	 				
	 			},2000);
			}
			else
			{
				app.loading=false;
	 			app.errorMsg=response.data.message;
			}
		});
	}
});