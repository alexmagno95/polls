polls.factory("Poll", ["$resource", function($resource) {
  return $resource("/polls/:id", {}, {
    getAll: {
      method: "GET",
      isArray: true,
      url: "/polls"
    },
    get: {
      method: "GET",
      url: "/polls/:id"
    },
    remove: {
      method: "DELETE",
      url: "http://localhost:3000/polls/:id"
    },
  });

}]);
