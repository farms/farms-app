(function () {
    'use strict';

    angular
        .module('app')
        .factory('StudyService', StudyService);

    StudyService.$inject = ['$http', 'API_SERVER'];
    function StudyService($http, API_SERVER) {
        var service = {};

        service.GetAll = GetAll;
        service.GetByNmStudy = GetByNmStudy;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAllByDsSlugProject() {
            return $http.get(API_SERVER.url + '/studies').then(handleSuccess, handleError);
        }

        function GetByNmStudy(nmStudy) {
            return $http.get(API_SERVER.url + '/studies/' + nmStudy).then(handleSuccess, handleError);
        }

        function Create(study) {
            return $http.post(API_SERVER.url + '/studies', study).then(handleSuccess, handleError);
        }

        function Update(idStudy) {
            return $http.put(API_SERVER.url + '/studies/' + study.idStudy, study).then(handleSuccess, handleError);
        }

        function Delete(idStudy) {
            return $http.delete(API_SERVER.url + '/studies/' + idStudy).then(handleSuccess, handleError);
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
