var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var valueCount = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
        valueCount = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        valueCount = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        valueCount = 10;
      } else if (cardName == 13) {
        cardName = "king";
        valueCount = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: valueCount,
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

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

var suitIcon = function (suit) {
  if (suit == "hearts") {
    return "♥️";
  } else if (suit == "diamonds") {
    return "♦️";
  } else if (suit == "clubs") {
    return "♣️";
  } else return "♠️";
};

var gameMode = "start";

var playerCard1 = 0;
var playerCard2 = 0;
var playerCards = [];
var computerCard1 = 0;
var computerCard2 = 0;
var computerCards = [];
var shuffledDeckOfCards = [];
var playerScore = 0;
var computerScore = 0;
var cardsLeft = 47;
var cardsDrawn = "";
var playerAceCounter = 0;
var computerAceCounter = 0;

var main = function (input) {
  if (gameMode == "start") {
    var myOutputValue = `Press submit to start the game.`;
    gameMode = "dealCards";
    playerAceCounter = 0;
    computerAceCounter = 0;
    playerScore = 0;
    computerScore = 0;
    playerCards = [];
    computerCards = [];
    cardsLeft = 47;
    return myOutputValue;
  }

  if (gameMode == "dealCards") {
    var deckOfCards = makeDeck();
    shuffledDeckOfCards = shuffleCards(deckOfCards);
    playerCard1 = shuffledDeckOfCards[51];
    playerCard2 = shuffledDeckOfCards[50];
    playerCards.push(playerCard1);
    playerCards.push(playerCard2);
    computerCard1 = shuffledDeckOfCards[49];
    computerCard2 = shuffledDeckOfCards[48];
    computerCards.push(computerCard1);
    computerCards.push(computerCard2);
    cardsLeft = 47;

    var index = 0;
    var playerOutputValue = "";
    while (index < playerCards.length) {
      playerOutputValue =
        playerOutputValue +
        `<br>${playerCards[index].name} of ${suitIcon(
          playerCards[index].suit
        )}`;
      index += 1;
    }
    var index2 = 0;
    var computerOutputValue = "";
    while (index2 < computerCards.length) {
      computerOutputValue =
        computerOutputValue +
        `<br>${computerCards[index2].name} of ${suitIcon(
          computerCards[index2].suit
        )}`;
      index2 += 1;
    }

    cardsDrawn = `You drew: ${playerOutputValue}.<br>Dealer drew: ${computerOutputValue} `;

    var index3 = 0;
    while (index3 < playerCards.length) {
      playerScore = playerScore + playerCards[index3].value;
      index3 += 1;
    }

    var index4 = 0;
    while (index4 < computerCards.length) {
      computerScore = computerScore + computerCards[index4].value;
      index4 += 1;
    }

    if (computerCard1.name == "ace" && computerCard2.name == "ace") {
      computerScore = computerScore - 10;
    }
    if (playerCard1.name == "ace" && computerCard2.name == "ace") {
      playerScore = playerScore - 10;
    }
    if (computerCard1.name == "ace" || computerCard2.name == "ace") {
      computerAceCounter += 1;
    }
    if (playerCard1.name == "ace" || computerCard2.name == "ace") {
      playerAceCounter += 1;
    }
    if (playerScore > computerScore && computerScore > 16) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Click "hit" or "stand" to continue. `;
      var hitButton = document.getElementById("hit-button");
      hitButton.removeAttribute("disabled");
      var standButton = document.getElementById("stand-button");
      standButton.removeAttribute("disabled");
      var submitButton = document.getElementById("submit-button");
      submitButton.disabled = true;

      if (
        (playerCard1.rank > 10 && playerCard2.rank == 1) ||
        (playerCard2.rank > 10 && playerCard1 == 1)
      ) {
        var conclusion = `Player has blackjack. Player wins.`;
        gameMode = "start";
        return cardsDrawn + "<br>" + conclusion;
      }
      gameMode = "decision";
      return cardsDrawn + "<br>" + conclusion;
    }
    if (playerScore > computerScore && computerScore < 17) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Dealer stands on 17. Click "hit" or "stand" to continue.`;
      gameMode = "decision";
      var hitButton = document.getElementById("hit-button");
      hitButton.removeAttribute("disabled");
      var standButton = document.getElementById("stand-button");
      standButton.removeAttribute("disabled");
      var submitButton = document.getElementById("submit-button");
      submitButton.disabled = true;

      return cardsDrawn + "<br>" + conclusion;
    }
    if (computerScore > playerScore && computerScore > 16) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Click "hit" or "stand" to continue. `;
      var hitButton = document.getElementById("hit-button");
      hitButton.removeAttribute("disabled");
      var standButton = document.getElementById("stand-button");
      standButton.removeAttribute("disabled");
      var submitButton = document.getElementById("submit-button");
      submitButton.disabled = true;

      if (
        (computerCard1.rank > 10 && computerCard2.rank == 1) ||
        (computerCard2.rank > 10 && computerCard1 == 1)
      ) {
        var conclusion = `Dealer has blackjack. Dealer wins.`;
        gameMode = "start";
        return cardsDrawn + "<br>" + conclusion;
      }
      gameMode = "decision";
      return cardsDrawn + "<br>" + conclusion;
    }
    if (computerScore > playerScore && computerScore < 17) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Dealer stands on 17. Click "hit" or "stand" to continue.`;
      gameMode = "decision";
      var hitButton = document.getElementById("hit-button");
      hitButton.removeAttribute("disabled");
      var standButton = document.getElementById("stand-button");
      standButton.removeAttribute("disabled");
      var submitButton = document.getElementById("submit-button");
      submitButton.disabled = true;

      return cardsDrawn + "<br>" + conclusion;
    }

    if (playerScore == computerScore && computerScore > 16) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Its a tie currently. Click "hit" or "stand" to continue. `;
      gameMode = "decision";
      var hitButton = document.getElementById("hit-button");
      hitButton.removeAttribute("disabled");
      var standButton = document.getElementById("stand-button");
      standButton.removeAttribute("disabled");
      var submitButton = document.getElementById("submit-button");
      submitButton.disabled = true;

      return cardsDrawn + "<br>" + conclusion;
    }

    if (playerScore == computerScore && computerScore < 17) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Its a tie currently. Dealer stands on 17. Click "hit" or "stand" to continue. `;
      var hitButton = document.getElementById("hit-button");
      hitButton.removeAttribute("disabled");
      var standButton = document.getElementById("stand-button");
      standButton.removeAttribute("disabled");
      var submitButton = document.getElementById("submit-button");
      submitButton.disabled = true;
      gameMode = "decision";
      return cardsDrawn + "<br>" + conclusion;
    }
  }
  if (gameMode == "decision") {
    if (input !== "hit" && input !== "stand") {
      var myOutputValue = `Please input either "hit" or "stand" to continue. `;
      var hitButton = document.getElementById("hit-button");
      hitButton.removeAttribute("disabled");
      var standButton = document.getElementById("stand-button");
      standButton.removeAttribute("disabled");
      var submitButton = document.getElementById("submit-button");
      submitButton.disabled = true;

      return myOutputValue;
    }
    if (input == "hit") {
      var playerCard = shuffledDeckOfCards[cardsLeft];
      playerCards.push(playerCard);
      cardsLeft -= 1;

      playerScore = playerScore + playerCard.value;

      if (
        (playerScore > 21 && playerCard.name == "ace") ||
        (playerScore > 21 && playerAceCounter == 1)
      ) {
        playerScore = playerScore - 10;
        playerAceCounter -= 1;
      }

      var index = 0;
      var playerOutputValue = "";
      while (index < playerCards.length) {
        playerOutputValue =
          playerOutputValue +
          `<br>${playerCards[index].name} of ${suitIcon(
            playerCards[index].suit
          )}`;
        index += 1;
      }
      var index2 = 0;
      var computerOutputValue = "";
      while (index2 < computerCards.length) {
        computerOutputValue =
          computerOutputValue +
          `<br>${computerCards[index2].name} of ${suitIcon(
            computerCards[index2].suit
          )}`;
        index2 += 1;
      }

      cardsDrawn = `You drew: ${playerOutputValue}.<br>Dealer drew: ${computerOutputValue} `;

      if (playerScore > 21) {
        var results = `Busted. You have ${playerScore} points. You lose.`;
        gameMode = "start";
        var submitButton = document.getElementById("submit-button");
        submitButton.removeAttribute("disabled");
        return cardsDrawn + "<br>" + results;
      }
      var results = `You have ${playerScore} points. Click "hit" or "stand" to continue". `;
      var hitButton = document.getElementById("hit-button");
      hitButton.removeAttribute("disabled");
      var standButton = document.getElementById("stand-button");
      standButton.removeAttribute("disabled");
      var submitButton = document.getElementById("submit-button");
      submitButton.disabled = true;

      return cardsDrawn + "<br>" + results;
    }
    if (input == "stand") {
      var results = `You have chosen to stand with ${playerScore} points. Click submit to continue. `;
      gameMode = "final";
      var submitButton = document.getElementById("submit-button");
      submitButton.removeAttribute("disabled");
      return results;
    }
  }

  if (gameMode == "final") {
    if (playerScore > computerScore && computerScore > 16) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. You Win. `;
      var submitButton = document.getElementById("submit-button");
      submitButton.removeAttribute("disabled");
      if (
        (playerCard1.rank > 10 && playerCard2.rank == 1) ||
        (playerCard2.rank > 10 && playerCard1 == 1)
      ) {
        var conclusion = `Player has blackjack. Player wins.`;
        gameMode = "start";
        var submitButton = document.getElementById("submit-button");
        submitButton.removeAttribute("disabled");
        return cardsDrawn + "<br>" + conclusion;
      }
      gameMode = "start";
      return cardsDrawn + "<br>" + conclusion;
    }
    if (playerScore > computerScore && computerScore < 17) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Dealer stands on 17. Click submit to continue.`;
      gameMode = "computerDraws";
      var submitButton = document.getElementById("submit-button");
      submitButton.removeAttribute("disabled");
      return cardsDrawn + "<br>" + conclusion;
    }
    if (computerScore > playerScore && computerScore > 16) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. You lose. `;
      if (
        (computerCard1.rank > 10 && computerCard2.rank == 1) ||
        (computerCard2.rank > 10 && computerCard1 == 1)
      ) {
        var conclusion = `Dealer has blackjack. Dealer wins.`;
        gameMode = "start";
        var submitButton = document.getElementById("submit-button");
        submitButton.removeAttribute("disabled");
        return cardsDrawn + "<br>" + conclusion;
      }
      gameMode = "start";
      var submitButton = document.getElementById("submit-button");
      submitButton.removeAttribute("disabled");
      return cardsDrawn + "<br>" + conclusion;
    }
    if (computerScore > playerScore && computerScore < 17) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Dealer stands on 17. Click submit to continue.`;
      gameMode = "computerDraws";
      var submitButton = document.getElementById("submit-button");
      submitButton.removeAttribute("disabled");
      return cardsDrawn + "<br>" + conclusion;
    }

    if (playerScore == computerScore && computerScore > 16) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. It's a tie. `;
      gameMode = "start";
      var submitButton = document.getElementById("submit-button");
      submitButton.removeAttribute("disabled");
      return cardsDrawn + "<br>" + conclusion;
    }

    if (playerScore == computerScore && computerScore < 17) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. It's a tie currently. Dealer stands on 17. Click submit to continue. `;
      gameMode = "computerDraws";
      var submitButton = document.getElementById("submit-button");
      submitButton.removeAttribute("disabled");
      return cardsDrawn + "<br>" + conclusion;
    }
  }

  if (gameMode == "computerDraws") {
    var computerCard = shuffledDeckOfCards[cardsLeft];
    computerCards.push(computerCard);
    cardsLeft -= 1;
    computerScore = computerScore + computerCard.value;
    var drawNumber = 0;

    if (
      (computerScore > 21 && computerCard.name == "ace") ||
      (computerScore > 21 && computerAceCounter == 1)
    ) {
      computerScore = computerScore - 10;
      computerAceCounter -= 1;
    }

    cardsDrawn =
      cardsDrawn + `<br>${computerCard.name} of ${suitIcon(computerCard.suit)}`;

    if (computerScore > 21) {
      var conclusion = `You win. Dealer loses with ${computerScore} points. Busted.`;
      gameMode = "start";
      var submitButton = document.getElementById("submit-button");
      submitButton.removeAttribute("disabled");
      return cardsDrawn + "<br>" + conclusion;
    }

    if (playerScore > computerScore && computerScore > 16) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Player Wins.`;
      gameMode = "start";
      var submitButton = document.getElementById("submit-button");
      submitButton.removeAttribute("disabled");
      return cardsDrawn + "<br>" + conclusion;
    }
    if (playerScore > computerScore && computerScore < 17) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Dealer stands on 17. Click submit to continue.`;
      gameMode = "computerDraws";
      drawNumber += 1;
      if (drawNumber == 2) {
        gameMode = "computerDrawsLast";
      }
      var submitButton = document.getElementById("submit-button");
      submitButton.removeAttribute("disabled");
      return cardsDrawn + "<br>" + conclusion;
    }
    if (computerScore > playerScore && computerScore > 16) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Dealer Wins. `;
      gameMode = "start";
      var submitButton = document.getElementById("submit-button");
      submitButton.removeAttribute("disabled");
      return cardsDrawn + "<br>" + conclusion;
    }
    if (computerScore > playerScore && computerScore < 17) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Dealer stands on 17. Click submit to continue.`;
      gameMode = "computerDraws";
      drawNumber += 1;
      if (drawNumber == 2) {
        gameMode = "computerDrawsLast";
      }
      var submitButton = document.getElementById("submit-button");
      submitButton.removeAttribute("disabled");
      return cardsDrawn + "<br>" + conclusion;
    }

    if (playerScore == computerScore && computerScore > 16) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Its a tie. `;
      gameMode = "start";
      var submitButton = document.getElementById("submit-button");
      submitButton.removeAttribute("disabled");
      return cardsDrawn + "<br>" + conclusion;
    }

    if (playerScore == computerScore && computerScore < 17) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Its a tie currently. Dealer stands on 17. Click submit to continue. `;
      gameMode = "computerDraws";
      drawNumber += 1;
      if (drawNumber == 2) {
        gameMode = "computerDrawsLast";
      }
      var submitButton = document.getElementById("submit-button");
      submitButton.removeAttribute("disabled");
      return cardsDrawn + "<br>" + conclusion;
    }
  }

  if (gameMode == "computerDrawsLast") {
    var computerCard = shuffledDeckOfCards[cardsLeft];
    computerCards.push(computerCard);
    cardsLeft -= 1;

    computerScore = computerScore + computerCard.value;

    if (
      (computerScore > 21 && computerCard.name == "ace") ||
      (computerScore > 21 && computerAceCounter == 1)
    ) {
      computerScore = computerScore - 10;
      computerAceCounter -= 1;
    }
    cardsDrawn =
      cardsDrawn + `<br>${computerCard.name} of ${suitIcon(computerCard.suit)}`;

    if (computerScore > 21) {
      var conclusion = `You win. Dealer loses with ${computerScore} points. Busted.`;
      gameMode = "start";
      return cardsDrawn + "<br>" + conclusion;
    }

    if (playerScore > computerScore) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Player Wins.`;
      gameMode = "start";
      return cardsDrawn + "<br>" + conclusion;
    }
    if (computerScore > playerScore) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Dealer Wins. `;
      gameMode = "start";
      return cardsDrawn + "<br>" + conclusion;
    }

    if (playerScore == computerScore) {
      var conclusion = `Player has ${playerScore} points and dealer has ${computerScore} points. Its a tie. `;
      gameMode = "start";
      return cardsDrawn + "<br>" + conclusion;
    }
  }
};
