// == Blackjack Casino Style (Basic) ==
// Computer is the dealer, human is the player
// Each player is dealed with two cards to start
// Player can decide to hit (draw) or stand (enf their turn). Player has to hit if its total card value is below 12. Player can draw any amount of cards until the cards value not more than 21. Bust if its more than 21.
// Dealer has to hit if his hand is below 17
// ace can be 1 or 11, jack queen and king are all value of 10

// helper functions needed: cardGenerator, cardShuffler, cardDealer, cardTotal
// global variable: dealerCards, playerCard

dealerCards = [];
playerCards = [];
gameStatus = "dealing";

var cardGenerator = function () {
  suits = ["Club", "Diamond", "Heart", "Spade"];
  deck = [];
  for (i = 0; i < suits.length; i += 1) {
    currentSuit = suits[i];
    for (j = 1; j <= 13; j += 1) {
      var card = {
        rank: j,
        suit: currentSuit,
        name: j,
      };
      if (j == 11) {
        card.name = "Jack";
      } else if (j == 12) {
        card.name = "Queen";
      } else if (j == 13) {
        card.name = "King";
      } else if (j == 1) {
        card.name = "Ace";
      }
      deck.push(card);
    }
  }
  return deck;
};

var cardShuffler = function (shuffledDeck) {
  var randomInteger = Math.floor(Math.random() * 52);
  for (i = 0; i < shuffledDeck.length; i += 1) {
    var currentIndex = i;
    var randomIndex = randomInteger;
    var currentCard = deck[i];
    var randomCard = deck[randomIndex];
    shuffledDeck[currentIndex] = randomCard;
    shuffledDeck[randomIndex] = currentCard;
  }
  return shuffledDeck;
};

var cardDealer = function (shuffledDeck) {
  if (gameStatus == "dealing") {
    playerCards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());
    playerCards.push(shuffledDeck.pop());
    dealerCards.push(shuffledDeck.pop());
  }
  console.log(playerCards);
  console.log(dealerCards);
};

var main = function (input) {
  var myOutputValue = "hello world";
  var deck = cardGenerator();
  console.log(deck);
  var shuffledDeck = cardShuffler(deck);
  console.log(shuffledDeck);
  cardDealer(shuffledDeck);
  return myOutputValue;
};
