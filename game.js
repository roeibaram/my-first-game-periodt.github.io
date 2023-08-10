var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


function nextSequence () {
userClickedPattern = [];
var randomNumber = Math.floor (Math.random () * 4) ;

var randomChosenColour = buttonColours [randomNumber];

gamePattern.push(randomChosenColour);


$('#' + randomChosenColour).fadeOut(100).fadeIn(100);
playSound (randomChosenColour);
$("#level-title").text("Level " + level);
level ++;

}

$(".btn").click(function(event) {

var userChosenColour = this.id;
userClickedPattern.push (userChosenColour);
playSound (userChosenColour);
animatePress (userChosenColour);
checkAnswer (userClickedPattern.length-1);

});

function playSound (name) {

    var randomAudio = new Audio ('sounds/' + name + '.mp3');
    randomAudio.play();


}

function animatePress (currentColour) {

    
    $("#" + currentColour).addClass("pressed");
    
    setTimeout (function() { 
        $("#" + currentColour).removeClass("pressed");
    }, 100);


};


$ (document).keydown(function () {
   if (!started) {

$ ("#level-title").text("Level " + level);
    nextSequence();
    started = true;
   }
   
    
});

function checkAnswer(currentLevel) {
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
if (gamePattern.length === userClickedPattern.length) {

    setTimeout (function () {
        nextSequence();

    }, 1000);

    }

} else if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
    var audio = new Audio ('sounds/wrong.mp3');
    audio.play ();
    $("body").addClass("game-over");
    setTimeout (function () {
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart")
    startOver ();
}


}

function startOver () {
level = 0;
gamePattern = [];
started = false;
}
