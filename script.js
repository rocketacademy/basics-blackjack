var gameMode = 1 //Get initial hand

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    var cardValue = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
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
var deck = [];
var shuffledDeck = shuffleCards(deck);

// initialising variables
var shuffledDeck = shuffleCards(makeDeck());
var playerHand = [];
var computerHand = [];
var blackJackLimit = 21;
var computerHitTill = 16;
var drawCounter = 0;

var initialDraw = function () {
  while (drawCounter < 2) {
    playerHand.push(shuffledDeck.pop());
    computerHand.push(shuffledDeck.pop());
    drawCounter += 1;
  }
};

//hit function
var getAdditionalCard = function (hand) {
  var cardToPush = shuffledDeck.pop();
  hand.push(cardToPush);
};

//do the following for all the cards in hand
//if rank of cards between 2 to 10, add the rank to score
//if rank of cards = 11, 12, 13, add 10 to score
//if rank = 1, add 11 unless total sum > 21. then add 1
var getHandSum = function (hand) {
  var handSum = 0;
  var handIndex = 0;
  while (handIndex < hand.length) {
    var currCard = hand[handIndex];
    if (currCard.rank >= 2 && currCard.rank <= 10) {
      handSum = handSum + currCard.rank;
    } else if (currCard.rank > 10) {
      handSum = handSum + 10;
    } else if (currCard.rank = 1) {
      if (handSum >= 11) {
        handSum = handSum + 1;
      } else {
        handSum = handSum + 11;
      }
    }
    handIndex += 1
  }
  return handSum;
};


var main = function (input) {
  var myOutputValue = "";
  if (gameMode == 1) {
    initialDraw();
    console.log("Player Initial Hand: " + playerHand[0].rank + "," + playerHand[1].rank);
    console.log("Computer Initial Hand: " + computerHand[0].rank + "," + computerHand[1].rank);
    var playerHandSum = getHandSum(playerHand);
    var computerHandSum = getHandSum(computerHand);
    //if computer hand sum < 17, hit with additional card
    while (computerHandSum < 17) {
      getAdditionalCard(computerHand);
      computerHandSum = getHandSum(computerHand);
      console.log("Computer Final Hand: " + computerHandSum)
    };
    myOutputValue = "You were dealt " + playerHand[0].name + " of " + playerHand[0].suit + " and " + playerHand[1].name + " of " + playerHand[1].suit + ". Your current score is " + playerHandSum + ". Please type hit to draw additional card.";
    console.log(gameMode);
    gameMode = 2;
    return myOutputValue;
    // switch game mode to let player decide if want to hit or stand
  };
  //Player to decide whether to hit or stand
  if (gameMode == 2) {
    if (input == "hit") {
      getAdditionalCard(playerHand);
      console.log("Additional card: " + playerHand[playerHand.length - 1].rank);
      playerHandSum = getHandSum(playerHand);
      console.log("Player's Hand: " + playerHandSum);
      
      if (playerHandSum > blackJackLimit) {
        myOutputValue = "You drew " + playerHand[playerHand.length - 1].name + " of " + playerHand[playerHand.length - 1].suit + ". Your current score is " + playerHandSum + ". You bust!"
        return myOutputValue
      }
      else {
      } myOutputValue = "You drew " + playerHand[playerHand.length - 1].name + " of " + playerHand[playerHand.length - 1].suit + ". Your current score is " + playerHandSum + ". Please type hit to draw another additional card. If not, please hit submit.";
      return myOutputValue
    } else if (input != "hit") {
      gameMode = 3; 
    }
  }
  // Comparing scores:
  if (gameMode == 3) {
    console.log(gameMode)
    playerHandSum = getHandSum(playerHand)
    computerHandSum = getHandSum(computerHand)
    if (playerHandSum > blackJackLimit) {// if player > 21, player loses
      myOutputValue = "You bust! Your total hand is " + playerHandSum + ". Try again.";
    } else if (computerHandSum > blackJackLimit) {// else if computer > 21, computer loses
      myOutputValue = "Dealer bust! Dealer's total hand is " + computerHandSum + ". You won!";
    } else if (computerHandSum > playerHandSum) {
      myOutputValue = "You lost! Dealer's total hand is " + computerHandSum + ". Your total hand is " + playerHandSum + ".";
    } else if (playerHandSum > computerHandSum) {
      myOutputValue = " You won! Dealer's total hand is " + computerHandSum + ". Your total hand is " + playerHandSum + ".";
    } else if (playerHandSum == computerHandSum) {
      myOutputValue = "It's a draw. Dealer's total hand is " + computerHandSum + ".";
     
    }

    return myOutputValue
  }

}

