var gameMode = "new round";
var gameDeck = shuffleDeck(makeSixDecks());
var playersArray = ["Player", "Dealer"];
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
    hitButton.disabled = false;
    standButton.disabled = false;
    return `One of Dealer's card is ${dealerCards[0].suit} ${dealerCards[0].name}. <br>Player drew ${playerCards[0].suit} ${playerCards[0].name} and ${playerCards[1].suit} ${playerCards[1].name}; Player's score is ${playerHand}. <br>Player - hit or stand?`;
  } else if (gameMode == "hit or stand") {
    if (input != "hit" && input != "stand") {
      return "Please select either 'hit' or 'stand'.";
    } else if (input == "hit") {
      var hitCard = gameDeck.pop();
      playerCards.push(hitCard);
      playerHand = sumCardsValue(playerCards);
      console.log(`Player drew ${hitCard.suit} ${hitCard.name}.`);
      return `Player drew ${hitCard.suit} ${hitCard.name}. Player's score is ${playerHand}. <br>Player - hit or stand?`;
    } else if (input == "stand") {
      hitButton.disabled = true;
      standButton.disabled = true;
      gameMode = "Dealer plays";
      return "Player chose to stand. Dealer's turn.";
    }
  } else if (gameMode == "Dealer plays") {
    dealerHand = sumCardsValue(dealerCards);
    while (dealerHand < 17) {
      var hitCard = gameDeck.pop();
      dealerCards.push(hitCard);
      dealerHand += hitCard.value;
      console.log(
        `Dealer hits and drew ${hitCard.suit} ${hitCard.name}. Dealer's hand is ${dealerHand}.`
      );
    }
    gameMode = "check results";
    return `Dealer's turn ended. Click next to tally results.`;
  } else if (gameMode == "check results") {
    // Check for Blackjack
    if (checkBlackjack(dealerCards) || checkBlackjack(playerCards)) {
      if (checkBlackjack(dealerCards) && checkBlackjack(playerCards)) {
        result = "double blackjack";
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
      if (dealerHand > 21 && playerHand > 21) {
        result = "double bust";
        winner = "nobody wins";
      } else if (dealerHand > 21 && playerHand <= 21) {
        result = "bust";
        winner = "Player";
      } else if (playerHand > 21 && dealerHand <= 21) {
        result = "bust";
        winner = "Dealer";
      }
    }
    // If nobody has Blackjack and nobody bust
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
    if (gameDeck.length < 60) {
      gameDeck = shuffleDeck(makeSixDecks());
    }
    return `The Dealer's hand is ${dealerHand} and the Player's hand is ${playerHand}. We have a ${result}! The winner is... ${winner}!`;
  }
}

function makeNewDeck() {
  var deck = [];
  var suits = ["♥️", "♦️", "♣️", "♠️"];
  var numbers = ["2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
  for (var suitCounter = 0; suitCounter < 4; suitCounter += 1) {
    for (var nameCounter = 0; nameCounter < 13; nameCounter += 1) {
      var cardIndex = nameCounter + 1;
      if (cardIndex == 1) {
        cardName = "ace";
      } else if (cardIndex > 1 && cardIndex < 11) {
        cardName = numbers[cardIndex - 2];
      } else if (cardIndex == 11) {
        cardName = "jack";
      } else if (cardIndex == 12) {
        cardName = "queen";
      } else if (cardIndex == 13) {
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
  // Set value of jack, queen and king to 10 and ace to 11
  for (var card in deck) {
    if (deck[card].rank >= 11 && deck[card].rank <= 13) {
      deck[card].value = 10;
    } else if (deck[card].rank == 1) {
      deck[card].value = 11;
    }
  }
  return deck;
}

function makeSixDecks() {
  var sixDecks = [];
  for (let deckCounter = 0; deckCounter < 6; deckCounter += 1) {
    sixDecks = sixDecks.concat(makeNewDeck());
  }
  return sixDecks;
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
    if (item.name != "ace") {
      sum += item.value;
    }
    // Ace will be 11 if it does not make the total score exceed 21
    else {
      if (sum < 11) {
        sum += item.value;
      } else {
        sum += 1;
      }
    }
  }
  return sum;
}
