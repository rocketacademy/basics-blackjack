//Global variables
var mode = "play"; //play(to start game), player-choice(hit or stand), end-score(when game ends) ...
var myOutputValue = "";
var playerHand = [];
var computerHand = [];
var playerScore = "";
var computerScore = "";
var endScore = [];

//Group output message
var tieMessage = "<br>It's a tie<br>Your vs computer card value is:";
var loseMessage = "<br>You lose<br>Your vs computer card value is:";
var winMessage = "<br>You win<br>Your vs computer card value is:";
var continueMessage =
  "<br>Type 'hit' or 'stand' for your next move<br>Your card value is: ";
var footNote =
  "<br><br><i>Rule of blackjack: If your card exceed 21 in value, you lose.</i>";

var main = function (input) {
  if (mode == "play") {
    startGame();
    if (playerScore == 21 && computerScore != 21) {
      displayGameResult();
    } else {
      mode = "player-choice";
      displayGameResult();
    }
  } else if (mode == "player-choice") {
    if (input == "hit") {
      computerHitMoves();
      playerHitMoves();
      displayGameResult();
    } else if (input == "stand") {
      mode = "end-score";
      standGameResult();
    }
  }
  return myOutputValue;
};

//Function to draw cards for player and computer
var startGame = function () {
  playerHand = draw2Cards();
  computerHand = draw2Cards();
  playerScore = calculateScorePlayer();
  computerScore = calculateScoreComputer();
  return playerHand;
};

//Function for computer to think and act
var computerHitMoves = function (addCard) {
  if (computerScore < 21) {
    addCard = hitCard();
    computerHand.push(addCard);
    computerScore = calculateScoreComputer();
  }
  return computerHand;
};

//Function to hit 1 card
var hitCard = function () {
  var outputDeck = makeDeck();
  shuffleCards(outputDeck);
  return outputDeck.pop();
};

//Function to calculate score (with rules) for player and computer, AJQK condition
var calculateScorePlayer = function () {
  var score = 0;
  for (let counter = 0; counter < playerHand.length; counter++) {
    var getCardName = playerHand[counter].name;
    //J,Q,K to be 10 in score
    if (
      getCardName == "Jack" ||
      getCardName == "Queen" ||
      getCardName == "King"
    ) {
      score = score + 10;
    } //Ace to be scored 11 when score is not 21. So if 11 doesn't benefit player it will counted as 1.
    else if (playerScore + 11 < 21 && getCardName == "Ace") {
      playerHand[counter]["rank"] = 11;
      score = score + playerHand[counter]["rank"];
    } else {
      score = score + playerHand[counter]["rank"];
    }
  }
  return score;
};
var calculateScoreComputer = function () {
  var score = 0;
  for (let counter = 0; counter < computerHand.length; counter++) {
    var getCardName = computerHand[counter].name;
    //J,Q,K to be 10 in score
    if (
      getCardName == "Jack" ||
      getCardName == "Queen" ||
      getCardName == "King"
    ) {
      score = score + 10;
    } //Ace to be scored 11 when score is not 21. So if 11 doesn't benefit player it will counted as 1.
    else if (computerScore + 11 < 21 && getCardName == "Ace") {
      computerHand[counter]["rank"] = 11;
      score = score + computerHand[counter]["rank"];
    } else {
      score = score + computerHand[counter]["rank"];
    }
  }
  return score;
};

//Function to display end score array
var displayPlayerHand = function (playerHand) {
  var playerMessage = "Player hand: ";
  for (var index = 0; index < playerHand.length; index += 1) {
    playerMessage =
      playerMessage +
      playerHand[index]["name"] +
      " of " +
      playerHand[index]["suit"];
    +" ";
  }
  return playerMessage;
};

//Function for player to add a hit card score in
var playerHitMoves = function (addCard) {
  addCard = hitCard();
  playerHand.push(addCard);
  playerScore = calculateScorePlayer();
  return playerHand;
};

//Function to determine if game ends or continue
var displayGameResult = function () {
  endScore = [playerScore, computerScore];
  if (playerScore == 21 && computerScore == 21) {
    footNote = "Refresh to play again";
    myOutputValue =
      displayPlayerHand(playerHand) + tieMessage + endScore + footNote;
  } else if (playerScore == 21 && computerScore != 21) {
    myOutputValue =
      displayPlayerHand(playerHand) + winMessage + endScore + footNote;
  } else if (playerScore != 21 && computerScore == 21) {
    myOutputValue =
      displayPlayerHand(playerHand) + loseMessage + endScore + footNote;
  } else if (playerScore > 21) {
    if (computerScore > 21) {
      myOutputValue =
        displayPlayerHand(playerHand) + "<br>Both lose" + endScore + footNote;
    } else if (computerScore < 21) {
      myOutputValue =
        displayPlayerHand(playerHand) + loseMessage + endScore + footNote;
    }
  } else {
    myOutputValue =
      displayPlayerHand(playerHand) + continueMessage + playerScore + footNote;
  }
};

//Function to display end result of the game when user stand
var standGameResult = function () {
  endScore = [playerScore, computerScore];
  if (playerScore == 21 && computerScore == 21) {
    footNote = "Refresh to play again";
    myOutputValue =
      displayPlayerHand(playerHand) + tieMessage + endScore + footNote;
  } else if (playerScore == 21 && computerScore != 21) {
    myOutputValue =
      displayPlayerHand(playerHand) + winMessage + endScore + footNote;
  } else if (playerScore != 21 && computerScore == 21) {
    myOutputValue =
      displayPlayerHand(playerHand) + loseMessage + endScore + footNote;
  } else if (playerScore > 21 && computerScore > 21) {
    if (playerScore < computerScore || playerScore > computerScore) {
      myOutputValue =
        displayPlayerHand(playerHand) + "<br>Both lose" + endScore + footNote;
    } else if (computerScore < 21) {
      myOutputValue =
        displayPlayerHand(playerHand) + loseMessage + endScore + footNote;
    }
  } else if (playerScore < 21 && computerScore < 21) {
    if (playerScore < computerScore) {
      myOutputValue =
        displayPlayerHand(playerHand) + loseMessage + endScore + footNote;
    } else if (playerScore > computerScore) {
      myOutputValue =
        displayPlayerHand(playerHand) + winMessage + endScore + footNote;
    }
  } else {
    myOutputValue =
      displayPlayerHand(playerHand) + winMessage + endScore + footNote;
  }
};

//Function to loop draw card 2x
var draw2Cards = function () {
  var outputHand = [];
  var outputDeck = makeDeck(); //52 cards ready
  shuffleCards(outputDeck); //shuffle cards to random order
  for (var turn = 0; turn < 2; turn += 1) {
    outputHand.push(outputDeck.pop());
  }
  return outputHand;
};

// Get 52 cards in a deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥", "♦", "♣", "♠"];

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
