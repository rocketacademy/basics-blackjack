//GLOBAL VARIABLES
//ver 2: player hit or stand
var DRAW_MODE = "DRAW MODE";
var RESULT_MODE = "RESULT MODE";
var GAME_START = "GAME START";
var PLAYER_CHOICE_MODE = "PLAYER CHOICE MODE";
var COMPUTER_CHOICE_MODE = "COMPUTER CHOICE MODE";
var INTRO_MODE = "INTRO MODE";
var PLACE_BET = "PLACE_BET";
var HIT = "h";
var STAND = "s";
var WIN = "WIN";
var LOSE = "LOSE";
var TIE = "TIE";

//IMAGE LIBRARY

var IMAGE_WIN = '<img class = "bottom-img" src ="image/BlackJack_WIN.jpg"/>';
var IMAGE_LOSE = '<img class = "bottom-img" src ="image/BlackJack_LOSE.jpg"/>';
var IMAGE_TIE = '<img class = "bottom-img" src ="image/BlackJack_TIE.jpg"/>';

//output is updated by using this function
var displayHandsStatement = function (playerHand, computerHand) {
  var playerValue = addAllCards(playerHand);
  var computerValue = addAllCards(computerHand);

  myOutputValue = `Player Hand has ${listAllPlayerCards(playerHand)}
  <br><br> Computer Hand has ${listCPUCards(computerHand)}
  <br><br> Player deck Value is ${playerValue} and CPU total value is ${computerValue}`;
  //<br><br> Player, would you like to hit or stand? type h for hit and s for stand.;

  return myOutputValue;
};

//ask player if hit or stand
var askHitOrStand = function () {
  myOutputValue = `Player, would you like to hit or stand? type h for hit and s for stand.`;
  return myOutputValue;
};

//declares computer wants to stand
var declareStand = function () {
  myOutputValue = `Computer decided to stand.`;
  return myOutputValue;
};

//helper function: list cards nicely for myOutputValue
var listAllPlayerCards = function (cards) {
  var resultString = String();
  //console.log(cards);
  for (var i = 0; i < cards.length; i += 1) {
    var currentCard = cards[i];
    //console.log(currentCard);
    resultString += `<br><br>${currentCard.name} of ${currentCard.suit}${currentCard.emoji}`;
    //console.log("results String:" + resultString);
  }
  return resultString;
};
//helper function: list cards nicely for myOutputValue
var listCPUCards = function (cards) {
  var resultString = String();
  //console.log(cards);
  resultString += `<br><br>Hidden Card`;
  for (var i = 1; i < cards.length; i += 1) {
    var currentCard = cards[i];
    //console.log(currentCard);
    resultString += `<br><br>${currentCard.name} of ${currentCard.suit}${currentCard.emoji}`;
    //console.log("results String:" + resultString);
  }
  return resultString;
};

//helper function: add cards nicely for myOutputValue
var addAllCards = function (cards) {
  var result = Number();
  //console.log(cards);
  for (var i = 0; i < cards.length; i += 1) {
    var currentCard = cards[i];
    //console.log(currentCard);
    result += Number(currentCard.value);
    //console.log("results String:" + resultString);
  }
  //variable ace 1 or 11
  for (var i = 0; i < cards.length; i += 1) {
    if (cards[i].name == "Ace") {
      //cardValue = 11;
      if (result + 10 > 21) {
        break;
      } else {
        result += 10;
      }
    }
  }
  return result;
};

//create a deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var emojiLibrary = ["♥", "♦", "♣", "♠"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var currentEmoji = emojiLibrary[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardValue = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
        emoji: currentEmoji,
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

//shuffling deck
var shuffleDeck = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    //switch the 2 cards around by swapping like this:
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex += 1;
  }
  return cardDeck;
};

// helper function: for shuffling deck
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//helper function: reset the game for new game loop
var resetGame = function () {
  gameMode = INTRO_MODE;
  playerHand = [];
  computerHand = [];
};

// check bust or blackjack in any hand
var checkBustOrBlackjack = function (playerHand, computerHand) {
  var deckValue1 = addAllCards(playerHand);
  var deckValue2 = addAllCards(computerHand);

  //see if any hand is 21 or more

  if (deckValue1 >= 21 || deckValue2 >= 21) {
    //gameMode = RESULT_MODE;
    gameMode = RESULT_MODE;
  }

  console.log("game mode now", gameMode);
  return gameMode;
};

// check who win or lose
var checkWhoWinLose = function (deckValue1, deckValue2) {
  console.log("SEND HELP 2");
  var playerValue = addAllCards(deckValue1);
  var computerValue = addAllCards(deckValue2);

  var endResult;

  if (playerValue == 21 && computerValue != 21) {
    endResult = `Player wins! 21 means blackjack!`;
  } else if (playerValue != 21 && computerValue == 21) {
    endResult = `Player loses! Computer got 21 which means blackjack!`;
  } else if (playerValue > 21 && computerValue < 21) {
    endResult = `Player is busted! Deck exceeds 21...Player loses.`;
  } else if (playerValue < 21 && computerValue > 21) {
    endResult = `Computer is busted! Deck exceeds 21...so Player wins!`;
  } else if (playerValue == 21 && computerValue == 21) {
    endResult = `It is a tie! Both decks are Blackjack!`;
  } else if (playerValue == computerValue) {
    endResult = `It is a tie! the values of both decks are the same!`;
  } else if (playerValue > 21 && computerValue > 21) {
    endResult = `It is a tie! Both Player and Computer busted!`;
  } else if (playerValue < computerValue) {
    endResult = `Player lost! Player deck is ${playerValue} which is lesser than Computer's deck of ${computerValue} `;
  } else if (playerValue > computerValue) {
    endResult = `Player won! Player deck is ${playerValue} which is more than Computer's deck of ${computerValue} `;
  }
  return endResult;
};

//determine round result win lose or tie
var checkRoundResult = function (deckValue1, deckValue2) {
  console.log("SEND HELP 3");
  var playerValue = addAllCards(deckValue1);
  var computerValue = addAllCards(deckValue2);

  var roundResult;

  /*
  if (
    (playerValue == 21 && computerValue != 21) ||
    (playerValue < 21 && computerValue > 21) ||
    playerValue > computerValue
  ) {
    roundResult = WIN;
  } else if (
    (playerValue != 21 && computerValue == 21) ||
    (playerValue > 21 && computerValue < 21) ||
    playerValue < computerValue
  ) {
    roundResult = LOSE;
  } else if (playerValue == computerValue) {
    roundResult = TIE;
  }
  
  */
  if (playerValue == 21 && computerValue != 21) {
    roundResult = WIN;
  } else if (playerValue != 21 && computerValue == 21) {
    roundResult = LOSE;
  } else if (playerValue > 21 && computerValue < 21) {
    roundResult = LOSE;
  } else if (playerValue < 21 && computerValue > 21) {
    roundResult = WIN;
  } else if (playerValue == 21 && computerValue == 21) {
    roundResult = TIE;
  } else if (playerValue == computerValue) {
    roundResult = TIE;
  } else if (playerValue > 21 && computerValue > 21) {
    roundResult = TIE;
  } else if (playerValue < computerValue) {
    roundResult = LOSE;
  } else if (playerValue > computerValue) {
    roundResult = WIN;
  }
  return roundResult;
};

//determine what image for win lose or tie
var checkImageResult = function (deckValue1, deckValue2) {
  console.log("SEND HELP 4");
  var playerValue = addAllCards(deckValue1);
  var computerValue = addAllCards(deckValue2);

  var imageResult;

  /*
  if (
    (playerValue == 21 && computerValue != 21) ||
    (playerValue < 21 && computerValue > 21) ||
    playerValue > computerValue
  ) {
    imageResult = IMAGE_WIN;
  } else if (
    (playerValue != 21 && computerValue == 21) ||
    (playerValue > 21 && computerValue < 21) ||
    playerValue < computerValue
  ) {
    imageResult = IMAGE_LOSE;
  } else if (playerValue == computerValue) {
    imageResult = IMAGE_TIE;
  }
  return imageResult;
  */
  if (playerValue == 21 && computerValue != 21) {
    imageResult = IMAGE_WIN;
  } else if (playerValue != 21 && computerValue == 21) {
    imageResult = IMAGE_LOSE;
  } else if (playerValue > 21 && computerValue < 21) {
    imageResult = IMAGE_LOSE;
  } else if (playerValue < 21 && computerValue > 21) {
    imageResult = IMAGE_WIN;
  } else if (playerValue == 21 && computerValue == 21) {
    imageResult = IMAGE_TIE;
  } else if (playerValue == computerValue) {
    imageResult = IMAGE_TIE;
  } else if (playerValue > 21 && computerValue > 21) {
    imageResult = IMAGE_TIE;
  } else if (playerValue < computerValue) {
    imageResult = IMAGE_LOSE;
  } else if (playerValue > computerValue) {
    imageResult = IMAGE_WIN;
  }
  return imageResult;
};

//give points based on win lose or tie
var givePoints = function (roundResult) {
  var point;
  if (roundResult == WIN) {
    point = userBet * 2;
  } else if (roundResult == LOSE) {
    point = userBet * -1;
  } else if (roundResult == TIE) {
    point = userBet * 0;
  }
  return point;
};

var deck = makeDeck();
var shuffledDeck = shuffleDeck(deck);

var playerScore = 100;
var userBet;
var playerHand = [];
var computerHand = [];
var myOutputValue;
var dealerChoice = HIT;
var playerChoice = HIT;
var currentImage;

var gameMode = INTRO_MODE;
var roundResult;

//MAIN FUNCTION STARTS HERE

var main = function (input) {
  if (gameMode == INTRO_MODE) {
    console.log("SEND HELP 0");
    myOutputValue = `Hi, How much do you want to bet? You have ${playerScore} points.`;
    gameMode = PLACE_BET;
    return myOutputValue;
  }
  //place a bet first
  if (gameMode == PLACE_BET) {
    console.log("SEND HELP 1");
    if (Number.isNaN(Number(input)) || input == "") {
      myOutputValue = ` Sorry please enter a number. <br><br> ${myOutputValue}`;
    } else if (input > 0 && input <= playerScore) {
      userBet = Number(input);
      myOutputValue = `You have placed a bet of ${userBet} points. 
      <br><br>Entering game of Blackjack...`;
      gameMode = GAME_START;
    } else if (input > playerScore)
      myOutputValue = `Please bet within your means... <br><br>${myOutputValue}`;

    return myOutputValue;
  }

  //Let's draw 2 cards and push them into each others hand
  if (gameMode == GAME_START) {
    var playerHandIndex = 0;
    var playerCardCapacity = 2;
    while (playerHandIndex < playerCardCapacity) {
      playerDrawnCard = shuffledDeck.pop();
      playerHand.push(playerDrawnCard);
      //console.log
      console.log("playerhand");
      console.log(playerHand[playerHandIndex]);

      playerHandIndex += 1;
    }

    //wait does the CPU draw first or the player draws first???
    var computerHandIndex = 0;
    var computerHandCapacity = 2;
    while (computerHandIndex < computerHandCapacity) {
      computerDrawnCard = shuffledDeck.pop();
      computerHand.push(computerDrawnCard);

      console.log("CPUhand");
      console.log(computerHand[computerHandIndex]);

      computerHandIndex += 1;
    }

    gameMode = PLAYER_CHOICE_MODE;

    myOutputValue = `${displayHandsStatement(playerHand, computerHand)}
    <br><br>${askHitOrStand()}`;
  }

  //Game loop starts here
  if (gameMode == PLAYER_CHOICE_MODE) {
    //validate the input

    if (input == HIT) {
      //ok draw more cards! draw mode...

      var playerCardCapacity = playerCardCapacity + 1;
      playerDrawnCard = shuffledDeck.pop();
      playerHand.push(playerDrawnCard);

      console.log("player hand after he hits");
      console.log(playerHand);

      playerHandIndex += 1;

      myOutputValue = `${displayHandsStatement(playerHand, computerHand)}
    <br><br>${askHitOrStand()}`;

      return myOutputValue;
    } else if (input == STAND) {
      playerChoice = STAND;
      if (dealerChoice == HIT) {
        gameMode = COMPUTER_CHOICE_MODE;
      } else if (dealerChoice == STAND) {
        gameMode = RESULT_MODE;
      }
    }
  }

  //computer's turn after player stand and he pray for the best
  if (gameMode == COMPUTER_CHOICE_MODE) {
    //first, computer see whats the value in his deck
    var computerValue = addAllCards(computerHand);
    //if his own hand is less than 17, he hits one more card and then decide to stand
    if (computerValue < 17) {
      var computerCardCapacity = computerCardCapacity + 1;
      computerDrawnCard = shuffledDeck.pop();
      computerHand.push(computerDrawnCard);

      console.log("computer hand after he hits");
      console.log(computerHand);

      computerHandIndex += 1;

      myOutputValue = `${displayHandsStatement(playerHand, computerHand)}
      <br><br> ${askHitOrStand()}`;
    } else if (computerValue >= 17) {
      myOutputValue = `${displayHandsStatement(playerHand, computerHand)}
      <br><br> ${declareStand()}
      <br><br> ${askHitOrStand()}`;
      dealerChoice = STAND;
      if (playerChoice == STAND) {
        gameMode = RESULT_MODE;
      }
    }

    gameMode = PLAYER_CHOICE_MODE;
  }

  if (gameMode == RESULT_MODE) {
    //console.log("RESULT MODE");
    var resultAnnouncement = checkWhoWinLose(playerHand, computerHand);
    var endRoundResult = checkRoundResult(playerHand, computerHand);
    playerScore = playerScore + givePoints(endRoundResult);
    currentImage = checkImageResult(playerHand, computerHand);
    resetGame();

    myOutputValue = `${resultAnnouncement}<br><br>Player's current score is ${playerScore}.
    <br><br>${currentImage}
    <br><br> Try again? Press Submit to go back to betting screen`;

    //myOutputValue = `${currentImage}`;
  }

  //var check2 = checkWhoWinLose(playerHand, computerHand);

  /*
  if (gameMode == DRAW_MODE) {
    myOutputValue = displayHandsStatement(playerHand, computerHand);
    return myOutputValue;
  }
  //}
*/
  //<br><br> ${resultAnnouncement}`;

  return myOutputValue;
};
