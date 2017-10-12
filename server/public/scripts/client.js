console.log("i'm here")

$(document).ready(inQuery);
function inQuery(){
    console.log('query in');
    $(".difficulty").on('click','button',choseDifficulty);
    $("#startGame").on('click', startGame);

}

var max; 

function choseDifficulty(){
    max = $(this).data('difficulty');
    console.log(max);
    return max;
}

function startGame(){
    $.ajax({
        method: "POST",
        url: "/startgame",
        data: {
            difficulty: max
        }
    })
    .done(function(response){
        response
    })
}
