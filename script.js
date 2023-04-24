var gameMode = "shuffle deck and deal";
var computerCard = [];
var playerCard = [];
var shuffledDeck = [];

var main = function (input) {
  if (gameMode == "shuffle deck and deal") {
    shuffledDeck = shuffleCards(deck);

    for (i = 0; i < 2; i += 1) {
      playerCard.push(shuffledDeck.pop());
      computerCard.push(shuffledDeck.pop());
    }

    var computerCardSum = computerCard.reduce(
      (total, obj) => obj.rank + total,
      0
    );
    var playerCardSum = playerCard.reduce((total, obj) => obj.rank + total, 0);

    if (
      ((computerCard[0].rank == 1 && computerCard[1].rank == 10) ||
        (computerCard[0].rank == 10 && computerCard[1].rank == 1)) &&
      !(
        (playerCard[0].rank == 1 && playerCard[1].rank == 10) ||
        (playerCard[0].rank == 10 && playerCard[1].rank == 1)
      )
    ) {
      return `Computer had ${computerCard[0].name} of ${computerCard[0].suit} and ${computerCard[1].name} of ${computerCard[1].suit}. <br><br> Player had ${playerCard[0].name} of ${playerCard[0].suit} and ${playerCard[1].name} of ${playerCard[1].suit}. <br><br> Computer had drawn a blackjack and wins!`;
    }

    if (
      !(
        (computerCard[0].rank == 1 && computerCard[1].rank == 10) ||
        (computerCard[0].rank == 10 && computerCard[1].rank == 1)
      ) &&
      ((playerCard[0].rank == 1 && playerCard[1].rank == 10) ||
        (playerCard[0].rank == 10 && playerCard[1].rank == 1))
    ) {
      return `Computer had ${computerCard[0].name} of ${computerCard[0].suit} and ${computerCard[1].name} of ${computerCard[1].suit}. <br><br> Player had ${playerCard[0].name} of ${playerCard[0].suit} and ${playerCard[1].name} of ${playerCard[1].suit}. <br><br> Player had drawn a blackjack and wins!`;
    }

    if (
      ((computerCard[0].rank == 1 && computerCard[1].rank == 10) ||
        (computerCard[0].rank == 10 && computerCard[1].rank == 1)) &&
      ((playerCard[0].rank == 1 && playerCard[1].rank == 10) ||
        (playerCard[0].rank == 10 && playerCard[1].rank == 1))
    ) {
      return `Computer had ${computerCard[0].name} of ${computerCard[0].suit} and ${computerCard[1].name} of ${computerCard[1].suit}. <br><br> Player had ${playerCard[0].name} of ${playerCard[0].suit} and ${playerCard[1].name} of ${playerCard[1].suit}. <br><br> Both computer and player had drawn a blackjack and draws!`;
    }

    gameMode = "player's turn";

    return `Computer had ${computerCard[0].name} of ${computerCard[0].suit} and ${computerCard[1].name} of ${computerCard[1].suit}. Computer had ${computerCardSum} points. <br><br> Player had ${playerCard[0].name} of ${playerCard[0].suit} and ${playerCard[1].name} of ${playerCard[1].suit}. Player has ${playerCardSum} points. <br><br> Player to submit "Hit" or "Stand".`;
  }

  if (gameMode == "player's turn") {
    if (input == "Hit") {
      playerCard.push(shuffledDeck.pop());
      playerCardSum = playerCard.reduce((total, obj) => obj.rank + total, 0);

      if (playerCardSum > 21) {
        var result = `Player draw ${
          playerCard[playerCard.length - 1].name
        } of ${
          playerCard[playerCard.length - 1].suit
        }. Player has ${playerCardSum} points and bust. Submit "Stand" for computer's turn.`;
        // gameMode = "computer's turn";
      } else {
        result = `Player draw ${playerCard[playerCard.length - 1].name} of ${
          playerCard[playerCard.length - 1].suit
        }. Player has ${playerCardSum} points. <br><br> Player to submit "Hit" or "Stand".`;
      }
      return result;
    }

    if (input == "Stand") {
      gameMode = "computer's turn";

      console.log("player", playerCard);
      return `It's computer's turn. Press submit.`;
    }
  }

  if (gameMode == "computer's turn") {
    computerCardSum = computerCard.reduce((total, obj) => obj.rank + total, 0);
    playerCardSum = playerCard.reduce((total, obj) => obj.rank + total, 0);
    console.log("computer", computerCard);

    if (computerCardSum < 15) {
      computerCard.push(shuffledDeck.pop());
      computerCardSum = computerCard.reduce(
        (total, obj) => obj.rank + total,
        0
      );
      return `Computer draw ${computerCard[computerCard.length - 1].name} of ${
        computerCard[computerCard.length - 1].suit
      }. Computer has ${computerCardSum} points. Press Submit to continue.`;
    }
    if (playerCardSum <= 21 && computerCardSum < playerCardSum) {
      computerCard.push(shuffledDeck.pop());
      computerCardSum = computerCard.reduce(
        (total, obj) => obj.rank + total,
        0
      );
      return `Computer draw ${computerCard[computerCard.length - 1].name} of ${
        computerCard[computerCard.length - 1].suit
      }. Computer has ${computerCardSum} points. Press Submit to continue.`;
    }

    if (playerCardSum <= 21 && computerCardSum < playerCardSum) {
      computerCard.push(shuffledDeck.pop());
      computerCardSum = computerCard.reduce(
        (total, obj) => obj.rank + total,
        0
      );
      return `Computer draw ${computerCard[computerCard.length - 1].name} of ${
        computerCard[computerCard.length - 1].suit
      }. Computer has ${computerCardSum} points. Press Submit to continue.`;
    }

    console.log("computer", computerCard);

    if (computerCardSum <= 21 && computerCardSum > playerCardSum) {
      return `Computer has ${computerCardSum} points. <br><br> Player has ${playerCardSum} points. <br><br>Computer wins!`;
    }

    if (computerCardSum <= 21 && playerCardSum > 21) {
      return `Computer has ${computerCardSum} points. <br><br> Player has ${playerCardSum} points and bust. <br><br>Computer wins!`;
    }

    if (computerCardSum > 21 && playerCardSum <= 21) {
      return `Computer has ${computerCardSum} points and bust. <br><br> Player has ${playerCardSum} points. <br><br> Player wins!`;
    }

    if (computerCardSum <= 21 && playerCardSum > computerCardSum) {
      return `Computer has ${computerCardSum} points. <br><br> Player has ${playerCardSum} points. <br><br> Player wins!`;
    }

    if (computerCardSum > 21 && playerCardSum > 21) {
      return `Computer has ${computerCardSum} points. <br><br> Player has ${playerCardSum} points. <br><br> Both computer and player bust. Is a tie!`;
    }

    if (computerCardSum == playerCardSum) {
      return `Computer has ${computerCardSum} points. <br><br> Player has ${playerCardSum} points. <br><br> It's a tie!`;
    }
  }
};

// make deck of cards
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

      if (card.rank == 11 || card.rank == 12 || card.rank == 13) {
        card.rank = 10;
      }

      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var deck = makeDeck();

// shuffling of deck
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

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
