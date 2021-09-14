var main = function (input) {
  makeDeck();
  //return myOutputValue;
};

//Function to generate card deck
var makeDeck = function () {
  //initialize empty deck array
  var cardDeck = [];
  //initialize an array of the 4 suits in deck
  var suits = [`hearts`, `diamonds`, `clubs`, `spades`];

  //loop over suits array
  for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    var currentSuit = suits[suitIndex];
    console.log(`currentsuit:` + currentSuit);

    //loop from 1 to 13 to create all cards for a given suit
    for (var rankCounter = 1; rankCounter <= 13; rankCounter++) {
      var cardName = rankCounter;
      console.log(`currentrank:` + rankCounter);

      //if rank is 1, 11, 12, 13, change card name to ace, jack, queen, king
      if (cardName == 1) {
        cardName = `ace`;
      } else if (cardName == 11) {
        cardName = `jack`;
      } else if (cardName == 12) {
        cardName = `queen`;
      } else if (cardName == 13) {
        cardName = `king`;
      }

      //create a new card object with name, suit, rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      //add card to the deck
      cardDeck.push(card);
    }
  }
  return cardDeck;
};

var deck = makeDeck();

//Function to get random integer from zero to max
var getRandomInteger = function (max) {
  return Math.floor(Math.random() * max);
};

//Shuffle deck
var shuffleCards = function (cardDeck) {
  //Initialize card deck array index
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    //select a random index in deck
    var randomIndex = getRandomIndex(cardDeck.length);
    //select card that corresponds with random index
    var randomCard = cardDeck[randomIndex];
    //select card that corresponds to current index
    var currentCard = cardDeck[currentIndex];
    //swap positions of both cards
    cardDeck[randomIndex] = currentCard;
    cardDeck[currentIndex] = randomCard;
    //increment current index
    currentIndex += 1;
  }
  return cardDeck;
};

//Deal card

//Cards analyzed for winning conditions (blackjack)

//Cards displayed to user

//If user decides to hit or stand, submit their choice

//User's cards analyzed for winning or losing conditions

//Computer decides to hit or stand automatically

//Game either ends or continues
