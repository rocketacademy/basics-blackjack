// Main function:
var main = function (input) {
  var shuffledDeck = shuffleCards(deck);
  console.log(shuffledDeck);

  var numberOfCards = 0;
  var playerInput = input;
  var playerArray = [];
  var computerArray = [];

  myOutputValue = `You drew: `;

  while (playerInput > numberOfCards) {
    var computerCard = shuffledDeck.pop();
    console.log(`Com's card: ${computerCard.name} of ${computerCard.suit}`);
    var playerCard = shuffledDeck.pop();
    console.log(`Player card: ${playerCard.name} of ${playerCard.suit}`);

    // var myOutputValue = `You win!<br>You drew ${playerCard.name} of ${playerCard.suit} and <br>the Computer drew ${computerCard.name} of ${computerCard.suit}.`;

    playerArray.push(playerCard.rank);
    console.log(playerArray);

    computerArray.push(computerCard.rank);
    console.log(computerArray);

    myOutputValue =
      myOutputValue + `${playerCard.name} of ${playerCard.suit} and `;

    numberOfCards = numberOfCards + 1;
  }

  Array.min = function (playerArray) {
    return Math.min.apply(Math, playerArray);
  };

  var minimumPlayerCard = Array.min(playerArray);
  console.log(minimumPlayerCard);

  Array.min = function (computerArray) {
    return Math.min.apply(Math, computerArray);
  };

  var minimumComputerCard = Array.min(computerArray);
  console.log(minimumComputerCard);

  if (minimumPlayerCard < minimumComputerCard) {
    myOutputValue = `You win!<br>You drew ${playerCard.name} of ${playerCard.suit} and <br>the Computer drew ${computerCard.name} of ${computerCard.suit}.`;
  } else {
    myOutputValue = `You lose!<br>You drew ${playerCard.name} of ${playerCard.suit} and <br>the Computer drew ${computerCard.name} of ${computerCard.suit}.`;
  }

  // var computerCard = shuffledDeck.pop();
  // console.log(`Com's card: ${computerCard.name} of ${computerCard.suit}`);
  // var playerCard = shuffledDeck.pop();
  // console.log(`Player card: ${playerCard.name} of ${playerCard.suit}`);

  // var myOutputValue = `You win!<br>You drew ${playerCard.name} of ${playerCard.suit} and <br>the Computer drew ${computerCard.name} of ${computerCard.suit}.`;

  // if (computerCard.rank < playerCard.rank) {
  //   myOutputValue = `You lose!<br>You drew ${playerCard.name} of ${playerCard.suit} and <br>the Computer drew ${computerCard.name} of ${computerCard.suit}.`;
  // }

  // if (playerCard.name == "Queen") {
  //   myOutputValue = `You win! <br>You drew ${playerCard.name} of ${playerCard.suit} and <br>the Computer drew ${computerCard.name} of ${computerCard.suit}.`;
  // }

  // if (computerCard.name == "Queen") {
  //   myOutputValue = `The computer wins! <br>You drew ${playerCard.name} of ${playerCard.suit} and <br>the Computer drew ${computerCard.name} of ${computerCard.suit}.`;
  // }

  return myOutputValue;
};

// Function to shuffle cards:
var shuffleCards = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];

    cards[index] = randomItem;
    cards[randomIndex] = currentItem;

    index = index + 1;
  }

  return cards;
};

// To generate random numbers/ cards:
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Card Deck:
var makeDeck = function () {
  // Initialise an empty deck array
  var deck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts ♥️", "Diamonds ♦️", "Clubs ♣️", "Spades ♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    console.log(`current suit: ${currentSuit}`);

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      deck.push(card);
      console.log(`rank: ${rankCounter}`);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return deck;
};

var deck = makeDeck();
