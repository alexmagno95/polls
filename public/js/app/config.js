var polls = angular.module('polls', ['ngRoute', 'ngResource']);

polls.config(['$routeProvider', function($routeProvider) { 
  $routeProvider
  . when('/', { 
    templateUrl: 'templates/polls.html', 
    controller: 'PollCtrl'
  })
  . when('/about', {
    templateUrl: 'templates/about.html',
  })
  . when('/polls/create', {
    templateUrl: 'templates/create.html',
    controller: 'PollCtrl'
  })
  . when('/polls/:id', {
    templateUrl: 'templates/poll.html',
    controller: 'PollCtrl'
  })
  . when('/polls/:id/vote', {
    templateUrl: 'templates/vote.html',
    controller: 'VoteCtrl'
  })
  . otherwise({ redirectTo: '/' });
} ]);
