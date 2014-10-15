polls.controller('PollCtrl', [ '$scope', '$location', '$routeParams', '$q', 'Poll', 'Vote',
//Functions for the Poll model for usage in angularjs
  function($scope, $location, $routeParams, $q, Poll, Vote) {
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

    $scope.goNext = function (hash) { 
      $location.path(hash);
    }


    $scope.clearAll = function(poll){
      Vote.delete({ 
        pollId: poll
      });
      window.alert("Votes for this poll cleared");
      $scope.goNext('/polls/');
    };


    $scope.save = function() {
      Poll.save({ poll: $scope.poll });
      window.alert('Poll Saved');
      $location.path('/polls/');
    };  

  }
]);
