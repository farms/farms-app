(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProjectService', ProjectService);

    ProjectService.$inject = ['$http', 'API_SERVER'];
    function ProjectService($http, API_SERVER) {
        var service = {};

        service.GetAllByDsSsoResearcher = GetAllByDsSsoResearcher;
        service.GetStudiesByDsSlug = GetStudiesByDsSlug;
        service.GetByDsSlug = GetByDsSlug;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetByDsSlug = GetByDsSlug;

        return service;

        function GetAllByDsSsoResearcher(dsSso) {
            return $http.get(API_SERVER.url + '/researchers/' + dsSso + '/projects').then(handleSuccess, handleError);
        }

        function GetByDsSlug(dsSlug) {
            return $http.get(API_SERVER.url + '/projects/' + dsSlug).then(handleSuccess, handleError);
        }

        function Create(project) {
            return $http.post(API_SERVER.url + '/projects', project).then(handleSuccess, handleError);
        }

        function Update(project) {
            return $http.put(API_SERVER.url + '/projects/' + project.dsSlug, project).then(handleSuccess, handleError);
        }

        function Delete(dsSlug) {
            return $http.delete(API_SERVER.url + '/projects/' + dsSlug).then(handleSuccess, handleError);
        }

        function GetMembersByIdProject(idProject) {
            return $http.get(API_SERVER.url + '/projects/' + idProject + '/members').then(handleSuccess, handleError);
        }

        function GetStudiesByDsSlug(dsSlug) {
            return $http.get(API_SERVER.url + '/projects/' + dsSlug + '/studies').then(handleSuccess, handleError);
        }

        // private functions
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return res.data;
        }
    }

})();
