var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var getRandom = function() {return Math.floor((Math.random() * 10));}
var balloons = [], currentBalloon = [], scores = [], balloonPress = 0, gameLength = 3,
  balloonStrength = getRandom(),
  balloonTemplate = {
    x : canvas.width/11,
    y : canvas.height/4,
    fillcolor : "#0095DD",
    radius : 15
  },
  bigBalloonTemplate = {
    x : canvas.width/2,
    y : canvas.height - canvas.height/4,
    fillcolor : "#0095DD",
    radius : 25,
    radiusIncrement : 2
  };

/* colours the current ballon and resets colour of previous ballon */
var colorBalloon = function() {
  if (scores.length > 0) balloons[scores.length-1].fillcolor = balloonTemplate.fillcolor;
  balloons[scores.length].fillcolor = "#CC4477";
}

/* @ret (object) {presses: presses made, total: total of all balloon strengths} */
var getTotalScore = function() {
  var presses = 0;
  var total = 0;
  for (var score in scores) {
    presses += scores[score].press;
    total += scores[score].strength;
  }
  scores = [];
  return {presses: presses, total: total};
}

/* adds current score to scores and goes to next ballon */
var addScore = function() {
  scores.push({press : balloonPress, strength : balloonStrength});
  currentBalloon.radius = bigBalloonTemplate.radius;
  balloonStrength = getRandom();
  balloonPress = 0;
  colorBalloon();
  if (scores.length === gameLength) {
    var score = getTotalScore();
    alert("Game Over. Score: " + score.presses + "/" + score.total + ", " + Math.floor(score.presses / score.total * 100) + "%");
  }
}

/* records one balloon press */
var addBalloonPress = function() {
  if (balloonPress >= balloonStrength) {
    alert("Score: 0");
    addScore();
  } else {
    ++balloonPress;
    currentBalloon.radius += bigBalloonTemplate.radiusIncrement;
    alert("HIIII: " + currentBalloon.radius + " " + bigBalloonTemplate.radiusIncrement);
  }
}

/* Go to the next balloon */
var stopBalloonPress = function() {
    alert("Score: " + balloonPress);
    addScore();
    currentBalloon.radius = balloonTemplate.radius;
}

document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
  // space bar
  if(e.keyCode == 32) addBalloonPress();
  // enter
  else if(e.keyCode == 13) stopBalloonPress();
}

var drawBalloon = function(balloon) {
    context.beginPath();
    context.arc(balloon.x, balloon.y, balloon.radius, 0, Math.PI*2);
    context.fillStyle = balloon.fillcolor;
    context.fill();
    // context.fillText(text, x, y);
    context.closePath();
}

/* @ret {object} A set of balloon attributes */
var saveBalloon = function(x, y, fillcolor, radius) {
  return {
    x : x,
    y : y,
    fillcolor : fillcolor,
    radius : radius
  };
}

/* saves and draws the balloon*/
var makeBalloon = function(i) {
  var b = new saveBalloon(i*balloonTemplate.x, balloonTemplate.y, balloonTemplate.fillcolor, balloonTemplate.radius);
  balloons.push(b);
  drawBalloon(balloons[i-1]);
}

var makeCurrentBalloon = function() {
  var c = new saveBalloon(bigBalloonTemplate.x, bigBalloonTemplate.y, bigBalloonTemplate.fillcolor, bigBalloonTemplate.radius);
  currentBalloon.push(c);
  drawBalloon(currentBalloon);
}

function game() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 1; i <= 10; ++i) {makeBalloon(i);}
    makeCurrentBalloon();
    colorBalloon();
}

setInterval(game, 10);
