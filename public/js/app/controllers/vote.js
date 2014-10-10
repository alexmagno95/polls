polls.controller('VoteCtrl', [ '$scope', '$routeParams', 'Vote',

  function($scope, $routeParams, Vote) {
    $scope.vote = {};

    $scope.save = function(poll, chosen) {
      Vote.save({ 
        pollId: poll,
        chosen: chosen
      });
    };  

  }
]);
