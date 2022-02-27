var playDeck = [];
var main = function (input) {
  var displayOutput = "";
  playDeck = shuffleDeck(makeDeck());
  while (playDeck.length) {
    var pulledCard = playDeck.pop();
    displayOutput += `${pulledCard.text}${pulledCard.suit}<br>`;
  }
  return displayOutput;
};
