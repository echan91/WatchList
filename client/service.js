app.module('list-app')

.service('googleFinance', function($http, $scope){
  this.getQuote = (tickersArray) => {
    console.log('trying to get quote');
    var context = this;
    var query = 'https://www.google.com/finance/info?client=ig&q='+ticker;
    $http.jsonp(query, {jsonpCallbackParam: 'callback'})
    .then(function(data) {
      console.log('data found' , data);
    })
  }
})