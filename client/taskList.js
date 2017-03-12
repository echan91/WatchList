angular.module('app')
.controller('taskListController', function($scope) {
  console.log('task list controller: ', $scope);
  this.task = 'Test'
})

.directive('taskList', function() {
  return {
    scope: {
      tasks: '<',
      addTask: '<',
    },
    bindToController: true,
    controllerAs: 'ctrl',
    controller: 'taskListController',
    template: `<div id=tasks> 
                  <h2> {{ctrl.tasks.name}} </h2>
                  <ul> <form ng-submit="ctrl.addTask" ng-model="ctrl.task"> <input type="text"> Add tasks here! </form> </ul>
                  <task-view ng-repeat="task in ctrl.tasks.tasks" task ="task"> </task-view>
              </div>`
  };
});