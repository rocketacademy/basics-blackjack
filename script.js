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
var initialDealresults = function (playerHand, comHand) {
  playerScore = checkScore(playerHand);
  comScore = checkScore(comHand);
  printPlayerHand = handPrinter(playerHand);
  printComHand = handPrinter(comHand);

  var roundOutcome = `Total bet off ${playerBet}. Initial hands dealt.
                      </br></br>Player's hand: ${printPlayerHand} Total: ${playerScore} points.
                      </br></br> Computer's hand: ${printComHand} Total: ${comScore} points.`;
  //Announce initial results
  if (playerScore == 21 && comScore == 21) {
    gameMode = "firstDraw";
    playerPoints = playerPoints + playerBet;
    roundOutcome =
      roundOutcome +
      `</br></br> Looks like it's a draw. You both got BlackJack.
      </br></br> Your bet of ${playerBet} is returned. Total points now at ${playerPoints}.
      </br> Hit submit to start a new round.`;
    playerBet = 0;
  } else if (playerScore == 21) {
    gameMode = "drawPhase";
    roundOutcome =
      roundOutcome +
      `</br></br> Looks like you got BlackJack. Enter "hit" or "h" to draw, or "stand" or "s" to stop drawing. </br> You probably want to stand here...just saying...`;
  } else if (comScore == 21) {
    gameMode = "drawPhase";
    roundOutcome =
      roundOutcome +
      `</br></br> Looks like the computer got BlackJack. Enter "hit" or "h" to draw, or "stand" or "s" to stop drawing. </br> It's probably a good idea to just hit here...`;
  } else {
    gameMode = "drawPhase";
    roundOutcome =
      roundOutcome +
      `</br></br> Would you like to draw? Enter "hit" or "h" to draw, or "stand" or "s" to stop drawing.`;
  }
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

//GLOBAL VARIABLES
var shuffledDeck = shuffleCards(makeDeck());
var gameMode = "firstDraw";
var playerHand = [];
var comHand = [];
var drawPhaseCounter = 0;
var playerPoints = 100;
var playerCount = 1;

//MAIN FUNCTION
var main = function (input) {
  if (gameMode == "firstDraw") {
    //Resets hands & counters in case new round
    playerHand = [];
    comHand = [];
    drawPhaseCounter = 0;
    //Deals cards
    playerHand[0] = shuffledDeck.pop();
    comHand[0] = shuffledDeck.pop();
    playerHand[1] = shuffledDeck.pop();
    comHand[1] = shuffledDeck.pop();
    if (input <= playerPoints && input > 0) {
      //Sets bet
      playerBet = input;
      playerPoints = playerPoints - input;
      //Announce initial results & triggers next round if not BlackJack tie
      return initialDealresults(playerHand, comHand);
    } else {
      return `Please input how much you wish to bet. You currently have ${playerPoints} points.`;
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
