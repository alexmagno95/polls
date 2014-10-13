polls.factory("Poll", ["$resource", function($resource) {

  return $resource("http://agile-depths-4725.herokuapp.com/polls:"+app.settings.env+"/:id", {}, {
    getAll: {
      method: "GET",
      isArray: true,
      url: "http://agile-depths-4725.herokuapp.com:"+app.settings.env+"/polls"
    },
    get: {
      method: "GET",
      url: "http://agile-depths-4725.herokuapp.com:"+app.settings.env+"/polls/:id"
    },
  });

}]);
