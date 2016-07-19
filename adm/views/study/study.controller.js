(function () {
  'use strict';

  angular
  .module('app')
  .controller('StudyController', StudyController);

  StudyController.$inject = ['StudyService', 'ProjectService', 'FlashService', '$rootScope', '$http', '$location', '$cookieStore', '$state'];

  /****** Início StudyController *****/
  function StudyController(StudyService, ProjectService, FlashService, $rootScope, $http, $location, $cookieStore, $state) {
    var vm = this;

    //vm.dataLoading = true;

    // Study
    vm.study = {};
    vm.studies = [];

    vm.clearForm = clearForm;
    vm.showCreateForm = showCreateForm;
    vm.showImportForm = showImportForm;
    vm.showEditForm = showEditForm;
    vm.showReadForm = showReadForm;

    vm.getAllStudies = getAllStudies;
    vm.getStudyByCdCite = getStudyByCdCite;
    vm.createStudy = createStudy;
    vm.importStudy = importStudy;
    vm.readStudy = readStudy;
    vm.updateStudy = updateStudy;
    vm.deleteStudy = deleteStudy;

    vm.studiesByFilter = studiesByFilter;
    vm.dsTitleSearch = "";
    vm.nrYearSearch = "";
    vm.nmAuthorSearch = "";

    // Pagination functions
    vm.range = range;
    vm.prevPage = prevPage;
    vm.pageCount = pageCount;
    vm.nextPage = nextPage;
    vm.setPage = setPage;

    initController();

    function initController() {
      vm.getAllStudies();
    }

    // Forms
    function clearForm() {
      vm.study = null;
      vm.flStudy = null;
    }

    function showCreateForm() {
      clearForm();
      $('#create-modal-title').text("Create Study");
      $('#create-modal-form').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }

    function showImportForm() {
      clearForm();
      $('#import-modal-title').text("Import Study");
      $('#import-modal-form').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }

    function showEditForm() {
        $('#edit-modal-title').text("Update study");
        $('#edit-modal-form').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }

    function showReadForm() {
      $('#read-modal-title').text("Study");
      $('#read-modal-form').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }

    function showConfirmationMessage() {
      $('#confirmation-message-modal-title').text("Confirmation");
      $('#confirmation-message-modal').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }

    // CRUD functions

    function getAllStudies() {
      vm.dataLoading = true;
      var currentProject = $cookieStore.get("currentProject");
      var dsSlug = null;
      if (currentProject != null) {
        dsSlug = currentProject.dsSlug;
      }
      ProjectService.GetStudiesByDsSlug(dsSlug).then(function (response) {
        //if (response.code === 1000) {
          var studies = response;
          vm.studies = studies;
          vm.dataLoading = false;
        //} else {
          // console.log(response.data);
          //FlashService.Error(response.description);
          //vm.lDataLoading = false;
        //}
      });
    }

    function getStudyByCdCite(cdCite) {
      //vm.dataLoading = true;
      StudyService.GetByCdCite(cdCite).then(function (response) {
        //console.log(response.data);
        //if (response.code === 1000) {
        var study = response;
        return study;
        //} else {
          // console.log(response.data);
          //FlashService.Error(response.description);
          //vm.dataLoading = false;
        //}
      });
    }

    function createStudy() {
      //alert(vm.study.tpReview  + " " + vm.study.dsSlug + " " + vm.study.dsTitle + " " + vm.study.dsStudy);
      /*vm.dataLoading = true;
      StudyService.Create(vm.study).then(function (response) {
        console.log(response.data);
        if (response.code === 1002) {
          FlashService.Success(response.description, true);
          vm.study = null;
          $('#create-modal-form').closeModal();
          vm.getAllStudies();
        } else {
          FlashService.Error(response.description, true);
          vm.dataLoading = false;
        }
      });*/
    };

    function importStudy() {
      //alert(vm.study.tpReview  + " " + vm.study.dsSlug + " " + vm.study.dsTitle + " " + vm.study.dsStudy);
      /*vm.dataLoading = true;
      StudyService.Create(vm.study).then(function (response) {
        console.log(response.data);
        if (response.code === 1002) {
          FlashService.Success(response.description, true);
          vm.study = null;
          $('#create-modal-form').closeModal();
          vm.getAllStudies();
        } else {
          FlashService.Error(response.description, true);
          vm.dataLoading = false;
        }
      });*/
    };

    function readStudy(cdCiteKey) {
      //vm.dataLoading = true;
      StudyService.GetByCdCiteKey(cdCiteKey).then(function (response) {
        //console.log(response.data);
        //if (response.code === 1000) {
        vm.study = response;
        showReadForm();
        //} else {
          //FlashService.Error(response.description);
          //vm.dataLoading = false;
        //}
      });
    }

    function updateStudy(study) {
      alert(vm.study.tpReview  + " " + vm.study.dsSlug + " " + vm.study.dsTitle + " " + vm.study.dsStudy);
      /*
      vm.dataLoading = true;
      StudyService.Update(vm.study).then(function (response) {
        console.log(response.data);
        if (response.code === 1002) {
          FlashService.Success(response.description, true);
          vm.study = null;
          $('#edit-modal-form').closeModal();
          vm.getAllStudies();
        } else {
          FlashService.Error(response.description, true);
          vm.dataLoading = false;
        }
      });*/
    };

    function deleteStudy(cdCiteKey) {
      showConfirmationMessage();
      /*vm.dataLoading = true;
      if (Do you really want to delete this study?) {
      StudyService.Delete(vm.study).then(function (response) {
        console.log(response.data);
        if (response.code === 1002) {
          FlashService.Success(response.description, true);
          vm.study = null;
          $('#create-modal-form').closeModal();
          vm.getAllStudies();
        } else {
          FlashService.Error(response.description, true);
          vm.dataLoading = false;
        }
      });
    }*/
    }

    /****** Start filter functions *****/
    function studiesByFilter() {
        return vm.studies.filter(function(study) {
           return (study.dsTitle.toString().indexOf(vm.dsTitleSearch) > -1
                              || study.dsTitle.toLowerCase().indexOf(vm.dsTitleSearch.toLowerCase()) > -1)
                    && (study.nrYear == null || study.nrYear.toString().indexOf(vm.nrYearSearch) > -1
                                       || study.nrYear.toString().toLowerCase().indexOf(vm.nrYearSearch.toLowerCase()) > -1)
                     && (study.nmAuthor == null || study.nmAuthor.toString().indexOf(vm.nmAuthorSearch) > -1
                                        || study.nmAuthor.toString().toLowerCase().indexOf(vm.nmAuthorSearch.toLowerCase()) > -1);
        });
    };
    /****** End filters functions *****/

   /****** Start pagination functions *****/
    vm.currentPage = 0;
    vm.itemsPerPage = 30;

    function pageCount() {
      return Math.ceil(vm.studiesByFilter().length / vm.itemsPerPage) - 1;
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

 } /****** End StudyController *****/

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
