var continueButton = document.querySelector("#continue-button");
continueButton.addEventListener("click", function () {
  var result = main("drawPhase");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

var hitButton = document.querySelector("#hit-button");
hitButton.addEventListener("click", function () {
  var result = main("hit");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

var standButton = document.querySelector("#stand-button");
standButton.addEventListener("click", function () {
  var result = main("stand");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

var restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", function () {
  var result = main("restart");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});
