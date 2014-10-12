var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var _           = require('underscore');

var app = express();

mongoose.connect("mongodb://localhost/poll", onMongooseError = function(err) {
  if (err) { throw err; }
});

app.use(express.static(require("path").join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var models = {
  Poll: require("./models/poll")(mongoose),
  Vote: require("./models/vote")(mongoose)
};

app.get('/polls', function(req, res) {
  models.Poll.find().exec(function(err, poll) {
  if(err) { 
    res.status(500).json([]); 
  }
  res.status(200).json(poll);
  });
});

app.get('/polls/:id', function(req, res) {
  models.Poll.findOne({_id: req.params.id}).exec(function(err, poll) {
  if(err) { 
    res.status(500).json({}); 
  }
  res.status(200).json(poll);
  });
});

app.post('/polls', function(req, res) {
  var poll = new models.Poll(req.body.poll);
  poll.save(function(err, poll) {
  if(err) {
    res.status(500).json({}); 
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
      res.status(500); 
    }
    res.status(200).json(vote);
  });
});

app.delete('/votes/:id', function(req, res) {
  models.Vote.remove({ pollId: req.params.id }, function(err) {
    if(err) { res.status(500); }
    res.status(200).json({});
  });
});

app.listen(3000, function() {
  console.log('Express started at port 3000');
});
