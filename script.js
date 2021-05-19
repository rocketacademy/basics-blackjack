var cardDeck = [];
var playerHand = [];
var computerHand = [];

const DEAL_INITIAL_HANDS_MODE = "DEAL_INITIAL_HANDS_MODE";
const HIT_OR_STAND_MODE = "HIT_OR_STAND_MODE";

var currentGameMode = DEAL_INITIAL_HANDS_MODE;

var makeDeck = function () {
  // Initialise an empty deck array
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
      var blackjackRank = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === 1) {
        cardName = "ace";
        blackjackRank = 11;
      } else if (cardName === 11) {
        cardName = "jack";
        blackjackRank = 10;
      } else if (cardName === 12) {
        cardName = "queen";
        blackjackRank = 10;
      } else if (cardName === 13) {
        cardName = "king";
        blackjackRank = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        blackjackRank: blackjackRank,
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

makeDeck();
shuffleCards(cardDeck);
console.log(cardDeck);

const isBlackjack = function (blackjackHand) {
  if (blackjackHand[0].blackjackRank + blackjackHand[1].blackjackRank === 21) {
    return true;
  }
};

const isBusto = function (blackjackHand) {
  var handTotalRank = 0;
  // for(var i=0; i < blackjackHand.length; i++) {
  //   handTotalRank += blackjackHand[i].blackjackRank
  // }

  for (const card of blackjackHand) {
    handTotalRank += card.blackjackRank;
  }

  if (handTotalRank > 21) {
    console.log(`${handTotalRank} busted you`);

    return true;
  }
  return false;
};

const printHand = function (blackjackHand) {
  var stringOfHand = "Your hand is currently: ";

  for (const card of blackjackHand) {
    stringOfHand += `${card.name} of ${card.suit} `;
  }
  console.log(stringOfHand);
};

var main = function (input) {
  var myOutputValue = "something is wrong";

  if (currentGameMode === DEAL_INITIAL_HANDS_MODE) {
    playerHand.push(cardDeck.pop());
    computerHand.push(cardDeck.pop());

    playerHand.push(cardDeck.pop());
    computerHand.push(cardDeck.pop());

    console.log(playerHand);
    console.log(computerHand);

    if (isBlackjack(playerHand)) {
      return `Sick, you got blackjack with ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}. Computer's face-up first card is ${computerHand[0].name} of ${computerHand[1].suit}.`;
    } else currentGameMode = HIT_OR_STAND_MODE;

    myOutputValue = `Player was dealt ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}. Computer's face-up first card is ${computerHand[0].name} of ${computerHand[1].suit}. Please select hit or stand by typing it.`;
    return myOutputValue;
  }

  if (currentGameMode === HIT_OR_STAND_MODE) {
    if (input.toLowerCase() === "hit") {
      playerHand.push(cardDeck.pop());

      console.log(printHand(playerHand));
      console.log(isBusto(playerHand));

      myOutputValue = `You were dealt ${
        playerHand[playerHand.length - 1].name
      } of ${playerHand[playerHand.length - 1].suit}`;
    }

    if (input.toLowerCase() === "stand") {
    }
  }
  return myOutputValue;
};
