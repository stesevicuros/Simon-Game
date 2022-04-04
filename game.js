var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {

    var randomNubmer = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNubmer];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(80).fadeIn(80);

    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();

    level++;
    $("#level-title").text("Level " + level)

    userClickedPattern = [];
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1)
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $(".btn." + currentColor).addClass("pressed");
    setTimeout(function () {
        $(".btn." + currentColor).removeClass("pressed");
    }, 100);
}

var level = 0;

var started = false;
$(document).on("keydown", function () {
    if (!started) {

        nextSequence();
        started = true;

        $("#level-title").text("Level " + level)
    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {

            setTimeout(function () {
                nextSequence()
            }, 1000);
        }
    } else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 150);

        $("#level-title").text("Game Over, Press Any Key To Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}