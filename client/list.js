angular.module('app')

.directive('lists', function() {
  return {
    scope: {
      list: '<',
      select: '<'
    },
    bindToController: true,
    controllerAs: 'ctrl',
    controller: function($scope) {
      console.log('lists: ', $scope);
    },
    template: `
              <div id="lists">
                <list-name ng-repeat="list in ctrl.list" list="list" select="ctrl.select"> </list-name>
              </div>
              `
  };
});
