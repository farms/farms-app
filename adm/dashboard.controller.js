(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['DashboardService, PageService'];
    function DashboardController(DashboardService, PageService) {
        var vm = this;

        PageService.setTitle('Dashboard');

        initController();

        function initController() {
            
        }

    }
})();
