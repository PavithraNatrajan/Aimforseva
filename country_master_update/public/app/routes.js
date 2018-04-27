/*
Guidelines for Comments

Header comments for the Files
*/
/****************************************************/

// Filename : routes.js*

//Purpose /Functionality: this is used to define the path of all HTML page with folder name 
  				//$stateProvider is use to for ui-routes
  				//$urlRouterProvider it is used for path
						  

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
       //$stateProvider is use to for ui-routes
  				//$urlRouterProvider it is used for path
  				appRoutes is a nmae of the ng-app 
* @return

* Change history

: **/
angular.module('appRoutes',['ui.router'])
/*.run( ['$rootScope', '$state', '$stateParams',function($rootScope, $state, $stateParams) 
		{$rootScope.$state = $state;$rootScope.$stateParams = $stateParams;$state.transitionTo('login'); } ] )*/
.config(function($stateProvider, $urlRouterProvider)
{


	$stateProvider
	
	.state('home',
	{
		url:'/home',
		templateUrl:'app/views/pages/home.html'
	})
	.state('login',{
		url:'/login',
		templateUrl:'app/views/user/login.html',
		controller:'mainCtrl as main'

	})
	.state('home.dashboard',{
		url: '/dashboard',
		templateUrl:'app/views/pages/dashboard.html'
		
	})
	.state('logout',{
		url: '/logout',
		templateUrl:'app/views/user/logout.html'
	})
	.state('home.profile',{
		url:'/profile',
		templateUrl:'app/views/user/profile.html'
	})
	.state('home.userMaster',{
		url:'/userMaster',
		templateUrl:'app/views/user/userMaster.html',
		controller:'regCtrl',
		controllerAs:'userMaster'
	})
	.state('home.countryMaster',{
		url: '/CountryMaster',
		templateUrl:'app/views/master/CountryMaster.html',
		controller:'countryCtrl as countryMaster'
		//controllerAs:'countryMaster'
	})
	.state('home.stateMaster',{
		url: '/StateMaster',
		templateUrl:'app/views/master/StateMaster.html',
		//controller:'countryCtrl as countryMaster'
		//controllerAs:'countryMaster'
	})

	// .state('home.viewCountryMaster',{
	// 	url: '/viewCountryMaster',
	// 	templateUrl:'app/views/master/viewCountryMaster.html',
	// 	controller:'countryCtrl as countryMaster' 
	// 	//controllerAs:'countryMaster'
	// })

	 //$urlRouterProvider.otherwise('/login');//default open these file
}); 