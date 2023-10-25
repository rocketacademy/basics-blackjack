/*

						                    INITIAL STATE
- global var gameState = "INITIAL"
- global var playerDrawsArray and dealerDrawsArray
- global var playerScore and dealerScore
- initialise deck
- shuffle deck and assign it as shuffled
- draw two cards sequentially for player and dealer
- checkBlackjack function
- blackjackResult = checkBlackjack (playerDrawsArrays, dealerDrawsArrays);
if bjresult = "Nil", output will need to display player's both cards, dealer's first card, player's scores, and ask whether want to hit or stand
gameState will change to what the input is -- do user validation
return output
else if bjresult = "Player", output will display the player's cards and say Blackjack. Press Submit to restart
else if bjresult = "Dealer", output will display the dealer's cards and say Blackjack. Press Submit to restart
else if bjresult = "Both", output will display both player and dealer's cards and say tied. Press Submit to restart

*/

var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};

// helper function to make deck
var makeDeck = function () {
  // create the empty array that will be used to store the card objects
  var createdDeck = [];

  // create an array to store the suits
  var suits = ["spades", "hearts", "clubs", "diamonds"];

  for (var i = 0; i < suits.length; i++) {
    // for each suit, create the name and rank of the card
    var currentSuit = suits[i];
    // names are ace, 2 to 10, jack, queen and king
    // ranks are 1, 2 to 10, 11, 12 and 13
    // need a loop to iterate from 1 to and including 13 so we can get the currentRank. Then use if else to get the currentName
    var lastRank = 13;
    for (var currentRank = 1; currentRank <= lastRank; currentRank++) {
      var cardName = currentRank;
      if (currentRank == 1) cardName = "ace";
      else if (currentRank == 11) cardName = "jack";
      else if (currentRank == 12) cardName = "queen";
      else if (currentRank == 13) cardName = "king";
      var currentCard = {
        name: cardName,
        suit: currentSuit,
        rank: currentRank,
      };
      createdDeck.push(currentCard);
    }
  }
  return createdDeck;
};

var shuffleDeck = function (cardDeck) {
  for (var i = 0; i < cardDeck.length; i++) {
    var currentCardIndex = i;
    var currentCard = cardDeck[currentCardIndex];
    var randomCardIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomCardIndex];
    // reassign the currentCard as the randomCard
    // problem with the below code is i never go back to the index and reassign. Im just reassigning the variables
    // currentCard = randomCard;
    // instead, I should reassign the value at the currentCard's index with the randomCard value
    cardDeck[currentCardIndex] = randomCard;
    // likewise we reassign the value at the randomCard index with the currentCard value
    cardDeck[randomCardIndex] = currentCard;
    // and randomCard as currentCard
    // randomCard = currentCard;
  }
  return cardDeck;
};
