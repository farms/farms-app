(function () {
    'use strict';

    angular
        .module('app')
        .factory('DashboardService', DashboardService);

    function DashboardService() {
        var service = {};
        
        //var title = 'Principal';
        //service.getPager = getTitle;
        //service.setTitle = setTitle;

        return service;

        /*function getTitle() {
            return title;
        }

        function setTitle(newTitle) {
            title = newTitle;
        }*/
    }

})();