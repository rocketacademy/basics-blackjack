// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

// global variables
var myOutputValue = "";

// Game Modes
var gameMode = "starting";
var playerDrew = 0;
var computerCards = 0;

// Create a deck of cards
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Hearts ♡", "Diamonds ♢", "Clubs ♣", "Spades ♠"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var pointCounter = rankCounter;
      if (pointCounter == 11) {
        pointCounter = 10;
      } else if (pointCounter == 12) {
        pointCounter = 10;
      } else if (pointCounter == 13) {
        pointCounter = 10;
      }

      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        point: pointCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
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

// Cards drawn by player and computer
var playerDrawsFirstCard;
var playerDrawsSecondCard;
var playerDrawsThirdCard;
var playerDrawsFourthCard;
var playerDrawsFifthCard;
var computerDrawsFirstCard;
var computerDrawsSecondCard;
var computerDrawsThirdCard;
var computerDrawsFourthCard;
var computerDrawsFifthCard;

// deal cards
var deck = makeDeck();
var shuffleDeck = shuffleCards(deck);

// Player drawing cards
playerDrawsFirstCard = shuffleDeck.pop();
playerDrawsSecondCard = shuffleDeck.pop();
playerDrawsThirdCard = shuffleDeck.pop();
playerDrawsFourthCard = shuffleDeck.pop();
playerDrawsFifthCard = shuffleDeck.pop();

// Computer drawing cards
computerDrawsFirstCard = shuffleDeck.pop();
computerDrawsSecondCard = shuffleDeck.pop();
computerDrawsThirdCard = shuffleDeck.pop();
computerDrawsFourthCard = shuffleDeck.pop();
computerDrawsFifthCard = shuffleDeck.pop();

// player to draw one card; compuer to draw one card; computer will also be dealer
// each player gets 2 cards
var roundOne = function (drawCards) {
  console.log(
    `Player draws ${playerDrawsFirstCard.name} of ${playerDrawsFirstCard.suit} & ${playerDrawsSecondCard.name} of ${playerDrawsSecondCard.suit}`
  );
  console.log(
    `Computer draws ${computerDrawsFirstCard.name} of ${computerDrawsFirstCard.suit} & ${computerDrawsSecondCard.name} ${computerDrawsSecondCard.suit}`
  );
  var drawCards = `Player, you draw <br> 1. ${playerDrawsFirstCard.name} of ${playerDrawsFirstCard.suit} <br>  2. ${playerDrawsSecondCard.name} of ${playerDrawsSecondCard.suit}. <br><br> The dealer's second card is ${computerDrawsSecondCard.name}. <br><br> If you wish to draw another card, input "hit" and press submit. <br><br> If you wish to proceed with your current hand, input "stand" and press submit. `;
  if (playerDrawsFirstCard.point + playerDrawsSecondCard.point > 21) {
    drawCards = `Player, you draw <br> 1. ${playerDrawsFirstCard.name} of ${
      playerDrawsFirstCard.suit
    } <br>  2. ${playerDrawsSecondCard.name} of ${
      playerDrawsSecondCard.suit
    }. <br><br> The dealer's second card is ${
      computerDrawsSecondCard.name
    }. <br><br> Your hand is ${Number(
      playerDrawsFirstCard.point + playerDrawsSecondCard.point
    )}. you burst! 😱`;
  }
  return drawCards;
};

// player draws third card
var playerThirdCard = function () {
  myOutputValue = `Player, you draw <br> 1. ${playerDrawsFirstCard.name} of ${playerDrawsFirstCard.suit} <br>  2. ${playerDrawsSecondCard.name} of ${playerDrawsSecondCard.suit} <br> 3. ${playerDrawsThirdCard.name} of ${playerDrawsThirdCard.suit}. <br><br> The dealer's second card is ${computerDrawsSecondCard.name}. <br><br> If you wish to draw another card, input "hit again" and press submit. <br><br> If you wish to proceed with your current hand, input "stand" and press submit. `;
  if (
    playerDrawsFirstCard.point +
      playerDrawsSecondCard.point +
      playerDrawsThirdCard.point >
    21
  ) {
    myOutputValue = `Player, you draw <br> 1. ${playerDrawsFirstCard.name} of ${
      playerDrawsFirstCard.suit
    } <br>  2. ${playerDrawsSecondCard.name} of ${
      playerDrawsSecondCard.suit
    } <br> 3. ${playerDrawsThirdCard.name} of ${
      playerDrawsThirdCard.suit
    }. <br><br> The dealer's second card is ${
      computerDrawsSecondCard.name
    }. <br><br> Your hand is ${Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point
    )}. you burst! 😱`;
  }
  return myOutputValue;
};

// player choose to HIT
// player draws fourth card
var playerFourthCard = function () {
  myOutputValue = `Player, you draw <br> 1. ${playerDrawsFirstCard.name} of ${playerDrawsFirstCard.suit} <br>  2. ${playerDrawsSecondCard.name} of ${playerDrawsSecondCard.suit} <br> 3. ${playerDrawsThirdCard.name} of ${playerDrawsThirdCard.suit} <br> 4. ${playerDrawsFourthCard.name} of ${playerDrawsFourthCard.suit}. <br><br> The dealer's second card is ${computerDrawsSecondCard.name}. <br><br> If you wish to draw another card, input hit and press submit. <br><br> If you wish to proceed with your current hand, input stand and press submit. `;
  if (
    playerDrawsFirstCard.point +
      playerDrawsSecondCard.point +
      playerDrawsThirdCard.point +
      playerDrawsFourthCard.point >
    21
  ) {
    myOutputValue = `Player, you draw <br> 1. ${playerDrawsFirstCard.name} of ${
      playerDrawsFirstCard.suit
    } <br>  2. ${playerDrawsSecondCard.name} of ${
      playerDrawsSecondCard.suit
    } <br> 3. ${playerDrawsThirdCard.name} of ${
      playerDrawsThirdCard.suit
    } <br> 4. ${playerDrawsFourthCard.name} of ${
      playerDrawsFourthCard.suit
    }. <br><br>  The dealer's second card is ${
      computerDrawsSecondCard.name
    }. <br><br> Your hand is ${Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point
    )}. you burst! 😱`;
  }
  return myOutputValue;
};

// player draws fifth card
var playerFifthCard = function () {
  myOutputValue = `Player, you draw  <br> 1. ${playerDrawsFirstCard.name} of ${playerDrawsFirstCard.suit} <br>  2. ${playerDrawsSecondCard.name} of ${playerDrawsSecondCard.suit} <br> 3. ${playerDrawsThirdCard.name} of ${playerDrawsThirdCard.suit} <br> 4. ${playerDrawsFourthCard.name} of ${playerDrawsFourthCard.suit} <br> 5. ${playerDrawsFifthCard.name} of ${playerDrawsFifthCard.suit}. <br><br> The dealer's second card is ${computerDrawsSecondCard.name}.  <br><br> If you wish to draw another card, input hit and press submit. <br><br> If you wish to proceed with your current hand, input stand and press submit. `;
  if (
    playerDrawsFirstCard.point +
      playerDrawsSecondCard.point +
      playerDrawsThirdCard.point +
      playerDrawsFourthCard.point +
      playerDrawsFifthCard.point >
    21
  ) {
    myOutputValue = `Player, you draw  <br> 1. ${
      playerDrawsFirstCard.name
    } of ${playerDrawsFirstCard.suit} <br>  2. ${
      playerDrawsSecondCard.name
    } of ${playerDrawsSecondCard.suit} <br> 3. ${
      playerDrawsThirdCard.name
    } of ${playerDrawsThirdCard.suit} <br> 4. ${
      playerDrawsFourthCard.name
    } of ${playerDrawsFourthCard.suit} <br> 5. ${
      playerDrawsFifthCard.name
    } of ${playerDrawsFifthCard.suit}. <br><br>  The dealer's second card is ${
      computerDrawsSecondCard.name
    }. <br><br> Your hand is ${Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point +
        playerDrawsFifthCard.point
    )}. you burst! 😱`;
  }
  return myOutputValue;
};

// blackjack
var checkBlackJack = function () {
  if (playerDrawsFirstCard.point == 1) {
    playerDrawsFirstCard.point = 11;
  }
  if (playerDrawsSecondCard.point == 1) {
    playerDrawsSecondCard.point = 11;
  }
  if (playerDrawsFirstCard.point + playerDrawsSecondCard.point == `21`) {
    return `Blackjack. Player won! 🎉🎉🎉`;
  }
};

// check for burst
var checkBurst = function () {
  if (
    computerDrawsFirstCard.point + computerDrawsSecondCard.point > 21 ||
    computerDrawsFirstCard.point +
      computerDrawsSecondCard.point +
      computerDrawsThirdCard.point >
      21 ||
    computerDrawsFirstCard.point +
      computerDrawsSecondCard.point +
      computerDrawsThirdCard.point +
      computerDrawsFourthCard.point >
      21 ||
    computerDrawsFirstCard.point +
      computerDrawsSecondCard.point +
      computerDrawsThirdCard.point +
      computerDrawsFourthCard.point +
      computerDrawsFifthCard.point >
      21
  ) {
    console.log(`computer burst!`);
    myOutputValue = `Computer burst! You win!! 🎉🎉🎉`;
    return myOutputValue;
  }
};

// change ACE
var checkWinner = function () {
  if (
    Number(playerDrawsFirstCard.point + playerDrawsSecondCard.point) ==
    computerDraw()
  ) {
    winner = "Draw";
  }
  if (computerDraw() > 22) {
    winner = "Player won! 🖖";
  }
  if (
    Number(playerDrawsFirstCard.point + playerDrawsSecondCard.point) <
      computerDraw() &&
    computerDraw() < 22
  ) {
    winner = "Computer won! 🤞";
  }

  if (Number(playerDrawsFirstCard.point + playerDrawsSecondCard.point) >= 21) {
    winner = "Player won! 🖖";
    myOutputValue =
      "BlackJack! You Win!" +
      "<br><br> The computer's total points is " +
      computerDraw() +
      "<br><br> Results: " +
      winner;
  } else
    myOutputValue =
      "Your total card points is " +
      Number(playerDrawsFirstCard.point + playerDrawsSecondCard.point) +
      "<br><br> The computer's total points is " +
      computerDraw() +
      "<br><br> Results: " +
      winner;
  return myOutputValue;
};

// PLAYERSTAND2
var playerStand2 = function () {
  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point
    ) > 21 &&
    computerDraw() > 21
  ) {
    winner = "Draw";
  }

  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point
    ) == computerDraw()
  ) {
    winner = "Draw";
  }

  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point
    ) > computerDraw() &&
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point
    ) < 22
  ) {
    var winner = "Player won! 🖖";
  }

  if (
    computerDraw() > 21 &&
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point
    ) < 22
  ) {
    winner = "Player won! 🖖";
  }

  if (
    computerDraw() < 22 &&
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point
    ) > 21
  ) {
    winner = "Computer won! 🤞";
  }

  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point
    ) < computerDraw() &&
    computerDraw() < 21
  ) {
    winner = "Computer won! 🤞";
  }

  // Standard
  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point
    ) >= 22
  ) {
    myOutputValue =
      "Your total card points is " +
      Number(
        playerDrawsFirstCard.point +
          playerDrawsSecondCard.point +
          playerDrawsThirdCard.point
      ) +
      "<br><br> The computer's total points is " +
      computerDraw() +
      "<br><br> Results: " +
      winner;
  } else
    myOutputValue =
      "Your total card points is " +
      Number(
        playerDrawsFirstCard.point +
          playerDrawsSecondCard.point +
          playerDrawsThirdCard.point
      ) +
      "<br><br> The computer's total points is " +
      computerDraw() +
      "<br><br> Results: " +
      winner;
  return myOutputValue;
};

// PLAYERSTAND
var playerStand3 = function () {
  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point
    ) > 21 &&
    computerDraw() > 21
  ) {
    winner = "Draw";
  }

  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point
    ) == computerDraw()
  ) {
    winner = "Draw";
  }

  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point
    ) > computerDraw() &&
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point
    ) < 22
  ) {
    var winner = "Player won! 🖖";
  }

  if (
    computerDraw() > 21 &&
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point
    ) < 22
  ) {
    winner = "Player won! 🖖";
  }

  if (
    computerDraw() < 22 &&
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point
    ) > 21
  ) {
    winner = "Computer won!";
  }

  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point
    ) < computerDraw() &&
    computerDraw() < 21
  ) {
    winner = "Computer won!";
  }

  // Standard
  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point
    ) >= 22
  ) {
    myOutputValue =
      "Your total card points is " +
      Number(
        playerDrawsFirstCard.point +
          playerDrawsSecondCard.point +
          playerDrawsThirdCard.point +
          playerDrawsFourthCard.point
      ) +
      "<br><br> The computer's total points is " +
      computerDraw() +
      "<br><br> Results: " +
      winner;
  } else
    myOutputValue =
      "Your total card points is " +
      Number(
        playerDrawsFirstCard.point +
          playerDrawsSecondCard.point +
          playerDrawsThirdCard.point +
          playerDrawsFourthCard.point
      ) +
      "<br><br> The computer's total points is " +
      computerDraw() +
      "<br><br> Results: " +
      winner;
  return myOutputValue;
};

// PLAYERSTAND$
var playerStand4 = function () {
  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point +
        playerDrawsFifthCard.point
    ) > 21 &&
    computerDraw() > 21
  ) {
    winner = "Draw";
  }

  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point +
        playerDrawsFifthCard.point
    ) == computerDraw()
  ) {
    winner = "Draw";
  }

  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point +
        playerDrawsFifthCard.point
    ) > computerDraw() &&
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point +
        playerDrawsFifthCard.point
    ) < 22
  ) {
    var winner = "Player won! 🖖";
  }

  if (
    computerDraw() > 21 &&
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point +
        playerDrawsFifthCard.point
    ) < 22
  ) {
    winner = "Player won!";
  }

  if (
    computerDraw() < 22 &&
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point +
        playerDrawsFifthCard.point
    ) > 21
  ) {
    winner = "Computer won!";
  }

  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point +
        playerDrawsFifthCard.point
    ) < computerDraw() &&
    computerDraw() < 21
  ) {
    winner = "Computer won!";
  }

  // Standard
  if (
    Number(
      playerDrawsFirstCard.point +
        playerDrawsSecondCard.point +
        playerDrawsThirdCard.point +
        playerDrawsFourthCard.point +
        playerDrawsFifthCard.point
    ) >= 22
  ) {
    myOutputValue =
      "Your total card points is " +
      Number(
        playerDrawsFirstCard.point +
          playerDrawsSecondCard.point +
          playerDrawsThirdCard.point +
          playerDrawsFourthCard.point +
          playerDrawsFifthCard.point
      ) +
      "<br><br> The computer's total points is " +
      computerDraw() +
      "<br><br> Results: " +
      winner;
  } else
    myOutputValue =
      "Your total card points is " +
      Number(
        playerDrawsFirstCard.point +
          playerDrawsSecondCard.point +
          playerDrawsThirdCard.point +
          playerDrawsFourthCard.point +
          playerDrawsFifthCard.point
      ) +
      "<br><br> The computer's total points is " +
      computerDraw() +
      "<br><br> Results: " +
      winner;
  return myOutputValue;
};

var computerDraw = function () {
  if (
    Number(computerDrawsFirstCard.point + computerDrawsSecondCard.point) > 16
  ) {
    return Number(computerDrawsFirstCard.point + computerDrawsSecondCard.point);
  }
  if (
    Number(computerDrawsFirstCard.point + computerDrawsSecondCard.point) <= 16
  ) {
    var computerPoints = Number(
      computerDrawsFirstCard.point +
        computerDrawsSecondCard.point +
        computerDrawsThirdCard.point
    );
    if (computerPoints <= 16) {
      computerPoints = Number(
        computerDrawsFirstCard.point +
          computerDrawsSecondCard.point +
          computerDrawsThirdCard.point +
          computerDrawsFourthCard.point
      );
      if (computerPoints <= 16) {
        computerPoints = Number(
          computerDrawsFirstCard.point +
            computerDrawsSecondCard.point +
            computerDrawsThirdCard.point +
            computerDrawsFourthCard.point +
            computerDrawsFifthCard.point
        );
      }
    }
    return computerPoints;
  }
};

var main = function (input) {
  myOutputValue = roundOne();
  checkBlackJack();
  console.log("Computer points is " + computerDraw());
  console.log(computerDrawsFirstCard.point);
  console.log(computerDrawsSecondCard.point);
  console.log(computerDrawsThirdCard.point);
  console.log(computerDrawsFourthCard.point);
  console.log(computerDrawsFifthCard.point);

  if (input == "hit" && playerDrew == 0) {
    myOutputValue = playerThirdCard();
    playerDrew += 1;
    console.log(playerDrew);
  } else if (input == "hit" && playerDrew <= 1) {
    myOutputValue = playerFourthCard();
    playerDrew += 1;
    console.log(playerDrew);
  } else if (input == "hit" && playerDrew == 2) {
    myOutputValue = playerFifthCard();
    playerDrew += 1;
    console.log(playerDrew);
  }

  if (input == "stand" && playerDrew == 0) {
    myOutputValue = checkWinner();
  } else if (input == "stand" && playerDrew == 1) {
    myOutputValue = playerStand2();
  } else if (input == "stand" && playerDrew == 2) {
    myOutputValue = playerStand3();
  } else if (input == "stand" && playerDrew == 3) {
    myOutputValue = playerStand4();
  }
  return myOutputValue;
};
