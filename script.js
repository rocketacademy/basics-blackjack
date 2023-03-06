// 2 mar: 2 hrs
// 5 mar: 1 hr
// 6 mar: 2 hrs

var gameMode = "startGame"; // startGame, playerTurn, computerTurn
var cardDeck = [];
var dealerHand = [];
var dealerScore = 0;
var playerHand = [];
var playerScore = 0;

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

function dealCards(playerHand, cardDeck, noOfCards) {
  for (var counter = 0; counter < noOfCards; counter += 1) {
    playerHand.push(cardDeck.pop());
  }
  return playerHand;
}

//can refactor?
function isBlackjack(playerHand) {
  return (
    (playerHand[0].name === "ace" && playerHand[1].name === "king") ||
    (playerHand[0].name === "ace" && playerHand[1].name === "queen") ||
    (playerHand[0].name === "ace" && playerHand[1].name === "jack") ||
    (playerHand[0].name === "ace" && playerHand[1].name === "10") ||
    (playerHand[1].name === "ace" && playerHand[0].name === "king") ||
    (playerHand[1].name === "ace" && playerHand[0].name === "queen") ||
    (playerHand[1].name === "ace" && playerHand[0].name === "jack") ||
    (playerHand[1].name === "ace" && playerHand[0].name === "10")
  );
}

function getCardScore(card) {
  score = 0;
  if (card.name === "king" || card.name === "queen" || card.name === "jack") {
    score = 10;
  } else {
    score = card.rank;
  }
  return score;
}

function updateAceValueinScore(score) {
  //if score is >21, update score
  if (score > 21) {
    score = score - 10;
  }
  return score;
}

function calculateScore(playerHand) {
  var playerScore = 0;
  for (var counter = 0; counter < playerHand.length; counter += 1) {
    //assume aces have a starting value of 11.
    if (playerHand[counter].name === "ace") {
      playerScore = playerScore + 11;
    } else {
      playerScore = playerScore + getCardScore(playerHand[counter]);
    }
  }
  //if there are aces, update ace value in score
  for (var counter = 0; counter < playerHand.length; counter += 1) {
    if (playerHand[counter].name === "ace") {
      playerScore = updateAceValueinScore(playerScore);
    }
  }
  return playerScore;
}

function listCards(hand) {
  var cardList = "";
  for (i = 0; i < hand.length; i += 1) {
    cardList = cardList + `- ${hand[i].name} of ${hand[i].suit}<br>`;
  }
  return `<br> ${cardList}`;
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

function isBust(playerHand) {
  playerScore = calculateScore(playerHand);
  return playerScore > 21;
}

function generateResult(playerHand, dealerHand) {
  gameResult = "";
  if (isBust(dealerHand) && isBust(playerHand)) {
    gameResult = "Tie!";
  } else if (isBust(dealerHand)) {
    gameResult = "Player wins!";
  } else if (isBust(playerHand)) {
    gameResult = "Dealer wins!";
  } else if (playerScore == dealerScore) {
    gameResult = "Tie!";
  } else if (dealerScore > playerScore) {
    gameResult = "Dealer  wins!";
  } else {
    gameResult = "Player wins!";
  }
  console.log(playerScore, dealerScore, gameResult);
  return gameResult;
}

var main = function (input) {
  var myOutputValue = "";
  //when player hits submit, shuffle deck and deal two cards to player and dealer.
  if (gameMode === "startGame") {
    dealerHand = [];
    playerHand = [];
    cardDeck = makeDeck();
    cardDeck = shuffleCards(cardDeck);

    dealerHand = dealCards(dealerHand, cardDeck, 2);
    playerHand = dealCards(playerHand, cardDeck, 2);

    // check for blackjack.
    if (isBlackjack(playerHand) || isBlackjack(dealerHand)) {
      if (isBlackjack(playerHand) && isBlackjack(dealerHand)) {
        myOutputValue = "WOOWW YOU BOTH GOT BLACKJACK! It's a tie!";
      } else if (isBlackjack(playerHand)) {
        myOutputValue = "BLACKJACK! You win!";
      } else if (isBlackjack(dealerHand)) {
        myOutputValue = "dealer GOT BLACKJACK! dealer wins!";
      }
    } else {
      //calculate scores
      dealerScore = calculateScore(dealerHand);
      playerScore = calculateScore(playerHand);
      //display hand and score and ask whether player wants to hit or stand.
      myOutputValue =
        `You received two cards. <br><br>` +
        displayPlayerHandAndScore("Player", playerHand, playerScore) +
        displayPlayerHandAndScore("Dealer", dealerHand, dealerScore) +
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

      //check whether player went bust. if bust, proceed to dealer's turn.
      if (isBust(playerHand)) {
        myOutputValue =
          `You went bust! <br><br>` +
          displayPlayerHandAndScore("Player", playerHand, playerScore) +
          `We assume you stand! Press submit for Dealer's turn.`;
        gameMode = "dealerTurn";
      } else {
        //else return player cards and score, and ask whether they want to hit or stand.
        myOutputValue =
          displayPlayerHandAndScore("Player", playerHand, playerScore) +
          `Please enter "Hit" to draw another card or "Stand" to end your turn!`;
      }
    } else if (input === "stand") {
      //else if player chooses stand, enter dealer's turn
      gameMode = "dealerTurn";
      myOutputValue = `You end your turn! Press submit for Dealer's turn.`;
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
