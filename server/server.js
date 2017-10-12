var express = require('express');
var randomnumber = require('./module/randomnumber.js');
var app = express();
var port = 5000;

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));

app.listen(port, function(){
    console.log('listening on port ', port);
});

var max;
var currentNumber;

app.post('/startgame',function(req, res){
    max = parseInt((req.body).difficulty);
    currentNumber = randomnumber(0, max);
    console.log(currentNumber);
})
