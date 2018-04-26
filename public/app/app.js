angular.module('userApp',['appRoutes','mainController','authServices',
    'commonServices','countrymasterctrl','angularUtils.directives.dirPagination','forgotPasswordCtrl',
    'addDonorctrl','statemasterctrl','UserMaster','campaignmasterctrl','addPaymentctrl',
    'myApp','addRolectrl','addsearchPopctrl','notificationmasterctrl',
    'CategoryListctrl','maintenancetypeapp','maintenancesubtypeapp',
    'projectmasterctrl','annualmaintenanceCtrl','facilitymanagementCtrl',
    'generaldonationCtrl','landdonorCtrl','dashboardCtrl','app','roleMapctrl','addBuildingctrl'])

.config(function($httpProvider)
{
    $httpProvider.interceptors.push('AuthInterceptors');
});
