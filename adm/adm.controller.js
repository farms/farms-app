(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdmController', AdmController);

    AdmController.$inject = ['AccountService', '$rootScope', '$cookieStore'];
    function AdmController(AdmService, $rootScope, $cookieStore) {
        var vm = this;

        vm.user = {};
        vm.project = {};

        initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
          vm.user.dsName = $rootScope.globals.currentUser.dsName;
          vm.user.dsUsername = $rootScope.globals.currentUser.dsUsername;
          vm.user.dsEmail = $rootScope.globals.currentUser.dsEmail;
          vm.project = $cookieStore.get("currentProject");
        }
    }
})();
