var playDeck = [];

playDeck = shuffleDeck(makeDeck());
var main = function (input) {
  var card1 = playDeck.pop();
  var card2 = playDeck.pop();

  var handArray = [];
  handArray.push(card1);
  handArray.push(card2);

  var cardValue = calculateHand(handArray);

  console.log(`Card 1: ${card1.text + card1.suit}`);
  console.log(`Card 2: ${card2.text + card2.suit}`);

  if (playDeck.length == 0) playDeck = shuffleDeck(makeDeck());

  var card1SVG = card1.svg;
  var card2SVG = card2.svg;

  var displayOutput = card1SVG + card2SVG;
  displayOutput += `<br><br>${cardValue}`;

  return displayOutput;
};
