polls.factory("Poll", ["$resource", function($resource) {

  return $resource("http://localhost:3000/polls/:id", {}, {
    get: {
      method: "GET",
      isArray: true,
      url: "http://localhost:3000/polls"
    }
  });

}]);
