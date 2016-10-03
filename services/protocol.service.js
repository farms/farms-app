(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProtocolService', ProtocolService);

    ProtocolService.$inject = ['$http', 'API_SERVER'];
    function ProtocolService($http, API_SERVER) {
        var service = {};

        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        
        service.GetAll = GetAll;
        service.GetByNmProtocol = GetByNmProtocol;
        
        return service;

        function GetAll() {
            return $http.get(API_SERVER.url + '/protocol').then(handleSuccess, handleError);
        }

        function GetByNmProtocol(nmProtocol) {
            return $http.get(API_SERVER.url + '/protocol/' + nmProtocol).then(handleSuccess, handleError);
        }

        function Create(protocol) {
            return $http.post(API_SERVER.url + '/protocol', protocol).then(handleSuccess, handleError);
        }

        function Update(idProtocol) {
            return $http.put(API_SERVER.url + '/protocol/' + protocol.idProtocol, protocol).then(handleSuccess, handleError);
        }

        function Delete(idProtocol) {
            return $http.delete(API_SERVER.url + '/protocol/' + idProtocol).then(handleSuccess, handleError);
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