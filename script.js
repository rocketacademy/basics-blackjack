//Global Variables
var blackjackLimit = 21;
var userStand = false;
var gameState = false;

var deck;
var userHand = [];
var botHand = [];

var getCurrentSumHand = function (hand) {
  var total = 0;
  var counter = 0;
  var countAce = 0;
  while (counter < hand.length) {
    if (hand[counter].rank <= 10 && hand[counter].rank >= 2) {
      total += hand[counter].rank;
    } else if (hand[counter].rank >= 11) total += 10;
    else {
      countAce += 1;
      total += 11;
    }
    counter++;
  }

  if (total > blackjackLimit) {
    if (countAce > 0) {
      var counter = 0;
      while (counter < countAce && total > blackjackLimit) {
        total -= 10;
        counter++;
      }
    }
  }
  return total;
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitsIcon = ["♥", "♦", "♣", "♠"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentSuitIcon = suitsIcon[suitIndex];
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
        icon: currentSuitIcon,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

var drawOneCard = function () {
  var cardDrawn = deck.pop();
  return cardDrawn;
};

var isBlackJack = function (hand) {
  var sum = getCurrentSumHand(hand);
  if (sum === blackjackLimit) {
    return true;
  } else return false;
};

var getWinner = function () {
  var userHandTotal = getCurrentSumHand(userHand);
  var botHandTotal = getCurrentSumHand(botHand);
  if (userHandTotal > botHandTotal) return "user";
  else return "bot";
};

var checkHandLimit = function (hand) {
  if (getCurrentSumHand(hand) > blackjackLimit) {
    return true;
  } else return false;
};

deck = shuffleCards(makeDeck());
var playBlackJack = function (input) {
  if (userHand.length === 0) {
    userHand.push(drawOneCard());
    userHand.push(drawOneCard());
    botHand.push(drawOneCard());
    botHand.push(drawOneCard());
    //Check if any hand wins.
    if (isBlackJack(userHand)) {
      return `User won!`;
    }
    if (isBlackJack(botHand)) {
      return `Bot won!`;
    }
    return `Do you want to 'hit' or 'stand'?`;
  }
  if (input == "stand") userStand = true;
  if (userStand && getCurrentSumHand(botHand) > 16) {
    gameState = true;
    var winner = getWinner();
    if (winner == "user") return `You won!`;
    else return `You lose, the bot had ${getCurrentSumHand(botHand)}.`;
  }
  if (!userStand && input == "hit") {
    userHand.push(drawOneCard());
    if (checkHandLimit(userHand)) {
      gameState = true;
      return `Busted! Your total hand is ${getCurrentSumHand(userHand)}`;
    }
  }

  if (getCurrentSumHand(botHand) <= 16) {
    botHand.push(drawOneCard());
    if (checkHandLimit(botHand)) {
      gameState = true;
      return `Busted! Your total hand is ${getCurrentSumHand(botHand)}`;
    }
  }

  return `If you haven't chosen to stand, please input eithet 'hit' or 'stand'.<br>
  Else, just press 'Submit' for the bot to continue.`;
};

var main = function (input) {
  return playBlackJack();
};
