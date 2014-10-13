polls.factory("Poll", ["$resource", function($resource) {

  return $resource("http://agile-depths-4725.herokuapp.com/polls/:id", {}, {
    getAll: {
      method: "GET",
      isArray: true,
      url: "http://agile-depths-4725.herokuapp.com/polls"
    },
    get: {
      method: "GET",
      url: "http://agile-depths-4725.herokuapp.com/polls/:id"
    },
  });

}]);
