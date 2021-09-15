var gameMode = 0;
var deck = [];
var playerCount = 0;
var playerList = [];

var main = function (input) {
  var myOutputValue = "hello world";
  if (gameMode == 0) {
    // mode to make a deck and then shuffle the deck
    deck = makeDeck();
    deck = shuffleDeck(deck);
    myOutputValue = "How many players are there?";
    gameMode += 1;
  } else if (gameMode == 1) {
    playerCount = input;
    initialisePlayers();
    myOutputValue = "Press submit to deal cards.";
    gameMode += 1;
  } else if (gameMode == 2) {
    dealCards();
    myOutputValue = "Dealing cards...";
    gameMode += 1;
  } else if (gameMode == 3) {
    myOutputValue = "in mode 3";
    gameMode += 1;
  }

  console.log("curret mode: " + gameMode);
  console.log(playerList);

  return myOutputValue;
};

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // By default, the card value is the same as rankCounter
      var cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      // If rank is 11, 12, or 13, set cardValue to 10
      // If rank is 1, set cardValue to 11
      if (cardName == 1) {
        cardName = "ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, rank and value
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

var shuffleDeck = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

var initialisePlayers = function () {
  for (var i = 0; i < playerCount; i += 1) {
    playerList.push([]);
  }
};

var dealCards = function () {
  for (var j = 0; j < 2; j += 1) {
    for (var i = 0; i < playerCount; i += 1) {
      playerList[i].push(deck.pop());
    }
  }
  console.log(playerList);
};

var calculatePlayerScore = function (player) {
  var totalScore = 0;
  for (var i = 0; i < player.length; i += 1) {
    totalScore += player[i].value;
  }
  return totalScore;
};

var playNatural = function () {
  for (var i = 0; i < playerList.length; i += 1) {
    console.log(calculatePlayerScore(playerList[i]));
  }
};

// [{name: 7, suit: 'diamonds', rank: 7, value: 7}, {name: 6, suit: 'diamonds', rank: 6, value: 6}]

// list of players
// [[], []];

// list of objects
// [<<<< [{}, {}, {}] >>>>, [{}, {}], [{}]];
