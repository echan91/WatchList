angular.module('list-app')
.controller('taskListController', function($scope) {
  console.log('task list controller: ', $scope);
  this.task = ''
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
                  <table class="table">
                    <tr>
                      <th> Ticker </th>
                      <th> Price </th>
                      <th> Change </th>
                      <th> Last Traded </th>
                    </tr>
                    <tr task-view ng-repeat="task in ctrl.tasks.task track by $index" task ="task"
                    ng-dblclick="ctrl.removeTask(task)"> 
                    </tr>
                  </table>
                  </div>
              </div>`
  };
});