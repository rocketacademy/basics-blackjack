var makeDeck = function () {
  var deck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;

  var SPADE = "♠️";
  var HEART = "♥️";
  var CLUB = "♣️";
  var DIAMOND = "♦️";

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var counter = 1;
    while (counter <= 13) {
      var rankCounter = counter;
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        rankCounter = 10;
        cardName = "jack";
      } else if (cardName == 12) {
        rankCounter = 10;
        cardName = "queen";
      } else if (cardName == 13) {
        rankCounter = 10;
        cardName = "king";
      }
      if (currentSuit == "spades") {
        currentEmoji = SPADE;
      } else if (currentSuit == "hearts") {
        currentEmoji = HEART;
      } else if (currentSuit == "clubs") {
        currentEmoji = CLUB;
      } else if (currentSuit == "diamonds") {
        currentEmoji = DIAMOND;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      deck.push(card);

      counter = counter + 1;
    }
    suitIndex = suitIndex + 1;
  }

  return deck;
};

// Get a random card from the deck
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleCards = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);

    var currentItem = cards[index];

    var randomItem = cards[randomIndex];

    cards[index] = randomItem;
    cards[randomIndex] = currentItem;

    index = index + 1;
  }

  return cards;
};

//Start
var currentGameMode = "draw card";
var deck = shuffleCards(makeDeck());
var playerHand = [];
var computerHand = [];

var main = function (input) {
  if (currentGameMode == "draw card") {
    var counter = 0;
    while (counter < 2) {
      counter += 1;
      var playerCardInHand = deck.pop();
      playerHand.push(playerCardInHand);
      var computerCardInHand = deck.pop();
      computerHand.push(computerCardInHand);
    }

    var playerScore = scoreCounter(playerHand);
    console.log(playerScore);
    var computerScore = scoreCounter(computerHand);
    console.log(computerScore);
    var showPlayerHand = showHand(playerHand);
    console.log(showPlayerHand);
    var showComputerHand = showHand(computerHand);
    console.log(showComputerHand);

    var myOutputValue = "";
    myOutputValue =
      "Player drew: " +
      showPlayerHand +
      "<br>" +
      "Player score is: " +
      playerScore +
      "<br>" +
      "Computer drew " +
      showComputerHand +
      "<br>" +
      "Computer score is:" +
      computerScore;

    currentGameMode = "hit or stand";
    return myOutputValue;
  } else if (currentGameMode == "hit or stand") {
    if (input == "hit") {
      playerCardInHand = deck.pop();
      playerHand.push(playerCardInHand);
      var playerScore = scoreCounter(playerHand);
      console.log(playerScore);
      var computerScore = scoreCounter(computerHand);
      console.log(computerScore);
      var showPlayerHand = showHand(playerHand);
      console.log(showPlayerHand);
      var showComputerHand = showHand(computerHand);
      console.log(showComputerHand);

      var myOutputValue = "";
      myOutputValue =
        "Player drew: " +
        showPlayerHand +
        "<br>" +
        "Player score is: " +
        playerScore +
        "<br>" +
        "Computer drew " +
        showComputerHand +
        "<br>" +
        "Computer score is:" +
        computerScore;

      return myOutputValue;
    } else if (input == "stand") {
      var playerScore = scoreCounter(playerHand);
      console.log(playerScore);
      var computerScore = scoreCounter(computerHand);
      console.log(computerScore);
      var showPlayerHand = showHand(playerHand);
      console.log(showPlayerHand);
      var showComputerHand = showHand(computerHand);
      console.log(showComputerHand);

      var myOutputValue = "";
      myOutputValue =
        getWinner(playerScore, computerScore) +
        "Player drew: " +
        showPlayerHand +
        "<br>" +
        "Player score is: " +
        playerScore +
        "<br>" +
        "Computer drew " +
        showComputerHand +
        "<br>" +
        "Computer score is:" +
        computerScore;
      currentGameMode = "draw card";
      deck = shuffleCards(makeDeck());
      playerHand = [];
      computerHand = [];

      return myOutputValue;
    } else if (input != "hit" || input != "stand") {
      myOutputValue = "Please enter 'hit' or 'stand'.";

      return myOutputValue;
    }
  }
};

var showHand = function (hand) {
  var i = 0;
  var showHandResult = "";
  while (i < hand.length) {
    showHandResult += hand[i].name;

    if (i != hand.length - 1) {
      showHandResult += " and ";
    }
    i = i + 1;
  }
  return showHandResult;
};
var scoreCounter = function (hand) {
  var i = 0;
  var score = 0;
  while (i < hand.length) {
    score = score + hand[i].rank;
    i = i + 1;
  }
  return score;
};

//Who wins??
var getWinner = function (playerScore, computerScore) {
  if (playerScore > computerScore && playerScore < 22) {
    return `You Win!! <br>
            Press 'Submit' to play again! <br>`;
  } else if (playerScore > 21) {
    return `You went busts :( <br>
            Press 'Submit' to play again! <br>`;
  } else if (playerScore < computerScore) {
    return `You lost :( <br>
            Press 'Submit' to play again! <br>`;
  } else if ((playerScore = computerScore)) {
    return `It's a draw! <br>
            Press 'Submit' to play again! <br>`;
  }
};
