// 1. Produce the Deck with a click.
// 2. Deal 2 cards to each player. This runs the function to draw a card <drawOneCard> 4 times. Each time it runs, the card's 'value' should be pushed into their hand. Show cards to Player.
//________________
// 3. Allow player to 'Hit' or 'Pass'
// 4. If 'Hit', run <drawOneCard> and add its 'rank' to the player's hand array. Do this as many times as the player wants until player types 'Pass' or 'Fold'.
// 5. -----
// 6. If 'Pass', move to Computer's Turn.
//________________
// 7. Sum up 'values' in Computer's array. If below 17, run <drawOneCard> again. Sum up 'values' again. This time if above 17, switch a mode to stop running of WHILE loop.
// 8. Run comparison mode. Compare <sumOfComputer> against <sumOfPlayer>. Higher is the winner.
//_____________________________________________________________________________________
// Generates a full 52 card Deck
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
        rank = 1;
      } else if (cardName == 11) {
        cardName = "jack";
        rank = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        rank = 10;
      } else if (cardName == 13) {
        cardName = "king";
        rank = 10;
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardName,
        true: cardName + " of " + currentSuit,
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
// Global Variables
var computerHand = []; // collection of 'value' keys collected from drawn cards.
var computerSum = [];
var playerHand = []; // collection of 'value' keys collected from drawn cards.
var playerSum = [];
var createdDeck = makeDeck();
var initialMode = true;
var hitMode = false;
var computerMode = false;
var declareMode = false;
var discardNumberPile = [];
var deckDealNumber = 0;
var playerTotalSum = 0;
var computerTotalSum = 0;

// Makes a random number. Returns random number
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//Shuffle elements in the cardDeck array. Return the shuffled deck.
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

var deck = shuffleCards(makeDeck());

// Deals a single card to an array. These two functions must run in this sequence(Rank>True)
var dealACardRank = function (selectedArray) {
  var rankPush = deck[deckDealNumber].rank;
  if (rankPush > 10) {
    rankPush = 10;
  }
  selectedArray.push(rankPush);
  return selectedArray;
};
var dealACardTrue = function (selectedArray) {
  selectedArray.push(deck[deckDealNumber].true);
  deckDealNumber++;
  return selectedArray;
}; //_______________________________________________

// Adds up total sum of player's ranks
var sumOfPlayer = function () {
  var counter = 0;
  while (counter < playerSum.length) {
    playerTotalSum = playerTotalSum + playerSum[counter];
    counter++;
  }
  return playerTotalSum;
};

// Adds up total sum of computer's ranks
var sumOfComputer = function () {
  var counter = 0;
  while (counter < computerSum.length) {
    computerTotalSum = computerTotalSum + computerSum[counter];
    counter++;
  }
  return computerTotalSum;
};

// Main function that will run through modes. Each Mode will progress through either a click, or a word.
var main = function (input) {
  var myOutputValue = "Instructions not followed. Error";
  if (declareMode == true) {
    var playerFinalSum = sumOfPlayer();
    var computerFinalSum = sumOfComputer();
    if (computerFinalSum > 21) {
      myOutputValue = "Computer has gone bust! Win!";
      declareMode = false;
    }
    if (playerFinalSum > 21 || computerFinalSum > 21) {
      myOutputValue = "Draw! Both players have gone bust";
      declareMode = false;
    }
    if (playerFinalSum > 21) {
      myOutputValue = "Player has gone bust! Loss!";
      declareMode = false;
    }
  }

  if (hitMode == true) {
    if (input == "Hit") {
      dealACardRank(playerSum);
      dealACardTrue(playerHand);
      var hitCounter = 1;
      hitCounter++;
      myOutputValue =
        "You draw a card.. <br><br>Your cards are: " +
        playerHand +
        "<br><br>Enter Hit or Pass";
    }

    if (input == "Pass") {
      var comSum = sumOfComputer();
      console.log("comSum1: " + comSum);
      if (comSum < 15) {
        dealACardRank(computerSum);
        dealACardTrue(computerHand);
        comSum = sumOfComputer();
        console.log("comSum2: " + comSum);
        if (comSum < 15) {
          dealACardRank(computerSum);
          dealACardTrue(computerHand);
          comSum = sumOfComputer();
          console.log("comSum3: " + comSum);
          if (comSum < 15) {
            dealACardRank(computerSum);
            dealACardTrue(computerHand);
            comSum = sumOfComputer();
            console.log("comSum4: " + comSum);
          }
        }
      }

      myOutputValue =
        "Computer has made his card decisions. Click submit to see the winner!";
      hitMode = false;
      declareMode = true;
    }
  }
  if (initialMode == true) {
    var pFirst = dealACardRank(playerSum);
    dealACardTrue(playerHand);
    var pSecond = dealACardRank(playerSum);
    dealACardTrue(playerHand);
    var comFirst = dealACardRank(computerSum);
    dealACardTrue(computerHand);
    var comSecond = dealACardRank(computerSum);
    dealACardTrue(computerHand);
    console.log(computerHand);
    myOutputValue =
      "Both players have drawn cards. <br><br>Your cards are: " +
      playerHand +
      "<br><br>Now enter Hit or Pass";
    if (pFirst == 1 && pSecond == 10) {
      myOutputValue = "BlackJack!";
    }
    if (pFirst == 10 && pSecond == 1) {
      myOutputValue = "BlackJack!";
    }
    if (comFirst == 1 && comSecond == 10) {
      myOutputValue = "Computer BlackJack!";
    }
    if (comFirst == 10 && comSecond == 1) {
      myOutputValue = "Computer BlackJack!";
    }
    initialMode = false;
    hitMode = true;
  }
  return myOutputValue;
};
