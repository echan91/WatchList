angular.module('list-app')
.controller('taskListController', function($scope) {
  console.log('task list controller: ', $scope);
  this.task = 'Add a stock here!'
  this.add = (task) => {
    this.addTask(task);
    this.task = ''
  }
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
                  <form>
                    <input type="text" ng-submit="ctrl.add(ctrl.task)" ng-model="ctrl.task" value="ctrl.task"> 
                    <button ng-click="ctrl.add(ctrl.task)"> Add Ticker </button>
                  </form>
                  <div>
                    <task-view ng-repeat="task in ctrl.tasks.task track by $index" task ="task" remove-task="ctrl.removeTask"> 
                    </task-view>
                  </div>
              </div>`
  };
});