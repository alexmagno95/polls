polls.factory("Poll", ["$resource", function($resource) {

  return $resource("http://localhost:3000/polls/:id", {}, {
    getAll: {
      method: "GET",
      isArray: true,
      url: "http://enigmatic-plains-6227.herokuapp.com/polls"
    },
    get: {
      method: "GET",
      url: "http://enigmatic-plains-6227.herokuapp.com/polls/:id"
    },
  });

}]);
