angular.module('app', [])

.controller('appController', function ($scope, $window, $http) {
  console.log('app: ', $scope)

  this.lists = $window.exampleData;
  this.listName = 'Add new list'

  this.currentList = this.lists[0];

  this.getLists = () => {
    var context = this;
    console.log('trying to get lists')
    $http.get('http://127.0.0.1:3000/list/getLists')
    .then(
      function(results) {
        context.lists = results.data;
        context.currentList = context.lists[0]
      }, function(error) {
        console.log('error: ', error);
      }
    )
  };

  this.getList = (list) => {
    var context = this;
    $http.post('http://127.0.0.1:3000/list/getList', {name: list.name})
    .then(
      function(results) {
        console.log('results ', results);
      }, function(error) {
        console.log('error: ', error);
      }
    )
  }
  
  this.selectList = (list) => {
    this.currentList = list;
  };

  this.createList = (name) => {
    //Needs to be a put request to server to add a new object {name: <string>, tasks: [array of tasks]}
    var context = this;
    $http({
      method: 'POST',
      url:'http://127.0.0.1:3000/list/addList',
      headers: {
       'Content-Type': 'application/json'
       },
      data: {
        name: name
      }
    })
    .then(function(success) {
      context.currentList = success;
      context.getLists();
    }, function(error) {
      console.log('error', error);
    })
  };

  this.addTask = (task) => {
    //Needs to be a put request then an immediate fetch afterwards to re-render task list view 
    var context = this;
    $http({
      method: 'POST',
      url:'http://127.0.0.1:3000/list/addList',
      headers: {
       'Content-Type': 'application/json'
       },
      data: {
        name: name
      }
    })
    .then(function(success) {
      context.getList(success);
    })
  };

  this.removeTask = (task) => {
    var context = this;
    $http({
      method: 'POST',
      url:'http://127.0.0.1:3000/list/removeTask',
      headers: {
       'Content-Type': 'application/json'
       },
      data: {
        name: context.currentList.name,
        task: task
      }
    })
    .then(function(success) {
      context.getList();
    }, function(error) {
      console.log('error', error);
    })
  };

  this.removeList = (list) => {
    var context = this;
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:3000/list/removeList',
      data: {
        name: list.name
      }
    })
    .then(function(success) {
      context.lists = context.getLists();
    }, function(error) {
      console.log('something messed up removing the list');
    })
  };

  // this.getLists()
})

.directive('app', function() {
  return {
    scope: {
      listName: '<'
    },
    controller: 'appController',
    bindToController: true,
    controllerAs: 'ctrl',
    template: `
              <div id="interface" class="container row">
                <div class="col-md-4">
                  <h2> Lists </h2>
                  <input type="text" ng-model="ctrl.listName" ng-submit="ctrl.createList(ctrl.listName)" value="ctrl.listName"/>
                  <lists list="ctrl.lists" select="ctrl.selectList"> </lists>
                </div>
                <div class="col-md-8">
                  <task-list tasks="ctrl.currentList" addTask="ctrl.addTask"> </task-list>
                </div>
              </div>`
  };
});
