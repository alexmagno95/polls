polls.controller('PollCtrl', [ '$scope', '$routeParams', 'Poll',

  function($scope, $routeParams, Poll) {
    $scope.poll = {};

    $scope.render = function() {
      ( Poll.get({id: $routeParams.id}) ).$promise.then(function(data) {
        $scope.poll = data;
      });
    };

    $scope.renderAll = function() {
      ( Poll.getAll() ).$promise.then(function(data) {
        $scope.polls = data;
      });
    };

    $scope.save = function() {
      Poll.save({ poll: $scope.poll });
    };  

  }
]);
