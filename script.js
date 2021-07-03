var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts ❤️", "diamonds 💎", "clubs ♣️", "spades♠️"];
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

var initialCards = function (shuffledDeck, playerHand, computerHand) {
  var counter = 0;
  while (counter < 2) {
    var playerCard = shuffledDeck.pop();
    playerHand.push(playerCard);

    var computerCard = shuffledDeck.pop();
    computerHand.push(computerCard);

    counter = counter + 1;
  }
  console.log("Player Cards:");
  console.log(playerHand);
  console.log("Computer Cards: ");
  console.log(computerHand);
};

var hitOneCard = function (currentPlayerArray) {
  var additionalCard = shuffledDeck.pop();
  currentPlayerArray.push(additionalCard);
};

var sumOfCards = function (cardsArray) {
  var currentPlayerTotal = 0;
  var counter = 0;
  while (counter < cardsArray.length) {
    var cardValue = cardsArray[counter].name;
    if (cardValue == "jack" || cardValue == "queen" || cardValue == "king") {
      cardValue = 10;
      //change this later
    } else if (cardValue == "ace") {
      cardValue = 1;
    }
    currentPlayerTotal = currentPlayerTotal + Number(cardValue);

    counter = counter + 1;
  }
  console.log(currentPlayerTotal);
  return currentPlayerTotal;
};

var gotAce = function (playerHand) {
  var index = 0;
  while (index < playerHand.length) {
    if (playerHand[index].name == "ace") {
      return true;
    }
    index = index + 1;
  }
};

var chooseAceValue = function (input, playerHand) {
  var index = 0;
  while (index < playerHand.length) {
    if (playerHand[index].name == "ace") {
      playerHand[index].name = input;
    }
    index = index + 1;
  }
};

var showCards = function (playerHand) {
  var index = 0;
  var showCards = "";
  while (index < playerHand.length) {
    var cardSuits = playerHand[index].suit;
    var cardName = playerHand[index].name;
    showCards = `${showCards}<br> ${cardName} of ${cardSuits}`;
    index = index + 1;
  }
  return showCards;
};

var checkComputerHand = function (computerHand) {
  var computerCardSum = sumOfCards(computerHand);
  while (computerCardSum < 17) {
    var computerCard = shuffledDeck.pop();
    computerHand.push(computerCard);
    computerCardSum = sumOfCards(computerHand);
  }
};

var compareSum = function (playerHand, computerHand, playerPoints, playerBet) {
  var playerSum = sumOfCards(playerHand);
  var computerSum = sumOfCards(computerHand);
  if (playerSum == 21) {
    var playerWinnings = 1.5 * Number(playerBet);
    return `Your final cards: ${showCards(
      playerHand
    )}<br>Total cards: ${playerSum}<br> You won!<br> You got ${playerWinnings}<br> Your Total Points: ${playerPoints}<br><br>Place your again!`;
  } else if (computerSum > 21 || computerSum < playerSum) {
    return `Your final cards: ${showCards(
      playerHand
    )}<br>Total cards: ${playerSum}<br><br>Computer Final Cards: ${showCards(
      computerHand
    )}<br>Computer Total ${computerSum} You won!<br> You got ${playerBet}<br> Your Total Points: ${playerPoints}<br><br>Place your bet again`;
  } else if (computerSum > playerSum) {
    return `Your final cards: ${showCards(
      playerHand
    )}<br>Total cards: ${playerSum}<br><br>Computer Final Cards: ${showCards(
      computerHand
    )}<br>Comp Total: ${computerSum} You lost!<br> Dealer will take ${playerBet} bet <br> Your Total Points: ${playerPoints}<br><br>Place Your Bet Again!`;
  } else if (playerPoints < 100) {
    return "You dont have enough money left. Go Home!";
  }
};
var outputMessage = function (
  playerName,
  playerPoints,
  playerBet,
  playerHand,
  haveAce
) {
  playerSum = sumOfCards(playerHand);
  if (haveAce == true) {
    var outputMessage = `Player name:${playerName}<br>Total Points Remaining: ${playerPoints}<br><br> Bet for this round: ${playerBet} <br><br> ${showCards(
      playerHand
    )}<br><br>Current Card Total: ${playerSum}<br>You got an ACE, Please choose if 1 or 11?`;
    return outputMessage;
  } else {
    var outputMessage = `Player name:${playerName}<br>Total Points Remaining: ${playerPoints}<br><br> Bet for this round: ${playerBet} <br><br> ${showCards(
      playerHand
    )}<br><br>Current Card Total: ${playerSum}<br><br>hit or stand?`;
    return outputMessage;
  }
};

var initialGameStage = function (currentGameState, input) {
  if (currentGameState == "ask player name") {
    currentGameState = "ask bet";
    return "Welcome to Black Jack! <br> Please tell me your name.";
  }
  if (currentGameState == "ask bet") {
    currentGameState = "game start";
    playerName = input;
    return `Hi ${playerName}! You have, ${playerPoints} points.<br><br>Place your bet! <br><br> Let's Play Black Jack! <br><br><br> Watch this video to know the game more: <br>https://www.youtube.com/watch?v=eyoh-Ku9TCI `;
  }
  if (currentGameState == "continue game") {
    currentGameState = "game start";
    playerName = input;
    return `Hi ${playerName}! You have, ${playerPoints} points remaining.<br><br>Place your bet again!`;
  }
  if (currentGameState == "game start") {
    if (isNaN(input) == false) {
      if (input <= playerPoints) {
        playerBet = Number(input);
      } else if (input > playerPoints) {
        return `Your current point: ${playerPoints} Your bet exceeds your points. Please try again.<br><br> Place your bet!`;
      }
      initialCards(shuffledDeck, playerHand, computerHand);
      playerTotal = sumOfCards(playerHand);
      gameStart = false;
      nowPlaying = true;
      if (gotAce(playerHand) == true) {
        haveAce = true;
        return outputMessage(
          playerName,
          playerPoints,
          playerBet,
          playerHand,
          haveAce
        );
      }
      return outputMessage(
        playerName,
        playerPoints,
        playerBet,
        playerHand,
        haveAce
      );
    }
  }
};

var resetGame = function () {
  playerTotal = 0;
  computerTotal = 0;
  playerHand = [];
  computerHand = [];
  gameStart = true;
  nowPlaying = false;
  hit = false;
  haveAce = false;
};

//________________________MAIN____________________//

var playerTotal = 0;
var computerTotal = 0;
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var playerHand = [];
var computerHand = [];
var gameStart = true;
var nowPlaying = false;
var hit = false;
var haveAce = false;
var welcomePlayer = true;
var gotPlayerName = false;
var gotBet = false;
var drawInitialCards = false;

var playerName = "";
var playerPoints = 100;
var playerBet = 0;
var currentGameState = "ask player name";

var main = function (input) {
  if (gameStart == true) {
    if (welcomePlayer == true) {
      currentGameState = "ask player name";
      gotPlayerName = true;
      welcomePlayer = false;
      return initialGameStage(currentGameState, input);
    } else if (gotPlayerName == true) {
      currentGameState = "ask bet";
      gotPlayerName = false;
      drawInitialCards = true;
      return initialGameStage(currentGameState, input);
    } else if (drawInitialCards == true) {
      resetGame();
      currentGameState = "game start";
      gotPlayerName = false;
      return initialGameStage(currentGameState, input);
    }
  }
  if (nowPlaying == true && haveAce == true) {
    chooseAceValue(input, playerHand);
    haveAce = false;
    return outputMessage(
      playerName,
      playerPoints,
      playerBet,
      playerHand,
      haveAce
    );
  }
  if (nowPlaying == true && haveAce == false) {
    if (input == "hit") {
      hitOneCard(playerHand);
      if (gotAce(playerHand) == true) {
        haveAce = true;
        return outputMessage(
          playerName,
          playerPoints,
          playerBet,
          playerHand,
          haveAce
        );
      }
      playerTotal = sumOfCards(playerHand);
      if (playerTotal > 21) {
        resetGame();
        return `BUST! Your total is ${playerTotal} You Lost`;
      }
      return outputMessage(
        playerName,
        playerPoints,
        playerBet,
        playerHand,
        haveAce
      );
    } else if (input == "stand") {
      checkComputerHand(computerHand);
      var sumOfCardsPlayer = sumOfCards(playerHand);
      var sumOfCardsComputer = sumOfCards(computerHand);
      if (sumOfCardsPlayer == 21) {
        playerPoints = playerPoints + 1.5 * playerBet;
      } else if (
        sumOfCardsPlayer > sumOfCardsComputer ||
        sumOfCardsComputer > 21
      ) {
        playerPoints = playerPoints + playerBet;
      } else if (sumOfCardsComputer > sumOfCardsPlayer) {
        playerPoints = playerPoints - playerBet;
      }
      outputGameMessage = compareSum(
        playerHand,
        computerHand,
        playerPoints,
        playerBet
      );
      nowPlaying = false;
      gameStart = true;
      drawInitialCards = true;
      return outputGameMessage;
    }
  }
  return `Something Went Wrong, Try Again`;
};
