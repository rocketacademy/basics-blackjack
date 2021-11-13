var state = "GET NUMBER OF PLAYERS";
var numberOfPlayers = 0;
var playerNames = [];
var cardDeck = [];
var playerCurrency = [];
var playerBets = [];
var playerIndex = 0;
var playerCards = [];
var dealerCards = [];
var playerValue = [];
var dealerValue = 0;
var myImage = '<img src="https://c.tenor.com/Hj2-u4VELREAAAAi/655.gif"/>';

var cardGame = function (input) {
  var makeDeck = function () {
    var suits = ["♥️", "♦", "♣️", "♠️"];
    var suitIndex = 0;

    while (suitIndex < suits.length) {
      var currentSuit = suits[suitIndex];
      var rankCounter = 1;

      while (rankCounter <= 13) {
        var cardName = rankCounter;
        var cardValue = rankCounter;
        if (cardName == 1) {
          cardName = "A";
          cardValue = 11;
        } else if (cardName == 11) {
          cardName = "J";
          cardValue = 10;
        } else if (cardName == 12) {
          cardName = "Q";
          cardValue = 10;
        } else if (cardName == 13) {
          cardName = "K";
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
      message += `${playerNames[i]}'s coins: ${playerCurrency[i]} <br>`;
    }
    return `${message}`;
  };

  var displayCards = function () {
    let message2 = "";
    for (let i = 0; i < numberOfPlayers; i++) {
      let message1 = "";
      for (let k = 0; k < playerCards[i].length; k++) {
        message1 += `${playerCards[i][k].name}${playerCards[i][k].suit}&nbsp;&nbsp;`;
      }
      message2 += `${playerNames[i]}'s cards: ${message1} value: ${playerValue[i]} </br>`;
    }
    return `${message2}`;
  };

  var displayDealerCards = function () {
    let message = "";
    for (let i = 0; i < dealerCards.length; i++) {
      message += `${dealerCards[i].name}${dealerCards[i].suit}&nbsp;&nbsp;`;
    }
    return `Dealer's Cards are:${message}<br>
    value:${dealerValue}`;
  };
  var gameOver = function () {
    var playerHand = playerValue;
    var dealerHand = dealerValue;
    state = "BUILD DECK";
    cardDeck = [];
    playerBets = [];
    playerCards = [];
    dealerCards = [];
    playerIndex = 0;
    playerValue = [];
    dealerValue = 0;
    return `Winnings distributed. Click Submit to play again.<br>
    total value of player cards is: ${playerHand}<br>
    total value of dealer cards is :${dealerHand}<br>
    <br>
    ${currentLeaderboard()}<br>`;
  };

  if (state === "GET NUMBER OF PLAYERS") {
    numberOfPlayers = Number(input);
    for (let i = 0; i < numberOfPlayers; i++) {
      playerCurrency.push(100);
    }
    state = "PLAYER NAMES";
    return `There are now ${numberOfPlayers} players. Please enter Player 1's names`;
  } else if (state === "PLAYER NAMES") {
    let name = "";
    if (playerIndex < numberOfPlayers) {
      name = input;
      playerNames.push(name);
      playerIndex += 1;
      if (playerIndex < numberOfPlayers) {
        return `Welcome ${playerNames[playerIndex - 1]}<br>
        please input Player${[playerIndex + 1]}'s name!`;
      }
      state = "BUILD DECK";
      playerIndex = 0;
      return `Click Submit to build the deck!`;
    }
  } else if (state === "BUILD DECK") {
    makeDeck();
    shuffleCards(cardDeck);
    for (let i = 0; i < numberOfPlayers; i++) {
      playerCards.push([]);
    }
    state = "PLACE BETS";
    return `Please input how much ${playerNames[0]} would like to bet!`;
  } else if (state === "PLACE BETS") {
    let bet = 0;
    if (playerIndex < numberOfPlayers) {
      bet = Number(input);
      playerCurrency[playerIndex] -= bet;
      playerBets.push(bet);
      playerIndex += 1;
      if (playerIndex < numberOfPlayers) {
        return `Please input how much ${playerNames[playerIndex]} would like to bet!`;
      }
      state = "START";
      playerIndex = 0;
      return `Please click Submit to deal the cards.`;
    }
  } else if (state === "START") {
    while (dealerCards.length < 2) {
      for (let i = 0; i < numberOfPlayers; i++) {
        playerCards[i].push(cardDeck.pop());
      }
      dealerCards.push(cardDeck.pop());
    }
    state = "OPTION";
    for (let i = 0; i < numberOfPlayers; i++) {
      playerValue.push(
        Number(playerCards[i][0].value) + Number(playerCards[i][1].value)
      );
    }
    dealerValue += Number(dealerCards[0].value) + Number(dealerCards[1].value);
    if (dealerValue === 21) {
      return `Dealer has blackjack ${gameOver()}`;
    }
    return `${displayCards()}<br>
    the dealer drew ${dealerCards[0].name} of ${
      dealerCards[0].suit
    } and the other card is hidden. <br>
    ${playerNames[playerIndex]} choose HIT or STAY<br>
    ${currentLeaderboard()}`;
  } else if (state === "OPTION") {
    if (playerIndex < numberOfPlayers) {
      if (
        input == "HIT" &&
        playerValue[playerIndex] < 21 &&
        dealerValue != 21
      ) {
        playerCards[playerIndex].push(cardDeck.pop());
        playerValue[playerIndex] += Number(
          playerCards[playerIndex][playerCards[playerIndex].length - 1].value
        );
        if (playerValue[playerIndex] > 21) {
          for (let i = 0; i < playerCards[playerIndex].length; i++) {
            if (playerCards[playerIndex][i].name === "A") {
              playerValue[playerIndex] -= 10;
            } 
          }
        }
        state = "OPTION";
        return `${playerNames[playerIndex]} drew ${
          playerCards[playerIndex][playerCards[playerIndex].length - 1].name
        } of ${
          playerCards[playerIndex][playerCards[playerIndex].length - 1].suit
        }<br>
        ${playerNames[playerIndex]}'s' new total value is:${
          playerValue[playerIndex]
        }<br>
      enter HIT or STAY<br>
      ${displayCards()}
      `;
      } else if (
        input === "STAY" &&
        playerValue[playerIndex] < 22 &&
        playerIndex < numberOfPlayers
      ) {
        state = "OPTION";
        playerIndex += 1;
        if (playerIndex < numberOfPlayers) {
          return `${playerNames[playerIndex]} choose HIT or STAY<br>
          ${displayCards()}
          `;
        }
      } else if (playerValue[playerIndex] > 21) {
        playerIndex += 1;
        return `${
          playerNames[playerIndex-1]
        } Busts. Next player Choose Hit or Stay.<br>
        ${displayCards()}
        `;
      }
    }
    state = "DEALER DRAW";
    return `Click submit for Dealer's move.<br>
      ${displayCards()}<br>
      ${currentLeaderboard()}
    `;
  } else if (state === "DEALER DRAW") {
    if (dealerValue < 17) {
      while (dealerValue < 17) {
        dealerCards.push(cardDeck.pop());
        dealerValue += Number(dealerCards[dealerCards.length - 1].value);
      }
      state = "CALCULATE WINNINGS";

      return `The Dealer's card's total value was below 17.<br>
      Dealer draws ${dealerCards[dealerCards.length - 1].name}${
        dealerCards[dealerCards.length - 1].suit
      }<br>
      ${displayDealerCards()}<br>
      Click submit to Calculate winnings`;
    } else state = "CALCULATE WINNINGS";
    return `The Dealer's card's total value was above 16.<br>
    Dealer does not need to draw cards.<br>
    ${displayDealerCards()}<br>
    Click submit to Calculate winnings`;
  } else if (state === "CALCULATE WINNINGS" && dealerValue > 21) {
    state = "BUILD DECK";
    for (let i = 0; i < playerCurrency.length; i++) {
      if (playerValue[i] < 22) {
        playerCurrency[i] = playerCurrency[i] + playerBets[i] + playerBets[i];
      }
    }
    return `Dealer Busts! Players who havent busted win twice their bet!<br>
    ${gameOver()}`;
  } else if (state === "CALCULATE WINNINGS" && dealerValue < 22) {
    state = "BUILD Deck";
    for (let i = 0; i < playerCurrency.length; i++) {
      if (playerValue[i] > dealerValue && playerValue[i] < 22) {
        playerCurrency[i] = playerCurrency[i] + playerBets[i] + playerBets[i];
      } else if (playerValue[i] === dealerValue) {
        playerCurrency[i] = playerCurrency[i] + playerBets[i];
      }
    }
    return `${gameOver()}`;
  }
};

var main = function (input) {
  return cardGame(input);
};
