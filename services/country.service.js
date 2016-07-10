(function () {
    'use strict';

    angular
        .module('app')
        .factory('CountryService', CountryService);

    CountryService.$inject = ['$http', 'API_SERVER'];
    function CountryService($http, API_SERVER) {
        var service = {};

        service.GetAll = GetAll;
        service.GetByNmCountry = GetByNmCountry;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(API_SERVER.url + '/countries').then(handleSuccess, handleError);
        }

        function GetByNmCountry(nmCountry) {
            return $http.get(API_SERVER.url + '/countries/' + nmCountry).then(handleSuccess, handleError);
        }

        function Create(country) {
            return $http.post(API_SERVER.url + '/countries', country).then(handleSuccess, handleError);
        }

        function Update(idCountry) {
            return $http.put(API_SERVER.url + '/countries/' + country.idCountry, country).then(handleSuccess, handleError);
        }

        function Delete(idCountry) {
            return $http.delete(API_SERVER.url + '/countries/' + idCountry).then(handleSuccess, handleError);
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
