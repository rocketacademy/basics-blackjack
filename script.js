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

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
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

//----------------------------------------------------------------------------------
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//----------------------------------------------------------------------------------
// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

//----------------------------------------------------------------------------------
var players = [
  ["player1", {}, {}],
  ["Dealer", {}, {}],
];

//----------------------------------------------------------------------------------
//Create the deck
var deck = makeDeck();
// Shuffle the deck and save it in a new variable shuffledDeck
var shuffledDeck = shuffleCards(deck);

//----------------------------------------------------------------------------------
var resultPlayer = function (card1, card2) {
  //blackjack
  if (
    ((card1.name == "10" ||
      card1.name == "jack" ||
      card1.name == "queen" ||
      card1.name == "king") &&
      card2.name == "ace") ||
    ((card2.name == "10" ||
      card2.name == "jack" ||
      card2.name == "queen" ||
      card2.name == "king") &&
      card1.name == "ace")
  ) {
    return "Blackjack";
  }

  return card1.rank + card2.rank;
};

//----------------------------------------------------------------------------------

var main = function (input) {
  // 2 cards for each player
  players[0][1] = shuffledDeck.pop();
  players[0][2] = shuffledDeck.pop();
  players[1][1] = shuffledDeck.pop();
  players[1][2] = shuffledDeck.pop();

  totalPlayer = resultPlayer(players[0][1], players[0][2]);
  totalDealer = resultPlayer(players[1][1] + players[1][2]);

  console.table(players);
  console.log(total1);

  if (totalPlayer == "Blackjack" && totalDealer == "Blackjack") {
    return "It's a draw";
  }

  if (totalPlayer > 21) {
    return "You lose";
  }

  var myOutputValue =
    "Player hand : " +
    players[0][1].name +
    " of " +
    +players[0][1].suit +
    ", " +
    players[0][2].name +
    " of " +
    +players[0][2].suit +
    "<br>" +
    "Dealer hand : " +
    players[1][1].name +
    " of " +
    +players[1][1].suit +
    ", " +
    players[1][2].name +
    " of " +
    +players[1][2].suit;

  return myOutputValue;
};
