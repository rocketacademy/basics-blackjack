// make a deck of 52 cards
var makeDeck = function () {
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

      var card = { name: cardName, suit: currentSuit, rank: rankCounter };

      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// getting random index from 0 (inclusive) to max (exclusive)
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// shuffe deck of 52 cards
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};

// checking if is a blackjack
var isBlackJack = function (hand) {
  // if 1st card is ace and 2nd card is 10, jack, queen, or king, OR
  if (
    (hand[0].rank == 1 && hand[1].rank >= 10 && hand[1].rank <= 13) ||
    // if 1st card is 10, jack, queen, or king, and 2nd card is ace
    (hand[0].rank >= 10 && hand[0].rank <= 13 && hand[1].rank == 1)
  ) {
    return true;
  }
};

// to calculate total score of hand
var calculateScore = function (hand) {
  handIndex = 0;
  handScore = 0;
  numOfAces = 0;
  // this assumes all aces contribute to the score by 1
  while (handIndex < hand.length) {
    if (
      hand[handIndex].name == "king" ||
      hand[handIndex].name == "queen" ||
      hand[handIndex].name == "jack"
    ) {
      handScore += 10;
    } else if (hand[handIndex].name == "ace") {
      handScore += 11;
      numOfAces += 1;
    } else {
      console.log("within function handIndex: ", handIndex);
      handScore = handScore + hand[handIndex].rank;
      console.log("within function handScore: ", handScore);
    }

    handIndex += 1;
  }

  // adjust for variable ace
  // If there are aces in the hand
  // if deck is more than 21, ace will be 1

  while (numOfAces >= 1) {
    if (handScore > 21) {
      handScore -= 10;
      numOfAces -= 1;
    }
  }

  return handScore;
};

// return output for cards
var cardsDrawn = function (hand) {
  cardsIndex = 0;
  cardsHand = "";
  while (cardsIndex < hand.length) {
    cardsHand =
      cardsHand + `${hand[cardsIndex].name} of ${hand[cardsIndex].suit}<br>`;
    cardsIndex += 1;
  }

  return cardsHand;
};

// setting various game modes
var DEAL_HAND = "deal hand";
var CARDS_DRAWN = "cards drawn";
var HIT_OR_STAND = "hit or stand";
var CALCULATE_SCORE = "calculate score";

// set global variables for games
var playerHand = [];
var compHand = [];
var cardDeck = [];
var currentGameMode = DEAL_HAND;

var main = function (input) {
  var myOutputValue = "";

  if (currentGameMode == "deal hand") {
    console.log("game mode:", currentGameMode);
    // making and shuffling a deck
    cardDeck = shuffleCards(makeDeck());

    // giving out 2 cards to each player
    var dealingIndex = 0;
    while (dealingIndex < 2) {
      playerHand.push(cardDeck.pop());
      compHand.push(cardDeck.pop());
      dealingIndex += 1;
    }

    console.log("playerHand: ", playerHand);
    console.log("compHand: ", compHand);
    console.log("cardDeck: ", cardDeck);

    myOutputValue =
      "Cards has been dealt. <br> Press submit to calculate cards.";
    currentGameMode = CARDS_DRAWN;

    return myOutputValue;
  }

  if (currentGameMode == "cards drawn") {
    console.log("game mode:", currentGameMode);

    myOutputValue = "PLAYER: <br>" + cardsDrawn(playerHand);

    // a tie if both draws blackjack
    if (isBlackJack(playerHand) && isBlackJack(compHand)) {
      myOutputValue =
        myOutputValue +
        "<br>COMPUTER: <br>" +
        cardsDrawn(compHand) +
        "<br> A blackjack tie!";
      myOutputValue = myOutputValue + "<br><br> Press submit to play again.";

      // reset mode & counters
      playerHand = [];
      compHand = [];
      cardDeck = [];
      currentGameMode = DEAL_HAND;

      return myOutputValue;
    } // a blackjack win when either player or computer draws blackjack
    else if (isBlackJack(playerHand)) {
      myOutputValue =
        myOutputValue +
        "<br> COMPUTER: <br>" +
        cardsDrawn(compHand) +
        "<br> Blackjack, you win!";
      myOutputValue = myOutputValue + "<br><br> Press submit to play again.";

      // reset mode & counters
      playerHand = [];
      compHand = [];
      cardDeck = [];
      currentGameMode = DEAL_HAND;

      return myOutputValue;
    } else if (isBlackJack(compHand)) {
      myOutputValue =
        myOutputValue +
        "<br>COMPUTER: <br>" +
        cardsDrawn(compHand) +
        "<br> Blackjack, computer wins!";
      myOutputValue = myOutputValue + "<br><br> Press submit to play again.";

      // reset mode & counters
      playerHand = [];
      compHand = [];
      cardDeck = [];
      currentGameMode = DEAL_HAND;

      return myOutputValue;
    } else {
      myOutputValue = myOutputValue + "<br> Please choose hit or stand.";
    }

    currentGameMode = HIT_OR_STAND;
    return myOutputValue;
  }

  if (currentGameMode == "hit or stand") {
    console.log("game mode:", currentGameMode);
    myOutputValue = "PLAYER: <br>";

    if (input == "") {
      myOutputValue =
        myOutputValue +
        cardsDrawn(playerHand) +
        "<br> Please enter only hit or stand.";
    }

    if (input == "hit") {
      // player chooses to hit or stand
      console.log("playerHand: ", playerHand);
      playerHand.push(cardDeck.pop());
      myOutputValue =
        myOutputValue +
        cardsDrawn(playerHand) +
        "<br> Please enter only hit or stand.";
    } else if (input == "stand") {
      currentGameMode = CALCULATE_SCORE;
      myOutputValue =
        myOutputValue +
        cardsDrawn(playerHand) +
        "<br> Press submit to calculate score.";
    }
    return myOutputValue;
  }

  if (currentGameMode == "calculate score") {
    // computer hit if hand is below 17
    while (calculateScore(compHand) < 17) {
      compHand.push(cardDeck.pop());
    }

    // count computer's score
    var compHandScore = calculateScore(compHand);
    console.log("compHandScore: ", compHandScore);

    // count player's score
    var playerHandScore = calculateScore(playerHand);
    console.log("playerHandScore: ", playerHandScore);

    // output message for player's and computer's hand and score
    myOutputValue =
      "PLAYER: " +
      playerHandScore +
      "<br>" +
      cardsDrawn(playerHand) +
      "<br>COMPUTER: " +
      compHandScore +
      "<br>" +
      cardsDrawn(compHand);

    // player win if score is more than computer's score and not above 21
    if (
      (playerHandScore > compHandScore && playerHandScore <= 21) ||
      (playerHandScore <= 21 && compHandScore > 21)
    ) {
      myOutputValue = myOutputValue + "<br> Player Wins!";
    }

    // player loses if score is less than computer's score and not above 21
    if (
      (playerHandScore < compHandScore && compHandScore <= 21) ||
      (compHandScore <= 21 && playerHandScore > 21)
    ) {
      myOutputValue = myOutputValue + "<br> Computer Wins!";
    }

    // A tie if player and computer have same hand or both have hands above 21
    if (
      playerHandScore == compHandScore ||
      (playerHandScore > 21 && compHandScore > 21)
    ) {
      myOutputValue = myOutputValue + "<br> A tie!";
    }

    myOutputValue = myOutputValue + "<br><br> Press submit to play again.";

    // reset mode & counters
    playerHand = [];
    compHand = [];
    cardDeck = [];
    currentGameMode = DEAL_HAND;

    return myOutputValue;
  }
};
