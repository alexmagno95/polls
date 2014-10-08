polls.controller('VoteCtrl', [ '$scope', '$http', '$routeParams', 'Poll',

  function($scope, $routeParams, Poll) {
    $scope.vote = {};

    $scope.render = function() {
      ( Vote.get({id: $routeParams.id}) ).$promise.then(function(data) {
        $scope.vote = data;
      });
    };

    $scope.renderAll = function() {
      ( Vote.getAll() ).$promise.then(function(data) {
        $scope.votes = data;
      });
    };
      
    $scope.findIP = function () {
    var ipUrl = "http://jsonip.com?callback=?";           
    $http.jsonp(ipUrl)  // Load list of departments
        .success(function (response) {
            $scope.ip = response.ip;        
        })
        .error(function() {
            $scope.ip = "";                 
        });             
    };   

    $scope.save = function() {
      Vote.save({ vote: $scope.vote });
    };  

  }
]);
