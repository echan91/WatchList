app.module('app')

.service('db', function($http, $scope){
  this.getLists = () => {
    $http.get('http://127.0.0.1/list/getLists')
    .then(
      function(results) {
        console.log('results ', results);
        this.lists = results;
      }, function(error) {
        console.log('error: ', error);
      }
    )
  };

  this.getList = (list) => {
    $http.post('http://127.0.0.1/list/getList', {name: list.name})
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
    $http({
      method: 'POST',
      url:'http://127.0.0.1/list/addList',
      headers: {
       'Content-Type': 'application/json'
       },
      data: {
        name: name
      }
    })
    .then(function(success) {
      this.currentList = success;
      this.getLists();
    }, function(error) {
      console.log('error', error);
    })
  };

  this.addTask = (task) => {
    //Needs to be a put request then an immediate fetch afterwards to re-render task list view 
    $http({
      method: 'POST',
      url:'http://127.0.0.1/list/addList',
      headers: {
       'Content-Type': 'application/json'
       },
      data: {
        name: name
      }
    })
    .then(function(success) {
      this.getList(success);
    })
  };

  this.removeTask = (task) => {
    $http({
      method: 'POST',
      url:'http://127.0.0.1/list/removeTask',
      headers: {
       'Content-Type': 'application/json'
       },
      data: {
        name: this.currentList.name,
        task: task
      }
    })
    .then(function(success) {
      this.getList();
    }, function(error) {
      console.log('error', error);
    })
  };

  this.removeList = (list) => {
    $http({
      method: 'POST',
      url: 'http://127.0.0.1/list/removeList',
      data: {
        name: list.name
      }
    })
    .then(function(success) {
      this.lists = this.getLists();
    }, function(error) {
      console.log('something messed up removing the list');
    })
  };
})