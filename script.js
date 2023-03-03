var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts ♥️", "diamonds ♦️", "clubs ♣️", "spades ♠️"];
  var tenthNames = [10, "jack 🎃", "queen 👸", "king 🤴"];

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    var currentSuit = suits[suitIndex];
    for (var rankCounter = 1; rankCounter <= 10; rankCounter += 1) {
      var cardName = rankCounter;

      if (cardName != 10) {
        if (cardName == 1) {
          cardName = "ace";
        }

        var card = {
          name: cardName,
          suit: currentSuit,
          rank: rankCounter,
        };

        cardDeck.push(card);
      }

      while (cardName == 10) {
        var nameCounter = 0;
        while (nameCounter < 4) {
          cardName = tenthNames[nameCounter];

          var tenthCard = {
            name: cardName,
            suit: currentSuit,
            rank: rankCounter,
          };

          cardDeck.push(tenthCard);

          nameCounter += 1;
        }
      }
    }
  }

  return cardDeck;
};

var shuffleCards = function (cardDeck) {
  var deckOfCards = cardDeck.slice();

  for (
    var currentIndex = 0;
    currentIndex < deckOfCards.length;
    currentIndex += 1
  ) {
    var randomIndex = Math.floor(Math.random() * deckOfCards.length);
    var randomCard = deckOfCards[randomIndex];
    var currentCard = deckOfCards[currentIndex];
    deckOfCards[randomIndex] = currentCard;
    deckOfCards[currentIndex] = randomCard;
  }

  return deckOfCards;
};

var dealCardsToPlayers = function (hand) {
  var firstCard = shuffledDeck.pop();
  var secondCard = shuffledDeck.pop();
  hand.push(firstCard, secondCard);
  return hand;
};

var handResults = function (hand) {
  var myOutputValue = "";
  for (var counter = 0; counter < hand.length; counter += 1) {
    if (dealerHand[counter] == hand[0] && gameState == "deal") {
      myOutputValue = myOutputValue + ` Hidden card, `;
    } else {
      myOutputValue =
        myOutputValue + ` ${hand[counter].name} of ${hand[counter].suit} , `;
    }
  }

  myOutputValue = myOutputValue.substring(0, myOutputValue.length - 2);

  return myOutputValue;
};

var totalValueOfHand = function (hand) {
  var total = 0;
  var aceCounter = 0;

  for (var counter = 0; counter < hand.length; counter += 1) {
    if (hand[counter].name == "ace") {
      aceCounter += 1;
    } else {
      total += hand[counter].rank;
    }
  }

  if (aceCounter >= 1) {
    total += aceCounter + 10;
  } else {
    total += aceCounter;
  }

  return total;
};

var whoWins = function (playerScore, dealerScore) {
  var myOutputValue = "";
  if (playerScore == dealerScore || (playerScore > 21 && dealerScore > 21)) {
    myOutputValue = `Its a tie.`;
  } else if (
    (playerScore <= 21 && playerScore > dealerScore) ||
    dealerScore > 21
  ) {
    myOutputValue = `Player wins!`;
  } else {
    myOutputValue = `Dealer wins!`;
  }

  return myOutputValue;
};

var hitOrStandDealer = function () {
  var dealerScore = totalValueOfHand(dealerHand);
  if (dealerScore < 17) {
    var hitCard = shuffledDeck.pop();
    dealerHand.push(hitCard);
  }

  return dealerHand;
};

var gameState = "shuffling";
var dealerHand = [];
var playerHand = [];
var unshuffledDeck = makeDeck();
var shuffledDeck = [];

var main = function (input) {
  var myOutputValue = "";

  if (gameState == "shuffling") {
    shuffledDeck = shuffleCards(unshuffledDeck);
    myOutputValue = `Cards have been shuffled! Click submit to deal cards.`;
    gameState = "deal";
  } else if (gameState == "deal") {
    playerHand = dealCardsToPlayers(playerHand);
    dealerHand = dealCardsToPlayers(dealerHand);

    myOutputValue += `Player hand : ` + handResults(playerHand) + `<br>`;
    myOutputValue += `Dealer hand : ` + handResults(dealerHand) + `<br>`;
    myOutputValue += `</br> Please enter "hit" or "stand".`;

    gameState = "hitStand";
    hitButton.style.visibility = "visible";
    standButton.style.visibility = "visible";
    button.style.visibility = "hidden";
  } else if (gameState == "winnerDetermine") {
    var playerScore = totalValueOfHand(playerHand);
    var dealerScore = totalValueOfHand(dealerHand);

    myOutputValue += `Player hand : ` + handResults(playerHand) + `<br>`;
    myOutputValue += `Dealer hand : ` + handResults(dealerHand);

    myOutputValue += `</br></br>${whoWins(
      playerScore,
      dealerScore
    )} <br><br> Please refresh to restart the game !`;
  }

  return myOutputValue;
};
