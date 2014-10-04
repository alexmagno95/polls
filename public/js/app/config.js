var polls = angular.module('polls', ['ngRoute', 'ngResource']);


polls.config(['$routeProvider', function($routeProvider) { 
  $routeProvider
  . when('/', 
    { templateUrl: 'templates/about.html' 
  })
  . when('/polls', { 
    templateUrl: 'templates/polls.html',
    controller: 'SummaryCtrl'
  })
  . when('/polls/:id', { 
    templateUrl: 'templates/poll.html',
    controller: 'PollCtrl'
  })
  . otherwise({ redirectTo: '/' });
} ]);
