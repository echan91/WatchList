angular.module('list-app')

.controller('tickerController', function($scope, $http) {
  console.log('task view', $scope, $scope.ctrl.task)
  this.tickerPrice = '';
  this.lastTraded = '';
  this.getData = function(ticker) {
    var context = this;
    var query = 'https://www.google.com/finance/info?client=ig&q='+ticker;
    // $http.get(
    //   'https://www.google.com/finance/info?',
    //   {params: {
    //     client: 'ig',
    //     q: ticker
    //   }
    // })
    // .then(function(success) {
    //   console.log('stock pull successful',ticker , success);
    // }, function(error) {
    //   console.log('stock pull error', ticker, error);
    // })
    $http.jsonp(query, {jsonpCallbackParam: 'callback'})
    .then(function(success) {
      console.log('successful jsonp ', success.data[0].l);
      context.tickerPrice = success.data[0].l;
      context.lastTraded = success.data[0].lt;
    }, function(error) {
      console.log('error jsonp ', error);
    })
  }
  // this.getData($scope.ctrl.task);
})
.directive('taskView', function() {
  return {
    scope: {
      task: '<',
      removeTask: '<',
      tickerPrice: '<'
    },
    bindToController: true,
    controllerAs: 'ctrl',
    controller: 'tickerController',
    template: `
      <div ng-dblclick="ctrl.removeTask(ctrl.task)" ng-init="ctrl.tickerPrice=ctrl.getData(ctrl.task)"> 
        <span> {{ctrl.task}} </span> 
        <span> {{ctrl.tickerPrice}} </span>
        <span> {{ctrl.lastTraded}} </span>
      </div>
    `
  };
});