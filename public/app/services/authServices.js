angular.module('authServices', [])
    .factory('Auth', function($http, AuthToken) {
        var authFactory = {};
        authFactory.login = function(logInData) {
            return $http.post('/user/getUser', logInData).then(function(data) {

                AuthToken.setToken(data.data.token); //set the token 

                return data;
            });
        };
        authFactory.isLoggedIn = function() {

            if (AuthToken.getToken()) {

                return true;
            } else {

                return false;
            }
        };
        authFactory.getUser = function() {

            if (AuthToken.getToken()) {

                return $http.post('/user/me');
            } else {
                $q.reject({
                    message: 'user has no token'
                });
            }
        };
        authFactory.logout = function() {
            AuthToken.setToken();
        };
        return authFactory;
    })
    .factory('AuthToken', function($window) {
        var authTokenFactory = {};


        authTokenFactory.setToken = function(token) {

            if (token) {
                $window.sessionStorage.setItem('token', token);
            } else {
                $window.sessionStorage.removeItem('token');
            }
        };
        authTokenFactory.getToken = function() {
            return $window.sessionStorage.getItem('token');
        };
        return authTokenFactory;
    })
    .factory('AuthInterceptors', function(AuthToken) {
        var authInterceptorsFactory = {};
        authInterceptorsFactory.request = function(config) {
            var token = AuthToken.getToken();

            if (token) {

                config.headers['x-access-token'] = token;
            }
            return config;

        }
        return authInterceptorsFactory;
    });