polls.factory("Vote", ["$resource", function($resource) {

  return $resource("http://localhost:3000/votes/:pollId", { pollId: '@pollId' }, {
    get: {
      method: "GET",
      isArray: true,
      url: "http://localhost:3000/votes/:id"
    },
    save: {
      method: "POST",
      url: "http://localhost:3000/votes/:pollId/vote"
    }
  });

}]);
