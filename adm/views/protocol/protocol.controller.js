(function () {
  'use strict';

  angular
  .module('app')
  .controller('ProtocolController', ProtocolController);

  ProtocolController.$inject = ['ProtocolService', 'ProjectService', 'FlashService', '$rootScope', '$http', '$location', '$cookieStore', '$state'];

  /****** Início ProtocolController *****/
  function ProtocolController(ProtocolService, ProjectService, FlashService, $rootScope, $http, $location, $cookieStore, $state) {
    var vm = this;

    // Protocol
    vm.protocol = {};

    vm.getAllProtocol = getAllProtocol;

    initController();

    function initController() {
      vm.getAllProtocol();
    }

    // CRUD functions

    function getAllProtocol() {
      vm.dataLoading = true;
      var currentProject = $cookieStore.get("currentProject");
      var dsKey = null;
      if (currentProject != null) {
        dsKey = currentProject.dsKey
      }
      ProjectService.GetObjectivesByDsKey(dsKey).then(function (response) {
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
      ProjectService.GetMainQuestionByDsKey(dsKey).then(function (response) {
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
      ProjectService.GetSecondaryQuestionByDsKey(dsKey).then(function (response) {
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
      ProjectService.GetSearchKeywordsByDsKey(dsKey).then(function (response) {
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
      ProjectService.GetStandardQueryByDsKey(dsKey).then(function (response) {
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
      ProjectService.GetSelectionCriteriasByDsKey(dsKey).then(function (response) {
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

 } /****** End ProtocolController *****/
  
})();