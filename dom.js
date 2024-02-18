var startGame = document.querySelector("#start-game");
startGame.addEventListener("click", function () {
  // Set result to input value
  var input = document.querySelector("#input-field");
  // Store the output of main() in a new variable
  var result = main(input.value);

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;

  // Reset input value
  input.value = "";
});
var submit = document.querySelector("#submit-button");
submit.addEventListener("click", function () {
  // Set result to input value
  var input = document.querySelector("#input-field");
  // Store the output of main() in a new variable
  var result = main(input.value);

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;

  // Reset input value
  input.value = "";
});
var drawButton = document.querySelector("#draw");
drawButton.addEventListener("click", function () {
  // Call the dealSingleCard function for the current player's hand
  var result = dealSingleCard(playerProfile[currPlayer].cards);

  // Update the output element with the result of dealing the card
  var outputDiv = document.querySelector("#output-div");
  outputDiv.innerHTML = result;
});

var standButton = document.querySelector("#stand");
// Move the code to check playerCardValue and update the Stand button's display inside a function
standButton.addEventListener("click", function () {
  // Call the function to end the current player's turn
  var output = endCurrPlayerTurn();

  // Update the UI with the output message
  var outputDiv = document.querySelector("#output-div");
  outputDiv.innerHTML = output;
});
