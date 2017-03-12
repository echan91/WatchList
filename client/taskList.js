angular.module('app')
.controller('taskListController', function($scope) {
  console.log('task list controller: ', $scope);
  this.task = ''
})

.directive('taskList', function() {
  return {
    scope: {
      tasks: '<',
      addTask: '<',
      removeTask: '<'
    },
    bindToController: true,
    controllerAs: 'ctrl',
    controller: 'taskListController',
    template: `<div id=tasks> 
                  <h2> {{ctrl.tasks.name}} </h2>
                  <ul> 
                  <input type="text" ng-submit="ctrl.addTask(ctrl.task)" ng-model="ctrl.task" value="ctrl.task"> 
                  <button ng-click="ctrl.addTask(ctrl.task)"> Add Task </button>
                  </ul>
                  <task-view ng-repeat="task in ctrl.tasks.task track by $index" task ="task" remove-task="ctrl.removeTask"> </task-view>
              </div>`
  };
});