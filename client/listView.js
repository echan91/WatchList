angular.module('app')

.directive('listName', function() {
  return {
    scope: {
      list: '<',
      select: '<',
      removeList: '<'
    },
    bindToController: true,
    controllerAs: 'ctrl',
    controller: function($scope) {
      console.log('list name: ', $scope);
    },
    template: `<h4 ng-click="ctrl.select(ctrl.list)" ng-dblclick="ctrl.removeList(ctrl.list)"> {{ctrl.list.name}} </h4>`
  };
});