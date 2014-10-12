var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

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

app.post('/votes/:id/vote', function(req, res) {
  var data = {
    "pollId": req.params.id,
    "chosen": req.body.chosen,
    "ip": "8.8.8.8"
  };

  var vote = new models.Vote(data);

  vote.save(function(err, vote) {
    if(err) { 
      res.status(500); 
    }
    res.status(200).json(vote);
  });
});

app.get('/votes/:id', function(req, res) {
  models.Vote.find({pollId: req.params.id}).exec(function(err, poll) {
  if(err) { 
    res.status(500).json({}); 
  }
  res.status(200).json(poll);
  });
});

app.post('/votes/:id', function(req, res) {
  models.Vote.find({pollId: '5434edd0ae055b500203b74b'}).remove.exec(function(err) {
  if(err) { 
    res.status(500).json({}); 
  }
  res.status(200).json({});
  });
});


app.listen(3000, function() {
  console.log('Express started at port 3000');
});
