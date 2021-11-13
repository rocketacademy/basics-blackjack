var continueButton = document.querySelector("#continue-button");
continueButton.addEventListener("click", function () {
  var result = main("drawPhase");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;

  var result2 = displayCards(playerHand);
  var output2 = document.querySelector("#green");
  output2.innerHTML = "Your Hand:    " + result2;
  if (mode == "normal") {
    var result3 = `${computerHand[0].value}${computerHand[0].suits}`;
    var output3 = document.querySelector("#blue");
    output3.innerHTML = "Computer's Hand:    " + result3;
  } else {
    var result3 = displayCards(computerHand);
    var output3 = document.querySelector("#blue");
    output3.innerHTML = "Computer's Hand:    " + result3;
  }
});

var hitButton = document.querySelector("#hit-button");
hitButton.addEventListener("click", function () {
  var result = main("hit");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;

  var result2 = displayCards(playerHand);
  var output2 = document.querySelector("#green");
  output2.innerHTML = "Your Hand:    " + result2;
  if (mode == "normal") {
    var result3 = `${computerHand[0].value}${computerHand[0].suits}`;
    var output3 = document.querySelector("#blue");
    output3.innerHTML = "Computer's Hand:    " + result3;
  } else {
    var result3 = displayCards(computerHand);
    var output3 = document.querySelector("#blue");
    output3.innerHTML = "Computer's Hand:    " + result3;
  }
});

var standButton = document.querySelector("#stand-button");
standButton.addEventListener("click", function () {
  var result = main("stand");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;

  var result2 = displayCards(playerHand);
  var output2 = document.querySelector("#green");
  output2.innerHTML = "Your Hand:    " + result2;

  var result3 = displayCards(computerHand);
  var output3 = document.querySelector("#blue");
  output3.innerHTML = "Computer's Hand:    " + result3;
});

var restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", function () {
  var result = main("restart");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;

  var output2 = document.querySelector("#green");
  var output3 = document.querySelector("#blue");

  output2.innerHTML = "Your Hand:    ";

  output3.innerHTML = "Computer's Hand:    ";
});
