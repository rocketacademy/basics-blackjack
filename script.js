var hitOrStand = "Ask player to hit or stand.";
var startDealing = "shuffle cards and start dealing";
var nameRequest = "request for player game";
var aceDecision = "decide Ace value";
var gameMode = nameRequest;
var instructions = "instructions for blackjack";
var playerName = "MEL!";

var main = function (input) {
  var myOutputValue = "hello world, this msg should not appear";
  if (gameMode == nameRequest) {
    gameMode = instructions;
    myOutputValue = `Hi there :) Welcome to our game of Blackjack! <br><br>Please input your name to start!`;
    return myOutputValue;
  }
  if (gameMode == instructions) {
    playerName = input;
    gameMode = startDealing;
    return (myOutputValue = `Welcome ${playerName}! :) <br> [Hit submit to skip reading the instructions below]
    <br>....................<br>
    Here are the instructions for our game:<br><br>
    1. There will be only two players. One human and one computer. <br><br>
    2. The computer will always be the dealer. The dealer has to hit if their hand is below 17. You should also hit if your hand is below 17. <br><br>
    3. The player who is closer to 21 wins the hand. <br><br>
    4. Aces can be 1 or 11. We will prompt you to select the value of ace the moment you get it. Please note that the value cant be changed thenafter.
    <br>....................<br>
    Hit submit to start!`);
  }

  //start a fresh game and deal cards
  if (gameMode == startDealing) {
    //regenerate Playing deck with each fresh game
    playingDeck = shuffleCards(makeDeck());
    //generate player and computer hands
    playerHand = generateHand(playingDeck);
    computerHand = generateHand(playingDeck);
    console.log("P: ", playerHand, " C: ", computerHand);
    //generate new sum
    sumOfPlayerHand = totalSumOfHand(playerHand);

    //START GAME

    if (
      sumOfPlayerHand == 21 ||
      sumOfComputerHand == 21 ||
      (playerHand[0].name == "Ace" && playerHand[1].name == "Ace") ||
      (computerHand[0].name == "Ace" && computerHand[1].name == "Ace")
    ) {
      return blackjack(sumOfPlayerHand, sumOfComputerHand);

      //if no one gets a blackjack; check for Ace in the dealt hand
      // ask to hit or stand

      //there is an Ace
    } else if (doesHandHaveAce(playerHand) > 0) {
      gameMode = aceDecision;
      myOutputValue = `${playerName} drew: ${displayHand(
        playerHand
      )} Total is: ${sumOfPlayerHand}.<br><br> Do you want your Ace to be 1 or 11? (Input 1 or 11 please)`;
      return myOutputValue;

      //there is no Ace
    } else if (doesHandHaveAce(playerHand) == 0) {
      gameMode = hitOrStand;
      myOutputValue = `${playerName} drew: ${displayHand(
        playerHand
      )} Total is: ${sumOfPlayerHand}.<br><br>Do you want to hit or stand? (Please enter hit/stand)`;
      return myOutputValue;
    }
  } else if (gameMode == aceDecision) {
    if (input == 1) {
      sumOfPlayerHand = sumOfPlayerHand - 10;
    } else if (input != 1 || input != 11) {
      myOutputValue = `Please input 1 if you want the Ace value to be 1.`;
    }
    gameMode = hitOrStand;
    myOutputValue = `${playerName} drew: ${displayHand(
      playerHand
    )} New total is: ${sumOfPlayerHand}.<br><br>Do you want to hit or stand? (Please enter hit/stand)`;
  } else if (gameMode == hitOrStand) {
    //if player decides to hit
    if (input == "hit") {
      //deal one card
      playerHand.push(playingDeck.pop());
      console.log(playerHand);

      //check if new card is an Ace
      if (playerHand[playerHand.length - 1].name == "Ace") {
        sumOfPlayerHand = sumOfPlayerHand + 11;
        gameMode = aceDecision;
        myOutputValue = `${playerName} drew: ${displayHand(
          playerHand
        )} New total sum is: ${sumOfPlayerHand}.<br><br> Do you want your Ace to be 1 or 11? (Input 1 or 11 please)`;
        return myOutputValue;
      } else if (playerHand[playerHand.length - 1].name != "Ace") {
        sumOfPlayerHand =
          sumOfPlayerHand + playerHand[playerHand.length - 1].value;
        //player's hand doesnt hit 21
        if (sumOfPlayerHand <= 21) {
          myOutputValue = `${playerName} drew: ${displayHand(
            playerHand
          )} Total is: ${sumOfPlayerHand}. <br><br>Do you want to hit again? (Please input hit/stand)`;
          gameMode = hitOrStand;

          //player burst
        } else if (sumOfPlayerHand > 21) {
          gameMode = startDealing;
          return generateCompResult(
            sumOfComputerHand,
            computerHand,
            sumOfPlayerHand,
            playerHand,
            playerName
          );
        }
        console.log(gameMode);
      }
      //if player decides to stand - player completes
    } else if (input == "stand") {
      //if player does not have enough (below), force him to hit again!
      if (sumOfPlayerHand < 17) {
        myOutputValue = `${playerName} drew: ${displayHand(
          playerHand
        )} Total is: ${sumOfPlayerHand}. <br><br>You do not have enough to play blackjack. You should input 'hit' to to hit again!`;
        gameMode = hitOrStand;
      } else {
        gameMode = startDealing;
        return generateCompResult(
          sumOfComputerHand,
          computerHand,
          sumOfPlayerHand,
          playerHand,
          playerName
        );
      }
    }
  }
  return myOutputValue;
};

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts ♥️", "Diamonds ♦️", "Clubs ♣️", "Spades ♠️"];

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

      // If rank is 1, 11, 12, or 13, set cardName to the Ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "💂‍♂️ Jack";
      } else if (cardName == 12) {
        cardName = "👸 Queen";
      } else if (cardName == 13) {
        cardName = "🤴 King";
      }

      var value = rankCounter;
      if (rankCounter == 1) {
        value = 11;
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
    var cardTitle = `${hand[i].name} of ${hand[i].suit}`;
    message = message + cardTitle + "<br>";
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
// var playerHand = [];
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
  //if there is an Ace

  //if someone gets a Ban-ban

  if (
    (playerHand[0].name == "Ace" && playerHand[1].name == "Ace") ||
    (computerHand[0].name == "Ace" && computerHand[1].name == "Ace")
  ) {
    if (
      playerHand[0].name == "Ace" &&
      playerHand[1].name == "Ace" &&
      computerHand[0].name == "Ace" &&
      computerHand[1].name == "Ace"
    ) {
      myOutputValue =
        "Everyone BAN BAN. WOW! (Double Ace)<br><br>Hit Submit to start dealing again.";
    } else if (playerHand[0].name == "Ace" && playerHand[1].name == "Ace") {
      myOutputValue =
        "${playerName} BAN BAN! WOW! (Double Ace) <br><br>Hit Submit to start dealing again.";
    } else if (computerHand[0].name == "Ace" && computerHand[1].name == "Ace") {
      myOutputValue =
        "Computer BAN BAN! (Double Ace)<br><br>Hit Submit to start dealing again.";
    }

    //if someone gets a blackjack
  } else if (sumOfPlayerHand == 21 && sumOfComputerHand == 21) {
    myOutputValue = `Everyone won! All Ban Luck!<br><br>${playerName} drew: ${displayHand(
      playerHand
    )} <br><br> Computer drew: ${displayHand(
      computerHand
    )} <br><br> Hit Submit to start dealing again.`;
  } else if (sumOfPlayerHand == 21 && sumOfComputerHand != 21) {
    myOutputValue = `${playerName} won! Ban Luck!<br><br>${playerName} drew: ${displayHand(
      playerHand
    )} <br><br> Computer drew: ${displayHand(
      computerHand
    )} <br><br> Hit Submit to start dealing again.`;
  } else if (sumOfPlayerHand != 21 && sumOfComputerHand == 21) {
    myOutputValue = `Computer won! Ban Luck!<br><br>${playerName} drew: ${displayHand(
      playerHand
    )} <br><br> Computer drew: ${displayHand(
      computerHand
    )} <br><br> Hit Submit to start dealing again.`;
  }
  return myOutputValue;
};

//check if the hand has a Ace card
var doesHandHaveAce = function (hand) {
  var aceFlag = 0;
  for (var i = 0; i < hand.length; i += 1) {
    if (hand[i].value == 11) {
      aceFlag += 1;
    }
  }
  return aceFlag;
};

var generateCompResult = function (
  sumOfComputerHand,
  computerHand,
  sumOfPlayerHand,
  playerHand,
  playerName
) {
  var myOutputValue =
    "if this shows, there is a bug for generateCompResultFunction";
  console.log("generate comp result function is running");
  // check if comp hand has Ace
  //if sum (with Ace) is more than 21 (burst), change Ace to value of 1.

  var compHitAgain = `mode to check if comp should hit again`;
  var compMovesOn = "mode after com hand is >16";
  var decisionMode = compHitAgain;

  //decides if computer should hit again:
  if (decisionMode == compHitAgain) {
    console.log(decisionMode);
    if (sumOfComputerHand < 16) {
      while (sumOfComputerHand < 16) {
        computerHand.push(playingDeck.pop());
        sumOfComputerHand = totalSumOfHand(computerHand);
      }
      decisionMode = compMovesOn;
    } else {
      decisionMode = compMovesOn;
    }
  }
  if (decisionMode == compMovesOn) {
    //compare player hand with computer hand
    console.log("decisionMode (comp mode): " + decisionMode);
    //if computer sum is between 16 - 21
    if (sumOfComputerHand >= 16 && sumOfComputerHand <= 21) {
      //computer winning conditions
      //player burst
      if (sumOfPlayerHand > 21) {
        myOutputValue = `Computer Wins! <br><br>${playerName} drew: ${displayHand(
          playerHand
        )} Total is: ${sumOfPlayerHand}. <br> ${playerName} bao! <br><br> Computer drew: ${displayHand(
          computerHand
        )} Total is: ${sumOfComputerHand}.<br><br> Hit Submit to start dealing again.`;
        return myOutputValue;

        //player doesnt burst and computer wins
      } else if (sumOfPlayerHand <= 21 && sumOfComputerHand > sumOfPlayerHand) {
        myOutputValue = `Computer Wins! <br><br>${playerName} drew: ${displayHand(
          playerHand
        )} Total is: ${sumOfPlayerHand}. <br><br> Computer drew: ${displayHand(
          computerHand
        )} Total is: ${sumOfComputerHand}.<br><br> Hit Submit to start dealing again.`;
        return myOutputValue;
        //player wins
      } else if (sumOfPlayerHand <= 21 && sumOfComputerHand < sumOfPlayerHand) {
        myOutputValue = `${playerName}  Wins!<br><br>${playerName} drew: ${displayHand(
          playerHand
        )} Total is: ${sumOfPlayerHand}. <br><br> Computer drew: ${displayHand(
          computerHand
        )} Total is: ${sumOfComputerHand}.<br><br> Hit Submit to start dealing again.`;
        return myOutputValue;
        //ties
      } else if (sumOfComputerHand == sumOfPlayerHand) {
        myOutputValue = `ZAO (i.e. it's a tie).<br><br>${playerName} drew: ${displayHand(
          playerHand
        )} <br><br> Computer drew: ${displayHand(
          computerHand
        )} <br><br> Hit Submit to start dealing again.`;
        return myOutputValue;
      } else if (
        computerHand.length >= 5 &&
        sumOfComputerHand <= 21 &&
        playerHand.length >= 5 &&
        sumOfPlayerHand <= 21
      ) {
        return (myOutputValue = "Everyone Wu Long. Time to buy 4D!");
        //tired to do the scenario where only 1 gets wulong
      }
    } else if (sumOfComputerHand > 21) {
      //check if computer has an Ace (which value remains at 11)
      if (doesHandHaveAce(computerHand) > 0) {
        console.log("computer hand has Ace");
        //if 1st card = Ace, change value to 1
        if (computerHand[0].value == 11) {
          computerHand[0].value == 1;
          sumOfComputerHand = totalSumOfHand(computerHand);
          decisionMode = compHitAgain;
          //if last card = Ace, change value to 1
        } else if (computerHand[computerHand.length - 1].value == 11) {
          computerHand[computerHand.length - 1].value == 1;
          sumOfComputerHand = totalSumOfHand(computerHand);
          decisionMode = compHitAgain;
        }
      }
      //computer burst
      else if (sumOfComputerHand > 21 && sumOfPlayerHand <= 21) {
        console.log(
          "comp hand had no more aces & comp bao && player never bao"
        );
        myOutputValue = `Bao! Computer exploded. <br> 
        Player Wins!<br><br>${playerName} drew: ${displayHand(
          playerHand
        )} Total is: ${sumOfPlayerHand}. <br><br> 
        
        Computer drew: ${displayHand(
          computerHand
        )}  Total is: ${sumOfComputerHand}. <br> 
        
        
        Hit Submit to start dealing again.`;
        return myOutputValue;

        //player and computer burst
      } else if (sumOfComputerHand > 21 && sumOfPlayerHand > 21) {
        console.log("comp hand had no more aces & comp bao && player also bao");

        myOutputValue = `Bao! Everyone exploded. <br> 
        No One Wins!<br><br>${playerName} drew: ${displayHand(
          playerHand
        )} Total is: ${sumOfPlayerHand}. <br><br> 

        Computer drew: ${displayHand(
          computerHand
        )} Total is: ${sumOfComputerHand}. <br>
        
        
        Hit Submit to start dealing again.`;
        return myOutputValue;
      }
    }
    return myOutputValue;
  }
};
