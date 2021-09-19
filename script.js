var gameStagePlayer = "Input Player";
var gameStageName = "Name of the Player";
var gameStageBetting = "Betting Mode"; //Betting array
var gameStageOne = "Draw 1st 2 cards for Player";
var gameStageTwo = "Player choose to press 'hit' or 'stand'";
var gameStageThree = "Result of winner";
var gameMode = gameStagePlayer; //starting og game

var noOfPlayer = 0;
var nameOfPlayer = [];
var playerNameWithPoint = [];
var playerBetting = [];
var noOfPoints = [];
var userDraw = []; // user cards
var dealerDraw = []; // dealer cards
var totalValueUser = []; // Total value of the user card
var dealerTotalValue = 0; //Total value of the dealer card
var userAceCard = []; // indicate that on user have Ace card
var user11Card = []; // indicate user's Ace card have change to 11
var dealerAceCard = 0; // indicate that on dealer have Ace card
var dealer11Card = 0; //indicate dealer's Ace card have change to 11
var counterName = 0; //counter for name input
var counterHit = 0; // different player hit turn
var counterAmount = 0; //counter for Betting
var blackJackCounter = []; //indicate who have win the black jack
var winning = []; //indicate winning amount
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
  var counterPlayer = 0;
  while (counterPlayer < noOfPlayer) {
    var draw2Card = 0;
    var userCardDrawn = [];
    while (draw2Card < 2) {
      var userCard = shuffleCard.pop();

      userCardDrawn.push(userCard);
      draw2Card += 1;
    }
    userDraw.push(userCardDrawn);
    counterPlayer += 1;
  }
  console.log(userDraw, "userDraw");
  var dealerCounter = 0;
  while (dealerCounter < 2) {
    var dealerCard = shuffleCard.pop();
    dealerDraw.push(dealerCard);
    dealerCounter += 1;
  }

  console.log("dealer draw", dealerDraw);
  console.log("user draw", userDraw);
  userTotalValue = 0;
  var currentDrawCard = 0;

  while (userDraw.length > currentDrawCard) {
    var counterCard = 0;
    console.log("while");
    while (counterCard < 2) {
      if (userDraw[currentDrawCard][counterCard].rank == 1) {
        userAceCard[currentDrawCard] = 1;
        counterCard += 1;
        console.log(userAceCard, "userAceCard");
      }
      counterCard += 1;
    }
    var totalValue =
      userDraw[currentDrawCard][0].rank + userDraw[currentDrawCard][1].rank;

    totalValueUser.push(totalValue);
    currentDrawCard += 1;
    counter = 0;
  }
  console.log(userAceCard, "userAceCard");
  console.log(dealerDraw[0].rank, "dealerDraw[0].rank");
  console.log(dealerDraw[1].rank, "dealerDraw[1].rank");
  if (dealerDraw[0].rank == 1 || dealerDraw[1].rank == 1) {
    dealerAceCard = 1;
  }
  dealerTotalValue = dealerDraw[0].rank + dealerDraw[1].rank;
  console.log(dealerTotalValue, "dealerTotalValue");
  counter = 0;

  console.log(totalValueUser, "User Total Value");

  var counterPlayer = 0;

  while (counterPlayer < totalValueUser.length) {
    card1or11(counterPlayer);
    console.log("while");
    counterPlayer += 1;
  }
  console.log(dealerTotalValue, "dealerTotalValue");
  console.log(totalValueUser, "totalValueUser");
  var counter = 0;
  var counterCard = 0;

  var outPut = "";
  while (counter < noOfPlayer) {
    totalValueUser[1] = 21;
    totalValueUser[0] = 21;
    if (totalValueUser[counter] == 21) {
      winning[counter] = playerBetting[counter] * 2;
      console.log(winning, "winning amount");
      playerBetting[counter] = playerBetting[counter] * 3;
      console.log(playerBetting, "player betting");
      noOfPoints[counter] = noOfPoints[counter] + playerBetting[counter];
      console.log("noof point", noOfPoints);
      blackJackCounter[counter] = 1;
      console.log(blackJackCounter);
      outPut =
        outPut +
        `<b>BLACKJACK</b><br>Player${[counter + 1]} win.<br>You have drawn  ${
          userDraw[counter][0].name
        } of ${userDraw[counter][0].suit}<br>
         and ${userDraw[counter][1].name} of ${userDraw[counter][1].suit}<br> ${
          nameOfPlayer[counter]
        } have win ${winning[counter]}<br> ${
          nameOfPlayer[counter]
        } total point left is ${noOfPoints[counter]}<br><br>`;
    }
    counter += 1;
  }

  if (totalValueUser[counter] != 21) {
    gameMode = gameStageTwo;
    counter = 0;

    console.log("not 21");
    while (counter < noOfPlayer) {
      while (blackJackCounter[counter] == 1) {
        counter += 1;
      }
      counterCard = 0;
      var outPut1 = "";

      console.log("player counter");
      while (counterCard < 2) {
        console.log("counterCard");
        outPut1 =
          outPut1 +
          ` Card ${[counterCard + 1]}:  ${
            userDraw[counter][counterCard].name
          } of ${userDraw[counter][counterCard].suit} <br> `;
        counterCard += 1;
      }
      outPut =
        outPut +
        `Player ${[counter + 1]}<br> ${outPut1}Total card value is ${
          totalValueUser[counter]
        }<br><br>`;
      counter += 1;
    }
    gameMode = gameStageTwo;
    var counterStart = 0;

    while (blackJackCounter[counterStart] != 0) {
      counterStart += 1;
    }

    return (
      outPut +
      `Dealer<br>'<b>Card 1: ${dealerDraw[0].name} of ${dealerDraw[0].suit}</b>'<br> Card 2: 'covered' <br><br>${nameOfPlayer[counterStart]}, Please choose to 'hit' or 'stand'`
    );
  }
};
var hitButton = function (counter) {
  if (totalValueUser[counter] <= 21) {
    if (blackJackCounter[counter] == 1) {
      counter += 1;
    }
    var hitDrawcard = shuffleCard.pop();
    userDraw[counter].push(hitDrawcard);
    // currentDrawCard = 0;
    var totalValue = 0;
    totalValueUser[counter] = 0;
    console.log("userDraw", userDraw);
    console.log(counter, "counter");

    // while (userDraw[counter].length > currentDrawCard) {
    var counterCard = 0;
    //   console.log("while");
    while (userDraw[counter].length > counterCard) {
      console.log("while loop");
      if (userDraw[counter][counterCard].rank == 1) {
        userAceCard[counter] = 1;
        console.log(userAceCard, "userAceCard");
      }

      console.log("before total value");

      console.log(userDraw);
      totalValue = totalValue + userDraw[counter][counterCard].rank;
      counterCard += 1;
    }
    totalValueUser[counter] = totalValue;
    console.log(totalValueUser, "totalValueUser");

    card1or11();

    var userTotalCard = `${nameOfPlayer[counter]} have drawn these cards:<br> `;
    counterCard = 0;
    while (userDraw[counter].length > counterCard) {
      userTotalCard =
        userTotalCard +
        `
        ${counterCard + 1} card is <b>${userDraw[counter][counterCard].suit} ${
          userDraw[counter][counterCard].name
        }</b><br> `;
      counterCard = counterCard + 1;
    }
    console.log(userTotalCard, "userTotalCard");
    if (totalValueUser[counter] <= 21) {
      return `${userTotalCard} Total value is <b>${totalValueUser[counter]}</b><br>Please key in <b>'h'</b>for hit or<b> 's' </b>for submit`;
    }

    if (totalValueUser[counter] > 21) {
      return ` ${nameOfPlayer[counter]} have <b>Bust </b>so unable to draw any cards <br>${userTotalCard} </<br>Total value of your cards is <b>${totalValueUser[counter]}</b><br>Please key in <b>'h'</b>for hit or<b> 's' </b>for submit `;
    }
  } else {
    var counterCard = 0;
    var userTotalCard = `${nameOfPlayer[counter]} have draw these card: <br>`;
    while (userDraw[counter].length > counterCard) {
      userTotalCard =
        userTotalCard +
        `card${counter + 1}: <b>${userDraw[counter][counterCard].name} ${
          userDraw[counter][counterCard].suit
        }</b><br>`;
      counterCard = counterCard + 1;
      console.log(userTotalCard);
    }

    return ` ${nameOfPlayer[counter]} have <b>Bust </b>so unable to draw any cards <br>${userTotalCard} </<br>Total value of your cards is <b>${totalValueUser[counter]}</b><br>Please key in <b>'h'</b>for hit or<b> 's' </b>for submit `;
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
  console.log(playerBetting, "playerBetting");
  if (dealerTotalValue > 21) {
    var counter = 0;
    var outPut = `Dealer have Burst. <br> Dealer value is ${dealerTotalValue}<br><br> `;
    while (counter < totalValueUser.length) {
      if (totalValueUser[counter] > 21) {
        outPut =
          outPut +
          `${nameOfPlayer[counter - 1]} have Burst. <br> ${
            nameOfPlayer[counter - 1]
          } card value is ${totalValueUser[counter - 1]}
        <br>You have lose ${
          playerBetting[counter]
        }<br>Your total point have is ${noOfPoints[counter]}<br><br>`;
        counter += 1;
      }

      if (totalValueUser[counter] <= 21) {
        if (blackJackCounter[counter] == 0) {
          winning[counter] = playerBetting[counter] * 2;
          playerBetting[counter] = playerBetting[counter] * 3;

          noOfPoints[counter] = noOfPoints[counter] + playerBetting[counter];
        }
        outPut =
          outPut +
          `Player Win<br> ${nameOfPlayer[counter]} card value is ${totalValueUser[counter]}<br>You have win ${winning[counter]}<br>Your total point have is ${noOfPoints[counter]}<br><br>`;
        counter += 1;
      }
    }
  }
  if (dealerTotalValue <= 21) {
    console.log(noOfPoints, "noOfPoints");
    var outPut = `Dealer card total value is ${dealerTotalValue}<br><br> `;
    var counter = 0;

    while (counter < totalValueUser.length) {
      if (
        totalValueUser[counter] > dealerTotalValue &&
        totalValueUser[counter] <= 21
      ) {
        if (blackJackCounter[counter] == 0) {
          winning[counter] = playerBetting[counter];
          playerBetting[counter] = playerBetting[counter] * 2;

          noOfPoints[counter] = noOfPoints[counter] + playerBetting[counter];
          console.log(noOfPoints, "noOfPoints");
          console.log(playerBetting, "playerBetting");
        }
        outPut =
          outPut +
          `Player Win <br> ${nameOfPlayer[counter]} card value is ${totalValueUser[counter]}<br>You have win ${winning[counter]}<br>Your total point have is ${noOfPoints[counter]}<br><br>`;
        counter += 1;
      }
      if (totalValueUser[counter] < dealerTotalValue) {
        console.log("noofpoint", noOfPoints);
        console.log(playerBetting, "playerBetting");
        outPut =
          outPut +
          `<br>Player Lose<br> ${nameOfPlayer[counter]} card value is ${totalValueUser[counter]}<br>You have lose ${playerBetting[counter]}<br>Your total point have is ${noOfPoints[counter]}<br><br>`;
        counter += 1;
      }
      if (dealerTotalValue == totalValueUser[counter]) {
        console.log("noofpoint", noOfPoints);
        if (blackJackCounter[counter] == 0) {
          console.log("noofpoint", noOfPoints);
          console.log(playerBetting, "playerBetting");
          noOfPoints[counter] = noOfPoints[counter] + playerBetting[counter];
          console.log("noofpoint", noOfPoints);
          outPut =
            outPut +
            `<br>Player Draw<br> ${nameOfPlayer[counter]} card value is ${totalValueUser[counter]}<br>Your total point have is ${noOfPoints[counter]}<br><br>`;
        } else if (blackJackCounter[counter] == 1) {
          outPut =
            outPut +
            `Player Win <br> ${nameOfPlayer[counter]} card value is ${totalValueUser[counter]}<br>You have win ${winning[counter]}<br>Your total point have is ${noOfPoints[counter]}<br><br>`;
        }
        counter += 1;
      }
    }
  }
  return outPut;
};
var card1or11 = function (counterPlayer) {
  if (userAceCard[counterPlayer] == 1) {
    if (totalValueUser[counterPlayer] <= 12) {
      user11Card[counterPlayer] = 1;
      totalValueUser[counterPlayer] += 10;
      counterPlayer += 1;
      console.log("+10");
    }
    if (totalValueUser > 21 && user11Card == 1) {
      user11Card[counterPlayer] = 0;
      totalValueUser[counterPlayer] -= 10;
      counterPlayer += 1;
      console.log("-10)");
    }
  }
  if (dealerAceCard == 1) {
    if (dealerTotalValue <= 12) {
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

var nameInput = function (playerName) {
  if (noOfPlayer - 1 > counterName && playerName != "") {
    var name = playerName;
    nameOfPlayer.push(name);
    counterName = counterName + 1;
    return `Welcome <b>${
      nameOfPlayer[counterName - 1]
    }</b><br> Player${counterName}, Please key in your name`;
  }

  if (noOfPlayer - 1 == counterName) {
    var counter = 0;
    var name = playerName;
    nameOfPlayer.push(name);
    while (noOfPlayer > counter) {
      userAceCard.push(0);
      user11Card.push(0);
      noOfPoints.push(100);
      blackJackCounter.push(0);
      winning.push(0);
      counter += 1;
    }
    // console.log(nameOfPlayer);
    // var objectCounter = 0;
    // while (nameOfPlayer.length > objectCounter) {
    //   var leaderBoardName = {
    //     name: nameOfPlayer[objectCounter],
    //     point: noOfPoints[objectCounter],
    //   };
    //   playerNameWithPoint.push(leaderBoardName);
    //   objectCounter += 1;
    // }
    console.log(noOfPoints);
    gameMode = gameStageBetting;
    return `Hi ${nameOfPlayer}, we will start with 100 points per player. <br> ${nameOfPlayer[0]}, Please key in your bet`;
  }
};
var betting = function (amount) {
  if (counterAmount < noOfPlayer - 1 && amount != "" && !isNaN(amount)) {
    var bettingAmount = amount;
    playerBetting.push(bettingAmount);
    console.log(playerBetting);

    counterAmount += 1;
    console.log(counterAmount);
    return `${nameOfPlayer[counterAmount]}, Please key in your betting amount`;
  }
  if (counterAmount <= noOfPlayer - 1 && amount != "" && !isNaN(amount)) {
    console.log("last player");
    bettingAmount = amount;
    playerBetting.push(bettingAmount);

    counterAmount += 1;
    var counter = 0;
    var outPut = `Betting for the player <br>`;
    while (counter < noOfPlayer) {
      if (playerBetting[counter] > noOfPoints[counter]) {
        playerBetting[counter] = noOfPoints[counter];
      }
      noOfPoints[counter] = noOfPoints[counter] - playerBetting[counter];

      outPut =
        outPut +
        `${nameOfPlayer[counter]}'s <br>bet: ${playerBetting[counter]} point<br> left: ${noOfPoints[counter]} point<br><br>`;
      counter += 1;

      // if (playerBetting[counter] > noOfPoints[counter]) {
      //   return `${nameOfPlayer[counter]}, Please key in the amount within your limit ${noOfPoints[counter]}`;
      // }
    }
    gameMode = gameStageOne;
    return outPut + `<br> Please click Submit for all player to draw card`;
  }

  return `Please key in your betting amount`;
};
var shuffleCard = cardShuffle();
var main = function (input) {
  if (gameMode == gameStagePlayer) {
    if (input == "" || isNaN(input)) {
      return `Please Key in Number of Player`;
    }
    gameMode = gameStageName;
    noOfPlayer = input;
    return `Player 1, please key in your name`;
  }

  if (gameMode == gameStageName) {
    return nameInput(input);
  }
  if (gameMode == gameStageBetting) {
    var number = input;
    realNumber = Number(number);
    return betting(realNumber);
  }
  if (gameMode == gameStageOne) {
    return card1st2Draw();
  }

  if (gameMode == gameStageTwo) {
    if (counterHit < userDraw.length) {
      if (input == "h") {
        return hitButton(counterHit);
      }
      if (input == "s") {
        console.log("whileloop");
        var counterCard = 0;
        counterHit += 1;
        while (
          blackJackCounter[counterHit] == 1 &&
          counterHit != noOfPlayer - 1
        ) {
          console.log("black jack counter", blackJackCounter);
          counterHit += 1;
        }
        console.log(counterHit, "counterHit");

        if (blackJackCounter[counterHit] == 1 && counterHit >= noOfPlayer - 1) {
          console.log("black jack counter");
          console.log(counterHit, "counterHit");

          gameMode = gameStageThree;
          return submitButton();
        }
        if (blackJackCounter[counterHit] == 0 && counterHit >= noOfPlayer - 1) {
          gameMode = gameStageThree;
          return submitButton();
        }
        var nextPlayerOutput = `${nameOfPlayer[counterHit]}, Your card is <br>`;
        console.log("counterHit", counterHit);
        if (counterHit < userDraw.length) {
          while (userDraw[counterHit].length > counterCard) {
            nextPlayerOutput =
              nextPlayerOutput +
              `Card ${counterCard + 1}: ${
                userDraw[counterHit][counterCard].name
              } of ${userDraw[counterHit][counterCard].suit}<br>`;
            counterCard += 1;
          }
          return `${nextPlayerOutput} <br> Please key in 'h'for hit or 's' fors submit`;
        }
        gameMode = gameStageThree;
        return submitButton();
      }
    }
  }
  if (gameMode == gameStageThree) {
    console.log("result");
    return finalResult();
  }

  return `Please key in 'h'for hit or 's' for submit`;
};
