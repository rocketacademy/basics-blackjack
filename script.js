var gameMode = "get initial hand";

// gamemodes:
// get initial hand
// player input if hit or stand
// dealer hit or stand
// compare and find winner
// declare winner

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
var comTotal = comCard[0].rank + comCard[1].rank;
var playerTotal = playerCard[0].rank + playerCard[1].rank;

var addCard = function () {
  var newCard = shuffledDeck.pop();
  playerCard.push(newCard); // player adds one deck to card
  var getIndex = playerCard.length - 1;
  console.log(playerCard);
  console.log(getIndex);
  playerTotal += playerCard[getIndex].rank; // player gets new total points
  return playerTotal;
};

var main = function (input) {
  if ((gameMode = "get initial hand")) {
    console.log(playerCard);
    console.log(comCard);
    console.log(playerCard.length);
    gameMode = "player hit or stand";
    console.log(gameMode);
    myOutputValue = `Com had ${comCard[0].name} of ${comCard[0].suit} and ${comCard[1].name} of ${comCard[1].suit}. Player had ${playerCard[0].name} of ${playerCard[0].suit} and ${playerCard[1].name} of ${playerCard[1].suit}. Player, your total score is ${playerTotal}. Enter y to draw another card, otherwise click submit.`;
  }

  if ((gameMode = "player hit or stand")) {
    if (input == "y") {
      addCard();
      console.log(playerCard);
      console.log(comCard);
      console.log(playerCard.length);
      gameMode = "compare winner";
      myOutputValue = `Player, you drew a ${newCard.name} of ${newCard.suit}.`;
    }

    // player does not choose to draw, com evaluates if need to draw another card
    else if (
      (((comCard[0].name == "ace" || comCard[1].name == "ace") &&
        comTotal - 10 < 17) ||
        comTotal < 17) &&
      input == ""
    ) {
      comCard.push(shuffledDeck.pop()); // com adds one deck to card
      var getIndex = comCard.length - 1;
      comTotal += comCard[getIndex].rank; // com gets new total points
      console.log(comTotal);
      console.log(comCard);
      console.log(playerCard);
      gameMode = "compare winner";
      // myOutputValue = `Dealer drew an extra card, ${newCard.name} of ${newCard.suits}. Dealer now has a total of ${comTotal}`;
    }
    gameMode = `compare winner`;
  }

  if ((gameMode = "compare winner")) {
    // compare winner
    console.log(comCard);
    console.log(playerCard);
    var announceWinner = declareWinner(playerTotal, comTotal);
    // myOutputValue += announceWinner;
    return announceWinner;
  }
};

// user wins when (userTotal < 21 && userTotal > comTotal) || comTotal > 21
// determine winner
var declareWinner = function () {
  var myOutputValue = `Computer wins, with a hand of ${comTotal} against your hand of ${playerTotal}!`;
  if (playerTotal == comTotal) {
    myOutputValue = "It's a draw!";
  }
  if ((playerTotal <= 21 && playerTotal > comTotal) || comTotal > 21) {
    myOutputValue = `You win, with a hand of ${playerTotal} against dealer, who has ${comTotal}!`;
    if (playerTotal == 21) {
      myOutputValue = `You win 1.5 times, with a hand of ${playerTotal} against dealer, who has ${comTotal}!`;
    } // win 1.5 times of bet from dealer, user done for that round
  }
  return myOutputValue;
};
