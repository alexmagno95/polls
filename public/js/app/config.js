var polls = angular.module('polls', ['ngRoute', 'ngResource']);

polls.config(['$routeProvider', function($routeProvider) { 
  $routeProvider
  . when('/', 
    { templateUrl: 'templates/about.html' 
  })
  . when('/summary', { 
    templateUrl: 'templates/summary.html',
    controller: 'SummaryCtrl'
  })
  . when('/vote', { 
    templateUrl: 'templates/vote.html',
    controller: 'VoteCtrl'
  })
  . otherwise({ redirectTo: '/' });
} ]);
