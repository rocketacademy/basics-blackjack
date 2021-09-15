var gameStageOne = "Draw 1st 2 cards for Player";
var gameStageTwo = "Player choose to press 'hit' or 'stand'";
var gameStageThree = "Result of winner";
var gameMode = gameStageOne;
var userDraw = []; // user cards
var dealerDraw = []; // dealer cards
var userTotalValue = 0; // Total value of the user card
var dealerTotalValue = 0; //Total value of the dealer card
var userAceCard = 0; // indicate that on user have Ace card
var user11Card = 0; // indicate user's Ace card have change to 11
var dealerAceCard = 0; // indicate that on dealer have Ace card
var dealer11Card = 0; //indicate dealer's Ace card have change to 11
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
    var currentDrawCard = 0;
    userDraw.push(userCard);
    dealerDraw.push(dealerCard);
    draw2Card += 1;
  }
  userTotalValue = 0;
  while (userDraw.length > currentDrawCard) {
    if (userDraw[currentDrawCard].rank == 1) {
      userAceCard = 1;
    }
    userTotalValue = userTotalValue + userDraw[currentDrawCard].rank;
    currentDrawCard += 1;
    counter = 0;
  }

  dealerTotalValue = 0;
  currentDrawCard = 0;
  counter = 0;
  while (dealerDraw.length > currentDrawCard) {
    if (dealerDraw[currentDrawCard].rank == 1) {
      dealerAceCard = 1;
    }
    dealerTotalValue = dealerTotalValue + dealerDraw[currentDrawCard].rank;
    currentDrawCard += 1;
    counter = 0;
  }
  card1or11();

  if (userTotalValue == 21) {
    return `<b>BLACKJACK</b><br>You win.<br>You have drawn ${userDraw[0].name} and ${userDraw[1].name} <br>`;
  }
  if (dealerTotalValue == 21) {
    return `<b>BLACKJACK</b><br>Dealer win.<br>Dealer have drawn ${dealerDraw[0].name} and ${dealerDraw[1].name} <br>`;
  }
  if (userTotalValue != 21) {
    gameMode = gameStageTwo;

    return `Player 1 has drawn 1st card '<b>${userDraw[0].suit} ${userDraw[0].name}</b>' and 2nd card '<b>${userDraw[1].suit} ${userDraw[1].name}</b>'<br> Your total value is ${userTotalValue} <br><br> Dealer has drawn 1st card '<b>${dealerDraw[0].suit} ${dealerDraw[0].name}</b>' and 2nd card 'covered' <br><br>Player 1, Please choose to 'hit' or 'stand'`;
  }
};
var hitButton = function () {
  if (userTotalValue <= 21) {
    var hitDrawcard = shuffleCard.pop();
    userDraw.push(hitDrawcard);
    currentDrawCard = 0;
    userTotalValue = 0;

    while (userDraw.length > currentDrawCard) {
      if (userDraw[currentDrawCard].rank == 1) {
        userAceCard = 1;
      }
      userTotalValue = userTotalValue + userDraw[currentDrawCard].rank;

      currentDrawCard += 1;
      counter = 0;
    }
    card1or11();

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
  } else {
    var counter = 0;
    var userTotalCard = "You have draw these card: <br>";
    while (userDraw.length > counter) {
      userTotalCard =
        userTotalCard +
        `card${counter + 1}: <b>${userDraw[counter].name} ${
          userDraw[counter].suit
        }</b><br>`;
      counter = counter + 1;
      console.log(userTotalCard);
    }

    return ` You have <b>Bust </b>so unable to draw any cards <br>${userTotalCard} </<br>Total value of your cards is <b>${userTotalValue}</b><br>Please key in <b>'h'</b>for hit or<b> 's' </b>for submit `;
  }
};
var submitButton = function () {
  var counter1 = 0;
  currentDrawCard = 0;

  while (dealerTotalValue < 17) {
    var dealerDrawcard = shuffleCard.pop();
    dealerDraw.push(dealerDrawcard);
    dealerTotalValue = dealerTotalValue + dealerDraw[currentDrawCard].rank;

    card1or11();
    currentDrawCard = 0;
    dealerTotalValue = 0;
    while (dealerDraw.length > currentDrawCard) {
      dealerTotalValue = dealerTotalValue + dealerDraw[currentDrawCard].rank;
      currentDrawCard += 1;
      counter = 0;
    }
  }
  var counter = 0;
  var dealerTotalCard = "Dealer has draw these card: <br>";
  while (dealerDraw.length > counter) {
    dealerTotalCard =
      dealerTotalCard +
      "<b>" +
      dealerDraw[counter].suit +
      " " +
      dealerDraw[counter].name +
      "</b><br>";
    counter = counter + 1;
  }
  gameMode = gameStageThree;
  return `${dealerTotalCard} Dealer's total value is ${dealerTotalValue}`;
};
var finalResult = function () {
  if (dealerTotalValue > 21 || userTotalValue > 21) {
    userAceCard = 0;
    gameMode = gameStageOne;
    if (dealerTotalValue > 21 && userTotalValue <= 21) {
      return `Player Win <br> Player has total value of <b>${userTotalValue}</b> while dealer has a total value of <b>${dealerTotalValue}</b>`;
    } else if (dealerTotalValue <= 21 && userTotalValue > 21) {
      return `Dealer Win <br> Player has total value of <b>${userTotalValue}</b> while dealer has a total value of <b>${dealerTotalValue}</b>`;
    } else {
      return `Its a draw <br> Player has total value of <b>${userTotalValue}</b> while dealer has a total value of <b>${dealerTotalValue}</b>`;
    }
  }

  if (dealerTotalValue <= 21 && userTotalValue <= 21) {
    userAceCard = 0;
    gameMode = gameStageOne;
    console.log("result");
    if (dealerTotalValue > userTotalValue) {
      return `Dealer Win <br> Player has total value of <b>${userTotalValue}</b> while dealer has a total value of <b>${dealerTotalValue}</b>`;
    } else if (dealerTotalValue < userTotalValue) {
      return `Player Win <br> Player has total value of <b>${userTotalValue}</b> while dealer has a total value of <b>${dealerTotalValue}</b>`;
    }
  }
  console.log("total value", userTotalValue);
};
var card1or11 = function () {
  if (userAceCard == 1) {
    if (userTotalValue <= 11) {
      user11Card = 1;
      userTotalValue += 10;
      console.log("+10");
    }
    if (userTotalValue > 21 && user11Card == 1) {
      user11Card = 0;
      userTotalValue -= 10;
      console.log("-10)");
    }
  }
  if (dealerAceCard == 1) {
    if (dealerTotalValue <= 11) {
      dealer11Card = 1;
      dealerTotalValue += 10;
      console.log("+10");
    }
    if (dealerTotalValue > 21 && dealer11Card == 1) {
      dealer11Card = 0;
      dealerTotalValue -= 10;
      console.log("-10)");
    }
  }
};

var shuffleCard = cardShuffle();
var main = function (input) {
  if (gameMode == gameStageOne) {
    return card1st2Draw();
  }
  console.log(gameMode, "gameMode");
  if (gameMode == gameStageTwo) {
    if (input == "h") {
      return hitButton();
    }
    if (input == "s") {
      return submitButton();
    }
  }
  if (gameMode == gameStageThree) {
    return finalResult();
  }

  return `Please key in 'h'for hit or 's' for submit`;
};
