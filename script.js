var gameStageOne = "Draw 1st 2 cards for Player";
var gameStageTwo = "Player choose to press 'hit' or 'stand'";
var gameMode = gameStageOne;
var userDraw = [];
var dealerDraw = [];
var userTotalValue = 0;
var dealerTotalValue = 0;
var userCurrentDrawCard = 0;

var deck = function () {
  var cardDeck = [];
  var suit = ["hearts", "diamonds", "clubs", "spade"];
  var suitCounter = 0;
  while (suitCounter < suit.length) {
    var suitDeck = suit[suitCounter];
    var numberCounter = 1;

    while (numberCounter <= 13) {
      var cardName = numberCounter;
      var actualvalue = numberCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else {
        if (cardName == 11) {
          cardName = "Jack";
        } else {
          if (cardName == 12) {
            cardName = "Queen";
          } else {
            if (cardName == 13) {
              cardName = "King";
            }
          }
        }
      }
      if (numberCounter > 10) {
        actualvalue = 10;
      }
      var card = {
        name: cardName,
        suit: suitDeck,
        rank: actualvalue,
      };
      cardDeck.push(card);
      numberCounter = numberCounter + 1;
    }
    suitCounter += 1;
  }
  return cardDeck;
};
var cardRandom = function (size) {
  var randomCard = Math.random() * size.length;
  var cardIntegal = Math.floor(randomCard);

  return cardIntegal;
};
var cardShuffle = function () {
  var currentIndex = 0;
  var deckCard = deck();
  while (currentIndex < deckCard.length) {
    var randomIndex = cardRandom(deckCard);

    var randomCard = deckCard[randomIndex];

    var currentCard = deckCard[currentIndex];

    deckCard[currentIndex] = randomCard;
    deckCard[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return deckCard;
};
var card1st2Draw = function () {
  var draw2Card = 0;
  while (draw2Card < 2) {
    var userCard = shuffleCard.pop();
    var dealerCard = shuffleCard.pop();
    userDraw.push(userCard);
    dealerDraw.push(dealerCard);
    draw2Card += 1;
    userCurrentDrawCard = 0;
    userTotalValue = 0;
    while (userDraw.length > userCurrentDrawCard) {
      userTotalValue = userTotalValue + userDraw[userCurrentDrawCard].rank;
      userCurrentDrawCard += 1;
      counter = 0;
    }
  }
  if (
    (userDraw[0].rank == 1 && userDraw[1].rank >= 10) ||
    (userDraw[0].rank == 1 && userDraw[1].rank >= 10)
  ) {
    return `<b>BLACKJACK</b><br>You win.<br>You have drawn ${userDraw[0].name} and ${userDraw[1].name} <br>`;
  }
  if (
    !(userDraw[0].rank == 1 && userDraw[1].rank >= 10) ||
    !(userDraw[0].rank == 1 && userDraw[1].rank >= 10)
  ) {
    gameMode = gameStageTwo;

    return `Player 1 has drawn 1st card '<b>${userDraw[0].suit} ${userDraw[0].name}</b>' and 2nd card '<b>${userDraw[1].suit} ${userDraw[1].name}</b>'<br> Your total value is ${userTotalValue} <br><br> Dealer has drawn 1st card '<b>${dealerDraw[0].suit} ${dealerDraw[0].name}</b>' and 2nd card 'covered' <br><br>Player 1, Please choose to 'hit' or 'stand'`;
  }
};
var hitButton = function () {
  userTotalValue = 0;
  while (userDraw.length > userCurrentDrawCard) {
    userTotalValue = userTotalValue + userDraw[userCurrentDrawCard].rank;
    userCurrentDrawCard += 1;
  }
  console.log("totalvalue", userTotalValue);
  if (userTotalValue <= 21 && userDraw.length < 5) {
    var hitDrawcard = shuffleCard.pop();
    userDraw.push(hitDrawcard);
    userCurrentDrawCard = 0;
    userTotalValue = 0;
    while (userDraw.length > userCurrentDrawCard) {
      userTotalValue = userTotalValue + userDraw[userCurrentDrawCard].rank;
      userCurrentDrawCard += 1;
      counter = 0;
    }
    var userTotalCard = "You have drawn these cards:<br> ";
    while (userDraw.length > counter) {
      userTotalCard =
        userTotalCard +
        `
        ${counter + 1} card is <b>${userDraw[counter].suit} ${
          userDraw[counter].name
        }</b><br> `;
      counter = counter + 1;
    }
    console.log(userTotalCard, "userTotalCard");
    return `${userTotalCard} Total value is <b>${userTotalValue}</b><br>Please key in <b>'h'</b>for hit or<b> 's' </b>for submit`;
  }
  if (userDraw.length == 5) {
    var counter = 0;
    var userTotalCard = "You have draw these card:<br> ";
    while (userDraw.length > counter) {
      userTotalCard =
        userTotalCard +
        `<b>${userDraw[counter].name} ${userDraw[counter].suit}</b><br>`;
      counter = counter + 1;
    }
    return `You have hit your number of card limit, ${userTotalCard} <br>Total value of your cards is <b>${userTotalValue}</b><br>Please key in <b> 's' </b>for submit `;
  }
  if (userTotalValue > 21) {
    var counter = 0;
    var userTotalCard = "You have draw these card: <br>";
    while (userDraw.length > counter) {
      userTotalCard =
        userTotalCard +
        `<b>${userDraw[counter].name} ${userDraw[counter].suit}</b><br>`;
      counter = counter + 1;
      console.log(userTotalCard);
    }
    return ` You have <b>Burst </b>so unable to draw any cards <br>${userTotalCard} </<br>Total value of your cards is <b>${userTotalValue}</b><br>Please key in <b>'h'</b>for hit or<b> 's' </b>for submit `;
  }

  // var currentCardIndex = userDraw.length;
  // if (currentCardIndex < 5) {
  //   var hitDrawcard = shuffleCard.pop();
  //   userDraw.push(hitDrawcard);
  // }
  // return userDraw;
};
var shuffleCard = cardShuffle();
var main = function (input) {
  console.log(userDraw, "User Draw");
  console.log(dealerDraw, "dealer Draw");
  if (gameMode == gameStageOne) {
    return card1st2Draw();
  }
  console.log(gameMode, "gameMode");
  if (gameMode == gameStageTwo) {
    if (input == "h") {
      return hitButton();
    }
    if (input == "s") {
      var dealerCounter = 0;
      var dealerTotalValue = 0;

      while (dealerDraw.length > dealerCounter) {
        dealerTotalValue = dealerTotalValue + dealerDraw[dealerCounter].rank;
        dealerCounter += 1;
      }
      console.log("dealertotal", dealerTotalValue);
      if (dealerTotalValue > 21 && userTotalValue > 21) {
        return `Its a draw <br> Player has total value of <b>${userTotalValue}</b> while dealer has a total value of <b>${dealerTotalValue}</b>`;
      }
      if (dealerTotalValue <= 21 && userTotalValue <= 21) {
        console.log("result");
        if (dealerTotalValue > userTotalValue) {
          return `Dealer Win <br> Player has total value of <b>${userTotalValue}</b> while dealer has a total value of <b>${dealerTotalValue}</b>`;
        } else {
          return `Player Win <br> Player has total value of <b>${userTotalValue}</b> while dealer has a total value of <b>${dealerTotalValue}</b>`;
        }
      }
      console.log("total value", userTotalValue);
      // return submit();
    }
  }
  return `Please key in 'h'for hit or 's' for submit`;
};
