//This file provides the RESTful services and is responsible for starting the application
var express     = require('express');
//var bodyParser  = require('body-parser');
var mongoose    = require('mongoose'); //an ORM for Mongo
var _           = require('underscore'); //helper tool to work over objects

var app = express();
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';
mongoose.connect(mongoUri, onMongooseError = function(err) {
  if (err) { throw err; }
});

app.use(express.static(require("path").join(__dirname, "public")));


var models = {
  Poll: require("./models/poll")(mongoose), 
  Vote: require("./models/vote")(mongoose)
};

//Get all polls
app.get('/polls', function(req, res) {
  models.Poll.find().exec(function(err, poll) {
  if(err) { 
    res.status(400).json([]); 
  }
  res.status(200).json(poll);
  });
});

//Get poll by id
app.get('/polls/:id', function(req, res) {
  models.Poll.findOne({_id: req.params.id}).exec(function(err, poll) {
  if(err) { 
    res.status(400).json({}); 
  }
  res.status(200).json(poll);
  });
});

//Create a poll
app.post('/polls', function(req, res) {
  var poll = new models.Poll(req.body.poll);
  poll.save(function(err, poll) {
  if(err) {
    res.status(400).json({}); 
  }
  res.status(200).json(poll);
  });
});

// app.get('/votes/:id', function(req, res) {
//   models.Vote.find({ pollId: req.params.id }).exec(function(err, votes) {
//     if(err) { res.status(500); }
//     var chosens = [];
//     _.each(votes, function(vote) {
//       if(_.indexOf(chosens, vote.chosen) > 0) {

//       } else {
//         chosens.push({chosen: vote.chosen, total: 1});
//       }
//     });
//     res.status(200).json(votes);
//   });
// });

//Get number of votes for each option for a determined poll
app.get('/votes/:id', function(req, res) {
  models.Vote.find({ pollId: req.params.id }).exec(function(err, votes) {  
    var chosens = [];

    _.each(votes, function(vote) {
      var chosen = _.findWhere(chosens, { chosen: vote.chosen });
      if(chosen) { chosen.total++; } else {
        chosens.push({chosen: vote.chosen, total: 1});
      }
    });
    res.status(200).json(chosens);
  });
});

//Save a vote
app.post('/votes/:id/vote', function(req, res) {
  var data = {
    "pollId": req.params.id,
    "chosen": req.body.chosen,
    "ip": "8.8.8.8"
  };

  console.log(req.body);

  var vote = new models.Vote(data);

  vote.save(function(err, vote) {
    if(err) { 
      res.status(400); 
    }
    res.status(200).json(vote);
  });
});
//delete all votes of all polls
app.delete('/votes', function(req, res) {
  models.Vote.remove(function(err) {
    if(err) { res.status(400); }
    res.status(200).json({});
  });
});
//delete votes for one poll
app.delete('/votes/:id', function(req, res) {
  models.Vote.remove({ pollId: req.params.id }, function(err) {
    if(err) { res.status(400); }
    res.status(200).json({});
  });
});
//starts the application
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
