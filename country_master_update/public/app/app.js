angular.module('userApp',['appRoutes','mainController','authServices','usermasterctrl','commonServices','countrymasterctrl'])

/*.run(
    ['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $state.transitionTo('login');
    }
    ]
        )*/

.config(
    ['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {

        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common["X-Requested-With"];
        // $httpProvider.defaults.headers.common["Accept"] = "application/json";
        // $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

        $httpProvider.interceptors.push('AuthInterceptors');

      


       
    }
    ]);