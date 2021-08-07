var hitOrStand = "Ask player to hit or stand.";
var startDealing = "shuffle cards and start dealing";
var gameMode = startDealing;

var main = function (input) {
  var myOutputValue = "hello world, this msg should not appear";

  //start a fresh game and deal cards
  if (gameMode == startDealing) {
    //generate player and computer hands
    playerHand = generateHand(playingDeck);
    computerHand = generateHand(playingDeck);
    console.log("P: ", playerHand, " C: ", computerHand);
    //generate new sum
    sumOfPlayerHand = totalSumOfHand(playerHand);
    sumOfComputerHand = totalSumOfHand(computerHand);
    //START GAME

    //anyone gets a blackjack
    if (sumOfPlayerHand == 21 || sumOfComputerHand == 21) {
      blackjack(sumOfPlayerHand, sumOfComputerHand);
      //if no one gets a blackjack; ask to hit or stand
    } else {
      gameMode = hitOrStand;
      myOutputValue = `Player drew: ${displayHand(
        playerHand
      )} Total is: ${sumOfPlayerHand}.<br><br> Do you want to hit or stand? (Please enter hit/stand)`;
      return myOutputValue;
    }
  } else if (gameMode == hitOrStand) {
    //if player decides to hit
    if (input == "hit") {
      //deal one card
      playerHand.push(playingDeck.pop());
      sumOfPlayerHand = totalSumOfHand(playerHand); //is this necessary?
      //player's hand doesnt hit 21
      if (sumOfPlayerHand < 21) {
        myOutputValue = `Player drew: ${displayHand(
          playerHand
        )} Total is: ${sumOfPlayerHand}. <br><br>Do you want to hit again? (Please input hit/stand)`;
        //player's hand hits 21
      } else if (sumOfPlayerHand == 21) {
        myOutputValue = `Player drew: ${displayHand(
          playerHand
        )} Total is: ${sumOfPlayerHand}. Player wins! <br><br>Hit Submit to start dealing again.`;
        gameMode = startDealing;
      } else if (sumOfPlayerHand > 21) {
        myOutputValue = `Player drew: ${displayHand(
          playerHand
        )} Total is: ${sumOfPlayerHand}. Bao! (i.e. it's a bust!) <br> Computer drew: ${displayHand(
          computerHand
        )}.<br>Total is: ${sumOfComputerHand}.<br> Computer Wins! <br><br>Hit Submit to start dealing again.`;
        gameMode = startDealing;
      }
      console.log(gameMode);

      return myOutputValue;
      //if player decides to stand
    } else if (input == "stand") {
      //compare with computer hand
      if (sumOfComputerHand < 21) {
        if (sumOfComputerHand > sumOfPlayerHand) {
          myOutputValue = `Player drew: ${displayHand(
            playerHand
          )}. Total is: ${sumOfPlayerHand}. <br> Computer drew: ${displayHand(
            computerHand
          )}. Total is: ${sumOfComputerHand}.<br> Computer Wins! <br><br>Hit Submit to start dealing again.`;
        } else if (sumOfComputerHand < sumOfPlayerHand) {
          myOutputValue = `Player drew: ${displayHand(
            playerHand
          )}. Total is: ${sumOfPlayerHand}. <br> Computer drew: ${displayHand(
            computerHand
          )}. Total is: ${sumOfComputerHand}.<br> Player Wins!<br><br>Hit Submit to start dealing again.`;
        }
      } else if (sumOfComputerHand == sumOfPlayerHand) {
        myOutputValue = `Player drew: ${displayHand(
          playerHand
        )} <br> Computer drew: ${displayHand(
          computerHand
        )} <br> ZAO (i.e. it's a tie)`;
      } else if (sumOfComputerHand > 21) {
        myOutputValue = `Player drew: ${displayHand(
          playerHand
        )} <br> Computer drew: ${displayHand(
          computerHand
        )} Bao! Computer exploded. <br> Player Wins!<br><br>Hit Submit to start dealing again.`;
      }
      gameMode = startDealing;
    }
  }
  return myOutputValue;
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
      var value = rankCounter;
      if (rankCounter == 1) {
        value = 1;
      } else if (rankCounter == 11) {
        value = 10;
      } else if (rankCounter == 12) {
        value = 10;
      } else if (rankCounter == 13) {
        value = 10;
      }
      // Create a new card with the current name, suit, and rank (and value)
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: value,
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

//create playing deck
var playingDeck = shuffleCards(makeDeck());

// display hands
var displayHand = function (hand) {
  var message = ``;
  for (var i = 0; i < hand.length; i += 1) {
    // Construct a string using attributes of each card object
    var cardTitle = `${hand[i].name} of ${hand[i].suit}, `;
    message = message + cardTitle;
    console.log(cardTitle);
  }
  return message;
};
//generate player and computer hands
var generateHand = function () {
  var hand = [];
  for (var i = 0; i < 2; i += 1) {
    hand.push(playingDeck.pop());
  }
  return hand;
};
var playerHand = [];
var computerHand = [];

var totalSumOfHand = function (hand) {
  var sum = 0;
  for (var i = 0; i < hand.length; i += 1) {
    var sum = sum + hand[i].value;
  }
  return sum;
};
var sumOfPlayerHand = 0;
var sumOfComputerHand = 0;
console.log("sumOfComputerHand", sumOfComputerHand);

//function to evaluate blackjack
var blackjack = function (sumOfPlayerHand, sumOfComputerHand) {
  var myOutputValue = "";
  //if someone gets a blackjack
  if (sumOfPlayerHand == 21 && sumOfComputerHand == 21) {
    myOutputValue = `Player drew: ${displayHand(
      playerHand
    )} <br> Computer drew: ${displayHand(
      computerHand
    )} <br> Everyone won! All Ban Luck!`;
  } else if (sumOfPlayerHand == 21 && sumOfComputerHand != 21) {
    myOutputValue = `Player drew: ${displayHand(
      playerHand
    )} <br> Computer drew: ${displayHand(
      computerHand
    )} <br> Player won! Ban Luck!`;
  } else if (sumOfPlayerHand != 21 && sumOfComputerHand == 21) {
    myOutputValue = `Player drew: ${displayHand(
      playerHand
    )} <br> Computer drew: ${displayHand(
      computerHand
    )} <br> Computer won! Ban Luck!`;
  }
  return myOutputValue;
};
