var gameMode = "new round";
var gameDeck = shuffleDeck(makeNewDeck());
var players = ["Dealer", "Player"];
var dealerCards = [];
var playerCards = [];
var result = "";
var winner = "";
var dealerHand = 0;
var playerHand = 0;

var main = function (input) {
  return playGame(input);
};

function playGame(input) {
  if (gameMode == "new round") {
    // Reset last round's cards and hand, if any
    dealerHand = 0;
    playerHand = 0;
    dealerCards = [];
    playerCards = [];
    gameMode = "draw cards";
    return "Drawing cards...";
  } else if (gameMode == "draw cards") {
    dealerCards.push(gameDeck.pop());
    dealerCards.push(gameDeck.pop());
    playerCards.push(gameDeck.pop());
    playerCards.push(gameDeck.pop());
    playerHand = sumCardsValue(playerCards);
    dealerHand = sumCardsValue(dealerCards);

    console.log(
      `Dealer drew ${dealerCards[0].suit} ${dealerCards[0].name} ${dealerCards[1].suit} ${dealerCards[1].name}`
    );
    console.log(
      `Player drew ${playerCards[0].suit} ${playerCards[0].name} ${playerCards[1].suit} ${playerCards[1].name}`
    );
    gameMode = "hit or stand";
    return `Dealer drew ${dealerCards[0].suit} ${dealerCards[0].name} and ${dealerCards[1].suit} ${dealerCards[1].name}; Dealer's score is ${dealerHand}. <br>Player drew ${playerCards[0].suit} ${playerCards[0].name} and ${playerCards[1].suit} ${playerCards[1].name}; Player's score is ${playerHand}. <br>Player - hit or stand?`;
  } else if (gameMode == "hit or stand") {
    if (input == "") {
      return "Please enter either 'hit' or 'stand'.";
    } else if (input == "hit") {
      var hitCard = gameDeck.pop();
      playerCards.push(hitCard);
      playerHand = sumCardsValue(playerCards);
      console.log(`Player drew ${hitCard.suit} ${hitCard.name}.}`);
      return `Player drew ${hitCard.suit} ${hitCard.name}. Player's score is ${playerHand}`;
    } else if (input == "stand") {
      gameMode = "check results";
      return "Player chose to stand.";
    }
  } else if (gameMode == "check results") {
    // Check for Blackjack
    if (checkBlackjack(dealerCards) || checkBlackjack(playerCards)) {
      if (checkBlackjack(dealerCards) && checkBlackjack(playerCards)) {
        result = "tie";
        winner = "nobody wins";
      } else if (checkBlackjack(dealerCards)) {
        result = "blackjack";
        winner = "Dealer";
      } else {
        result = "blackjack";
        winner = "Player";
      }
    }
    // Check for bust
    else if (dealerHand > 21 || playerHand > 21) {
      if (dealerHand > 21) {
        result = "bust";
        winner = "Player";
      } else if (playerHand > 21) {
        result = "bust";
        winner = "Dealer";
      }
    }
    // Nobody has Blackjack, nobody bust
    else {
      if (dealerHand == playerHand) {
        result = "tie";
        winner = "nobody wins";
      } else if (dealerHand > playerHand) {
        result = "win";
        winner = "Dealer";
      } else {
        result = "win";
        winner = "Player";
      }
    }
    console.log(`dealer ${dealerHand} player ${playerHand}`);
    console.log(`${result}, ${winner}`);
    gameMode = "new round";
    return `The Dealer's hand is ${dealerHand} and the Player's hand is ${playerHand}. We have a ${result}! ${winner} takes this round.`;
  }
}

function makeNewDeck() {
  var deck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  for (var suitCounter = 0; suitCounter < 4; suitCounter += 1) {
    for (var nameCounter = 0; nameCounter < 13; nameCounter += 1) {
      var cardName = nameCounter + 1;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      deck.push({
        suit: suits[suitCounter],
        rank: nameCounter + 1,
        value: nameCounter + 1,
        name: cardName,
      });
    }
  }
  // Set value of jack, queen and king to 10
  for (var card in deck) {
    if (deck[card].rank >= 11 && deck[card].rank <= 13) {
      deck[card].value = 10;
    } else if (deck[card].rank == 1) {
      deck[card].value = 11;
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  return deck.sort(() => Math.random() - 0.5);
}

// Check if someone has a blackjack
var checkBlackjack = function (cards) {
  var isBlackjack = false;
  if (cards.length == 2) {
    if (
      (cards[0].name == "ace" && cards[1].value == 10) ||
      (cards[0].value == 10 && cards[1].name == "ace")
    ) {
      isBlackjack = true;
    }
  }
  return isBlackjack;
};

// Sum up each player's card into the value of thier current hand, takes in an array of card objects
function sumCardsValue(cards) {
  var sum = 0;
  for (var item of cards) {
    sum += item.value;
  }
  return sum;
}
