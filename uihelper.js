var deal = document.querySelector("#deal-button");
var dealerHand = document.querySelector("#dealer-hand");
var dealerInfo = document.querySelector("#dealer-info");

var p1Hand = doocument.querySelector("#p1-hand");
var p1Info = document.querySelector("#p1-info");
var p1Hit = document.querySelector("#p1-hit");
var p1Stand = document.querySelector("#p1-stand");
var p1Double = document.querySelector("#p1-double");
var p1BetArea = document.querySelector("#p1-bet-area");
var p1BetInput = document.querySelector("#p1-bet");
var p1ChipIn = document.querySelector("#p1-chip-in");

var p2Hand = doocument.querySelector("#p2-hand");
var p2Info = document.querySelector("#p2-info");
var p2Hit = document.querySelector("#p2-hit");
var p2Stand = document.querySelector("#p2-stand");
var p2Double = document.querySelector("#p2-double");
var p2BetArea = document.querySelector("#p2-bet-area");
var p2BetInput = document.querySelector("#p2-bet");
var p2ChipIn = document.querySelector("#p2-chip-in");

var p3Hand = doocument.querySelector("#p3-hand");
var p3Info = document.querySelector("#p3-info");
var p3Hit = document.querySelector("#p3-hit");
var p3Stand = document.querySelector("#p3-stand");
var p3Double = document.querySelector("#p3-double");
var p1BetArea = document.querySelector("#p3-bet-area");
var p1BetInput = document.querySelector("#p3-bet");
var p3ChipIn = document.querySelector("#p3-chip-in");

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
