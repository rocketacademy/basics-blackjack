var cardDeck = [];

var makeDeck = function () {
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

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

var main = function (input) {
  var myOutputValue = "";
  //A deck of cards.
  var shuffledCardDeck = shuffleCards(makeDeck());
  //A starting hand of 2 cards for each player.
  var dealerCard1 = shuffledCardDeck.pop();
  var playerCard1 = shuffledCardDeck.pop();
  var dealerCard2 = shuffledCardDeck.pop();
  var playerCard2 = shuffledCardDeck.pop();
  //print cards
  var printCards =
    "Dealer cards are: " +
    dealerCard1.name +
    dealerCard1.suit +
    " and " +
    dealerCard2.name +
    dealerCard2.suit +
    "<br>Player cards are: " +
    playerCard1.name +
    playerCard1.suit +
    " and " +
    playerCard2.name +
    playerCard2.suit;
  //A tie. When both the player and dealer have the same total hand values - or if both draw Blackjack
  if (
    dealerCard1.rank + dealerCard2.rank ==
    playerCard1.rank + playerCard2.rank
  ) {
    myOutputValue = printCards + "<br>Its a tie!";
  } //A Blackjack win. When either player or dealer draw Blackjack
  else if (dealerCard1.rank + dealerCard2.rank == 21) {
    myOutputValue = printCards + "<br>Dealer wins by blackjack.";
  } else if (playerCard1.rank + playerCard2.rank == 21) {
    myOutputValue = printCards + "<br>Player wins by blackjack.";
  } //A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.
  else if (
    dealerCard1.rank + dealerCard2.rank >
    playerCard1.rank + playerCard2.rank
  ) {
    myOutputValue = printCards + "<br>Dealer wins.";
  } else if (
    playerCard1.rank + playerCard2.rank >
    dealerCard1.rank + dealerCard2.rank
  ) {
    myOutputValue = printCards + "<br>Player wins.";
  }

  return myOutputValue;
};
