var playDeck = [];
var handArray = [];

playDeck = shuffleDeck(makeDeck());
var main = function () {
  var card1 = playDeck.pop();
  var card2 = playDeck.pop();

  handArray.push(card1);
  handArray.push(card2);

  var cardValue = calculateHand(handArray);

  if (playDeck.length == 0) playDeck = shuffleDeck(makeDeck());

  var card1SVG = card1.svg;
  var card2SVG = card2.svg;

  var displayOutput = `<div class = "handContainer"> ${
    card1SVG + card2SVG
  }</div>`;
  displayOutput += `<br><br>${cardValue}`;

  handArray.length = 0;

  return displayOutput;
};
