// Gameplay Description
// The main function runs on each player's turn. The sequence of actions in the game might be the following.
// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

// Define game modes
var gameStart = "start game";
var gameDrawnCards = "drawn two cards";
var gameCheckBlackjack = "check blackjack winner";
var gamePlayerHitStand = "player hit or stand";
var currentGameMode = gameStart;

// Create a deck of cards
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
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the cards
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

// Calculate total rank of hand
let getTotalRank = function (cards) {
  let totalRank = 0;
  let aceCount = 0;
  for (let i = 0; i < cards.length; i += 1) {
    let rank = cards[i].rank;
    if (rank == 1) {
      aceCount += 1;
      totalRank += 11;
    } else if (rank >= 10) {
      totalRank += 10;
    } else {
      totalRank += rank;
    }
  }
  while (totalRank > 21 && aceCount > 0) {
    totalRank -= 10;
    aceCount -= 1;
  }
  return totalRank;
};

// Check for Blackjack
let hasBlackjack = function (cards) {
  if (cards.length == 2) {
    let rank1 = cards[0].rank;
    let rank2 = cards[1].rank;
    if ((rank1 == 1 && rank2 >= 10) || (rank2 == 1 && rank1 >= 10)) {
      return true;
    }
  } else {
    return false;
  }
};

// Array of player's initial draw cards
let getPlayerCardArray = function (shuffledDeck) {
  let playerCards = [];
  playerCards.push(shuffledDeck.pop());
  playerCards.push(shuffledDeck.pop());
  return playerCards;
};

// Array of computer's initial draw cards
let getComputerCardArray = function (shuffledDeck) {
  let computerCards = [];
  computerCards.push(shuffledDeck.pop());
  computerCards.push(shuffledDeck.pop());
  return computerCards;
};

let deck = makeDeck();
let shuffledDeck = shuffleCards(deck);
let playerCards = getPlayerCardArray(shuffledDeck);
let computerCards = getComputerCardArray(shuffledDeck);
let computerTotal = getTotalRank(computerCards);
let playerTotal = getTotalRank(playerCards);

let main = function (input) {
  let myOutputValue = "";
  let currentGameMode = gameStart;
  currentGameMode = gameDrawnCards;

  // Get the initial draw cards for player and computer
  if (currentGameMode == gameDrawnCards) {
    // Display cards drawn
    myOutputValue =
      "Player hand:<br>-" +
      playerCards[0].name +
      " of " +
      playerCards[0].suit +
      "<br>-" +
      playerCards[1].name +
      " of " +
      playerCards[1].suit +
      "<br>" +
      "<br>Computer hand:<br>-" +
      computerCards[0].name +
      " of " +
      computerCards[0].suit +
      "<br>-" +
      computerCards[1].name +
      " of " +
      computerCards[1].suit;
    currentGameMode = gameCheckBlackjack;
  }

  // Check for Blackjack
  if (currentGameMode == gameCheckBlackjack) {
    let playerHasBlackjack = hasBlackjack(playerCards);
    let computerHasBlackjack = hasBlackjack(computerCards);
    if (playerHasBlackjack && computerHasBlackjack) {
      myOutputValue +=
        "<br><br> Player & Computer both have blackjack ♠️ | 🎊 It's a tie!";
      return myOutputValue;
    } else if (computerHasBlackjack) {
      myOutputValue += "<br><br> Computer has Blackjack ♠️ | 🎉 Computer wins!";
      return myOutputValue;
    } else if (playerHasBlackjack) {
      myOutputValue += "<br><br>Player has Blackjack ♠️ | 🎉 Player wins!<br>";
      return myOutputValue;
    } else {
      myOutputValue += "<br><br>Player 'hit' or 'stand'<br>";
      currentGameMode = gamePlayerHitStand;
    }
  }

  // Player hit or stand
  if (currentGameMode == gamePlayerHitStand) {
    // Player choose to hit
    if (input.toLowerCase() == "hit") {
      playerCards.push(shuffledDeck.pop());
      playerTotal = getTotalRank(playerCards);
      myOutputValue +=
        "<br><br>Player drew card: <br>-" +
        playerCards[playerCards.length - 1].name +
        " of " +
        playerCards[playerCards.length - 1].suit +
        "<br><br>Player current total hand is " +
        playerTotal;
    } else if (input.toLowerCase() == "stand") {
      while (computerTotal < 17) {
        computerCards.push(shuffledDeck.pop());
        computerTotal = getTotalRank(computerCards);
        myOutputValue +=
          "<br><br>Computer drew card:<br>- " +
          computerCards[computerCards.length - 1].name +
          " of " +
          computerCards[computerCards.length - 1].suit +
          "<br><br>Computer current total hand is " +
          computerTotal;
      }

      if (computerTotal > 21 && playerTotal > 21) {
        myOutputValue +=
          "<br><br>Both computer & player busts!💥 " +
          "<br>Player final hand: " +
          playerTotal +
          "<br> Computer final hand: " +
          computerTotal;
        return myOutputValue;
      } else if (playerTotal > 21 && computerTotal <= 21) {
        myOutputValue +=
          "<br><br>💥 Player busts! " +
          "<br>🎉 Computer wins!" +
          "<br>Player final hand: " +
          playerTotal +
          "<br> Computer final hand: " +
          computerTotal;
        return myOutputValue;
      } else if (computerTotal > 21 && playerTotal <= 21) {
        myOutputValue +=
          "<br><br>💥 Computer busts!" +
          "<br>🎉 Player wins!" +
          "<br>Player final hand: " +
          playerTotal +
          "<br> Computer final hand: " +
          computerTotal;
        return myOutputValue;
      } else if (
        playerTotal <= 21 &&
        computerTotal <= 21 &&
        playerTotal > computerTotal
      ) {
        myOutputValue +=
          "<br>🎉 Player win!" +
          "<br>Player final hand: " +
          playerTotal +
          "<br> Computer final hand: " +
          computerTotal;
        return myOutputValue;
      } else if (
        playerTotal <= 21 &&
        computerTotal <= 21 &&
        computerTotal > playerTotal
      ) {
        myOutputValue +=
          "<br>🎉 Computer win!" +
          "<br>Player final hand: " +
          playerTotal +
          "<br> Computer final hand: " +
          computerTotal;
        return myOutputValue;
      } else if (
        playerTotal <= 21 &&
        computerTotal <= 21 &&
        playerTotal == computerTotal
      ) {
        myOutputValue +=
          "<br>🎊 It's a tie!" +
          "<br>Player final hand: " +
          playerTotal +
          "<br> Computer final hand: " +
          computerTotal;
        return myOutputValue;
      }
    }
  }
  return myOutputValue;
};
