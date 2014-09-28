polls.controller('PollCtrl', [ '$scope', '$routeParams', 'Poll',

function($scope, $routeParams, Poll) { 
  $scope.render = function() { 
    ( Poll.get({id: $routeParams.id}) ).$promise.then(function(data) { 
      $scope.poll = data; 
    }); 
  };

$scope.render(); 
} ]);
