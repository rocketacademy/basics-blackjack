//Generate 52 cards
var cardDeck = [];

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

      var valueOfCard = rankCounter;

      if (valueOfCard == 11 || valueOfCard == 12 || valueOfCard == 13) {
        valueOfCard = 10;
      } else if (valueOfCard == 1) {
        valueOfCard = 11;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: valueOfCard,
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

//Shuffle the cards
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
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

var deck2 = makeDeck();
console.log(deck2);
var shuffledDeck = shuffleCards(deck2);

//Global variable
var playerCardArray = [];
var dealerCardArray = [];

var playerScore = 0;
var dealerScore = 0;

var dealCards = function () {
  var cardsNeeded = 2;
  while (playerCardArray.length < cardsNeeded) {
    playerCardArray.push(shuffledDeck.pop());
  }
  while (dealerCardArray.length < cardsNeeded) {
    dealerCardArray.push(shuffledDeck.pop());
  }
  console.log("initial player card array");
  console.log(playerCardArray);
  console.log("initial dealer card array");
  console.log(dealerCardArray);

  if (dealerScore > 21 && playerScore > 21) {
    return "dealer bust, but no winner since you busted";
  }

  if (dealerScore > 21) {
    return "player win";
  }

  if (playerScore > 21) {
    return "dealer win";
  }

  if (dealerScore == 21 && playerScore == 21) {
    return "dealer win even though you got Blackjack";
  }

  if (dealerScore == 21) {
    return "dealer win";
  }

  if (playerScore == 21) {
    return "player win";
  }
};

var sumUpScore = function (cardArray) {
  var total = 0;
  var counter = 0;
  while (counter < cardArray.length) {
    total += cardArray[counter].value;
    counter += 1;
  }
  return total;
};

// var immediateGameEnd = function () {
//   if (dealerScore > 21 && playerScore > 21) {
//     return "dealer bust, but no winner since you busted";
//   }

//   if (dealerScore > 21) {
//     return "player win";
//   }

//   if (playerScore > 21) {
//     return "dealer win";
//   }

//   if (dealerScore == 21 && playerScore == 21) {
//     return "dealer win even though you got Blackjack";
//   }

//   if (dealerScore == 21) {
//     return "dealer win";
//   }

//   if (playerScore == 21) {
//     return "player win";
//   }
// };

var drawCard = function () {
  playerCardArray.push(shuffledDeck.pop());
  playerScore = sumUpScore(playerCardArray);
};

var gameState = "hitOrStand";

//create a function looping thru the multiple cards

var cardsDrawnInGame = function (cardArray) {
  var countOfCardsDrawn = 0;
  var cardsDrawn = "";
  while (countOfCardsDrawn < cardArray.length) {
    cardsDrawn += cardArray[countOfCardsDrawn][value];
    // cardsDrawn += `${cardArray[countOfCardsDrawn][value]} `;
    countOfCardsDrawn += 1;
  }
  return cardsDrawn;
};

//gameOutcome

var gameOutcome = function () {
  if (sumUpScore(playerCardArray) > 21) {
    return "player bust, score greater than 21";
  }

  if (sumUpScore(dealerCardArray) > sumUpScore(playerCardArray)) {
    return "you lose";
  }
  if (sumUpScore(playerCardArray) > sumUpScore(dealerCardArray)) {
    return "you win. Please refresh and try again";
  }
};

//Main function

var main = function (input) {
  dealCards();

  var dealerScore = sumUpScore(dealerCardArray);
  var playerScore = sumUpScore(playerCardArray);

  while (dealerScore < 17) {
    dealerCardArray.push(shuffledDeck.pop());
    dealerScore = sumUpScore(dealerCardArray);
    if (dealerScore == 21) {
      return "dealer blackjack!";
    }
    if (dealerScore > 21) {
      return "dealer bust";
    }
  }

  // immediateGameEnd();

  if (gameState == "hitOrStand") {
    while (input != "hit" || input != "stand") {
      if (input == "hit") {
        drawCard();
        return (
          "you drew a " + playerCardArray[playerCardArray.length - 1].value
        );
      }
      if (input == "stand") {
        gameState = "compareHands";
        return "time to compare hands";
        // return `time to compare hands. You drew ${cardsDrawnInGame(
        //   playerCardArray
        // )}, the Dealer drew ${cardsDrawnInGame(dealerCardArray)}`;
      }
      return "please enter either hit or stand";
    }
  } else if (gameState == "compareHands") {
    if (sumUpScore(playerCardArray) > 21) {
      return "player bust";
    }
    if (sumUpScore(dealerCardArray) < sumUpScore(playerCardArray)) {
      return "you win";
    }
    if (sumUpScore(playerCardArray) < sumUpScore(dealerCardArray)) {
      return "you lose. Please refresh and try again";
    }
  }
};

// window.reload() -> go and search up how it works

// var myOutputValue = "hello world";
// return myOutputValue;
// };

/* 
// Low Card with Queen Winner
var main = function (input) {
  // Draw 2 cards from the top of the deck
  var computerCard = shuffledDeck.pop();
  var playerCard = shuffledDeck.pop();
​
  // Construct an output string to communicate which cards were drawn
  var myOutputValue =
    "Computer had " +
    computerCard.name +
    " of " +
    computerCard.suit +
    ". Player had " +
    playerCard.name +
    " of " +
    playerCard.suit +
    ". ";
​
  // Compare computer and player cards by rank attribute
  // If computer card rank is greater than player card rank, computer wins
  if (computerCard.rank == 12 && playerCard.rank == 12) {
    myOutputValue = myOutputValue + "It's a tie.";
  } else if (playerCard.rank == 12) {
    myOutputValue = myOutputValue + "Player wins!";
  } else if (computerCard.rank == 12) {
    myOutputValue = myOutputValue + "Computer wins.";
  } else {
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
  }
​
  // Return the fully-constructed output string
  return myOutputValue;
}; */

// gameState 0 = input number of cards
// gameState 1 = comparing lowest card with computer card

// var gameState = 0;
// var playerCardArray = [];
// var numOfCards = 0;
// //Low Card Hands
// var main = function (input) {
//   if (gameState == 0) {
//     numOfCards = input;
//     gameState = 1;
//     return `Click submit to see the cards you have drawn!`;
//   }

//   if (gameState == 1) {
//     var count = 0;
//     var outputResult = "";
//     var lowestNumber = 0;
//     while (count < numOfCards) {
//       var playerCard = shuffledDeck.pop();
//       playerCardArray.push(playerCard);
//       if (count == 0) {
//         lowestNumber = playerCardArray[count].rank;
//       } else {
