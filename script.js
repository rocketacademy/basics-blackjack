var gameMode = "get initial hand";
var playerScore = 100;

// gamemodes:
// get name
// get initial hand
// player hit or stand
// compare winner

/**
 * Create a standard 52-card deck
 */
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
      var cardRank = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        cardRank = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardRank = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardRank = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardRank = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
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

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */

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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Initialise the shuffled card deck before the game starts.
// var deck = shuffleCards(makeDeck());
var shuffledDeck = shuffleCards(makeDeck());

// each player gets 2 shuffled cards
var comCard = [shuffledDeck.pop(), shuffledDeck.pop()];
var playerCard = [shuffledDeck.pop(), shuffledDeck.pop()];

var playerName = "";
var newPcard = [];
var comTotal = comCard[0].rank + comCard[1].rank;
var playerTotal = playerCard[0].rank + playerCard[1].rank;
var nameStore = [];

var addCard = function () {
  var newCard = shuffledDeck.pop();
  newPcard = newCard;
  playerCard.push(newCard); // player adds one deck to card
  var getIndex = playerCard.length - 1;
  playerTotal += playerCard[getIndex].rank; // player gets new total points
  aceChange(playerCard);
  return playerTotal;
};

var comAdd = function () {
  comCard.push(shuffledDeck.pop()); // com adds one deck to card
  var getIndex = comCard.length - 1;
  comTotal += comCard[getIndex].rank; // com gets new total points
  aceChange(comCard);
  return comTotal;
};

var aceChange = function (input) {
  if (input.length > 2) {
    for (var i in input) {
      if (input[i].name == "ace") {
        input[i].rank = 1;
        break; //Stops loops once found
      }
    }
  }
};

// output all player cards for player to view
var outputPlayerCards = function () {
  var counter = 0;
  myOutputValue = `Your hand: <br>`;
  while (counter < playerCard.length) {
    myOutputValue += `${playerCard[counter].name} of ${playerCard[counter].suit} <br>`;
    counter += 1;
  }
  return myOutputValue;
};

// determine winner
var declareWinner = function () {
  if (playerTotal > 21 && comTotal <= 21) {
    return `Oops, you busted with a hand of ${playerTotal}!`;
  } else if (playerTotal == comTotal) {
    return `You draw with the dealer's hand of ${comTotal}!`;
  } else if (playerTotal == 21 && comTotal !== 21) {
    return `Your hand of ${playerTotal} won! The dealer had a hand of ${comTotal}.`;
  } else if (comTotal == 21 && playerTotal !== 21) {
    return `Your hand of ${playerTotal} lost to the dealer's ${comTotal}!`;
  } else if (playerTotal > comTotal && playerTotal <= 21) {
    return `Congratulations! Your hand of ${playerTotal} beat the dealer's hand of ${comTotal}!`;
  } else if (playerTotal > 21 && comTotal > 21) {
    return `Both parties busted! Your hand: ${playerTotal}. Dealer's hand: ${comTotal}`;
  } else if (playerTotal < comTotal && comTotal > 21) {
    return `The dealer went bust! Your hand of ${playerTotal} beat the dealer's hand of ${comTotal}!`;
  } else if (playerTotal < comTotal && comTotal <= 21) {
    return `Your hand of ${playerTotal} lost to the dealer's hand of ${comTotal}!`;
  } else if (playerTotal < 21 && playerCard.length == 5 && comTotal != 21) {
    return `Congratulations! Your hand of ${playerTotal} beat the dealer's hand of ${comTotal}!`;
  }
};

var main = function (input) {
  if (gameMode == "get initial hand") {
    nameStore.push(input);
    gameMode = "player hit or stand";
    return `Hi ${nameStore[0]}, <br>
    Your cards: <br>
    ${playerCard[0].name} of ${playerCard[0].suit} <br>
    ${playerCard[1].name} of ${playerCard[1].suit} <br> <br>

    Your total score is ${playerTotal}. Enter y to draw another card, otherwise click submit.`;
  }

  if (gameMode == "player hit or stand") {
    if (input == "y" && playerTotal <= 21) {
      addCard();
      console.log(playerCard);
      var showPlayer = outputPlayerCards();
      gameMode = "computer move";
      return `${nameStore[0]}, you drew a ${newPcard.name} of ${newPcard.suit}. <br><br>
      Enter y to draw another card, else click submit to view results. <br>
      ${showPlayer} <br>
      Your new score: ${playerTotal} <br>`;
    } else if (input == "" && playerTotal < 21) {
      gameMode = "computer move";
      return "Computer's move. Click submit";
    } else if (input == "y" && playerTotal > 21) {
      addCard();
      console.log(`compare`);
      console.log(playerTotal);
      gameMode = "compare winner";
    } else if (playerTotal == 21) {
      gameMode = "compare winner";
    }
  }

  // player does not choose to draw, com evaluates if need to draw another card
  if (gameMode == "computer move") {
    while (comTotal < 17) {
      comAdd();
    }
    gameMode = `compare winner`;
  }

  if (gameMode == "compare winner") {
    // compare winner
    console.log(comCard);
    console.log(playerCard);
    var announceWinner = declareWinner(playerTotal, comTotal);
    return announceWinner;
  }
};
