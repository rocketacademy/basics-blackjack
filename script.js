//FUNCTION -> CREATE THE BASE DECK
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

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
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      if (rankCounter > 10) {
        var bjPoints = 10;
      } else if (rankCounter == 1) {
        bjPoints = 11;
      } else {
        bjPoints = rankCounter;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        points: bjPoints,
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

//FUNCTION -> RANDOMNUMBER
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//FUNCTION -> SHUFFLES THE CREATED DECK
// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  //var newDeck = [];
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

//SCORE CHECKER with ACE conversion
var checkScore = function (handToCheck) {
  var currentScore = 0;
  if (
    handToCheck.length == 2 &&
    handToCheck[0].name == "Ace" &&
    handToCheck[1].name == "Ace"
  ) {
    currentScore = 12;
  } else {
    var checker = 0;
    var aceCount = 0;
    while (checker < handToCheck.length) {
      currentScore = currentScore + handToCheck[checker].points;
      if (handToCheck[checker].name == "Ace") {
        aceCount++;
      }
      checker++;
    }
    // If exactly 1 ace, more than 2 cards, and current score exceeds 21. I.e. exactly 1 ace needs to become 1
    if (currentScore > 21 && handToCheck.length > 2 && aceCount <= 1) {
      var aceChecker = 0;
      currentScore = 0;
      while (aceChecker < handToCheck.length) {
        if (handToCheck[aceChecker].name == "Ace") {
          currentScore = currentScore + 1;
          aceChecker++;
        } else {
          currentScore = currentScore + handToCheck[aceChecker].points;
          aceChecker++;
        }
      }
    } //If more than 1 ace & more than 2 cards & score can hit 21 or less if only 1 ace convered
    else if (currentScore > 21 && handToCheck.length > 2 && aceCount >= 2) {
      var checkRound = 0;
      while (currentScore > 21 && checkRound < handToCheck.length) {
        var ace2Checker = 0;
        var acesChecked = 0;
        currentScore = 0;
        while (ace2Checker < handToCheck.length) {
          if (
            handToCheck[ace2Checker].name == "Ace" &&
            acesChecked <= checkRound
          ) {
            currentScore = currentScore + 1;
            acesChecked++;
            ace2Checker++;
          } else {
            currentScore = currentScore + handToCheck[ace2Checker].points;
            ace2Checker++;
          }
        }
        checkRound++;
      }
    }
  }
  return currentScore;
};

var emojiSuit = function (suit) {
  var suitReturn;
  if (suit == "Hearts") {
    suitReturn = "♥️";
  } else if (suit == "Spades") {
    suitReturn = "♠️";
  } else if (suit == "Diamonds") {
    suitReturn = "♦️";
  } else if (suit == "Clubs") {
    suitReturn = "♣️";
  }
  return suitReturn;
};

//Function to print out the hand
var handPrinter = function (handToPrint) {
  var checker = 0;
  var printHand = "";
  while (checker < handToPrint.length - 1) {
    printHand =
      printHand +
      " " +
      handToPrint[checker].name +
      " " +
      emojiSuit(handToPrint[checker].suit) +
      ", ";
    checker++;
  }
  printHand =
    printHand +
    "and " +
    handToPrint[checker].name +
    " " +
    emojiSuit(handToPrint[checker].suit) +
    ". " +
    (checker + parseInt("1")) +
    " cards drawn in all.";
  return printHand;
};

//Function to auto-draw for computer
var comDraw = function (hand) {
  var drawCheck = 0;
  while (drawCheck < 3) {
    comScore = checkScore(hand);
    if (comScore < 17) {
      hand[drawCheck + 2] = shuffledDeck.pop();
    }
    drawCheck++;
  }
  return comHand;
};

//FUNCTION: Compare first dealing results and returns outcome or forward prompt to player
var initialDealresults = function (player, comHand) {
  //Score checking & printing
  var counter = 0;
  var roundOutcome = "Initial hands dealt </br></br>";
  while (counter < playerCount) {
    roundOutcome =
      roundOutcome +
      `Player ${counter + 1} bet ${
        player[counter].playerBet
      } points. </br>Hand: ${handPrinter(
        player[counter].playerHand
      )} </br>Current hand score: ${checkScore(
        player[counter].playerHand
      )}</br></br>`;
    counter++;
  }
  roundOutcome =
    roundOutcome +
    `Computer's hand: ${handPrinter(
      comHand
    )} </br>Current hand score: ${checkScore(comHand)} points.`;
  return roundOutcome;
};

//FUNCTION: Compare results mid-game and returns outcome or forward prompt to player
var preComDrawResults = function (playerHand, comHand) {
  playerScore = checkScore(playerHand);
  comScore = checkScore(comHand);
  printPlayerHand = handPrinter(playerHand);
  printComHand = handPrinter(comHand);
  var drawRoundOutcome = `Player drawing phase
                          </br></br> Player's hand: ${printPlayerHand} Total: ${playerScore} points.
                          </br></br> Computer's hand: ${printComHand} Total: ${comScore} points.`;

  if (playerScore > 21 && comScore >= 17) {
    gameMode = "firstDraw";
    drawRoundOutcome =
      drawRoundOutcome +
      `</br></br> Looks like you went bust and lost the game...
      </br></br> Your bet of ${playerBet} is lost. Total points now at ${playerPoints}.
        </br> Hit submit to start a new round`;
    playerBet = 0;
  } else if (playerScore > 21 && comScore < 17) {
    gameMode = "results";
    drawRoundOutcome =
      drawRoundOutcome +
      ` </br></br> Looks like you went bust, but it's not a sure loss yet.
            </br> Hit submit to see how the dealer(computer) goes`;
  } else {
    gameMode = "drawPhase";
    drawRoundOutcome =
      drawRoundOutcome +
      `</br></br> Would you like to draw another? Enter "hit" or "h" to draw another card, or "stand" or "s" to stop drawing.`;
  }
  return drawRoundOutcome;
};

//FUNCTION: Trigger auto draw for computer, compares final hands, and returns outcome to user
var postComDrawResults = function (playerHand, comHand) {
  newComHand = comDraw(comHand);
  playerScore = checkScore(playerHand);
  comScore = checkScore(newComHand);
  printPlayerHand = handPrinter(playerHand);
  printComHand = handPrinter(newComHand);
  gameMode = "firstDraw";

  var lastRoundOutcome = `Both player & dealer have drawn as desired
                          </br></br>Player's hand: ${printPlayerHand} Total: ${playerScore} points.
                          </br></br> Computer's hand: ${printComHand} Total: ${comScore} points.`;
  if (playerScore > 21 && comScore > 21) {
    playerPoints = playerPoints + playerBet;
    lastRoundOutcome =
      lastRoundOutcome +
      `</br></br> Looks like it's a tie, you've both gone bust.
      </br></br> Your bet of ${playerBet} is returned. Total points now at ${playerPoints}.
      </br></br> Hit submit to start a new round.`;
    playerBet = 0;
  } else if (playerScore > 21 && comScore <= 21) {
    lastRoundOutcome =
      lastRoundOutcome +
      `</br></br> Looks like you've lost by going bust.
      </br></br> Your bet of ${playerBet} is lost. Total points now at ${playerPoints}.
      </br></br> Hit submit to start a new round.`;
    playerBet = 0;
  } else if (playerScore <= 21 && comScore > 21) {
    playerPoints = playerPoints + playerBet * 2;
    lastRoundOutcome =
      lastRoundOutcome +
      `</br></br> Looks like you've won! The dealer went bust. 
      </br></br> Your bet of ${playerBet} paid off. Total points now at ${playerPoints}.
      </br></br> Hit submit to start a new round.`;
    playerBet = 0;
  } else if (playerScore == comScore) {
    playerPoints = playerPoints + playerBet;
    lastRoundOutcome =
      lastRoundOutcome +
      `</br></br> Looks like you've got the same total score. It's a tie. 
      </br></br> Your bet of ${playerBet} is returned. Total points now at ${playerPoints}.
      </br></br> Hit submit to start a new round.`;
    playerBet = 0;
  } else if (playerScore > comScore) {
    playerPoints = playerPoints + playerBet * 2;
    lastRoundOutcome =
      lastRoundOutcome +
      `</br></br> Looks like you've won!
      </br></br> Your bet of ${playerBet} paid off. Total points now at ${playerPoints}.
      </br></br> Hit submit to start a new round.`;
    playerBet = 0;
  } else {
    lastRoundOutcome =
      lastRoundOutcome +
      `</br></br> Looks like you've lost the round, better luck next time. 
      </br></br> Your bet of ${playerBet} is lost. Total points now at ${playerPoints}.
      </br></br> Hit submit to start a new round.`;
    playerBet = 0;
  }
  return lastRoundOutcome;
};

var setPlayers = function (playerCount) {
  var counter = 0;
  var player = [];
  while (counter < playerCount) {
    var playerDetails = {
      playerHand: [],
      playerPoints: 100,
      playerBet: 0,
      drawPhaseCounter: 0,
    };
    player.push(playerDetails);
    counter++;
  }
  return player;
};

//GLOBAL VARIABLES
var shuffledDeck = shuffleCards(makeDeck());
var gameMode = "setPlayers";
var playerCount = 1;
var comHand = [];
var player = [];
player[0] = {
  playerHand: [],
  playerPoints: 100,
  playerBet: 0,
  drawPhaseCounter: 0,
  handOut: "",
};
player[1] = {
  playerHand: [],
  playerPoints: 100,
  playerBet: 0,
  drawPhaseCounter: 0,
  handOut: "",
};
player[2] = {
  playerHand: [],
  playerPoints: 100,
  playerBet: 0,
  drawPhaseCounter: 0,
  handOut: "",
};
player[3] = {
  playerHand: [],
  playerPoints: 100,
  playerBet: 0,
  drawPhaseCounter: 0,
  handOut: "",
};
player[4] = {
  playerHand: [],
  playerPoints: 100,
  playerBet: 0,
  drawPhaseCounter: 0,
  handOut: "",
};
var betCounter = 0;

//MAIN FUNCTION
var main = function (input) {
  if (gameMode == "setPlayers") {
    if (input <= 5 && input >= 1) {
      playerCount = input;
      gameMode = "firstDraw";
      return `Total of ${input} players. Player 1, please enter bet amount of 100 or less.`;
    } else {
      return "Please enter the number of players. Up to 5 players allowed.";
    }
  } else if (gameMode == "firstDraw") {
    //Resets hands & counters in case new round
    var resetCounter = 0;
    while (resetCounter < playerCount) {
      player[resetCounter].playerHand = [];
      player[resetCounter].drawPhaseCounter = 0;
      resetCounter++;
    }
    comHand = [];
    //Deals first cards com last
    var dealCounter = 0;
    while (dealCounter < playerCount) {
      player[dealCounter].playerHand[0] = shuffledDeck.pop();
      dealCounter++;
    }
    comHand[0] = shuffledDeck.pop();
    //Deals second cards com last
    var deal2Counter = 0;
    while (deal2Counter < playerCount) {
      player[deal2Counter].playerHand[1] = shuffledDeck.pop();
      deal2Counter++;
    }
    comHand[1] = shuffledDeck.pop();
    //Cycles through bets
    if (betCounter < playerCount) {
      while (betCounter < player.length) {
        if (input <= player[betCounter].playerPoints && input > 0) {
          //Sets bet
          player[betCounter].playerBet = input;
          player[betCounter].playerPoints =
            player[betCounter].playerPoints - input;
          var betAnnounce = `Player ${betCounter + 1} bet set at ${
            player[betCounter].playerBet
          }.`;
          betCounter++;
          return betAnnounce;
        } else {
          return `Player ${
            betCounter + 1
          } please set your bet. You currently have ${
            player[betCounter].playerPoints
          } points.`;
        }
      }
    } else {
      return initialDealresults(player, comHand);
    }

    //Start of player drawphase if no blackjack
  } else if (gameMode == "drawPhase") {
    //If player presses stand. Draws for computer & outputs final game results
    if (input == "stand" || input == "s") {
      return postComDrawResults(playerHand, comHand);
    } //if player hits
    else if (input == "hit" || input == "h") {
      if (drawPhaseCounter == 3) {
        return `You cannot draw more than 3 additional card. Enter "stand" or "s" before pressing submit to progress the game.`;
      } else if (drawPhaseCounter < 3) {
        console.log("Current Draw is " + drawPhaseCounter);
        playerHand[playerHand.length] = shuffledDeck.pop();
        drawPhaseCounter++;
        return preComDrawResults(playerHand, comHand);
      }
    } else {
      return `Please enter "hit" or "h" to draw another card, or "stand" or "s" to stop drawing before pressing submit.`;
    }
  } else if (gameMode == "results") {
    return postComDrawResults(playerHand, comHand);
  }
};
