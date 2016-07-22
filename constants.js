(function () {
    'use strict';

    angular
        .module('app')
        .constant('API_SERVER', {
          // Production
          url: '/FarmsApi/rest'

          // Localhost
          //url: '/farms-api/rest'
        });
})();
