var cardDeck = [];
var playerHand = [];
var computerHand = [];

const DEAL_INITIAL_HANDS_MODE = "DEAL_INITIAL_HANDS_MODE";
const HIT_OR_STAND_MODE = "HIT_OR_STAND_MODE";
const COMPUTER_TURN_MODE = "COMPUTER_TURN_MODE";

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

const getRankCount = function (blackjackHand) {
  var getCurrentRankCount = 0;

  for (const card of blackjackHand) {
    getCurrentRankCount += card.blackjackRank;
  }

  return getCurrentRankCount;
};

const printHand = function (blackjackHand) {
  var stringOfHand = "Your hand is currently: ";

  for (const card of blackjackHand) {
    stringOfHand += `${card.name} of ${card.suit} `;
  }

  return stringOfHand;
};

const DisplaysResults = function (playerHand, computerHand) {
  if (getRankCount(playerHand) > 21) {
    return `boom, you loser`
  } else if (getRankCount(playerHand) === getRankCount(computerHand)) {
    return `you did not win, you drawer`
  } else if (getRankCount(playerHand) > getRankCount(computerHand)) {
    return `awesome, you won!`
  } else {
    return `you lost, sucka`
  }
}

var main = function (input) {
  var myOutputValue = "something is wrong";

  if (currentGameMode === DEAL_INITIAL_HANDS_MODE) {
    playerHand.push(cardDeck.pop());
    computerHand.push(cardDeck.pop());

    playerHand.push(cardDeck.pop());

    if (isBlackjack(playerHand)) {
      return `Sick, you got blackjack with ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}. Computer's face-up first card is ${computerHand[0].name} of ${computerHand[0].suit}.`;
    } else currentGameMode = HIT_OR_STAND_MODE;

    myOutputValue = `Player was dealt ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}. Computer's face-up first card is ${computerHand[0].name} of ${computerHand[0].suit}. Please select hit or stand by typing it.`;
    return myOutputValue;
  }

  if (currentGameMode === HIT_OR_STAND_MODE) {
    
    if (input.toLowerCase() === "hit") {
      playerHand.push(cardDeck.pop());

      if (getRankCount(playerHand) > 21) {
        for (card of playerHand) {
          if (card.blackjackRank === 11) {
            card.blackjackRank = 1
          }
          break
        }
      }

      console.log(printHand(playerHand), 'hellooo');
      console.log(getRankCount(playerHand), 'dfrdgdfr');

      if (getRankCount(playerHand) > 21) {
        return DisplaysResults(playerHand, computerHand)
      }
      return (printHand(playerHand) + "computer" + printHand(computerHand))
    } else if (input.toLowerCase() === "stand") {
      currentGameMode = COMPUTER_TURN_MODE;
      return `it's the computer's turn now`
    } else {
      return `enter hit or stand`
    }
  }
  
  if (currentGameMode === COMPUTER_TURN_MODE) {
    computerHand.push(cardDeck.pop());
    if (isBlackjack(computerHand)) {
      return `Computer wins with ${printHand(computerHand)}`
    }

    while (getRankCount(computerHand) < 17) {
      computerHand.push(cardDeck.pop());
      if (getRankCount(computerHand) > 21) {
        for (card of computerHand) {
          if (card.blackjackRank === 11) {
            card.blackjackRank = 1
          }
          break
        }
      }
    }
  }

  return DisplaysResults(playerHand, computerHand)
}
