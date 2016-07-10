(function () {
    'use strict';

    angular
        .module('app')
        .factory('AccountService', AccountService);

    AccountService.$inject = ['$http', 'API_SERVER'];
    function AccountService($http, API_SERVER) {
        var service = {};

        // Service functions.
        service.Login = Login;
        service.Register = Register;
        service.Update = Update;
        service.Delete = Delete;
        service.GetBySSO = GetBySSO;
        service.GetByEmail = GetByEmail;
        service.GetByName = GetByName;

        return service;

        function Login(user) {
            return $http.post(API_SERVER.url + '/account/login', user).then(handleSuccess, handleError);
        }

        function Register(user) {
            return $http.post(API_SERVER.url + '/account/register', user).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put(API_SERVER.url + '/account/user/' + user.id, user).then(handleSuccess, handleError);
        }

        function Delete(email) {
            return $http.delete(API_SERVER.url + '/account/user?email=' + email).then(handleSuccess, handleError);
        }

        function GetBySSO(username) {
            return $http.get(API_SERVER.url + '/account/user?username=' + username).then(handleSuccess, handleError);
        }

        function GetByEmail(email) {
            return $http.get(API_SERVER.url + '/account/user?email=' + email).then(handleSuccess, handleError);
        }

        function GetByName(name) {
            return $http.get(API_SERVER.url + 'account/user?name=' + name).then(handleSuccess, handleError);
        }

        // Private functions.
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return res.data;
        }
    }
})();
