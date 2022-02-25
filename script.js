/*
gameMode can take on "start", "Player's Turn" or "Dealer's Turn".
player[] collects the player's cards.
dealer[] collects the dealer's cards.
cardDeck[] refers to the cards in the deck to be distributed.
*/

var gameMode = "start";
var player = [];
var dealer = [];
var cardDeck = [];

var main = function (input) {
  var outputMessage = "";
  if (gameMode == "start") {
    // insert shuffled cards  into the card deck.
    cardDeck = shuffledDeck();
    // player gets 2 cards from deck. dealer also gets 2 cards from deck.
    player.push(cardDeck.pop());
    player.push(cardDeck.pop());
    dealer.push(cardDeck.pop());
    dealer.push(cardDeck.pop());
    // check whether player and dealer has blackjack and assess if there is winner or tie.
    if (checkBlackJack(player) == true || checkBlackJack(dealer) == true) {
      if (checkBlackJack(player) == true && checkBlackJack(dealer) == true) {
        outputMessage = cardsInHand(player, dealer) + "It is a black jack tie.";
      } else if (checkBlackJack(player) == true) {
        outputMessage =
          cardsInHand(player, dealer) + "Player wins by black jack!";
      } else if (checkBlackJack(dealer) == true) {
        outputMessage =
          cardsInHand(player, dealer) + "Dealer wins by black jack!";
      }
    } else {
      // if nobody has blackjack, game continues and becomes player's turn. player can choose to hit or stand
      gameMode = "Player's Turn";
      outputMessage =
        "Cards have been dealt. The total value of player's cards is " +
        valueOfCards(player) +
        ". <br> <br>" +
        cardsInHand(player, dealer) +
        "Does player want to hit or stand?";
    }
  } else if (gameMode == "Player's Turn") {
    if (input == "hit") {
      // if player chooses to hit, he draws another card from the deck.
      player.push(cardDeck.pop());
      outputMessage =
        "Cards have been dealt. The total value of player's cards is " +
        valueOfCards(player) +
        ". <br> <br>" +
        cardsInHand(player, dealer) +
        "Does player want to hit or stand?";
    } else if (input == "stand") {
      // if player chooses to stand, his turn ends and it becomes dealer's turn.
      gameMode = "Dealer's Turn";
      outputMessage =
        "It is now dealer's turn. <br> <br>" +
        cardsInHand(player, dealer) +
        "Press submit to continue. ";
    } else {
      // if player inputs something else other than hit or stand, we catch the input error and inform user to try again.
      outputMessage = "Inputs should only be either hit or stand. Try again.";
    }
  } else if (gameMode == "Dealer's Turn") {
    // if dealer's total card value is less than or equals to 16, he will draw cards until it is at least 17.
    while (valueOfCards(dealer) <= 16) {
      dealer.push(cardDeck.pop());
    }
    if (valueOfCards(player) > 21) {
      // if player's total card value exceeds 21, he has busted. we check dealer's card value to see if dealer wins or it is a tie.
      if (valueOfCards(dealer) <= 21) {
        outputMessage = cardsInHand(player, dealer) + "Dealer wins.";
      } else {
        outputMessage = cardsInHand(player, dealer) + "It is a tie.";
      }
    } else {
      // if player's total card value does not exceed 21, we check dealer's total card value, on whether it has exceeded 21 (therefore player wins). If not, we compare the total card value of player and dealer and the assess whether player or dealer wins, or it is a tie.
      if (valueOfCards(dealer) > 21) {
        outputMessage = cardsInHand(player, dealer) + "Player wins.";
      } else {
        if (valueOfCards(dealer) > valueOfCards(player)) {
          outputMessage = cardsInHand(player, dealer) + "Dealer wins.";
        } else if (valueOfCards(dealer) < valueOfCards(player)) {
          outputMessage = cardsInHand(player, dealer) + "Player wins.";
        } else {
          outputMessage = cardsInHand(player, dealer) + "It is a tie.";
        }
      }
    }
  }
  return outputMessage;
};

// shuffledDeck is a function that shuffles the elements in the cardDeck array.
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

// createDeck is a function that creates a deck of cards, with name, suit type and rank attributes.
var createDeck = function () {
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
};

var getRandomIndex = function (input) {
  return Math.floor(Math.random() * input);
};

//checkBlackJack is a function that checks whether playerCards has a blackjack.
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

// cardsInHand is a function that outputs the cards in the player's hand and dealer's hand in a string.
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
  ans += "<br>";
  return ans;
};

// valueOfCards is a function that outputs the total value of the playerCards.
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
