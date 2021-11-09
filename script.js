// To do: refactor and optimize code by using generic get win lose message
// implement Aces logic
// improve presentation
// shift dealer draw up to "calculating winner" state and list what dealer drew in a while loop
var state = "BUILD DECK";
var numOfPlayer1Wins = 0;
var numOfDealerWins = 0;
var cardDeck = [];
var playerCards = [];
var dealerCards = [];
var playerValue = 0;
var dealerValue = 0;

var cardGame = function (input) {
  // debugger
  var makeDeck = function () {
    var suits = ["hearts", "diamonds", "clubs", "spades"];
    var suitIndex = 0;

    while (suitIndex < suits.length) {
      var currentSuit = suits[suitIndex];
      var rankCounter = 1;

      while (rankCounter <= 13) {
        var cardName = rankCounter;
        var cardValue = rankCounter;
        if (cardName == 1) {
          cardName = "ace";
          cardValue = 11;
        } else if (cardName == 11) {
          cardName = "jack";
          cardValue = 10;
        } else if (cardName == 12) {
          cardName = "queen";
          cardValue = 10;
        } else if (cardName == 13) {
          cardName = "king";
          cardValue = 10;
        }
        var card = {
          name: cardName,
          suit: currentSuit,
          value: cardValue,
        };
        cardDeck.push(card);
        rankCounter += 1;
      }
      suitIndex += 1;
    }
  };

  var getRandomIndex = function (max) {
    return Math.floor(Math.random() * max);
  };

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
  };

  var gameOver = function () {
    var playerHand = playerValue;
    var dealerHand = dealerValue;
    var dealerWins = numOfDealerWins;
    var playerWins = numOfPlayer1Wins;
    state = "START";
    playerCards = [];
    dealerCards = [];
    playerValue = 0;
    dealerValue = 0;
    return `<br>
    total value of player cards is: ${playerHand}<br>
    total value of dealer cards is :${dealerHand}<br>
    Dealer has won ${dealerWins} times<br>
    Player has won ${playerWins} times<br>
    click Submit to play again<br>`;
  };


  if (state == "BUILD DECK") {
    makeDeck();
    shuffleCards(cardDeck);
    state = "START";
    return `Click Submit to deal cards`;
  } else if (state == "START") {
    while (playerCards.length < 2 && dealerCards.length < 2) {
      playerCards.push(cardDeck.pop());
      dealerCards.push(cardDeck.pop());
    }
    state = "OPTION";
    playerValue += Number(playerCards[0].value) + Number(playerCards[1].value);
    dealerValue += Number(dealerCards[0].value) + Number(dealerCards[1].value);
    return `The player drew ${JSON.stringify(playerCards)}<br>
    the dealer drew ${JSON.stringify(dealerCards)}<br>
    total value of player cards is: ${playerValue}<br>
    total value of dealer cards is :${dealerValue}<br>
    Enter HIT or STAY`;
  } else if (state == "OPTION") {
    if (input !== "HIT" && input !== "STAY") {
      return `Please type "HIT" or "STAY" and click Submit to continue`;
    } else if (input == "HIT" && playerValue < 21 && dealerValue != 21) {
      playerCards.push(cardDeck.pop());
      playerValue += Number(playerCards[playerCards.length - 1].value);
      state = "OPTION";
      return `you drew ${JSON.stringify(
        playerCards[playerCards.length - 1]
      )}<br>
      your new total value is:${playerValue}<br>
      total value of dealer is :${dealerValue} <br>
      enter HIT or STAY
      `;
    } else if (input == "STAY" && playerValue < 22) {
      state = "CALCULATE WINNER";
      return `Comparing hand Values`;
    } else {
      numOfDealerWins += 1;
      return `BUST
      ${gameOver()} `;
    }
  } else if (state == "CALCULATE WINNER") {
    while (dealerValue < 17) {
      dealerCards.push(cardDeck.pop());
      dealerValue += Number(dealerCards[dealerCards.length - 1].value);
    }
    if (dealerValue > 21 || playerValue > dealerValue) {
      numOfPlayer1Wins += 1
      return `You win!<br>
      ${gameOver()}
      
`;
    } else if (playerValue == dealerValue) {
      return `Draw<br>
      ${gameOver()}`;
    } else {
      numOfDealerWins += 1;
      return `you lose<br>
      ${gameOver()}`;
    }
  }
};

var main = function (input) {
  return cardGame(input);
};
