(function () {
    'use strict';

    angular
        .module('app')
        .factory('MemberService', MemberService);

    MemberService.$inject = ['$http', 'API_SERVER'];
    function MemberService($http, API_SERVER) {
        var service = {};

        service.GetAll = GetAll;
        service.GetByNmMember = GetByNmMember;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(API_SERVER.url + '/members').then(handleSuccess, handleError);
        }

        function GetByNmMember(nmMember) {
            return $http.get(API_SERVER.url + '/members/' + nmMember).then(handleSuccess, handleError);
        }

        function Create(member) {
            return $http.post(API_SERVER.url + '/members', member).then(handleSuccess, handleError);
        }

        function Update(idMember) {
            return $http.put(API_SERVER.url + '/members/' + member.idMember, member).then(handleSuccess, handleError);
        }

        function Delete(idMember) {
            return $http.delete(API_SERVER.url + '/members/' + idMember).then(handleSuccess, handleError);
        }

        // private functions
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return res.data;
        }
    }

})();
