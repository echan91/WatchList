angular.module('app')

.directive('taskView', function() {
  return {
    scope: {
      task: '<',
    },
    bindToController: true,
    controllerAs: 'ctrl',
    controller: function($scope) {
      console.log('task view: ', $scope);
    },
    template: `
      <ul> {{ctrl.task}} </ul>
    `
  };
});