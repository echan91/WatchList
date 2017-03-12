angular.module('list-app')

.controller('quoteController', function($scope, $http) {
  console.log('quotes', $scope);
  this.tickerPrice = '';
  this.lastTraded = '';
  this.getData = function(ticker) {
    var context = this;
    var query = 'https://www.google.com/finance/info?client=ig&q='+ticker;
    $http.jsonp(query, {jsonpCallbackParam: 'callback'})
    .then(function(success) {
      console.log('successful jsonp ', success.data[0].l);
      context.tickerPrice = success.data[0].l;
      context.lastTraded = success.data[0].lt;
    }, function(error) {
      console.log('error jsonp ', error);
    })
  }
})

.directive('quoteInfo', function() {
  return {
    scope: {
      ticker: '<'
    },
    bindToController: true,
    controllerAs: 'ctrl',
    controller: 'quoteController',
    template: `
      <span class="ticker" ng-init="ctrl.getData(ctrl.ticker)"> 
        {{ctrl.tickerPrice}}
      </span>
      <span class="ticker">
        {{ctrl.lastTraded}}
      </span>
    `
  };
});