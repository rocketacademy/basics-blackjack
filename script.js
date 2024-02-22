var makeDeck = function () {
  var deck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
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
var deck = shuffleCards(makeDeck());
var TWENTY_ONE = 21;
var dealerHitThreshold = 16;
var playerHasChosenToStand = false;
var gameOver = false;
var playerHand = [];
var computerHand = [];
var dealCardToHand = function (hand) {
  hand.push(deck.pop());
};
var getHandSum = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  var counter = 0;
  while (counter < hand.length) {
    var currCard = hand[counter];
    if (currCard.rank === 1) {
      numAcesInHand += 1;
      sum += 11;
    } else {
      sum += currCard.rank;
    }
    counter = counter + 1;
  }
  if (sum > TWENTY_ONE && numAcesInHand > 0) {
    var aceCounter = 0;
    while (aceCounter < numAcesInHand) {
      sum -= 10;
      if (sum <= TWENTY_ONE) {
        break;
      }
      aceCounter = aceCounter + 1;
    }
  }
  return sum;
};
//
var isBlackjack = function (hand) {
  return hand.length === 2 && getHandSum(hand) === TWENTY_ONE;
};
var convertHandToString = function (hand) {
  var cards = "";
  var handIndex = 0;
  while (handIndex < hand.length) {
    cards = cards + "," + hand[handIndex].name;
    handIndex = handIndex + 1;
  }
  return cards;
};
var getDefaultOutput = function () {
  return `Player has: ${convertHandToString(playerHand)} with sum ${getHandSum(
    playerHand
  )}. <br>
    Computer has: ${convertHandToString(computerHand)} with sum ${getHandSum(
    computerHand
  )}.`;
};
var main = function (input) {
  if (gameOver) {
    return "The game is over. Please refresh to play again.";
  }
  if (playerHand.length === 0) {
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);
    if (isBlackjack(computerHand)) {
      gameOver = true;
      return `${getDefaultOutput()} <br>
        Computer has Blackjack and wins. Please refresh to play again.`;
    }
    if (isBlackjack(playerHand)) {
      gameOver = true;
      return `${getDefaultOutput()} <br>
        Player has Blackjack and wins. Please refresh to play again.`;
    }
    return `${getDefaultOutput()} <br>
      Please enter "hit" or "stand", then press Submit`;
  }
  if (!playerHasChosenToStand) {
    if (input !== "hit" && input !== "stand") {
      return 'Please input either "hit" or "stand" as possible moves in Blackjack';
    }
    if (input === "hit") {
      dealCardToHand(playerHand);
      if (getHandSum(playerHand) > TWENTY_ONE) {
        gameOver = true;
        return `${getDefaultOutput()} <br>
          Player has busted and loses. Please refresh to play again.`;
      }
    }
    if (input === "stand") {
      playerHasChosenToStand = true;
    }
  }
  var computerHandSum = getHandSum(computerHand);
  if (computerHandSum <= dealerHitThreshold) {
    dealCardToHand(computerHand);
    computerHandSum = getHandSum(computerHand);
    if (computerHandSum > TWENTY_ONE) {
      gameOver = true;
      return `${getDefaultOutput()} <br>
      Computer has busted and loses. Please refresh to play again.`;
    }
  }
  if (playerHasChosenToStand && computerHandSum > dealerHitThreshold) {
    gameOver = true;
    if (getHandSum(playerHand) > computerHandSum) {
      return `${getDefaultOutput()} <br>
        Player wins! Please refresh to play again.`;
    }
    return `${getDefaultOutput()} <br>
      Computer wins! Please refresh to play again.`;
  }
  return `${getDefaultOutput()} <br>
    playerHasChosenToStand is ${playerHasChosenToStand} <br>
    If player has not yet chosen to stand, please enter "hit" or "stand". <br>
    Else, press Submit to see Computer's next move.`;
};
