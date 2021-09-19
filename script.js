var main = function (input) {
  var cardDeck = shuffleCards(makeDeck());

  console.log(cardDeck);

  var myOutputValue = "hello world";
  return myOutputValue;
};

//Function to create deck of 52 cards
var makeDeck = function () {
  //Create empty deck array
  var cardDeck = [];
  //Create array of 4 suits
  var suits = ["diamonds", "clubs", "hearts", "spades"];

  //Loop over suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    //Inner loop to create cards in a suit from 1 to 13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      //Default card name = rank number
      var cardName = rankCounter;
      //Special names for cards with rank 1,11-13
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      //Create card with current name, suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      //Push card into deck
      console.log(card);
      cardDeck.push(card);
      //Increment rank Index to create next card
      rankCounter += 1;
    }
    //Increment suit index to move onto the next suit
    suitIndex += 1;
  }
  return cardDeck;
};

//Functions to shuffle deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (deck) {
  //Loop over array of cards
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    //Get random index
    var randomIndex = getRandomIndex(deck.length);
    //Select random card from deck using random index
    var randomCard = deck[randomIndex];
    //Select card that corresponds to current index
    var currentCard = deck[currentIndex];
    //Swap positions of both cards
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    //Increment counter
    currentIndex += 1;
  }
  return deck;
};
