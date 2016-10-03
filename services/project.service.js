(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProjectService', ProjectService);

    ProjectService.$inject = ['$http', 'API_SERVER'];
    function ProjectService($http, API_SERVER) {
        var service = {};

        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetByDsKey = GetByDsKey;
        service.GetAllByDsSsoResearcher = GetAllByDsSsoResearcher;
        service.GetInstitutionsByDsKey = GetInstitutionsByDsKey;
        service.GetMembersByDsKey = GetMembersByDsKey;
        service.GetStudiesByDsKey = GetStudiesByDsKey;
        service.GetObjectivesByDsKey = GetObjectivesByDsKey;
        service.GetMainQuestionByDsKey = GetMainQuestionByDsKey;
        service.GetSecondaryQuestionByDsKey = GetSecondaryQuestionByDsKey;
        service.GetSearchKeywordsByDsKey = GetSearchKeywordsByDsKey;
        service.GetStandardQueryByDsKey = GetStandardQueryByDsKey;
        service.GetSelectionCriteriasByDsKey = GetSelectionCriteriasByDsKey;
        
        return service;

        function Create(project) {
            return $http.post(API_SERVER.url + '/projects', project).then(handleSuccess, handleError);
        }

        function Update(project) {
            return $http.put(API_SERVER.url + '/projects/' + project.dsKey, project).then(handleSuccess, handleError);
        }

        function Delete(dsKey) {
            return $http.delete(API_SERVER.url + '/projects/' + dsKey).then(handleSuccess, handleError);
        }

        function GetByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey).then(handleSuccess, handleError);
        }

        function GetAllByDsSsoResearcher(dsSso) {
            return $http.get(API_SERVER.url + '/researchers/' + dsSso + '/projects').then(handleSuccess, handleError);
        }

        function GetInstitutionsByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/institutions').then(handleSuccess, handleError);
        }

        function GetMembersByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/members').then(handleSuccess, handleError);
        }

        function GetStudiesByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/studies').then(handleSuccess, handleError);
        }

        function GetObjectivesByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/objectives').then(handleSuccess, handleError);
        }
        
        function GetMainQuestionByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/main-question').then(handleSuccess, handleError);
        }
        
        function GetSecondaryQuestionByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/secondary-question').then(handleSuccess, handleError);
        }
        
        function GetSearchKeywordsByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/search-keywords').then(handleSuccess, handleError);
        }
        
        function GetStandardQueryByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/standard-query').then(handleSuccess, handleError);
        }
        
        function GetSelectionCriteriasByDsKey(dsKey) {
            return $http.get(API_SERVER.url + '/projects/' + dsKey + '/selection-criterias').then(handleSuccess, handleError);
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
