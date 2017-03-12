angular.module('list-app')

.controller('tickerController', function($scope, $http) {
  console.log('task view', $scope, $scope.ctrl.task)
  // this.tickerPrice = '';
  // this.lastTraded = '';
  // this.getData = function(ticker) {
  //   var context = this;
  //   var query = 'https://www.google.com/finance/info?client=ig&q='+ticker;
  //   $http.jsonp(query, {jsonpCallbackParam: 'callback'})
  //   .then(function(success) {
  //     console.log('successful jsonp ', success.data[0].l);
  //     context.tickerPrice = success.data[0].l;
  //     context.lastTraded = success.data[0].lt;
  //   }, function(error) {
  //     console.log('error jsonp ', error);
  //   })
  // }
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
      <div ng-dblclick="ctrl.removeTask(ctrl.task)" > 
        <span> {{ctrl.task}} </span> 
        <quote-info ticker="ctrl.task"> </quote-info>
      </div>
    `
  };
});


// <span ng-init="ctrl.getData(ctrl.task)"> {{ctrl.tickerPrice}} </span>
//         <span> {{ctrl.lastTraded}} </span>