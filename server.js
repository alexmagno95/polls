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
  models.Poll.find({_id: req.params.id}).exec(function(err, poll) {
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

app.post('/polls/:id/vote', function(req, res) {
  var vote = new models.Vote(req.body.vote);
  vote.save(function(err, poll) {
  if(err) { 
    res.status(500).json({}); 
  }
  res.status(200).json(vote);
  });
});

app.get('/polls', function(req, res) { 
  res.json({ 
    id: 1, 
    title: 'Brush teeth',
    question: 'How many times you brush your teeth in a day?',
    option1: 1, 
    option2: 2, 
    option3: 3, 
    option4: 4, 
    option5: 5
  }).status(200) 
});


app.get('/votes/:pollId',function(req,res){
  var pollId = req.params.pollId;
  new Vote().where('pollId', pollId)
  .fetch()
  .then(function(vote){
    res.send(vote.toJSON());
  }).catch(function(error){
    console.log(error);
    res.send('Error retrieving Poll');
  });
});

app.post("/votes/:pollId/:vote", function(req, res) {
  var vote = new Vote({
    ip:'123.122.2.5',
    pollID:req.params.pollId,
    answer:req.params.vote 
  });
    vote.save().then(function(saved_vote){
      res.send(saved_vote.toJSON());
      }).catch(function(error){
      console.log(error);
      res.send('Error saving vote');
    });
});

app.listen(3000, function() {
  console.log('Express started at port 3000');
});
