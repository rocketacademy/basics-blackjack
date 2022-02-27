var playDeck = [];
playDeck = shuffleDeck(makeDeck());
var main = function (input) {
  var card1 = playDeck.pop();
  var card2 = playDeck.pop();

  var cardValue = card1.rank + card2.rank;

  console.log(`Card 1: ${card1.text}`);
  console.log(`Card 2: ${card2.text}`);

  if (playDeck.length == 0) playDeck = shuffleDeck(makeDeck());

  return cardValue;
};
