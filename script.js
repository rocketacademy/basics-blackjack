var gameMode = "start";
var player = [];
var dealer = [];
var cardDeck = [];

var main = function (input) {
  var outputMessage = "";
  if (gameMode == "start") {
    cardDeck = shuffledDeck();
    player.push(cardDeck.pop());
    player.push(cardDeck.pop());
    dealer.push(cardDeck.pop());
    dealer.push(cardDeck.pop());
    if (checkBlackJack(player) == true || checkBlackJack(dealer) == true) {
      if (checkBlackJack(player) == true && checkBlackJack(dealer) == true) {
        outputMessage =
          cardsInHand(player, dealer) + "<br> It is a black jack tie.";
      } else if (checkBlackJack(player) == true) {
        outputMessage =
          cardsInHand(player, dealer) + "<br> Player wins by black jack!";
      } else if (checkBlackJack(dealer) == true) {
        outputMessage =
          cardsInHand(player, dealer) + "<br> Dealer wins by black jack!";
      }
    } else {
      gameMode = "Player's Turn";
      outputMessage =
        "Cards have been dealt. The total value of player's cards is " +
        valueOfCards(player) +
        ". <br> <br>" +
        cardsInHand(player, dealer) +
        "<br> Does player want to hit or stand?";
    }
  } else if (gameMode == "Player's Turn") {
    if (input == "hit") {
      player.push(cardDeck.pop());
      outputMessage =
        "Cards have been dealt. The total value of player's cards is " +
        valueOfCards(player) +
        ". <br> <br>" +
        cardsInHand(player, dealer) +
        "<br> Does player want to hit or stand?";
    } else if (input == "stand") {
      gameMode = "Dealer's Turn";
      outputMessage =
        "It is now dealer's turn. <br> <br>" +
        cardsInHand(player, dealer) +
        "<br> Press submit to continue. ";
    } else {
      outputMessage = "Inputs should only be either hit or stand. Try again.";
    }
  } else if (gameMode == "Dealer's Turn") {
    while (valueOfCards(dealer) <= 16) {
      dealer.push(cardDeck.pop());
    }
    if (valueOfCards(player) > 21) {
      if (valueOfCards(dealer) <= 21) {
        outputMessage = cardsInHand(player, dealer) + "<br> Dealer wins.";
      } else {
        outputMessage = cardsInHand(player, dealer) + "<br> It is a tie.";
      }
    } else {
      if (valueOfCards(dealer) > 21) {
        outputMessage = cardsInHand(player, dealer) + "<br> Player wins.";
      } else {
        if (valueOfCards(dealer) > valueOfCards(player)) {
          outputMessage = cardsInHand(player, dealer) + "<br> Dealer wins.";
        } else if (valueOfCards(dealer) < valueOfCards(player)) {
          outputMessage = cardsInHand(player, dealer) + "<br> Player wins.";
        } else {
          outputMessage = cardsInHand(player, dealer) + "<br> It is a tie.";
        }
      }
    }
  }
  return outputMessage;
};

var shuffledDeck = function () {
  var cardDeck = createDeck();
  for (var i = 0; i < cardDeck.length; i++) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[i];
    cardDeck[i] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};

function createDeck() {
  var cardDeck = [];
  var suits = ["Spades", "Diamonds", "Hearts", "Clubs"];
  for (var i = 0; i < 13; i++) {
    for (var j = 0; j < 4; j++) {
      if (i + 1 == 1) {
        cardDeck.push({
          name: "Ace",
          suitType: suits[j],
          rank: i + 1,
        });
      } else if (i + 1 == 11) {
        cardDeck.push({
          name: "Jack",
          suitType: suits[j],
          rank: i + 1,
        });
      } else if (i + 1 == 12) {
        cardDeck.push({
          name: "Queen",
          suitType: suits[j],
          rank: i + 1,
        });
      } else if (i + 1 == 13) {
        cardDeck.push({
          name: "King",
          suitType: suits[j],
          rank: i + 1,
        });
      } else {
        cardDeck.push({
          name: i + 1,
          suitType: suits[j],
          rank: i + 1,
        });
      }
    }
  }
  return cardDeck;
}

var getRandomIndex = function (input) {
  return Math.floor(Math.random() * input);
};

var checkBlackJack = function (playerCards) {
  if (
    (playerCards[0].name == "Ace" && playerCards[1].rank >= 10) ||
    (playerCards[1].name == "Ace" && playerCards[0].rank >= 10)
  ) {
    return true;
  } else {
    return false;
  }
};

var cardsInHand = function (playerCards, dealerCards) {
  var ans = "Player hand: " + "<br>";
  var index = 0;
  while (index < playerCards.length) {
    ans +=
      playerCards[index].name + " of " + playerCards[index].suitType + "<br>";
    index += 1;
  }
  ans += "<br>" + "Dealer hand: " + "<br>";
  var index = 0;
  while (index < dealerCards.length) {
    ans +=
      dealerCards[index].name + " of " + dealerCards[index].suitType + "<br>";
    index += 1;
  }
  return ans;
};

var valueOfCards = function (playerCards) {
  var value = 0;
  var aceCounter = 0;
  for (var i = 0; i < playerCards.length; i++) {
    if (playerCards[i].rank >= 10) {
      value += 10;
    } else if (playerCards[i].name == "Ace") {
      if (aceCounter == 0) {
        aceCounter += 1;
        value += 11;
      } else {
        value += 1;
      }
    } else {
      value += playerCards[i].rank;
    }
  }
  if (value > 21) {
    if (aceCounter == 1) {
      value -= 10;
    }
  }
  return value;
};
