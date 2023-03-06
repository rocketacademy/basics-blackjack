//--- GLOBAL VARIABLES ---

var gameMode = "startGame"; // startGame, playerTurn, computerTurn
var cardDeck = [];
var dealerHand = [];
var dealerScore = 0;
var playerHand = [];
var playerScore = 0;

//--- HELPER FUNCTIONS ---

function makeDeck() {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
}

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function shuffleCards(cardDeck) {
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
}

function dealCards(handArray, cardDeck, noOfCards) {
  for (var counter = 0; counter < noOfCards; counter += 1) {
    handArray.push(cardDeck.pop());
  }
  return handArray;
}

function isBlackjack(handArray) {
  return (
    (handArray[0].name === "ace" && handArray[1].rank >= 10) ||
    (handArray[1].name === "ace" && handArray[0].rank >= 10)
  );
}

function calculateScore(handArray) {
  var score = 0;
  for (var counter = 0; counter < handArray.length; counter += 1) {
    score = score + getCardScore(handArray[counter]);
  }
  //if there are aces, update ace value in score. if total hand value is >21, update ace value from 11 to 1
  for (var counter = 0; counter < handArray.length; counter += 1) {
    if (handArray[counter].name === "ace") {
      score = updateAceValueinScore(score);
    }
  }
  return score;
}

function getCardScore(card) {
  score = 0;
  if (card.name === "king" || card.name === "queen" || card.name === "jack") {
    score = 10;
  } else if (card.name === "ace") {
    score = 11;
  } else {
    score = card.rank;
  }
  return score;
}

function updateAceValueinScore(score) {
  //if total value of hand is >21, update ace value from 11 to 1
  if (score > 21) {
    score = score - 10;
  }
  return score;
}

function displayPlayerHandAndScore(player, handArray, score) {
  message = "";
  message = `${player}'s Hand: ${listCards(handArray)}Score: ${score}`;

  if (isBust(handArray)) {
    message = message + " (BUST!)";
  }
  message = message + "<br><br>";
  return message;
}

function listCards(hand) {
  var cardList = "";
  for (i = 0; i < hand.length; i += 1) {
    cardList = cardList + `- ${hand[i].name} of ${hand[i].suit}<br>`;
  }
  return `<br> ${cardList}`;
}

function isBust(handArray) {
  score = calculateScore(handArray);
  return score > 21;
}

function generateResult(playerHandArray, dealerHandArray) {
  playerScore = calculateScore(playerHandArray);
  dealerScore = calculateScore(dealerHandArray);
  gameResult = "";
  if (isBust(dealerHandArray) && isBust(playerHandArray)) {
    gameResult = "Tie!";
  } else if (isBust(dealerHandArray)) {
    gameResult = "Player wins!";
  } else if (isBust(playerHandArray)) {
    gameResult = "Dealer wins!";
  } else if (playerScore == dealerScore) {
    gameResult = "Tie!";
  } else if (dealerScore > playerScore) {
    gameResult = "Dealer  wins!";
  } else {
    gameResult = "Player wins!";
  }
  return gameResult;
}

//--- MAIN FUNCTION ---

var main = function (input) {
  var myOutputValue = "";

  if (gameMode === "startGame") {
    //game set up: create deck, shuffle deck and deal two cards to player and dealer.
    dealerHand = [];
    playerHand = [];
    cardDeck = makeDeck();
    cardDeck = shuffleCards(cardDeck);

    dealerHand = dealCards(dealerHand, cardDeck, 2);
    dealCards(playerHand, cardDeck, 2);
    dealerScore = calculateScore(dealerHand);
    playerScore = calculateScore(playerHand);

    myOutputValue =
      `You received two cards. <br><br>` +
      displayPlayerHandAndScore("Player", playerHand, playerScore) +
      displayPlayerHandAndScore("Dealer", dealerHand, dealerScore);

    // if either player gets blackjack, game ends
    if (isBlackjack(playerHand) || isBlackjack(dealerHand)) {
      if (isBlackjack(playerHand) && isBlackjack(dealerHand)) {
        myOutputValue =
          myOutputValue + "WOOWW YOU BOTH GOT BLACKJACK! It's a tie!";
      } else if (isBlackjack(playerHand)) {
        myOutputValue = myOutputValue + "BLACKJACK! You win!";
      } else if (isBlackjack(dealerHand)) {
        myOutputValue = myOutputValue + "Dealer GOT BLACKJACK! Dealer wins!";
      }
    } else {
      // display hand and score and ask whether player wants to hit or stand.
      myOutputValue =
        myOutputValue +
        `Please enter "Hit" to draw another card or "Stand" to end your turn!`;
      gameMode = "playerTurn";
    }
  } else if (gameMode === "playerTurn") {
    //validate input
    input = input.toLowerCase();
    if (input != "hit" && input != "stand") {
      return `Sorry, please enter "Hit" to draw another card or "Stand" to end your turn.`;
    } else if (input === "hit") {
      //if player chooses hit, deal player one more card
      playerHand = dealCards(playerHand, cardDeck, 1);
      playerScore = calculateScore(playerHand);

      //check whether player went bust. if bust, proceed to dealer's turn.
      if (isBust(playerHand)) {
        myOutputValue =
          `You went bust! <br><br>` +
          displayPlayerHandAndScore("Player", playerHand, playerScore) +
          `Press submit for Dealer's turn.`;
        gameMode = "dealerTurn";
      } else {
        //else return player's current hand and ask whether they want to hit or stand.
        myOutputValue =
          displayPlayerHandAndScore("Player", playerHand, playerScore) +
          `Please enter "Hit" to draw another card or "Stand" to end your turn!`;
      }
    } else if (input === "stand") {
      //else if player chooses stand, end player's turn and proceed to dealer's turn
      myOutputValue = `You end your turn! Press submit for Dealer's turn.`;
      gameMode = "dealerTurn";
    }
  } else if (gameMode === "dealerTurn") {
    //if dealer hand is under 17, dealer gets one more card.
    while (dealerScore < 17) {
      dealerHand = dealCards(dealerHand, cardDeck, 1);
      dealerScore = calculateScore(dealerHand);
    }
    //display final result. press submit to play again.
    var gameResult = generateResult(playerHand, dealerHand);
    myOutputValue =
      displayPlayerHandAndScore("Player", playerHand, playerScore) +
      displayPlayerHandAndScore("Dealer", dealerHand, dealerScore) +
      gameResult +
      ` Press submit to play again!`;
    gameMode = "startGame";
  }
  return myOutputValue;
};
