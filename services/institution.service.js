(function () {
    'use strict';

    angular
        .module('app')
        .factory('InstitutionService', InstitutionService);

    InstitutionService.$inject = ['$http', 'API_SERVER'];
    function InstitutionService($http, API_SERVER) {
        var service = {};

        service.GetAll = GetAll;
        service.GetByNmInstitution = GetByNmInstitution;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(API_SERVER.url + '/institutions').then(handleSuccess, handleError);
        }

        function GetByNmInstitution(nmInstitution) {
            return $http.get(API_SERVER.url + '/institutions/' + nmInstitution).then(handleSuccess, handleError);
        }

        function Create(institution) {
            return $http.post(API_SERVER.url + '/institutions', institution).then(handleSuccess, handleError);
        }

        function Update(idInstitution) {
            return $http.put(API_SERVER.url + '/institutions/' + institution.idInstitution, institution).then(handleSuccess, handleError);
        }

        function Delete(idInstitution) {
            return $http.delete(API_SERVER.url + '/institutions/' + idInstitution).then(handleSuccess, handleError);
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
