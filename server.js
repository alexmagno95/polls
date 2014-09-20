var express = require('express');
var app = express();

app.use(express.static(require("path").join(__dirname, "public")));

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);

