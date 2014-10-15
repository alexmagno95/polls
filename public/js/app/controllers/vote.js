polls.controller('VoteCtrl', [ '$scope', '$routeParams', 'Vote',
//Functions for the Vote model for usage in angularjs
  function($scope, $routeParams, Vote) {
    $scope.vote = {};

    $scope.save = function(poll, chosen) {
      Vote.save({ 
        pollId: poll,
        chosen: chosen
      });
      $scope.goNext('/polls/'+poll+'/result');
    };  

    $scope.clearAll = function(poll){
      console.log("chegou");
      Vote.remove({ 
        pollId: poll
      });
      window.alert("Votes for this poll cleared");
      $scope.goNext('/polls/');
    };

  }
]);
