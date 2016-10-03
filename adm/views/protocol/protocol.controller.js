(function () {
  'use strict';

  angular
  .module('app')
  .controller('ProtocolController', ProtocolController);

  ProtocolController.$inject = ['ProtocolService', 'ProjectService', 'FlashService', '$rootScope', '$http', '$location', '$cookieStore', '$state'];

  /****** Início ProtocolController *****/
  function ProtocolController(ProtocolService, ProjectService, FlashService, $rootScope, $http, $location, $cookieStore, $state) {
    var vm = this;

    //vm.dataLoading = true;

    // Protocol
    vm.protocol = {};

    vm.clearForm = clearForm;
    vm.showCreateForm = showCreateForm;
    vm.showEditForm = showEditForm;
    vm.showReadForm = showReadForm;

    vm.getAllProtocol = getAllProtocol;
    vm.createProtocol = createProtocol;
    vm.readProtocol = readProtocol;
    vm.updateProtocol = updateProtocol;
    vm.deleteProtocol = deleteProtocol;
    vm.openProtocol = openProtocol;

    vm.protocolByFilter = protocolByFilter;
    vm.tpReviewSearch = "";
    vm.dsKeySearch = "";
    vm.dsTitleSearch = "";

    // Pagination functions
    vm.range = range;
    vm.prevPage = prevPage;
    vm.pageCount = pageCount;
    vm.nextPage = nextPage;
    vm.setPage = setPage;

    initController();

    function initController() {
      vm.getAllProtocol();
    }

    // Forms
    function clearForm() {
      vm.protocol = null;
    }

    function showCreateForm() {
      clearForm();
      $('#create-modal-title').text("Create Protocol");
      $('#create-modal-form').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }

    function showEditForm() {
        $('#edit-modal-title').text("Update protocol");
        $('#edit-modal-form').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }

    function showReadForm() {
      $('#read-modal-title').text("Protocol");
      $('#read-modal-form').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }

    function showConfirmationMessage() {
      $('#confirmation-message-modal-title').text("Confirmation");
      $('#confirmation-message-modal').modal({backdrop: 'static', keyboard: false, show: true, closable: false});
    }

    // CRUD functions

    function getAllProtocol() {
      vm.dataLoading = true;
      var currentProject = $cookieStore.get("currentProject");
      var dsSlug = null;
      if (currentProject != null) {
        dsSlug = currentProject.dsSlug
      }
      ProjectService.GetObjectivesByDsKey(dsSlug).then(function (response) {
        //if (response.code === 1000) {
          var objectives = response;
          vm.protocol.objectives = objectives[0];
         // vm.dataLoading = false;
        //} else {
          // console.log(response.data);
          //FlashService.Error(response.description);
          //vm.lDataLoading = false;
        //}
      });
      ProjectService.GetMainQuestionByDsKey(dsSlug).then(function (response) {
        //if (response.code === 1000) {
          var mainQuestion = response;
          vm.protocol.mainQuestion = mainQuestion[0];
         // vm.dataLoading = false;
        //} else {
          // console.log(response.data);
          //FlashService.Error(response.description);
          //vm.lDataLoading = false;
        //}
      });
      ProjectService.GetSecondaryQuestionByDsKey(dsSlug).then(function (response) {
        //if (response.code === 1000) {
          var secondaryQuestion = response;
          vm.protocol.secondaryQuestion = secondaryQuestion[0];
         // vm.dataLoading = false;
        //} else {
          // console.log(response.data);
          //FlashService.Error(response.description);
          //vm.lDataLoading = false;
        //}
      });
      ProjectService.GetSearchKeywordsByDsKey(dsSlug).then(function (response) {
        //if (response.code === 1000) {
          var searchKeywords = response;
          vm.protocol.searchKeywords = searchKeywords;
         // vm.dataLoading = false;
        //} else {
          // console.log(response.data);
          //FlashService.Error(response.description);
          //vm.lDataLoading = false;
        //}
      });  
      ProjectService.GetStandardQueryByDsKey(dsSlug).then(function (response) {
        //if (response.code === 1000) {
          var standardQuery = response;
          vm.protocol.standardQuery = standardQuery[0];
         // vm.dataLoading = false;
        //} else {
          // console.log(response.data);
          //FlashService.Error(response.description);
          //vm.lDataLoading = false;
        //}
      });
      ProjectService.GetSelectionCriteriasByDsKey(dsSlug).then(function (response) {
        //if (response.code === 1000) {
          var selectionCriterias = response;
          vm.protocol.selectionCriterias = selectionCriterias;
         // vm.dataLoading = false;
        //} else {
          // console.log(response.data);
          //FlashService.Error(response.description);
          //vm.lDataLoading = false;
        //}
      });    
    }
    
    function createProtocol() {
      //alert(vm.protocol.tpReview  + " " + vm.protocol.dsKey + " " + vm.protocol.dsTitle + " " + vm.protocol.dsProtocol);
      /*vm.dataLoading = true;
      ProtocolService.Create(vm.protocol).then(function (response) {
        console.log(response.data);
        if (response.code === 1002) {
          FlashService.Success(response.description, true);
          vm.protocol = null;
          $('#create-modal-form').closeModal();
          vm.getAllProtocol();
        } else {
          FlashService.Error(response.description, true);
          vm.dataLoading = false;
        }
      });*/
    };

    function readProtocol(key) {
      //vm.dataLoading = true;
      ProtocolService.GetByDsKey(key).then(function (response) {
        //console.log(response.data);
        //if (response.code === 1000) {
        vm.protocol = response;
        showReadForm();
        //} else {
          //FlashService.Error(response.description);
          //vm.dataLoading = false;
        //}
      });
    }

    function updateProtocol() {
      alert(vm.protocol.tpReview  + " " + vm.protocol.dsKey + " " + vm.protocol.dsTitle + " " + vm.protocol.dsProtocol);
      /*
      vm.dataLoading = true;
      ProtocolService.Update(vm.protocol).then(function (response) {
        console.log(response.data);
        if (response.code === 1002) {
          FlashService.Success(response.description, true);
          vm.protocol = null;
          $('#edit-modal-form').closeModal();
          vm.getAllProtocol();
        } else {
          FlashService.Error(response.description, true);
          vm.dataLoading = false;
        }
      });*/
    };

    function deleteProtocol(key) {
      showConfirmationMessage();
      /*vm.dataLoading = true;
      if (Do you really want to delete this protocol?) {
      ProtocolService.Delete(vm.protocol).then(function (response) {
        console.log(response.data);
        if (response.code === 1002) {
          FlashService.Success(response.description, true);
          vm.protocol = null;
          $('#create-modal-form').closeModal();
          vm.getAllProtocol();
        } else {
          FlashService.Error(response.description, true);
          vm.dataLoading = false;
        }
      });
    }*/
    }

    function openProtocol(dsKey) {
      //vm.dataLoading = true;
      ProtocolService.GetByDsKey(dsKey).then(function (response) {
        //console.log(response.data);
        //if (response.code === 1000) {
        var protocol = response;
        //alert(protocol.dsTitle);
        $cookieStore.put('currentProtocol', protocol);
        $state.go($state.current, {}, {reload: true});
        //} else {
          // console.log(response.data);
          //FlashService.Error(response.description);
          //vm.dataLoading = false;
        //}
      });
    }

    /****** Start filter functions *****/
    function protocolByFilter() {
        return vm.protocol.filter(function(protocol) {
           return (vm.tpReviewSearch == "" || (vm.tpReviewSearch > -1 && vm.tpReviewSearch == protocol.tpReview))
                    && (protocol.dsKey.toString().indexOf(vm.dsKeySearch) > -1
                          || protocol.dsKey.toLowerCase().indexOf(vm.dsKeySearch.toLowerCase()) > -1)
                    && (protocol.dsTitle.toString().indexOf(vm.dsTitleSearch) > -1
                          || protocol.dsTitle.toLowerCase().indexOf(vm.dsTitleSearch.toLowerCase()) > -1);
        });
    };
    /****** End filters functions *****/

   /****** Start pagination functions *****/
    vm.currentPage = 0;
    vm.itemsPerPage = 30;

    function pageCount() {
      return Math.ceil(vm.protocolByFilter().length / vm.itemsPerPage) - 1;
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

 } /****** End ProtocolController *****/

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