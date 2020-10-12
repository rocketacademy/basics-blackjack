// not my proudest work but this is what i have been able to do in my limited time.

/*Some global variables*/
// Create an array to store the cards that the player has  (player's hand)
var playerCards = [];
// Create an array to store the computer's cards.  (computer's hand)
var computerCards = [];

var gameMode = 0;

/* Card deck generation */
var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];

  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];
    // console.log('current suit : ' + currentSuit);

    // loop to create all cards in this suit
    // rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }

      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // console.log('rank : ' + rankCounter);

      // add the card to the deck
      deck.push(card);

      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }

  return deck;
};

/* choose random card */
function chooseRandomCard(deck) {
  var numOfCardsInDeck = deck.length;
  return deck[Math.floor(Math.random() * numOfCardsInDeck)];
}

/* deal card to a player or computer's array (hand) and store it inside */
function dealCard(deck, hand) {
  hand.push(chooseRandomCard(deck));
}

function dealEveryone(deck) {
  dealCard(deck, playerCards);
  dealCard(deck, computerCards);
}

function dealEveryoneTwice(deck) {
  dealEveryone(deck);
  dealEveryone(deck);
}

// get names of cards in a hand
function namesOfCards(hand) {
  var numOfCards = hand.length;
  var emptyArray = [];
  for (var i = 0; i < numOfCards; i++) {
    emptyArray.push(hand[i].name)
  }
  return emptyArray;
}

// get sums of cards in a hand
function getSumOfCards(hand) {
  var sumOfValues = 0;
  var names = namesOfCards(hand);
  for (var i = 0; i < names.length; i++) {
    var value = 0;
    if (typeof (names[i]) == 'number') {
      value = names[i];
    } else {

      if (names[i] == 'king' || names[i] == 'queen' || names[i] == 'jack') {
        value = 10;
      }

      if (names[i] == 'ace') {
        value = 1;  // for simplicity, we'll just let ace = 1 (rather than let the user choose ace = 11.)
      }

    }

    sumOfValues += value;

  }
  return sumOfValues
}

/* global variables */
// Create a deck of cards
var deckOfCards = makeDeck();

/* THIS IS THE MAIN FUNCTION!!!!!!!!!!! */

function checkWinningCondition() {
  var playerSum = getSumOfCards(playerCards);
  var computerSum = getSumOfCards(computerCards);

  if (playerSum == 21 && computerSum == 21) {
    gameMode = 4;
    return "the player and computer both have sums of 21....i guess everyone wins!!! player sum is  " + playerSum + " and computer sum is " + computerSum + ".... player's hand is " + namesOfCards(playerCards) + " and computer hand is " + namesOfCards(computerCards);
  }

  if (playerSum == 21) {
    gameMode = 4;
    return "the player sum is exactly 21 so the player wins ...player sum is " + playerSum + " and computer sum is " + computerSum + ".... player's hand is " + namesOfCards(playerCards) + " and computer hand is " + namesOfCards(computerCards);
  }

  if (computerSum == 21) {
    gameMode = 4;
    return "the computer sum is exactly 21 so the COMPUTER wins ...player sum is " + playerSum + " and computer sum is " + computerSum + ".... player's hand is " + namesOfCards(playerCards) + " and computer hand is " + namesOfCards(computerCards);
  }

  if (playerSum > 21) {
    gameMode = 4;
    return "player bust...player has " + namesOfCards(playerCards);
  }

  if (computerSum > 21) {
    gameMode = 4;
    return "computer bust ... computer has " + namesOfCards(computerCards);
  } else if (computerSum < 16) {
    dealCard(deckOfCards, computerCards);
    computerSum = getSumOfCards(computerCards);

    if (computerSum > 21) {
      gameMode = 4;
      return "computer bust... computer had to draw one more card ... and now computer has " + namesOfCards(computerCards);
    }

    if (computerSum == 21) {
      gameMode = 4;
      return "the computer sum is exactly 21 so the COMPUTER wins ...player sum is " + playerSum + " and computer sum is " + computerSum + ".... player's hand is " + namesOfCards(playerCards) + " and computer hand is " + namesOfCards(computerCards);
    }

    if (playerSum > computerSum) {
      gameMode = 4;
      return "Computer has had to draw one more card because its sum was less than 16, now its hand is " + namesOfCards(computerCards) + " ....player wins...player sum is " + playerSum + " and computer sum is " + computerSum;
    } else if (playerSum == computerSum) {
      return "Computer has had to draw one more card because its sum was less than 16, now its hand is " + namesOfCards(computerCards) + " ...IT'S A TIE!!!!...player sum is " + playerSum + " and computer sum is " + computerSum;
    } else return "Computer has had to draw one more card because its sum was less than 16, now it's hand is " + namesOfCards(computerCards) + " ....COMPUTER WINS!!!...player sum is " + playerSum + " and computer sum is " + computerSum;


  }

  if (playerSum > computerSum) {
    gameMode = 4;
    return "player wins...player sum is " + playerSum + " and computer sum is " + computerSum + ".... player's hand is " + namesOfCards(playerCards) + " and computer hand is " + namesOfCards(computerCards);
  } else if (playerSum == computerSum) {
    return "IT'S A TIE!!!!....player sum is " + playerSum + " and computer sum is " + computerSum + "...player's hand is " + namesOfCards(playerCards) + " and computer hand is " + namesOfCards(computerCards) + ".....type hit or stay!";
  } else {
    gameMode = 4;
    return "computer wins....player sum is " + playerSum + " and computer sum is " + computerSum + "...player's hand is " + namesOfCards(playerCards) + " and computer hand is " + namesOfCards(computerCards);
  }
}

var main = function (input) {


  if (gameMode == 0) {

    // deal everyone two cards
    dealEveryoneTwice(deckOfCards);

    gameMode += 1

    return "Everyone has been dealt two cards! Click submit to analyze!"

  }

  // Initial check for winning condition

  if (gameMode == 1) {

    var playerSum = getSumOfCards(playerCards);
    var computerSum = getSumOfCards(computerCards);

    if (computerSum == 21) {
      gameMode = 4;
      return "the dealer WINS ,because his hand sum >21"
    }

    if (computerSum > 21) {
      gameMode = 4;
      return "the dealer busts ,because his hand sum >21"
    }

    if (playerSum == 21) {
      var myOutputValue = "user wins since player's hand sums to 21";
      gameMode = 4
      return myOutputValue;
    }

    else if (playerSum > 21) {
      gameMode = 4;
      return "player bust since player's hand's sum exceeds 21";
    }

    else {
      gameMode += 1;
      return "the player didn't bust nor win...let's continue playing...type hit to get a card, or type stay...player has " + namesOfCards(playerCards) + " and the computer has (although you are not supposed to know this ! ) " + namesOfCards(computerCards);
    }

  }

  //Hit card or stay.

  if (gameMode == 2) {

    if (input == 'hit') {
      dealCard(deckOfCards, playerCards);

      return "player has been dealt one more card ..." + checkWinningCondition();

    }

    if (input == "stay") {

      return "player has chosen to stay .... " + checkWinningCondition();

    }

  }

  // End of game. User is prompted to refresh.

  if (gameMode == 4) {
    return "End of game, refresh page to play again..."
  }

}




/* testing area */


//main(1);

//console.log(deckOfCards)

/*
console.log(deckOfCards);

//console.log(chooseRandomCard(deckOfCards));
dealCard(deckOfCards, playerCards);
dealCard(deckOfCards, playerCards);

console.log(playerCards);

console.log(namesOfCards(playerCards))
//console.log(namesOfCards(playerCards));

console.log(getSumOfCards(playerCards));
*/