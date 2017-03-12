angular.module('app')

.directive('taskView', function() {
  return {
    scope: {
      task: '<',
      removeTask: '<'
    },
    bindToController: true,
    controllerAs: 'ctrl',
    controller: function($scope) {
      console.log('task view: ', $scope);
    },
    template: `
      <ul ng-dblclick="ctrl.removeTask(ctrl.task)"> {{ctrl.task}} </ul>
    `
  };
});