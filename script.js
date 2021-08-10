var main = function (input) {
  //create a deck
  var deck = makeDeck();
  //shuffle the deck
  var shuffledDeck = shuffleCards(deck);
  // //pick out one card from the deck
  // var cardDrawn = shuffledDeck.pop();
  // pick out 1 card for player
  var playerCard = shuffledDeck.pop();
  //player input number of cards he/she wants
  if ((input = "")) {
    return "Please enter a number of cards to draw.";
  }
  var numCardsToDraw = Number(input);
  var playerCards = [];
  // cards are drawn

  var counter = 0;
  while (counter < numCardsToDraw) {
    //take a card out of shuffled deck and put into player hands
    var currentCard = shuffledDeck.pop();
    playerCards.push(currentCard);
    counter += 1;
  }
  var lowestCard = playerCards[0];
  var counterOne = 0;
  while (counter < playerCards.length) {
    if (currentCard) counterOne += 1;
  }
  // player's cards are compared to choose the lowest

  //show player all cards drawn

  // pick out 1 card for computer
  var computerCard = shuffledDeck.pop();
  //compare the 2 cards drawn, the lower rank is the winner
  console.log(playerCard, computerCard);
  // if any card is queen(12), will win
  // return the winner
  if (playerCard.rank == 12) {
    return "Player wins!";
  }
  if (computerCard.rank == 12) {
    return "Computer wins!";
  }
  if (playerCard.rank < computerCard.rank) {
    return "Player wins!";
  } else if (playerCard.rank > computerCard.rank) {
    return "Computer wins!";
  }
  return "Its a tie!";
  //low card hands
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

//Card shuffling

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

// Initialise the card deck representation as an array of objects
var deck = [
  // card1,
  // card2,
  // ...
];

//High Card Game
// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(deck);

var lowCard = function () {
  // Draw 2 cards from the top of the deck
  var computerCard = shuffledDeck.pop();
  console.log(computerCard);
  var playerCard = shuffledDeck.pop();

  // Construct an output string to communicate which cards were drawn
  var myOutputValue = `Computer had ${computerCard.name} of ${computerCard.suit}. Player had ${playerCard.name} of ${playerCard.suit}. `;

  // Compare computer and player cards by rank attribute
  // If computer card rank is greater than player card rank, computer wins
  if (computerCard.rank < playerCard.rank) {
    // Add conditional-dependent text to the output string
    myOutputValue = myOutputValue + "Computer wins.";
    // Else if computer card rank is less than player card rank, player wins
  } else if (computerCard.rank > playerCard.rank) {
    myOutputValue = myOutputValue + "Player wins!";
    // Otherwise (i.e. ranks are equal), it's a tie
  } else {
    myOutputValue = myOutputValue + "It's a tie.";
  }

  // Return the fully-constructed output string
  return myOutputValue;
};
