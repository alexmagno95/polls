polls.controller('PollCtrl', [ '$scope', '$routeParams', '$q', 'Poll', 'Vote',

  function($scope, $routeParams, $q, Poll, Vote) {
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

    $scope.renderResult = function() {
      var votes = $scope.vote = $q.defer(),
          poll  = $scope.poll = $q.defer();

      poll  = $scope.poll  = ( Poll.get({id: $routeParams.id}) );
      votes = $scope.votes = ( Vote.get({id: $routeParams.id}) );
          
      $scope.data = $q.all([ votes, poll ]).then(function(res) {
        return res;
      });
    };

    $scope.save = function() {
      Poll.save({ poll: $scope.poll });
    };  

  }
]);
