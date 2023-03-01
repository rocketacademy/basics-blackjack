var makeDeck = function () {
  //empty deck array
  var cardDeck = [];
  //initialise array with 4 suits
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  //loop over suits array
  for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    //store current suit in variable
    var currentSuit = suits[suitIndex];

    //loop from 1 to 13 to create all cards for a given suit
    for (var rankCounter = 1; rankCounter <= 13; rankCounter++) {
      //default card name is same as its rank
      var cardName = rankCounter;

      //if rank is 1, 11, 12, 13
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      //create a new card with name, suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      //push card into deck
      cardDeck.push(card);
    }
  }
  //return completed card deck
  return cardDeck;
};

var getRandomIndex = function (cardsNum) {
  return Math.floor(Math.random() * cardsNum);
};

var shuffleCards = function (cardDeck) {
  //loop over the card deck array once
  for (var currentIndex = 0; currentIndex < cardDeck.length; currentIndex++) {
    //select random index 0-51
    var randomIndex = getRandomIndex(cardDeck.length);
    //select random card according to chosen index
    var randomCard = cardDeck[randomIndex];
    //select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    //swap positions of both cards
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  //return shuffled deck
  return cardDeck;
};

var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};
