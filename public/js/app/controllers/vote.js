polls.controller('VoteCtrl', [ '$scope', '$location','$routeParams', 'Vote', 'Poll',
//Functions for the Vote model for usage in angularjs
  function($scope, $location,  $routeParams, Vote) {
    $scope.vote = {};

    $scope.save = function(poll, chosen) {
      Vote.save({ 
        pollId: poll,
        chosen: chosen
      });
      $scope.goNext('/polls/'+poll+'/result');
    };  

    $scope.goNext = function (hash) { 
      $location.path(hash);
    }
  }

]);
