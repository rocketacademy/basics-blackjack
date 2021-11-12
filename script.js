// To do:
// implement betting
// calculate multiplayer winning variable
// properly deal cards defeind to each player
// htmL

var state = "GET NUMBER OF PLAYERS";
var numberOfPlayers = 0;
var numOfPlayer1Wins = 0;
var numOfDealerWins = 0;
var cardDeck = [];
var playerCurrency = [];
var playerBets = [];
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

  var currentLeaderboard = function () {
    let message = "";
    for (let i = 0; i < playerCurrency.length; i++) {
      message += `Player${i + 1}'s coins: ${playerCurrency[i]} <br>`;
    }
    return `${message}`;
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
    click Submit to play again<br>
    ${currentLeaderboard()}<br>`;
  };

  if (state === "GET NUMBER OF PLAYERS") {
    numberOfPlayers = Number(input);
    state = "BUILD DECK";
    return `there are now ${numberOfPlayers} players. Click Submit to build the deck!`;
  } else if (state === "BUILD DECK") {
    makeDeck();
    shuffleCards(cardDeck);
    for (let i = 0; i < numberOfPlayers; i++) {
      playerCurrency.push(100);
    }
    state = "PLACE BETS";
    return `Please input how much Player 1 would like to bet!`;
  } else if (state === "PLACE BETS") {
    let playerIndex = 1;
    let bet = 0;

      bet = Number(input);
      playerCurrency[playerIndex] -= bet;
      playerBets.push(bet);
      console.log(bet);
      console.log(playerIndex);
      playerIndex += 1;
      // return `Please input how much player ${playerIndex} would like to bet!`;
    
    state = "START";
  } else if (state === "START") {
    while (dealerCards.length < 2) {
      playerCards.push[cardDeck.pop()];
      dealerCards.push(cardDeck.pop());
      playerCards[2].push[cardDeck.pop()];
      dealerCards.push(cardDeck.pop());
    }
    state = "OPTION";
    playerValue += Number(playerCards[0].value) + Number(playerCards[1].value);
    dealerValue += Number(dealerCards[0].value) + Number(dealerCards[1].value);
    return `The player drew ${JSON.stringify(playerCards)}<br>
    the dealer drew ${JSON.stringify(dealerCards)}<br>
    total value of player cards is: ${playerValue}<br>
    total value of dealer cards is :${dealerValue}<br>
    Enter HIT or STAY<br>
    ${currentLeaderboard()}`;
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
      numOfPlayer1Wins += 1;
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
