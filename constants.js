(function () {
    'use strict';

    angular
        .module('app')
        .constant('API_SERVER', {
          // Production
          url: '/farms-api/rest'

          // Localhost
          //url: '/farms-api/rest'
        });
})();
