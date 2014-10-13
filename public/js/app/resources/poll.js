polls.factory("Poll", ["$resource", function($resource) {

  return $resource("http://agile-depths-4725.herokuapp.com/polls:"+process.env.PORT+"/:id", {}, {
    getAll: {
      method: "GET",
      isArray: true,
      url: "http://agile-depths-4725.herokuapp.com:"+process.env.PORT+"/polls"
    },
    get: {
      method: "GET",
      url: "http://agile-depths-4725.herokuapp.com:"+process.env.PORT+"/polls/:id"
    },
  });

}]);
