polls.factory("Vote", ["$resource", function($resource) {

  return $resource("http://localhost:3000/votes/:pollId", { pollId: '@pollId' }, {
    get: {
      method: "GET",
      isArray: true,
      url: "hhttp://enigmatic-plains-6227.herokuapp.com/votes/:id"
    },
    save: {
      method: "POST",
      url: "http://enigmatic-plains-6227.herokuapp.com/votes/:pollId/vote"
    }
  });

}]);
