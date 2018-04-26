angular.module('appRoutes', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'app/views/pages/home.html',
                controller: 'mainCtrl',
                controllerAs: 'main'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/views/user/login.html',
                controller: 'mainCtrl',
                controllerAs: 'main'

            })
            .state('changePassword', {
                url: '/ChangePassword',
                templateUrl: 'app/views/user/change_password.html',
                controller: 'forgot'

            })
            .state('home.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/views/pages/dashboard.html',
                controller: 'dashCtrl'
            })
            .state('home.logout', {
                url: '/logout',
                templateUrl: 'app/views/user/logout.html',
                controller: 'mainCtrl',
                controllerAs: 'main'

            })
            .state('home.profile', {
                url: '/profile',
                templateUrl: 'app/views/user/profile.html'
            })
            .state('home.UserMaster', {
                url: '/userMaster',
                templateUrl: 'app/views/user/userMaster.html',
                controller: 'userMasterCtrl as userCtrl'

            })
            .state('home.CountryMaster', {
                url: '/CountryMaster',
                templateUrl: 'app/views/master/CountryMaster.html',
                controller: 'countryCtrl as countryMaster'
                //controllerAs:'countryMaster'
            })
            .state('home.StateMaster', {
                url: '/StateMaster',
                templateUrl: 'app/views/master/StateMaster.html',
                controller: 'stateCtrl as state'
                //controllerAs:'countryMaster'
            })
            .state('home.AddDonor', {
                url: '/AddDonor',
                templateUrl: 'app/views/project/donor_Add.html',
                controller: 'donorCtrl as donor'
                //controllerAs:'countryMaster'
            })
            .state('home.viewCountryMaster', {
                url: '/viewCountryMaster',
                templateUrl: 'app/views/pages/master/pagination/viewCountryMaster.html',
                controller: 'countryCtrl as countryMaster',
                //controllerAs:'countryMaster'
            })
            .state('home.DonorDetail', {
                url: '/DonorDetail',
                templateUrl: 'app/views/project/DonorDetail.html',
                controller: 'donorCtrl as donor'
                //controllerAs:'countryMaster'
            })
            .state('home.Donation', {
                url: '/Donation',
                templateUrl: 'app/views/project/Donation.html'
                //controller:'donorCtrl as donor'
                //controllerAs:'countryMaster'
            })
            .state('home.Campaign', {
                url: '/Campaign',
                templateUrl: 'app/views/master/CampaignMaster.html',
                controller: 'campaignCtrl as campaign'
                //controllerAs:'campaignMaster'
            })
            .state('home.PaymentMaster', {
                url: '/PaymentMode',
                templateUrl: 'app/views/master/PaymentMode.html',
                controller: 'paymentCtrl',
                controllerAs: 'PaymentMode'
            })
            .state('home.RoleMaster', {
                url: '/RoleMaster',
                templateUrl: 'app/views/master/RoleMaster.html',
                controller: 'roleCtrl',
                controllerAs: 'RoleMaster'
            })
            .state('home.SearchPopup', {
                url: '/Searchpopup',
                templateUrl: 'app/views/master/SearchPopUp.html',
                controller: 'searchPopCtrl as Searchpopup',
                ///controllerAs:'RoleMaster'
            })
            .state('home.NotificationMaster', {
                url: '/NotificationMaster',
                templateUrl: 'app/views/master/NotificationMaster.html',
                controller: 'notificationCtrl as template'
                //controllerAs:'countryMaster'
            })
            .state('home.ProjectCategory', {
                url: '/category',
                templateUrl: 'app/views/project/ProCat.html',
                controller: 'categoryCtrl as category'

            })
            .state('home.ProjectMaintenanceType', {
                url: '/ProMainType',
                templateUrl: 'app/views/project/ProMainType.html',
                controller: 'MaintenanceTypeCtrl as ProjectMaintenanceType'
                //controllerAs:' ProjectMaintenanceType'
            })
            .state('home.ProjectMaintenanceSubType', {
                url: '/ProMainSubType',
                templateUrl: 'app/views/project/ProMainSubType.html',
                controller: 'MaintenanceSubTypeCtrl as ProjectMaintenanceSubType'
                //controllerAs:' ProjectMaintenanceSubType'
            })
            .state('home.Project', {
                url: '/project',
                templateUrl: 'app/views/project/project.html',
                controller: 'projectCtrl as project'
            })
            .state('home.AnnualMaintenance', {
                url: '/annual',
                templateUrl: 'app/views/project/AnnualMaintenance.html',
                controller: 'annualCtrl as annual'

            })
            .state('home.FacilityManagement', {
                url: '/facility',
                templateUrl: 'app/views/project/FacilityManagement.html',
                controller: 'facilityCtrl as facility'

            })
            .state('home.LandDonor', {
                url: '/Landdonor',
                templateUrl: 'app/views/project/Landdonor.html',
                controller: 'landCtrl as landCtrl'

            })


            .state('home.GeneralDonation', {
                url: '/Generaldonation',
                templateUrl: 'app/views/project/generalDonation.html',
                controller: 'donationCtrl'

            })
            .state('home.RoleMapping', {
                url: '/RoleMapping',
                templateUrl: 'app/views/master/RoleMapping.html',
                controller: 'rolemappingCtrl as RoleMapping',
                //controllerAs:'RoleMaster'
            })
            .state('home.RoleScreenMapping', {
                url: '/RoleScreenMapping',
                templateUrl: 'app/views/master/RoleScreenMapping.html',
                controller: 'rolemappingCtrl as RoleMapping',
                //controllerAs:'RoleMaster'
            })
            .state('home.SendNotification', {
                url: '/SendNotification',
                templateUrl: 'app/views/project/SendNotification.html',
                controller: 'notificationCtrl as template'
                //controllerAs:'countryMaster'
            })
            .state('home.BuildingDonor', {
                url: '/buildingdonor',
                templateUrl: 'app/views/project/buildingdonor.html',
                controller: 'buildingCtrl as building'
                //controllerAs:'countryMaster'
            })
        $urlRouterProvider.otherwise('/login'); //default open these file
    });