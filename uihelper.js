var deal = document.querySelector("#deal-button");
var dealerHand = document.querySelector("#dealer-hand");
var dealerInfo = document.querySelector("#dealer-info");

deal.addEventListener("click", function () {
  var card1 = playDeck.pop();
  var card2 = playDeck.pop();
  handArray.push(card1);
  handArray.push(card2);
  var cardValue = calculateHand(handArray);
  dealerInfo.innerHTML = `Dealer has ${cardValue}`;

  if (playDeck.length == 0) playDeck = shuffleDeck(makeDeck());

  dealerHand.innerHTML = card1.svg + card2.svg;
  handArray.length = 0;
});

var button = document.querySelector("#reset-button");

var hit = document.querySelector("#hit-button");

var output = document.querySelector("#output-div");

hit.addEventListener("click", function () {
  output.innerHTML = "hit button clicked.";
});

button.addEventListener("click", function () {
  var result = main();

  // Display result in output element

  output.innerHTML = result;

  // Reset input value
  input.value = "";
});
