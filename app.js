(function () {
  'use strict';

  angular
  .module('app', ['ngRoute', 'ngCookies', 'ui.router', 'angularUtils.directives.uiBreadcrumbs'])
  .config(config)
  .run(run)
  .value('page', {
    name: 'FARMS'
  });

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function config($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("adm");

    $stateProvider
    .state('/', {
      url: '/',
      controller: 'AccountController',
      templateUrl: "account/account.view.html",
      controllerAs: 'vm'
    })
    .state('adm', {
      url: '/adm',
      controller: 'AdmController',
      templateUrl: "adm/adm.view.html",
      controllerAs: 'vm',
      title: 'Home',
      data: {
        displayName: 'Home'
      }
    })
    .state('adm.dashboard', {
      url: "/dashboard",
      controller: 'DashboardController',
      templateUrl: "adm/dashboard.view.html",
      controllerAs: 'vm',
      data: {
        displayName: 'Home'
      }
    })
    .state('adm.projects', {
      url: "/projects",
      controller: 'ProjectController',
      templateUrl: "adm/views/project/project-view.html",
      controllerAs: 'vm',
      title: 'Projects',
      data: {
        displayName: 'Projects'
      }
      .state('adm.studies', {
        url: "/studies",
        controller: 'StudyController',
        templateUrl: "adm/views/study/study-view.html",
        controllerAs: 'vm',
        title: 'Studies',
        data: {
          displayName: 'Studies'
        }
    })
  }

  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$state'];
  function run($rootScope, $location, $cookieStore, $http, $state) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['adm']) === -1;
      var loggedIn = $rootScope.globals.currentUser;
      $rootScope.$state = $state
      if (restrictedPage && !loggedIn) {
        $location.path('/');
      }
    });
  }

})();
