polls.factory("Vote", ["$resource", function($resource) {

  return $resource("/votes/:pollId", { pollId: '@pollId' }, {
    get: {
      method: "GET",
      isArray: true,
      url: "/votes/:id"
    },
    save: {
      method: "POST",
      url: "/votes/:pollId/vote"
    }
  });

}]);
