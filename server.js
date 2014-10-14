// This file provides the RESTful services and is responsible for starting the application
var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose'); // An ORM for Mongo
var _           = require('underscore'); // Helper tool to work over objects

var app = express();
var uristring = 'mongodb://alexmagno95:belluga3@ds035750.mongolab.com:35750/polls-angular-db';

// The http server will listen to an appropriate port, or default to
// Port 5000.

// Makes connection asynchronously.  Mongoose will queue up database
// Operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

app.use(express.static(require("path").join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var models = {
  Poll: require("./models/poll")(mongoose), 
  Vote: require("./models/vote")(mongoose)
};

// Get all polls
app.get('/polls', function(req, res) {
  models.Poll.find().exec(function(err, poll) {
  if(err) { 
    console.log("erro ao pegar polls");
    res.status(404).json([]); 
  }
  res.status(200).json(poll);
  });
});

// Get poll by id
app.get('/polls/:id', function(req, res) {
  models.Poll.findOne({_id: req.params.id}).exec(function(err, poll) {
  if(err) { 
    res.status(404).json({}); 
  }
  res.status(200).json(poll);
  });
});

// Create a poll
app.post('/polls', function(req, res) {
  var poll = new models.Poll(req.body.poll);
  poll.save(function(err, poll) {
  if(err) {
    res.status(404).json({}); 
    console.log("erro ao salvar polls");
  }
  res.location('/polls/' + poll._id);
  console.log("sucesso ao salvar polls");
  res.status(201).json(poll);
  });
});

// Get number of votes for each option for a determined poll
app.get('/votes/:pollId', function(req, res) {
  models.Vote.find({ pollId: req.params.pollId }).exec(function(err, votes) {  
    var chosens = [];

    _.each(votes, function(vote) {
      var chosen = _.findWhere(chosens, { chosen: vote.chosen });
      if(chosen) { chosen.total++; } else {
        chosens.push({chosen: vote.chosen, total: 1});
      }
    });
    if(err) {
      res.status(404).json({}); 
      console.log("erro ao salvar polls");
    }
    res.status(200).json(chosens);
  });
});

// Save a vote
app.post('/votes/:pollId/vote', function(req, res) {
  var data = {
    "pollId": req.params.pollId,
    "chosen": req.body.chosen,
    "ip": (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress
  };

  console.log(req.body);

  var vote = new models.Vote(data);

  vote.save(function(err, vote) {
    if(err) { 
      res.status(404); 
    }
    res.status(200).json(vote);
  });
});

// Delete all votes of all polls
app.delete('/votes', function(req, res) {
  models.Vote.remove(function(err) {
    if(err) { res.status(404); }
    res.status(200).json({});
  });
});

//Delete all polls
app.delete('/polls', function(req, res) {
  models.Poll.remove(function(err) {
    if(err) { res.status(404); }
    res.status(200).json({});
  });
});

//Delete poll by id
app.delete('/polls/:id', function(req, res) {
  models.Poll.remove({ _id: req.params.id }, function(err) {
    if(err) { res.status(404); }
    res.status(200).json({});
  });
});

// Delete votes for one poll
app.delete('/votes/:pollId', function(req, res) {
  models.Vote.remove({ pollId: req.params.pollId }, function(err) {
    if(err) { res.status(404); }
    res.status(200).json({});
  });
});

// Starts the application
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
