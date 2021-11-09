var currDeck = [];
var player = [];
var dealer = [];

var gameOver = false;

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var getIcon = function (suits) {
  if (suits == `Hearts`) {
    return " ♥️";
  }
  if (suits == `Diamonds`) {
    return " ♦️";
  }
  if (suits == `Clubs`) {
    return " ♣️";
  }
  if (suits == `Spades`) {
    return " ♠️";
  }
};
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

  for (var s = 0; s < suits.length; s += 1) {
    var currentSuit = suits[s];
    for (var r = 1; r <= 13; r += 1) {
      var cardName = r;
      var rankNum = r;

      if (cardName == 1) {
        rankNum = 11;
        cardName = "Ace";
      } else if (cardName == 11) {
        rankNum = 10;
        cardName = "Jack";
      } else if (cardName == 12) {
        rankNum = 10;
        cardName = "Queen";
      } else if (cardName == 13) {
        rankNum = 10;
        cardName = "King";
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankNum,
      };
      cardDeck.push(card);
    }
  }
  return cardDeck;
};

var shuffleCards = function (cardDeck) {
  for (var d = 0; d < cardDeck.length; d += 1) {
    var currentCard = cardDeck[d];

    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];

    cardDeck[d] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};

var drawCard = function (playerDealer) {
  return playerDealer.push(currDeck.shift());
};

var getSumOnHand = function (onHand) {
  var sum = 0;
  var aceOnHand = 0;

  for (var c = 0; c < onHand.length; c += 1) {
    var currCard = onHand[c];

    if (currCard.rank == 11) {
      aceOnHand += 1;
      sum += currCard.rank;
    } else {
      sum += currCard.rank;
    }
  }

  if (sum > 21 && aceOnHand > 0) {
    for (var a = 0; a < aceOnHand; a += 1) {
      sum -= 10;
      if (sum <= 21) {
        break;
      }
    }
  }

  return sum;
};

var getCardOnHand = function (onHand) {
  var cards = ``;
  for (var c = 0; c < onHand.length; c += 1) {
    cards = cards + `, <u>${onHand[c].name} of ${onHand[c].suit}${getIcon(onHand[c].suit)}</u>`;
  }
  return cards;
};

var blackJack = function (onHand) {
  return onHand.length == 2 && getSumOnHand(onHand) == 21;
};

var getGenericMessage = function () {
  return `Player 1 have${getCardOnHand(
    player
  )} on hand. <br>Sum on hand: ${getSumOnHand(
    player
  )}.<br>Dealer have${getCardOnHand(
    dealer
  )} on hand. <br>Sum on hand: ${getSumOnHand(dealer)} `;
};

var main = function (input) {
  if (gameOver == false) {
    if (currDeck.length == 0) {
      currDeck = shuffleCards(makeDeck());
    }

    //Console Log
    //console.log(currDeck);

    if (player.length == 0) {
      drawCard(player);
      drawCard(dealer);

      drawCard(player);
      drawCard(dealer);

      if (blackJack(player)) {
        gameOver = true;
        return `<strong>Player 1 has BlackJack and <u>Won</u>.</strong><br>Please refresh to start new game. <br><br>${getGenericMessage()}`;
      }

      if (blackJack(dealer)) {
        gameOver = true;
        return `<strong>Dealer has BlackJack and <u>Won</u>.</strong><br>Please refresh to start new game. <br><br>${getGenericMessage()}`;
      }

      return `${getGenericMessage()}<br><br>Player 1. Please enter "hit" or "stand" and Submit`;
    }

    var input = input.toLowerCase();
    if (input == `hit`) {
      drawCard(player);
      if (getSumOnHand(player) > 21) {
        gameOver = true;
        return `<strong>Dealer has <u>Won</u>!<br>Player 1 has bust.</strong><br>Please refresh to start new game<br><br>${getGenericMessage()}`;
      } else {
        return `${getGenericMessage()}<br><br>Player 1. Please enter "hit" or "stand" and Submit`;
      }
    }
    if (input == `stand`) {
      while (getSumOnHand(dealer) < 17) {
        drawCard(dealer);
        if (getSumOnHand(dealer) > 21) {
          gameOver = true;
          return `<strong>Player 1 has <u>Won</u>!<br>Dealer has bust.</strong><br>Please refresh to start new game.<br><br>${getGenericMessage()}`;
        }
      }
      if (getSumOnHand(player) > getSumOnHand(dealer)) {
        gameOver = true;
        return `<strong>Player 1 has <u>Won</u>.</strong><br>Please refresh to start new game. <br><br>${getGenericMessage()}`;
      }
      if (getSumOnHand(dealer) > getSumOnHand(player)) {
        gameOver = true;
        return `<strong>Dealer has <u>Won</u>.</strong><br>Please refresh to start new game. <br><br>${getGenericMessage()}`;
      }
      if (getSumOnHand(dealer) = getSumOnHand(player)) {
        gameOver = true;
        return `<strong>It is a <u>tie</u></strong><br>Please refresh to start new game. <br><br>${getGenericMessage()}`;
      }
    } else {
      return `Please enter "hit" or "stand" and Submit`;
    }
  }
  return `Game over. Please refresh to start new game.`;
};
