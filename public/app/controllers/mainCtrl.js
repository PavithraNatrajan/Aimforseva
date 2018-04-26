
//'$locationChangeStart'
angular.module('mainController', ['authServices'])
    .controller('mainCtrl', function(Auth, $timeout, $state, $rootScope, $scope, $transitions, commonFactory) {

        var app = this;

        $transitions.onStart({}, function() {

            if (Auth.isLoggedIn()) {
                app.isLoggedIn = true;
                Auth.getUser().then(function(data) {
                    $scope.roleName = data.data.first_name;
                    $scope.role = data.data.role;
                    refresh(data.data.role_id);
                });
            } else {
                app.isLoggedIn = false;
                app.first_name = '';
            }
        });

        this.doLogin = function(logInData) {
            if (document.getElementById('CaptchaEnter').value == document.getElementById('randomfield').value) {

                app.loading = true;
                app.errorMsg = false;
                Auth.login(app.logInData).then(function(data) {
                    if (data.data.success) {
                        app.loading = false;
                        app.successMsg = data.data.message + '...Redirecting';
                        app.all = data.data["0"];

                        $timeout(function() {
                            $state.go('home.dashboard');
                            app.logInData = '';
                            app.successMsg = false;

                        }, 2000);
                    } else if (data.data.role) {
                        $state.go('home.userMaster');

                    } else {
                        app.loading = false;
                        app.errorMsg = data.data.message;


                    }
                });
            } else {
                swal("Poof! Please re-check the captcha !", {
                    icon: "warning",
                });

            }
        };

        ///logout codes
        this.logout = function() {
            Auth.logout();
            $state.go('home.logout');
            $timeout(function() {
                $state.go('login');
            }, 1000);
        };

        $scope.getLogin = function() {
            $state.go('home');

        }

        ChangeCaptcha();

        function ChangeCaptcha() {
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var string_length = 6;
            var ChangeCaptcha = '';
            for (var i = 0; i < string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                ChangeCaptcha += chars.substring(rnum, rnum + 1);

            }

            $scope.captchaData = ChangeCaptcha;

        }

        var refresh = function(role_id) {
            var url = 'navigation';
            $scope.mainNavigation = []; //declare an empty array
            commonFactory.searchRecordById(url, role_id).then(function successCallback(response) {
                $scope.mainNavigation = response.data.parentNavItems;
                $scope.subNavigation = response.data.childNavItems;
            });

        };


    });