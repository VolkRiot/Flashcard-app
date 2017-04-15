var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
app.use("assets/js", express.static(__dirname + "/assets/js"));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + 'views/index.html'));
});

app.listen(process.env.PORT || 8080, function(){
  console.log('Magic is happening on port 8080')
});
