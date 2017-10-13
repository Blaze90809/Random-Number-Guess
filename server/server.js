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

var currentNumber;

app.post('/startgame',function(req, res){
    console.log('new game start with post request');

    console.log('dificulity: ' + req.body.difficulty);

    var max = parseInt(req.body.difficulty, 10);
    currentNumber = randomnumber(0, max);
    
    console.log('guess number is: ' + currentNumber);

    res.sendStatus(200);
});

app.get('/startgame', function (req, res) {
    console.log('new game start with get request');
    console.log('dificulity: ' + req.query.difficulty);
    console.log('level: ' + req.query.level);
    var max = parseInt(req.query.difficulty, 10);
    currentNumber = randomnumber(0, max);
    
    console.log('guess number is: ' + currentNumber);

    res.sendStatus(200);
})

app.post('/guess', function (req, res) {
    console.log(req.body);

    var guesses = [];

    for (var i = 0; i < req.body.guesses.length; i++) {
        if (parseInt(req.body.guesses[i], 10) === currentNumber) {
            guesses.push('You guess correct');
        } else if (parseInt(req.body.guesses[i], 10) < currentNumber) {
            guesses.push('Guess Higher');
        } else {
            guesses.push('Guess Lower');
        }
    }


    res.json(guesses);
});
