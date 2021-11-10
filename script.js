// global variables
var gameMode = "wager";
var wagerPoints = 0;

// All player related variables
var playerSum = 0;
var playerCard1 = {};
var playerCard2 = {};
var playerCard3 = {};
var playerCard4 = {};
var playerCard5 = {};
var playerScore = 100;
var playerWin = false;
var playerDraw = false;
var playerBustMessage = `BUST<br><br> PLAYER'S HAND <br><br>`;

// All dealer related variables
var dealerSum = 0;
var dealerCard1 = {};
var dealerCard2 = {};
var dealerCard3 = {};
var dealerCard4 = {};
var dealerCard5 = {};
var dealerBustMessage = `BUST<br><br> DEALER HAND <br><br>`;

// Check whether player and dealer bust or not
var playerBlackJack = false;
var dealerBlackJack = false;
var playerBust = false;
var dealerBust = false;
var loseImage = `<img src="https://c.tenor.com/MHwsB9o1eS4AAAAM/bh187-marvel.gif"/>`;
var bustImage = `<img src = "https://c.tenor.com/GoZ7JND7Fq0AAAAM/deadpool-x-men.gif"/>`;
var winImage = `<img src = "https://c.tenor.com/hJO8I8b8_38AAAAM/groot-dancing.gif" />`;
var blackjackImage = `<img src="https://c.tenor.com/p6f6aCbN7p0AAAAM/thor-thor-odinson.gif"/>`;
var drawImage = `<img src="https://c.tenor.com/Jft_4K8MU2IAAAAC/soso-notbad.gif" />`;

// Function to create deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["❤️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var scoreCounter = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } // return 10 because thats the value of the cards
      if (cardName == 11) {
        cardName = "Jack";
        scoreCounter = 10;
      }
      if (cardName == 12) {
        cardName = "Queen";
        scoreCounter = 10;
      }
      if (cardName == 13) {
        cardName = "King";
        scoreCounter = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: scoreCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// Function to help with the shuffling of cards
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  for (var currentIndex = 0; currentIndex < cardDeck.length; currentIndex++) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};

// Wager points before start of round
var pointsWager = function (input) {
  if (input == "") {
    myOutputValue = `Please input numbers from 0-100 to wager your points.`;
  } else {
    wagerPoints = Number(input);
    playerScore -= wagerPoints;
    myOutputValue = `You now have ${playerScore} points. <br><br> Press DEAL to begin drawing your cards.`;
    gameMode = "start";
  }
};

// Player to draw 2 cards
var playerDrawCards = function () {
  var counter = 0;
  //loop will run until 2 cards are drawn for the player
  while (counter < 1) {
    playerCard1 = shuffle.pop();
    playerCard2 = shuffle.pop();
    counter++;
  }
  playerSum = playerCard1.rank + playerCard2.rank;
  myOutputValue = `PLAYER'S HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br><br> Sum is ${playerSum} <br><br>
    Type "hit" to draw another card or "stand" to end turn.`;
  gameMode = "round1";
  // This is so that ace will be returned as 11 to make total sum be 21. This will check if player gets blackjack.
  // Blackjack checker when player draw first two cards
  if (
    playerSum == 11 &&
    (playerCard1.name == "Ace" || playerCard2.name == "Ace")
  ) {
    if (playerCard1.name == "Ace") {
      playerCard1.rank = 11;
      playerSum = playerCard1.rank + playerCard2.rank;
      // output that player has gotten blackjack and wins
      myOutputValue = `PLAYER'S HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br><br> Sum is ${playerSum} <br><br> PLAYER BLACKJACK`;
      playerBlackJack = true;
      gameMode = "results";
    }
    if (playerCard2.name == "Ace") {
      playerCard2.rank = 11;
      playerSum = playerCard1.rank + playerCard2.rank;
      // output that player has gotten blackjack and wins
      myOutputValue = `PLAYER'S HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br><br> Sum is ${playerSum} <br><br> PLAYER BLACKJACK`;
      playerBlackJack = true;
      // change game mode to results straight
      gameMode = "results";
    }
  }
  if (
    (playerCard1.name == "Ace" || playerCard2.name == "Ace") &&
    playerSum < 11
  ) {
    myOutputValue = `PLAYER'S HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br><br> Sum is ${playerSum} <br><br> Seems like your Ace can either be 1 or 11. Press DEAL now to decide. `;
    gameMode = "ace choice";
  }
};

// Player will choose whether they want the value of Ace to be 1 or 11
var aceChoice = function (input) {
  myOutputValue = `PLAYER'S HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br><br> Sum is ${playerSum} <br><br>
    Would you like your Ace to be 11 instead? (yes / no)`;
  console.log(gameMode);
  if (input == "yes" && playerCard1.name == "Ace") {
    playerCard1.rank = 11;
    playerSum = playerCard1.rank + playerCard2.rank;
    myOutputValue = `PLAYER'S HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br><br> Sum is ${playerSum} <br><br>
    Type "hit" to draw another card or "stand" to end turn.`;
    gameMode = "round1";
  }
  if (input == "yes" && playerCard2.name == "Ace") {
    playerCard2.rank = 11;
    playerSum = playerCard1.rank + playerCard2.rank;
    myOutputValue = `PLAYER'S HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br><br> Sum is ${playerSum} <br><br>
    Type "hit" to draw another card or "stand" to end turn.`;
    gameMode = "round1";
  }
  if (input == "no") {
    playerSum = playerCard1.rank + playerCard2.rank;
    myOutputValue = `PLAYER'S HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br><br> Sum is ${playerSum} <br><br>
    Type "hit" to draw another card or "stand" to end turn.`;
    gameMode = "round1";
  }
};

// Function to run when player first hit (3rd card)
var firstHit = function () {
  playerCard3 = shuffle.pop();
  playerSum = playerCard1.rank + playerCard2.rank + playerCard3.rank;
  // Check if bust or not
  if (playerSum > 21) {
    // if bust, return true
    playerBust = true;
    myOutputValue = `${bustImage} <br><br>${playerBustMessage} ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br>${playerCard3.name} of ${playerCard3.suit}<br><br> Sum is ${playerSum}<br><br> Press DEAL to end turn.`;
    gameMode = "results";
  } // if less than or equal 21, player can choose to continue or end turn
  if (playerSum <= 21) {
    myOutputValue = `PLAYER'S HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br>${playerCard3.name} of ${playerCard3.suit}<br><br> Sum is ${playerSum} <br><br>
    Type "hit" to draw another card or "stand" to end turn.`;
    gameMode = "round2";
  }
};

// Function to run when player second hit (4th card)
var secondHit = function () {
  playerCard4 = shuffle.pop();
  playerSum =
    playerCard1.rank + playerCard2.rank + playerCard3.rank + playerCard4.rank;
  // Check if bust or not
  if (playerSum > 21) {
    // If bust, return true
    playerBust = true;
    myOutputValue = `${bustImage} <br><br>${playerBustMessage} ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br>${playerCard3.name} of ${playerCard3.suit}<br>${playerCard4.name} of ${playerCard4.suit}<br><br> Sum is ${playerSum}<br><br> Press DEAL to end turn.`;
    gameMode = "results";
  } // if less than equal to 21, player can choose to continue or end turn
  if (playerSum <= 21) {
    myOutputValue = `PLAYER'S HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br>${playerCard3.name} of ${playerCard3.suit}<br>${playerCard4.name} of ${playerCard4.suit}<br><br> Sum is ${playerSum} <br><br>Type "hit" to draw another card or "stand" to end turn.`;
    gameMode = "round3";
  }
};

// Function to run when player third hit (5th card)
var thirdHit = function () {
  playerCard5 = shuffle.pop();
  playerSum =
    playerCard1.rank +
    playerCard2.rank +
    playerCard3.rank +
    playerCard4.rank +
    playerCard5.rank;
  if (playerSum > 21) {
    // if bust, output bust message
    playerBust = true;
    myOutputValue = `${bustImage} <br><br>${playerBustMessage} ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br>${playerCard3.name} of ${playerCard3.suit}<br>${playerCard4.name} of ${playerCard4.suit}<br>${playerCard5.name} of ${playerCard5.suit}<br><br> Sum is ${playerSum}<br><br> Press DEAL to end turn.`;
    gameMode = "results";
  }
  if (playerSum <= 21) {
    //if less than or equal to 21, player can choose to contnue or end turn
    myOutputValue = `PLAYER'S HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br>${playerCard3.name} of ${playerCard3.suit}<br>${playerCard4.name} of ${playerCard4.suit}<br>${playerCard5.name} of ${playerCard5.suit}<br><br> Sum is ${playerSum} <br><br>Type "hit" to draw another card or "stand" to end turn.`;
    gameMode = "end user turn";
  }
};

// Dealer draw cards
var dealerDrawCards = function () {
  var counter = 0;
  while (counter < 2) {
    dealerCard1 = shuffle.pop();
    dealerCard2 = shuffle.pop();
    counter++;
  }
  dealerSum = dealerCard1.rank + dealerCard2.rank;
  // Checking if dealer gets blackjack or not
  if (
    dealerSum == 11 &&
    (dealerCard1.name == "Ace" || dealerCard2.name == "Ace")
  ) {
    if (dealerCard1.name == "Ace") {
      dealerCard1.rank = 11;
      dealerSum = dealerCard1.rank + dealerCard2.rank;
    }
    if (dealerCard2.name == "Ace") {
      dealerCard2.rank = 11;
      dealerSum = dealerCard1.rank + dealerCard2.rank;
    } // if dealer gets blackjack, immediately wins
    myOutputValue = `DEALER HAND <br><br> ${dealerCard1.name} of ${dealerCard1.suit} <br> ${dealerCard2.name} of ${dealerCard2.suit}<br><br> Sum is ${dealerSum}<br><br> DEALER BLACKJACK`;
    dealerBlackJack = true;
    gameMode = "results";
  }

  // Add mroe cards to dealer's hand if lesser than 17
  if (dealerSum < 17) {
    dealerCard3 = shuffle.pop();
    dealerSum = dealerCard1.rank + dealerCard2.rank + dealerCard3.rank;
    // check if bust
    if (dealerSum > 21) {
      dealerBust = true;
      myOutputValue = `${dealerBustMessage} ${dealerCard1.name} of ${dealerCard1.suit} <br> ${dealerCard2.name} of ${dealerCard2.suit}<br> ${dealerCard3.name} of ${dealerCard3.suit}<br><br> Sum is ${dealerSum} <br><br> Press DEAL to reveal results.`;
      gameMode = "results";
      // if not bust, display the dealers hand
    } else {
      myOutputValue = `DEALER HAND <br><br> ${dealerCard1.name} of ${dealerCard1.suit} <br> ${dealerCard2.name} of ${dealerCard2.suit}<br> ${dealerCard3.name} of ${dealerCard3.suit}<br><br> Sum is ${dealerSum}<br><br> Press DEAL to reveal results.`;
      gameMode = "results";
    }
  } // If more than 21, return bust
  // Add one more if still less than 17
  if (dealerSum < 17) {
    dealerCard4 = shuffle.pop();
    dealerSum =
      dealerCard1.rank + dealerCard2.rank + dealerCard3.rank + dealerCard4.rank;
    if (dealerSum > 21) {
      dealerBust = true;
      myOutputValue = `${dealerBustMessage} ${dealerCard1.name} of ${dealerCard1.suit} <br> ${dealerCard2.name} of ${dealerCard2.suit}<br> ${dealerCard3.name} of ${dealerCard3.suit}<br> ${dealerCard4.name} of ${dealerCard4.suit}<br><br> Sum is ${dealerSum} <br><br> Press DEAL to reveal results.`;
      gameMode = "results";
    } else {
      myOutputValue = `DEALER HAND <br><br> ${dealerCard1.name} of ${dealerCard1.suit} <br> ${dealerCard2.name} of ${dealerCard2.suit}<br> ${dealerCard3.name} of ${dealerCard3.suit}<br> ${dealerCard4.name} of ${dealerCard4.suit}<br><br> Sum is ${dealerSum}<br><br> Press DEAL to reveal results.`;
      gameMode = "results";
    }
  }
  // it will keep adding as long as below 17
  if (dealerSum < 17) {
    dealerCard5 = shuffle.pop();
    dealerSum =
      dealerCard1.rank +
      dealerCard2.rank +
      dealerCard3.rank +
      dealerCard4.rank +
      dealerCard5.rank;
    if (dealerSum > 21) {
      dealerBust = true;
      myOutputValue = `${dealerBustMessage} ${dealerCard1.name} of ${dealerCard1.suit} <br> ${dealerCard2.name} of ${dealerCard2.suit}<br> ${dealerCard3.name} of ${dealerCard3.suit}<br>${dealerCard4.name} of ${dealerCard4.suit}<br> ${dealerCard5.name} of ${dealerCard5.suit}<br><br> Sum is ${dealerSum} <br><br> Press DEAL to reveal results.`;
      gameMode = "results";
    } else {
      myOutputValue = `DEALER HAND <br><br> ${dealerCard1.name} of ${dealerCard1.suit} <br> ${dealerCard2.name} of ${dealerCard2.suit}<br> ${dealerCard3.name} of ${dealerCard3.suit}<br> ${dealerCard4.name} of ${dealerCard4.suit}<br> ${dealerCard5.name} of ${dealerCard5.suit}<br><br> Sum is ${dealerSum}<br><br> Press DEAL to reveal results.`;
      gameMode = "results";
    }
  }
};

// Tally all results here
var finalResults = function () {
  if (playerBlackJack == true) {
    wagerPoints = wagerPoints * 2;
    playerScore += wagerPoints;
    myOutputValue = `${blackjackImage}Player wins. <br><br> PLAYER POINTS : ${playerScore}<br><br> Press DEAL to restart the round.`;
  } else if (dealerBlackJack == true) {
    myOutputValue = ` ${loseImage}Dealer wins. <br><br> PLAYER POINTS : ${playerScore}<br><br> Press DEAL to restart the round.`;
  } else if (playerSum == dealerSum) {
    playerScore += wagerPoints;
    myOutputValue = `${drawImage}<br><br>It's a draw. <br><br> PLAYER POINTS : ${playerScore}<br><br> Press DEAL to restart the round.`;
  } else if (playerSum > dealerSum && playerBust == false) {
    wagerPoints = wagerPoints * 2;
    playerScore += wagerPoints;
    myOutputValue = `${winImage}<br><br>Player wins. <br><br> PLAYER POINTS : ${playerScore}<br><br> Press DEAL to restart the round.`;
  } else if (dealerBust == true) {
    wagerPoints = wagerPoints * 2;
    playerScore += wagerPoints;
    myOutputValue = `${winImage}<br><br>Player wins. <br><br> PLAYER POINTS : ${playerScore}<br><br> Press DEAL to restart the round.`;
  } else if (dealerSum > playerSum) {
    myOutputValue = `${loseImage}<br><br>Dealer wins. <br><br> PLAYER POINTS : ${playerScore}<br><br> Press DEAL to restart the round.`;
  } else if (playerBust == true) {
    myOutputValue = `${loseImage}<br><br>Dealer wins. <br><br> PLAYER POINTS : ${playerScore}<br><br> Press DEAL to restart the round.`;
  } else if (
    playerSum < dealerSum &&
    dealerBust == true &&
    playerBust == false
  ) {
    wagerPoints = wagerPoints * 2;
    playerScore += wagerPoints;
    myOutputValue = `${winImage}<br><br>Player wins. <br><br> PLAYER POINTS : ${playerScore}<br><br> Press DEAL to restart the round.`;
  }
  gameMode = "wager";
};
var deckOfCards = makeDeck();
var shuffle = shuffleCards(deckOfCards);
var main = function (input) {
  // Wager points before drawing cards
  if (gameMode == "wager") {
    pointsWager(input);
  }
  // draw 2 when dealing
  else if (gameMode == "start") {
    playerDrawCards();
  } else if (gameMode == "ace choice") {
    aceChoice(input);
    // will run when type hit for first round
  } else if (gameMode == "round1" && input == "hit") {
    firstHit();
    // will run when type hit for second round
  } else if (gameMode == "round2" && input == "hit") {
    secondHit();
    // will run when type hit for third round
  } else if (gameMode == "round3" && input == "hit") {
    thirdHit();
  } else if (
    // dealers turn to draw cards. must be above 17.
    // will only run if "stand" is input
    input == "stand" &&
    (gameMode == "end user turn" ||
      gameMode == "round3" ||
      gameMode == "round2" ||
      gameMode == "round1")
  ) {
    dealerDrawCards();
  } else if (gameMode == "results") {
    finalResults();
  }
  return myOutputValue;
};
