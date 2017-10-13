console.log("i'm here")

$(document).ready(onReady);
function onReady() {
    console.log('query in');
    $(".difficulty").on('click', 'button', choseDifficulty);
    $("#startGame").on('click', startGame);

    
    $('#guessNumber').on('click', function () {
        console.log('sending to server to check answer');
        round++;
        $('#round').text(round);

        // get all the user input guess
        var guesses = [];
        $('input').each(function (index, input) {
            console.log(input);
            guesses.push($(input).val());

            $(input).val('');
        });

        $.ajax({
            method: "POST",
            url: "/guess",
            data: {
                guesses: guesses
            }
        }).done(function (response) {
            console.log('response guess');
            console.log(response);
            var isThereAWinner = false;
            $('.sugesstion').each(function (index, element) {
                $(element).text(response[index])

                if (response[index] === 'You guess correct') {
                    if (index === 4) {
                        alert('...boop...beeeep...HUMANS ARE INFERIOR...beep...boop...EAT MY METAL $#!7!!!!');
                        $('#robot').removeClass('hidden');
                        isThereAWinner = true;
                    }  else {
                    alert('Player ' + (index + 1) + ' Guess correct');
                    $('#cat').removeClass('hidden');
                    isThereAWinner = true;
                    }
                }

                
            });

            if (isThereAWinner) {
                $('#reset').removeClass('hidden');
                $('#cancel').removeClass('hidden');
                $('.game-board').addClass('hidden');
                return;
            }

            botGuess();
        })
    });
    $('#cancel').on('click', function () {
        $(this).addClass('hidden');
        $('.game-setting').removeClass('hidden');
        $('.game-board').addClass('hidden');
    });

    $('#reset').on('click', function () {
        $(this).addClass('hidden');
        $('.sugesstion').text(''); 3
        $('.game-setting').removeClass('hidden');
        $('.game-board').addClass('hidden');
        $('#cat').addClass('hidden');
        $('#robot').addClass('hidden');
        round = 1;
    });

   

    $('input').on('blur', function (event) {
        console.log(event);
        var number = parseInt($(event.originalEvent.target).val(), 10);
        console.log(number);

        if (number < 0 || number > max) {
            $(event.originalEvent.target).val('');
        }
    });
}

var max;
var round = 1;
function choseDifficulty() {
    max = 0;
    max = $(this).data('difficulty');
    console.log(max);
    $('button').css('opacity', '1')
    $(this).css('opacity', '0.5')
    $('#startGame').prop('disabled', false);

    return max;
}

function startGame() {
    round = 1;
    $('#round').text(round)
    $('#difficulty').text('pick a number between 0-' + max);
    $('.game-setting').addClass('hidden');
    $('#cancel').removeClass('hidden');
    $('.game-board').removeClass('hidden');
    $.ajax({
        method: "POST",
        url: "/startgame",
        data: {
            difficulty: max
        }
    });

    botGuess();

}
var botGuesses = [];

function botGuess() {
    // logic to guess the nubmer that is greater than 0 and less than max
    // populate the bot input
    var botNumber = randomNumber(1, max);

    while (botGuesses.indexOf(botNumber) > -1) {
        botNumber = randomNumber(0, max)
    }

    botGuesses.push(botNumber);

    console.log(botGuesses);
    $('.bot input').val(botNumber);
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
}