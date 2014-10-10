polls.factory("Vote", ["$resource", function($resource) {

  return $resource("http://localhost:3000/votes/:pollId", { pollId: '@pollId' }, {
    save: {
      method: "POST",
      url: "http://localhost:3000/votes/:pollId/vote"
    }
  });

}]);
