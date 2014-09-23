var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Promise = require('bluebird');
 
var dbConfig = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'ama331',
    password: '55239490',
    database: 'assignment2',
    charset: 'utf8'
  }
};
 
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
 
app.set('bookshelf', bookshelf);
 
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

app.use(express.static(require("path").join(__dirname, "public")));

 
app.use(allowCrossDomain);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
 
// parse application/json
app.use(bodyParser.json());
 
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
 
// elsewhere, to use the bookshelf client:
var bookshelf = app.get('bookshelf');
 
// {our model definition code goes here}

var Poll = bookshelf.Model.extend({
  tableName: 'Polls'
});

var Vote = bookshelf.Model.extend({
  tableName: 'Votes'
});

app.use(function(err, req, res, next){
console.error(err.stack);
res.send(500, 'Something broke!');
});

app.get('/pollsteste',function(req,res){
  new Poll().fetchAll()
  .then(function(polls){
    res.send(polls.toJSON());
  }).catch(function(error){
    console.log(error);
    res.send('An error occured');
  });
});

app.get('/polls', function(req, res) { 
  res.json({ 
    id: 1, 
    title: "Brush teeth", 
    question: "How many times do you brush your teeth in a day?", 
    option1: 1, 
    option2: 2, 
    option3: 3, 
    option4: 4, 
    option5: 5 })
  .status(200); });
app.get('/polls/:id', function(req, res){
  
});
 
app.listen(3000, function() {
  console.log('Express started at port 3000');
});
