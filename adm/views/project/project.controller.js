(function () {
  'use strict';

  angular
  .module('app')
  .controller('ProjectController', ProjectController);

  ProjectController.$inject = ['ProjectService', 'FlashService', '$rootScope', '$http', '$location', '$cookieStore', '$state'];

  /****** Início ProjectController *****/
  function ProjectController(ProjectService, FlashService, $rootScope, $http, $location, $cookieStore, $state) {
    var vm = this;

    //vm.dataLoading = true;

    // Project
    vm.project = {};
    vm.projects = [];

    vm.clearForm = clearForm;
    vm.showCreateForm = showCreateForm;
    vm.showEditForm = showEditForm;
    vm.showReadForm = showReadForm;

    vm.getAllProjects = getAllProjects;
    vm.createProject = createProject;
    vm.readProject = readProject;
    vm.updateProject = updateProject;
    vm.deleteProject = deleteProject;
    vm.openProject = openProject;

    vm.projectsByFilter = projectsByFilter;
    vm.tpReviewSearch = "";
    vm.dsSlugSearch = "";
    vm.dsTitleSearch = "";

    // Pagination functions
    vm.range = range;
    vm.prevPage = prevPage;
    vm.pageCount = pageCount;
    vm.nextPage = nextPage;
    vm.setPage = setPage;

    initController();

    function initController() {
      vm.getAllProjects();
    }

    // Forms
    function clearForm() {
      vm.project = null;
    }

    function showCreateForm() {
      clearForm();
      $('#create-modal-title').text("Create Project");
      $('#create-modal-form').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }

    function showEditForm() {
        $('#edit-modal-title').text("Update project");
        $('#edit-modal-form').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }

    function showReadForm() {
      $('#read-modal-title').text("Project");
      $('#read-modal-form').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }

    function showConfirmationMessage() {
      $('#confirmation-message-modal-title').text("Confirmation");
      $('#confirmation-message-modal').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }

    // CRUD functions

    function getAllProjects() {
      vm.dataLoading = true;
      var dsSso = $rootScope.globals.currentUser.dsUsername;
      ProjectService.GetAllByDsSsoResearcher(dsSso).then(function (response) {
        //if (response.code === 1000) {
          var projects = response;
          vm.projects = projects;
          vm.dataLoading = false;
        //} else {
          // console.log(response.data);
          //FlashService.Error(response.description);
          //vm.lDataLoading = false;
        //}
      });
    }

    function getProjectBySlug(dsSlug) {
      //vm.dataLoading = true;
      ProjectService.GetByDsSlug(dsSlug).then(function (response) {
        //console.log(response.data);
        //if (response.code === 1000) {
        var project = response;
        return project;
        //} else {
          // console.log(response.data);
          //FlashService.Error(response.description);
          //vm.dataLoading = false;
        //}
      });
    }

    function createProject() {
      //alert(vm.project.tpReview  + " " + vm.project.dsSlug + " " + vm.project.dsTitle + " " + vm.project.dsProject);
      /*vm.dataLoading = true;
      ProjectService.Create(vm.project).then(function (response) {
        console.log(response.data);
        if (response.code === 1002) {
          FlashService.Success(response.description, true);
          vm.project = null;
          $('#create-modal-form').closeModal();
          vm.getAllProjects();
        } else {
          FlashService.Error(response.description, true);
          vm.dataLoading = false;
        }
      });*/
    };

    function readProject(slug) {
      //vm.dataLoading = true;
      ProjectService.GetByDsSlug(slug).then(function (response) {
        //console.log(response.data);
        //if (response.code === 1000) {
        vm.project = response;
        showReadForm();
        //} else {
          //FlashService.Error(response.description);
          //vm.dataLoading = false;
        //}
      });
    }

    function updateProject() {
      alert(vm.project.tpReview  + " " + vm.project.dsSlug + " " + vm.project.dsTitle + " " + vm.project.dsProject);
      /*
      vm.dataLoading = true;
      ProjectService.Update(vm.project).then(function (response) {
        console.log(response.data);
        if (response.code === 1002) {
          FlashService.Success(response.description, true);
          vm.project = null;
          $('#edit-modal-form').closeModal();
          vm.getAllProjects();
        } else {
          FlashService.Error(response.description, true);
          vm.dataLoading = false;
        }
      });*/
    };

    function deleteProject(slug) {
      showConfirmationMessage();
      /*vm.dataLoading = true;
      if (Do you really want to delete this project?) {
      ProjectService.Delete(vm.project).then(function (response) {
        console.log(response.data);
        if (response.code === 1002) {
          FlashService.Success(response.description, true);
          vm.project = null;
          $('#create-modal-form').closeModal();
          vm.getAllProjects();
        } else {
          FlashService.Error(response.description, true);
          vm.dataLoading = false;
        }
      });
    }*/
    }

    function openProject(dsSlug) {
      //vm.dataLoading = true;
      ProjectService.GetByDsSlug(dsSlug).then(function (response) {
        //console.log(response.data);
        //if (response.code === 1000) {
        var project = response;
        //alert(project.dsTitle);
        $cookieStore.put('currentProject', project);
        $state.go($state.current, {}, {reload: true});
        //} else {
          // console.log(response.data);
          //FlashService.Error(response.description);
          //vm.dataLoading = false;
        //}
      });
    }

    /****** Start filter functions *****/
    function projectsByFilter() {
        return vm.projects.filter(function(project) {
           return (vm.tpReviewSearch == "" || (vm.tpReviewSearch > -1 && vm.tpReviewSearch == project.tpReview))
                    && (project.dsSlug.toString().indexOf(vm.dsSlugSearch) > -1
                          || project.dsSlug.toLowerCase().indexOf(vm.dsSlugSearch.toLowerCase()) > -1)
                    && (project.dsTitle.toString().indexOf(vm.dsTitleSearch) > -1
                          || project.dsTitle.toLowerCase().indexOf(vm.dsTitleSearch.toLowerCase()) > -1);
        });
    };
    /****** End filters functions *****/

   /****** Start pagination functions *****/
    vm.currentPage = 0;
    vm.itemsPerPage = 30;

    function pageCount() {
      return Math.ceil(vm.projectsByFilter().length / vm.itemsPerPage) - 1;
    };

    function range() {
      var rangeSize = 7;
      var ps = [];
      var start;

      start = vm.currentPage;
      if (start > vm.pageCount() - rangeSize) {
        start = vm.pageCount() - rangeSize + 1;
      }

      for (var i = start; i < start + rangeSize; i++) {
        if (i >= 0) {
           ps.push(i);
        }
      }
      return ps;
    };

    function prevPage() {
      if (vm.currentPage > 0) {
        vm.currentPage--;
      }
    };

    function nextPage() {
      if (vm.currentPage < vm.pageCount()) {
        vm.currentPage++;
      }
    };

    function setPage(pageNumber) {
      vm.currentPage = pageNumber;
    };
   /****** End pagination functions *****/

 } /****** End ProjectController *****/

  /****** Start pager *****/
  angular
  .module('app')
  .filter('pagination', function() {
    return function(input, start) {
      start = parseInt(start, 10);
      return input.slice(start);
    };
  });
  /****** End pager *****/
})();
