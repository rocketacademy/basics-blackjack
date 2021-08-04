/*Rules:
1) Player hits 21 = instant win
2) Dealer/Player +1 card if hand <17
3) Ace = 1 or 11
4) player vs. dealer, whoever is closest to 21 is the winner
5) >21 = bust
*/

var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};

//Creating the deck
var mainDeck = function () {
  cardDeck = [];
  deckSize = 52;
  var cardSuits = ["Diamonds", "Clubs", "Hearts", "Spades"];

  //Outer loop: assigns suits
  for (suitsIndex = 0; suitsIndex < cardSuits.length; suitsIndex += 1) {
    var currentSuit = cardSuits[suitsIndex];

    //Inner Loop: Creating the cards
    //Starts from 2, goes to 14. Ace is the highest card, hence given the highest ranking
    for (counter = 2; counter <= 14; counter += 1) {
      var cardNumber = counter;
      if (cardNumber == 11) {
        cardNumber = "Jack";
      }
      if (cardNumber == 12) {
        cardNumber = "Queen";
      }
      if (cardNumber == 13) {
        cardNumber = "King";
      }
      if (cardNumber == 14) {
        cardNumber = "Ace";
      }
      var cardAttributes = {
        name: cardNumber,
        suit: currentSuit,
        rank: counter,
      };

      //Add card to main deck
      cardDeck.push(cardAttributes);
    }
  }
  return cardDeck;
};
