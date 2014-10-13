polls.factory("Vote", ["$resource", function($resource) {

  return $resource("http://agile-depths-4725.herokuapp.com/votes/:pollId", { pollId: '@pollId' }, {
    get: {
      method: "GET",
      isArray: true,
      url: "http://agile-depths-4725.herokuapp.com/votes/:id"
    },
    save: {
      method: "POST",
      url: "http://agile-depths-4725.herokuapp.com/votes/:pollId/vote"
    }
  });

}]);
