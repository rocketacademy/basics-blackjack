var fullDeck = [];
var dealerCards = [];
var playerCards = [];
var playerCardsAdd = [];
var dealerCardsScore = 0;
var playerCardsScore = 0;
var playerCardsScore1 = 0;
var playerCardsScore2 = 0;
var dealerCard;
var playerCard;
var playerCardInfo = "";
var playerCardInfo1 = "";
var playerCardInfo2 = "";
var dealerCardInfo = "";
var playerCardInfoAdd = "";
var playerCardInfoAdd1 = "";
var playerCardInfoAdd2 = "";
var dealerCardInfoAdd = "";
var username = "";
var shuffledDeck;
var winImage = `<img src="https://c.tenor.com/QhyEXjZ1PcEAAAAC/win-brad-pitt.gif"/>`;
var loseImage = `<img src="https://c.tenor.com/PUm1wkSXINMAAAAM/teasing-amanda-cee.gif"/>`;
var drawImage = `<img src="https://c.tenor.com/wyfhYqF1tJIAAAAM/mark-wahlberg-wahlberg.gif"/>`;
var bustedImage = `<img src="https://c.tenor.com/EzOD_vFg7hIAAAAC/shame-witch.gif"/>`;
var resetGame = function () {
  fullDeck = [];
  dealerCards = [];
  playerCards = [];
  dealerCardsScore = 0;
  playerCardsScore = 0;
  playerCardsScore1 = 0;
  playerCardsScore2 = 0;
  dealerCard = null;
  playerCard = null;
  playerCardInfo = "";
  playerCardInfo1 = "";
  playerCardInfo2 = "";
  dealerCardInfo = "";
  playerCardInfoAdd = "";
  playerCardInfoAdd1 = "";
  playerCardInfoAdd2 = "";
  dealerCardInfoAdd = "";
  deck = makeDeck();
  shuffledDeck = shuffleCards(deck);
  playerBet = null;
};
var makeDeck = function () {
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
      if (rankCounter == 1) {
        var card = {
          name: cardName,
          suit: currentSuit,
          rank: 11,
        };
        fullDeck.push(card);
      } else if (rankCounter == 11 || rankCounter == 12 || rankCounter == 13) {
        var card = {
          name: cardName,
          suit: currentSuit,
          rank: 10,
        };
        fullDeck.push(card);
      } else {
        var card = {
          name: cardName,
          suit: currentSuit,
          rank: rankCounter,
        };
        fullDeck.push(card);
      }
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return fullDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var genRandomNum = function () {
  var randomDecimal = Math.random() * 2;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger;
};

var changeScoreMultiAce = function(cardsArray){
  var indexes = [];
  for(i = 0; i < cardsArray.length; i++){
  if (cardsArray[i].name == "ace"){
      indexes.push(i);}
  }
  console.log(indexes);
  console.log(cardsArray);
  if (cardsArray.length == 2){
  if (indexes.length > 1){
    cardsArray[1].rank = 1;
  } else {}
} else if (cardsArray.length == 3){
  if (indexes.length > 1){
    cardsArray[1].rank = 1;
    cardsArray[2].rank = 1;
  } else {}
} 
}

function checkforBjWin(cardsArray) {
  var unique = [
    ...new Set(cardsArray.map((propertyToCheck) => propertyToCheck.name)),
  ];
  if (unique.length === 1) {
    console.log(unique);
    return true;
  } else {
    return false;
  }
}
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

var cardSuitsPic = function (drawnCard) {
  if (drawnCard.suit == "clubs") return "♣️";
  if (drawnCard.suit == "spades") return "♠️";
  if (drawnCard.suit == "diamonds") return "♦️";
  if (drawnCard.suit == "hearts") return "♥️";
};

var cardNamesPic = function (drawnCard) {
  if (drawnCard.name == 2) return "2️⃣";
  if (drawnCard.name == 3) return "3️⃣";
  if (drawnCard.name == 4) return "4️⃣";
  if (drawnCard.name == 5) return "5️⃣";
  if (drawnCard.name == 6) return "6️⃣";
  if (drawnCard.name == 7) return "7️⃣";
  if (drawnCard.name == 8) return "8️⃣";
  if (drawnCard.name == 9) return "9️⃣";
  if (drawnCard.name == 10) return "🔟";
  if (drawnCard.name == "ace") return "🅰";
  if (drawnCard.name == "jack") return "♝";
  if (drawnCard.name == "king") return "♚";
  if (drawnCard.name == "queen") return "♛";
};

var deck = makeDeck();
shuffledDeck = shuffleCards(deck);
var playerBet = null;
var totPoints = 100;
document.querySelector("#input-field").disabled = false;
document.querySelector("#submit-button").disabled = false;
document.querySelector("#hit-button").disabled = true;
document.querySelector("#stand-button").disabled = true;
document.querySelector("#doubleDown-button").disabled = true;
document.querySelector("#split-button").disabled = true;
var main = function (input) {
  var cardNum = 2;
  var outputWithSplit = "";
  var outputNoSplit = "";
  if (!username) {
    if (!input) {
      document.querySelector("#input-field").disabled = false;
      document.querySelector("#submit-button").disabled = false;
      document.querySelector("#hit-button").disabled = true;
      document.querySelector("#stand-button").disabled = true;
      document.querySelector("#doubleDown-button").disabled = true;
      document.querySelector("#split-button").disabled = true;
      return `Please key in your name to play.`;
    }
    document.querySelector("#input-field").disabled = false;
    document.querySelector("#hit-button").disabled = true;
    document.querySelector("#stand-button").disabled = true;
    document.querySelector("#doubleDown-button").disabled = true;
    document.querySelector("#split-button").disabled = true;
    username = input;
    return `Hey ${username}!<br/>` + `Now key in your bet >=0 and <= 100.`;
  }
  if (!playerBet) {
    if (!input || input < 0 || input > 100 || isNaN(input)) {
      document.querySelector("#input-field").disabled = false;
      document.querySelector("#submit-button").disabled = false;
      document.querySelector("#hit-button").disabled = true;
      document.querySelector("#stand-button").disabled = true;
      document.querySelector("#doubleDown-button").disabled = true;
      document.querySelector("#split-button").disabled = true;
      return `Please key in an integer >=0 and <=100 to bet.`;
    }
    document.querySelector("#input-field").disabled = false;
    document.querySelector("#submit-button").disabled = false;
    document.querySelector("#hit-button").disabled = true;
    document.querySelector("#stand-button").disabled = true;
    document.querySelector("#doubleDown-button").disabled = true;
    document.querySelector("#split-button").disabled = true;
    playerBet = input;
    console.log(playerBet);
    for (n = 0; n < cardNum; n += 1) {
      dealerCard = shuffledDeck.pop();
      dealerCards.push(dealerCard);
      dealerCardInfo +=
        dealerCard.name +
        ` of ` +
        dealerCard.suit +
        cardNamesPic(dealerCard) +
        cardSuitsPic(dealerCard) +
        ", ";
        changeScoreMultiAce(dealerCards);
      dealerCardsScore += dealerCards[n].rank;
    }
    for (n = 0; n < cardNum; n += 1) {
      var playerCard = shuffledDeck.pop();
      playerCards.push(playerCard);
      playerCardInfo +=
        playerCard.name +
        ` of ` +
        playerCard.suit +
        cardNamesPic(playerCard) +
        cardSuitsPic(playerCard) +
        ", ";
        changeScoreMultiAce(playerCards);
      playerCardsScore += playerCards[n].rank;
    }
    var ranCardNum = genRandomNum();
    var finalCardNum = ranCardNum;
    var dealerCardShowPlayer = dealerCards[finalCardNum];
    var dealerCardShowPlayerInfo =
      dealerCardShowPlayer.name +
      ` of ` +
      dealerCardShowPlayer.suit +
      cardNamesPic(dealerCardShowPlayer) +
      cardSuitsPic(dealerCardShowPlayer);
    outputWithSplit =
      `Welcome ${username} to Blackjack! <br>` +
      `You will only be shown 1 dealer card. <br>` +
      `Dealer hand: ` +
      dealerCardShowPlayerInfo +
      `<br>` +
      `Player hand: ` +
      playerCardInfo +
      `<br> Your bet is ${playerBet} points and you start with total of ${totPoints} points. <br>` +
      `You're at a score of ${playerCardsScore} right now.<br> Decide whether to click:<br> 1. Hit to draw 1 more card <br> 2. Stand to end your turn <br> 3. Double Down to draw 1 more card and double your bet <br> 4. Split to create 2 hands <br>`;
    outputNoSplit =
      `Welcome ${username} to Blackjack! <br>` +
      `You will only be shown 1 dealer card. <br>` +
      `Dealer hand: ` +
      dealerCardShowPlayerInfo +
      `<br>` +
      `Player hand: ` +
      playerCardInfo +
      `<br> Your bet is ${playerBet} points and you start with total of ${totPoints} points. <br>` +
      `You're at a score of ${playerCardsScore} right now.<br> Decide whether to click:<br> 1. Hit to draw 1 more card <br> 2. Stand to end your turn <br> 3. Double Down to draw 1 more card and double your bet <br>`;
    if (playerCards[0].name == playerCards[1].name) {
      document.querySelector("#input-field").disabled = true;
      document.querySelector("#submit-button").disabled = true;
      document.querySelector("#hit-button").disabled = false;
      document.querySelector("#stand-button").disabled = false;
      document.querySelector("#doubleDown-button").disabled = false;
      document.querySelector("#split-button").disabled = false;
      return outputWithSplit;
    } else if (playerCards[0].name != playerCards[1].name) {
      document.querySelector("#input-field").disabled = true;
      document.querySelector("#submit-button").disabled = true;
      document.querySelector("#hit-button").disabled = false;
      document.querySelector("#stand-button").disabled = false;
      document.querySelector("#doubleDown-button").disabled = false;
      document.querySelector("#split-button").disabled = true;
      return outputNoSplit;
    }
  }
  if (
    playerCardsScore1 == 0 &&
    playerCardsScore2 == 0 &&
    (playerCards.length == 3 ||
      dealerCards.length == 3 ||
      (playerCards.length == 2 && dealerCards.length == 2))
  ) {
    return determineWinner();
  } else if (playerCardsScore1 != 0 && playerCardsScore2 != 0) {
    return determineWinnerSplit();
  }
};
var hitGame = function () {
  document.querySelector("#submit-button").disabled = false;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#doubleDown-button").disabled = true;
  document.querySelector("#split-button").disabled = true;
  document.querySelector("#input-field").disabled = true;
  if (
    playerCards.length == 2 &&
    dealerCardsScore <= 17 &&
    dealerCards.length == 2
  ) {
    var playerCardAdd = shuffledDeck.pop();
    var dealerCardAdd = shuffledDeck.pop();
    playerCards.push(playerCardAdd);
    dealerCards.push(dealerCardAdd);
    playerCardInfoAdd =
      playerCardAdd.name +
      ` of ` +
      playerCardAdd.suit +
      cardNamesPic(playerCardAdd) +
      cardSuitsPic(playerCardAdd);
    changeScoreMultiAce(playerCards);
    playerCardsScore = playerCardsScore + playerCardAdd.rank;
    dealerCardInfoAdd =
      dealerCardAdd.name +
      ` of ` +
      dealerCardAdd.suit +
      cardNamesPic(dealerCardAdd) +
      cardSuitsPic(dealerCardAdd);
      changeScoreMultiAce(dealerCards);
    dealerCardsScore = dealerCardsScore + dealerCardAdd.rank;
    console.log(playerCardsScore);
    console.log(dealerCardsScore);
    return (
      `You chose to hit. <br> Your bet remains at ${playerBet} points. <br>` +
      `Full Dealer hand: ` +
      dealerCardInfo +
      dealerCardInfoAdd +
      `<br>` +
      `Player hand: ` +
      playerCardInfo +
      playerCardInfoAdd +
      `<br>` +
      `Click Submit to determine winner.`
    );
  } else if (
    playerCards.length == 2 &&
    dealerCardsScore > 17 &&
    dealerCards.length == 2
  ) {
    var playerCardAdd = shuffledDeck.pop();
    playerCards.push(playerCardAdd);
    playerCardInfoAdd =
      playerCardAdd.name +
      ` of ` +
      playerCardAdd.suit +
      cardNamesPic(playerCardAdd) +
      cardSuitsPic(playerCardAdd);
      changeScoreMultiAce(playerCards);
    playerCardsScore = playerCardsScore + playerCardAdd.rank;
    console.log(playerCardsScore);
    console.log(dealerCardsScore);
    return (
      `You chose to hit. <br> Your bet remains at ${playerBet} points. <br>` +
      `Full Dealer hand: ` +
      dealerCardInfo +
      dealerCardInfoAdd +
      `<br>` +
      `Player hand: ` +
      playerCardInfo +
      playerCardInfoAdd +
      `<br>` +
      `Click Submit to determine winner.`
    );
  }
};

var standGame = function () {
  document.querySelector("#submit-button").disabled = false;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#doubleDown-button").disabled = true;
  document.querySelector("#split-button").disabled = true;
  document.querySelector("#input-field").disabled = true;
  if (dealerCardsScore <= 17 && dealerCards.length == 2) {
    var dealerCardAdd = shuffledDeck.pop();
    dealerCards.push(dealerCardAdd);
    dealerCardInfoAdd =
      dealerCardAdd.name +
      ` of ` +
      dealerCardAdd.suit +
      cardNamesPic(dealerCardAdd) +
      cardSuitsPic(dealerCardAdd);
      changeScoreMultiAce(dealerCards);
    dealerCardsScore = dealerCardsScore + dealerCardAdd.rank;
    console.log(playerCardsScore);
    console.log(dealerCardsScore);
    return (
      `You chose to stand.<br> Your bet remains at ${playerBet} points. <br>` +
      `Full Dealer hand: ` +
      dealerCardInfo +
      dealerCardInfoAdd +
      `<br>` +
      `Player hand: ` +
      playerCardInfo +
      `<br>` +
      `Click Submit to determine winner.`
    );
  } else if (dealerCardsScore > 17 && dealerCards.length == 2) {
    return (
      `You chose to stand.<br> Your bet remains at ${playerBet} points. <br>` +
      `Full Dealer hand: ` +
      dealerCardInfo +
      dealerCardInfoAdd +
      `<br>` +
      `Player hand: ` +
      playerCardInfo +
      `<br>` +
      `Click Submit to determine winner.`
    );
  }
};

var doubleDownBet = function () {
  document.querySelector("#submit-button").disabled = false;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#doubleDown-button").disabled = true;
  document.querySelector("#split-button").disabled = true;
  document.querySelector("#input-field").disabled = true;
  if (
    playerCards.length == 2 &&
    dealerCardsScore <= 17 &&
    dealerCards.length == 2
  ) {
    var playerCardAdd = shuffledDeck.pop();
    var dealerCardAdd = shuffledDeck.pop();
    playerCards.push(playerCardAdd);
    dealerCards.push(dealerCardAdd);
    playerCardInfoAdd =
      playerCardAdd.name +
      ` of ` +
      playerCardAdd.suit +
      cardNamesPic(playerCardAdd) +
      cardSuitsPic(playerCardAdd);
      changeScoreMultiAce(playerCards);
    playerCardsScore = playerCardsScore + playerCardAdd.rank;
    dealerCardInfoAdd =
      dealerCardAdd.name +
      ` of ` +
      dealerCardAdd.suit +
      cardNamesPic(dealerCardAdd) +
      cardSuitsPic(dealerCardAdd);
      changeScoreMultiAce(dealerCards);
    dealerCardsScore = dealerCardsScore + dealerCardAdd.rank;
    playerBet = playerBet * 2;
    console.log(playerCardsScore);
    console.log(dealerCardsScore);
    return (
      `You chose to double down. <br> Your bet has doubled to ${playerBet} points. <br>` +
      `Full Dealer hand: ` +
      dealerCardInfo +
      dealerCardInfoAdd +
      `<br>` +
      `Player hand: ` +
      playerCardInfo +
      playerCardInfoAdd +
      `<br>` +
      `Click Submit to determine winner.`
    );
  } else if (
    playerCards.length == 2 &&
    dealerCardsScore > 17 &&
    dealerCards.length == 2
  ) {
    var playerCardAdd = shuffledDeck.pop();
    playerCards.push(playerCardAdd);
    playerCardInfoAdd =
      playerCardAdd.name +
      ` of ` +
      playerCardAdd.suit +
      cardNamesPic(playerCardAdd) +
      cardSuitsPic(playerCardAdd);
      changeScoreMultiAce(playerCards);
    playerCardsScore = playerCardsScore + playerCardAdd.rank;
    playerBet = playerBet * 2;
    console.log(playerCardsScore);
    console.log(dealerCardsScore);
    return (
      `You chose to double down. <br>  Your bet has doubled to ${playerBet} points. <br>` +
      `Full Dealer hand: ` +
      dealerCardInfo +
      dealerCardInfoAdd +
      `<br>` +
      `Player hand: ` +
      playerCardInfo +
      playerCardInfoAdd +
      `<br>` +
      `Click Submit to determine winner.`
    );
  }
};

var splitPlayer = function () {
  document.querySelector("#submit-button").disabled = false;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#doubleDown-button").disabled = true;
  document.querySelector("#split-button").disabled = true;
  document.querySelector("#input-field").disabled = true;
  if (
    playerCards.length == 2 &&
    dealerCardsScore <= 17 &&
    dealerCards.length == 2
  ) {
    var splitCard = playerCards.pop();
    playerCardsAdd.push(splitCard);
    var playerCardAdd1 = shuffledDeck.pop();
    var playerCardAdd2 = shuffledDeck.pop();
    var dealerCardAdd = shuffledDeck.pop();
    playerCards.push(playerCardAdd1);
    playerCardsAdd.push(playerCardAdd2);
    dealerCards.push(dealerCardAdd);
    playerCardInfo1 =
      playerCards[0].name +
      ` of ` +
      playerCards[0].suit +
      cardNamesPic(playerCard) +
      cardSuitsPic(playerCard);
    playerCardInfoAdd1 =
      playerCardAdd1.name +
      ` of ` +
      playerCardAdd1.suit +
      cardNamesPic(playerCardAdd1) +
      cardSuitsPic(playerCardAdd1);
    playerCardInfo2 =
      splitCard.name +
      ` of ` +
      splitCard.suit +
      cardNamesPic(splitCard) +
      cardSuitsPic(splitCard);
    playerCardInfoAdd2 =
      playerCardAdd2.name +
      ` of ` +
      playerCardAdd2.suit +
      cardNamesPic(playerCardAdd2) +
      cardSuitsPic(playerCardAdd2);
    dealerCardInfoAdd =
      dealerCardAdd.name +
      ` of ` +
      dealerCardAdd.suit +
      cardNamesPic(dealerCardAdd) +
      cardSuitsPic(dealerCardAdd);
      changeScoreMultiAce(playerCards);
      changeScoreMultiAce(playerCardsAdd);
    playerCardsScore1 = playerCards[0].rank + playerCards[1].rank;
    playerCardsScore2 = playerCardsAdd[0].rank + playerCardsAdd[1].rank;
    dealerCardAdd.suit +
      cardNamesPic(dealerCardAdd) +
      cardSuitsPic(dealerCardAdd);
      changeScoreMultiAce(dealerCards);
    dealerCardsScore = dealerCardsScore + dealerCardAdd.rank;
    console.log(playerCardsScore1);
    console.log(playerCardsScore2);
    console.log(dealerCardsScore);
    return (
      `You chose to split. <br> Your bet remains at ${playerBet} points. <br>` +
      `Full Dealer hand: ` +
      dealerCardInfo +
      dealerCardInfoAdd +
      `<br>` +
      `1st Player hand: ` +
      playerCardInfo1 +
      "," +
      playerCardInfoAdd1 +
      `<br>` +
      `2nd Player hand: ` +
      playerCardInfo2 +
      "," +
      playerCardInfoAdd2 +
      `<br>` +
      `Click Submit to determine winner.`
    );
  } else if (
    playerCards.length == 2 &&
    dealerCardsScore > 17 &&
    dealerCards.length == 2
  ) {
    var splitCard = playerCards.pop();
    playerCardsAdd.push(splitCard);
    var playerCardAdd1 = shuffledDeck.pop();
    var playerCardAdd2 = shuffledDeck.pop();
    playerCards.push(playerCardAdd1);
    playerCardsAdd.push(playerCardAdd2);
    playerCardInfo1 =
      playerCards[0].name +
      ` of ` +
      playerCards[0].suit +
      cardNamesPic(playerCard) +
      cardSuitsPic(playerCard);
    playerCardInfoAdd1 =
      playerCardAdd1.name +
      ` of ` +
      playerCardAdd1.suit +
      cardNamesPic(playerCardAdd1) +
      cardSuitsPic(playerCardAdd1);
    playerCardInfo2 =
      splitCard.name +
      ` of ` +
      splitCard.suit +
      cardNamesPic(splitCard) +
      cardSuitsPic(splitCard);
    playerCardInfoAdd2 =
      playerCardAdd2.name +
      ` of ` +
      playerCardAdd2.suit +
      cardNamesPic(playerCardAdd2) +
      cardSuitsPic(playerCardAdd2);
      changeScoreMultiAce(playerCards);
      changeScoreMultiAce(playerCardsAdd);
    playerCardsScore1 = playerCards[0].rank + playerCards[1].rank;
    playerCardsScore2 = playerCardsAdd[0].rank + playerCardsAdd[1].rank;
    console.log(playerCardsScore1);
    console.log(playerCardsScore2);
    console.log(dealerCardsScore);
    return (
      `You chose to split. <br> Your bet remains at ${playerBet} points. <br>` +
      `Full Dealer hand: ` +
      dealerCardInfo +
      dealerCardInfoAdd +
      `<br>` +
      `1st Player hand: ` +
      playerCardInfo1 +
      "," +
      playerCardInfoAdd1 +
      `<br>` +
      `2nd Player hand: ` +
      playerCardInfo2 +
      "," +
      playerCardInfoAdd2 +
      `<br>` +
      `Click Submit to determine winner.`
    );
  }
};

var determineWinner = function () {
  document.querySelector("#submit-button").disabled = false;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#doubleDown-button").disabled = true;
  document.querySelector("#split-button").disabled = true;
  document.querySelector("#input-field").disabled = true;
  var outcomeMsg = "";
  var cardsMsg =
    `Full Dealer hand: ` +
    dealerCardInfo +
    dealerCardInfoAdd +
    `<br>` +
    `Player hand: ` +
    playerCardInfo +
    playerCardInfoAdd;
  var bjWinCheckPlayer = checkforBjWin(playerCards);
  var bjWinCheckDealer = checkforBjWin(dealerCards);
  console.log(bjWinCheckPlayer);
  console.log(bjWinCheckDealer);
  if (bjWinCheckPlayer == true && bjWinCheckDealer == false) {
    totPoints = totPoints + Number(playerBet);
    outcomeMsg =
      `Player has Blackjack win! <br> You won your bet, points increased to ${totPoints}.` +
      winImage;
  } else if (bjWinCheckPlayer == false && bjWinCheckDealer == true) {
    totPoints = totPoints - Number(playerBet);
    outcomeMsg =
      `Dealer has Blackjack win. You lost. <br> You lost your bet, points decreased to ${totPoints}.` +
      loseImage;
  } else if (bjWinCheckPlayer == true && bjWinCheckDealer == true) {
    totPoints = totPoints;
    outcomeMsg =
      `It's a draw! Both player and dealer drew Blackjack. <br> No change to your points - remains at ${totPoints}.` +
      drawImage;
  } else if (bjWinCheckPlayer == false && bjWinCheckDealer == false) {
    if (playerCardsScore > 21 && dealerCardsScore <= 21) {
      totPoints = totPoints - Number(playerBet);
      outcomeMsg =
        `Dealer wins as player busted with score > 21. <br> You lost your bet, points decreased to ${totPoints}.` +
        bustedImage;
    } else if (playerCardsScore <= 21 && dealerCardsScore > 21) {
      totPoints = totPoints + Number(playerBet);
      outcomeMsg =
        `Player wins as dealer busted with score > 21. <br> You won your bet, points increased to ${totPoints}.` +
        winImage;
    } else if (playerCardsScore > 21 && dealerCardsScore > 21) {
      totPoints = totPoints - Number(playerBet);
      outcomeMsg =
        `No winner as both of you busted with score > 21. <br>  You lost your bet, points decreased to ${totPoints}.` +
        bustedImage;
    } else if (playerCardsScore <= 21 && dealerCardsScore <= 21) {
      if (21 - playerCardsScore < 21 - dealerCardsScore) {
        totPoints = totPoints + Number(playerBet);
        outcomeMsg =
          `Player wins as score closest to 21! <br> You won your bet, points increased to ${totPoints}.` +
          winImage;
      } else if (21 - playerCardsScore == 21 - dealerCardsScore) {
        totPoints = totPoints;
        outcomeMsg =
          `It's a draw! Both player and dealer have same score. <br> No change to your points - remains at ${totPoints}.` +
          drawImage;
      } else if (21 - playerCardsScore > 21 - dealerCardsScore) {
        totPoints = totPoints - Number(playerBet);
        outcomeMsg =
          `Dealer wins as score closest to 21. You lost.<br> You lost your bet, points decreased to ${totPoints}.` +
          loseImage;
      }
    }
  }
  resetGame();
  return (
    cardsMsg + `<br> Click Submit to play another round. <br>` + outcomeMsg
  );
};

var determineWinnerSplit = function () {
  document.querySelector("#submit-button").disabled = false;
  document.querySelector("#hit-button").disabled = true;
  document.querySelector("#stand-button").disabled = true;
  document.querySelector("#doubleDown-button").disabled = true;
  document.querySelector("#split-button").disabled = true;
  document.querySelector("#input-field").disabled = true;
  var outcomeMsg = "";
  var cardsMsg =
    `Full Dealer hand: ` +
    dealerCardInfo +
    dealerCardInfoAdd +
    `<br>` +
    `1st Player hand: ` +
    playerCardInfo1 +
    ", " +
    playerCardInfoAdd1 +
    `<br>` +
    `2nd Player hand: ` +
    playerCardInfo2 +
    ", " +
    playerCardInfoAdd2 +
    `<br>`;
  var bjWinCheckPlayer1 = checkforBjWin(playerCards);
  var bjWinCheckPlayer2 = checkforBjWin(playerCardsAdd);
  var bjWinCheckDealer = checkforBjWin(dealerCards);
  console.log(bjWinCheckPlayer1);
  console.log(bjWinCheckPlayer2);
  console.log(bjWinCheckDealer);
  if (
    (bjWinCheckPlayer1 == true || bjWinCheckPlayer2 == true) &&
    bjWinCheckDealer == false
  ) {
    totPoints = totPoints + Number(playerBet);
    outcomeMsg =
      `Player has Blackjack win! <br> You won your bet, points increased to ${totPoints}.` +
      winImage;
  } else if (
    bjWinCheckPlayer1 == false &&
    bjWinCheckPlayer2 == false &&
    bjWinCheckDealer == true
  ) {
    totPoints = totPoints - Number(playerBet);
    outcomeMsg =
      `Dealer has Blackjack win. You lost. <br> You lost your bet, points decreased to ${totPoints}.` +
      loseImage;
  } else if (
    (bjWinCheckPlayer1 == true || bjWinCheckPlayer2 == true) &&
    bjWinCheckDealer == true
  ) {
    totPoints = totPoints;
    outcomeMsg =
      `It's a draw! Both player and dealer drew Blackjack. <br> No change to your points - remains at ${totPoints}.` +
      drawImage;
  } else if (
    bjWinCheckPlayer1 == false &&
    bjWinCheckPlayer2 == false &&
    bjWinCheckDealer == false
  ) {
    if (
      (playerCardsScore1 > 21 || playerCardsScore2 > 21) &&
      dealerCardsScore <= 21
    ) {
      totPoints = totPoints - Number(playerBet);
      outcomeMsg =
        `Dealer wins as player busted with score > 21. <br> You lost your bet, points decreased to ${totPoints}.` +
        bustedImage;
    } else if (
      playerCardsScore1 <= 21 &&
      playerCardsScore2 <= 21 &&
      dealerCardsScore > 21
    ) {
      totPoints = totPoints + Number(playerBet);
      outcomeMsg =
        `Player wins as dealer busted with score > 21. <br> You won your bet, points increased to ${totPoints}.` +
        winImage;
    } else if (
      (playerCardsScore1 > 21 || playerCardsScore2 > 21) &&
      dealerCardsScore > 21
    ) {
      totPoints = totPoints - Number(playerBet);
      outcomeMsg =
        `No winner as both of you busted with score > 21. <br>  You lost your bet, points decreased to ${totPoints}.` +
        bustedImage;
    } else if (
      playerCardsScore1 <= 21 &&
      playerCardsScore2 <= 21 &&
      dealerCardsScore <= 21
    ) {
      if (
        21 - playerCardsScore1 < 21 - dealerCardsScore ||
        21 - playerCardsScore2 < 21 - dealerCardsScore
      ) {
        totPoints = totPoints + Number(playerBet);
        outcomeMsg =
          `Player wins as score closest to 21! <br> You won your bet, points increased to ${totPoints}.` +
          winImage;
      } else if (
        21 - playerCardsScore1 == 21 - dealerCardsScore ||
        21 - playerCardsScore2 == 21 - dealerCardsScore
      ) {
        totPoints = totPoints;
        outcomeMsg =
          `It's a draw! Both player and dealer have same score. <br> No change to your points - remains at ${totPoints}.` +
          drawImage;
      } else if (
        21 - playerCardsScore1 > 21 - dealerCardsScore ||
        21 - playerCardsScore2 > 21 - dealerCardsScore
      ) {
        totPoints = totPoints - Number(playerBet);
        outcomeMsg =
          `Dealer wins as score closest to 21. You lost.<br> You lost your bet, points decreased to ${totPoints}.` +
          loseImage;
      }
    }
  }
  resetGame();
  return (
    cardsMsg + `<br> Click Submit to play another round. <br>` + outcomeMsg
  );
};
