polls.controller('SummaryCtrl', ['$scope', 'Poll', function($scope, Poll) { 

  $scope.render = function() {
    ( Poll.get() ).$promise.then(function(data) {
      $scope.polls = data;
    });
  }

  $scope.render();

}]);
