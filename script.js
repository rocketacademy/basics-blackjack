// global variables
var gameMode = "start";
var playerMode = "";
var playerSum = 0;
var computerSum = 0;
var playerCard1 = {};
var playerCard2 = {};
var playerCard3 = {};
var playerCard4 = {};
var playerBustMessage = `BUST<br><br> YOUR HAND <br><br>`;
var computerCard1 = {};
var computerCard2 = {};
var computerCard3 = {};
var computerBustMessage = `BUST<br><br> COMPUTER HAND <br><br>`;
var playerBust = false;
var computerBust = false;
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Hearts ❤️", "Diamonds ♦️", "Clubs ♣️", "Spades ♠️"];

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
      }
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

var main = function (input) {
  var deckOfCards = makeDeck();
  var shuffle = shuffleCards(deckOfCards);
  // draw 2 when dealing
  if (gameMode == "start") {
    var counter = 0;
    while (counter < 2) {
      playerCard1 = shuffle.pop();
      playerCard2 = shuffle.pop();
      computerCard1 = shuffle.pop();
      computerCard2 = shuffle.pop();
      counter++;
    }
    playerSum = playerCard1.rank + playerCard2.rank;
    if (
      playerSum == 11 &&
      (playerCard1.name == "Ace" || playerCard2.name == "Ace")
    ) {
      if (playerCard1.name == "Ace") {
        playerCard1.rank = 11;
        playerSum = playerCard1.rank + playerCard2.rank;
      }
      if (playerCard2.name == "Ace") {
        playerCard2.rank = 11;
        playerSum = playerCard1.rank + playerCard2.rank;
      }
    }
    myOutputValue = `YOUR HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br><br> Sum is ${playerSum} <br><br>
    Type "hit" to draw another card or "stand" to end turn.`;
    gameMode = "round1";
  } else if (gameMode == "round1" && input == "hit") {
    playerCard3 = shuffle.pop();
    playerSum = playerCard1.rank + playerCard2.rank + playerCard3.rank;
    console.log(playerCard3.name);
    if (playerSum < 21 && playerCard3.name == "Ace") {
      myOutputValue = "Would you like your ace to be 1 or 11?";
      if (input == 11) {
        playerCard3.rank = 11;
        playerSum = playerCard1.rank + playerCard2.rank + playerCard3.rank;
        myOutputValue = `YOUR HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br>${playerCard3.name} of ${playerCard3.suit}<br><br> Sum is ${playerSum} <br><br>
    Type "hit again" to draw another card or "stand" to end turn.`;
        playerMode = "round2";
      }
    }
    myOutputValue = `YOUR HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br>${playerCard3.name} of ${playerCard3.suit}<br><br> Sum is ${playerSum} <br><br>
    Type "hit again" to draw another card or "stand" to end turn.`;
    playerMode = "round2";
  }
  if (gameMode == "round1" && playerSum > 21) {
    playerBust = true;
    myOutputValue = `${playerBustMessage} ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br>${playerCard3.name} of ${playerCard3.suit}<br><br> Sum is ${playerSum}<br><br> Press DEAL to end turn.`;
    gameMode = "end user turn";
  } else if (playerMode == "round2" && input == "hit again") {
    playerCard4 = shuffle.pop();
    console.log(playerCard4.name);
    playerSum =
      playerCard1.rank + playerCard2.rank + playerCard3.rank + playerCard4.rank;
    if (playerSum > 21) {
      playerBust = true;
      myOutputValue = `${playerBustMessage} ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br>${playerCard3.name} of ${playerCard3.suit}<br>${playerCard4.name} of ${playerCard4.suit}<br><br> Sum is ${playerSum}<br><br> Press DEAL to end turn.`;
      gameMode = "end user turn";
    }
    if (playerSum <= 21) {
      myOutputValue = `YOUR HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br>${playerCard3.name} of ${playerCard3.suit}<br>${playerCard4.name} of ${playerCard4.suit}<br><br> Sum is ${playerSum} <br><br>
          Type "hit" to draw another card or "stand" to end turn.`;
      gameMode = "end user";
    }
    if (playerSum < 21 && playerCard4.name == "Ace") {
      myOutputValue = "Would you like your ace to be 1 or 11?";
      if (input == 1) {
        playerSum =
          playerCard1.rank +
          playerCard2.rank +
          playerCard3.rank +
          playerCard4.rank;
        myOutputValue = `YOUR HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br>${playerCard3.name} of ${playerCard3.suit}<br>${playerCard4.name} of ${playerCard4.suit}<br><br> Sum is ${playerSum} <br><br>
    Type "hit" to draw another card or "stand" to end turn.`;
      } else if (input == 11) {
        playerCard4 = 11;
        playerSum =
          playerCard1.rank +
          playerCard2.rank +
          playerCard3.rank +
          playerCard4.rank;
        myOutputValue = `YOUR HAND <br><br> ${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}<br>${playerCard3.name} of ${playerCard3.suit}<br>${playerCard4.name} of ${playerCard4.suit}<br><br> Sum is ${playerSum} <br><br>
    Type "hit" to draw another card or "stand" to end turn.`;
      }
    }
  } else if (input == "stand" || gameMode == "end user turn") {
    computerSum = computerCard1.rank + computerCard2.rank;
    myOutputValue = `COMPUTER HAND <br><br> ${computerCard1.name} of ${computerCard1.suit} <br> ${computerCard2.name} of ${computerCard2.suit}<br><br> Sum is ${computerSum}<br><br> Press DEAL to reveal results.`;

    if (computerSum < 17) {
      computerCard3 = shuffle.pop();
      computerSum =
        computerCard1.rank + computerCard2.rank + computerCard3.rank;
      myOutputValue = `COMPUTER HAND <br><br> ${computerCard1.name} of ${computerCard1.suit} <br> ${computerCard2.name} of ${computerCard2.suit}<br> ${computerCard3.name} of ${computerCard3.suit}<br><br> Sum is ${computerSum}<br><br> Press DEAL to reveal results.`;
      if (computerSum < 17) {
        computerCard4 = shuffle.pop();
        computerSum =
          computerCard1.rank +
          computerCard2.rank +
          computerCard3.rank +
          computerCard4.rank;
        if (computerSum < 21 && computerCard4.name == "Ace") {
          computerCard4.rank = 11;
        }
        myOutputValue = `COMPUTER HAND <br><br> ${computerCard1.name} of ${computerCard1.suit} <br> ${computerCard2.name} of ${computerCard2.suit}<br> ${computerCard3.name} of ${computerCard3.suit}<br> ${computerCard4.name} of ${computerCard4.suit}<br><br> Sum is ${computerSum}<br><br> Press DEAL to reveal results.`;
      }
    }
    if (computerSum > 21) {
      computerBust = true;
      myOutputValue = `${computerBustMessage} ${computerCard1.name} of ${computerCard1.suit} <br> ${computerCard2.name} of ${computerCard2.suit}<br> ${computerCard3.name} of ${computerCard3.suit}<br><br> Sum is ${computerSum} <br><br> Press DEAL to reveal results.`;
    }
    gameMode = "results";
  } else if (gameMode == "results") {
    console.log(playerBust);
    console.log(computerBust);
    if (playerBust == true && computerBust == true) {
      myOutputValue = `It's a draw. `;
    } else if (playerSum == computerSum) {
      myOutputValue = `It's a draw. `;
    } else if (playerSum > computerSum && playerBust == false) {
      myOutputValue = `Player wins.`;
    } else if (computerBust == true && playerBust == false) {
      myOutputValue = `Player wins.`;
    } else if (computerSum > playerSum) {
      myOutputValue = `Computer wins.`;
    } else if (playerBust == true && computerBust == false) {
      myOutputValue = `Computer wins.`;
    } else if (playerSum < computerSum && computerBust == true) {
      myOutputValue = `Player wins.`;
    } else if (computerSum < playerSum && playerBust == true) {
      myOutputValue = "Computer wins.";
    }
    gameMode = "start";
  }
  return myOutputValue;
};
