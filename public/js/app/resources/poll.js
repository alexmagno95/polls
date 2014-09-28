polls.factory("Poll", ["$resource", function($resource) {

  return $resource("http://localhost:3000/polls/:id", {}, {
    getAll: {
      method: "GET",
      isArray: true,
      url: "http://localhost:3000/polls"
    },
    get: {
      method: "GET",
      url: "http://localhost:3000/polls/:id"
    },
  });

}]);
