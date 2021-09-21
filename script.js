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

var myImage =
  '<img src="https://c.tenor.com/1wNeqqZZ8jcAAAAC/monkey-ape.gif"/>';
var nameImage =
  '<img src="https://c.tenor.com/OlEmizIGQeoAAAAj/whats-your-name-ike-broflovski.gif"/>';
var betImage =
  '<img src="https://c.tenor.com/DYlOhYGUOloAAAAj/how-much-you-wanna-bet-kyle-broflovski.gif"/>';
var blackJackImage =
  '<img src="https://secureservercdn.net/160.153.138.163/97w.5c4.myftpupload.com/wp-content/uploads/2018/11/Blackjack-Flash-21.gif"/>';

var deck = function () {
  var cardDeck = [];
  var suit = ["💖", "💎", "♣️", "♠️ "];
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
          cardName = "🤵";
        } else {
          if (cardName == 12) {
            cardName = "👸";
          } else {
            if (cardName == 13) {
              cardName = "🤴";
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
        `<b>BLACKJACK<br>Player${[
          counter + 1,
        ]} win🤑🤑.</b><br>You have drawn <b> ${userDraw[counter][0].name} of ${
          userDraw[counter][0].suit
        }<br>
         and ${userDraw[counter][1].name} of ${userDraw[counter][1].suit}2️⃣1️⃣
        ${blackJackImage} ${nameOfPlayer[counter]}</b> have win ${
          winning[counter]
        }<br> ${nameOfPlayer[counter]} total point left is ${
          noOfPoints[counter]
        }<br><br>`;
    }
    counter += 1;
  }

  if (totalValueUser[counter] != 21) {
    gameMode = gameStageTwo;
    counter = 0;

    console.log("not 21");
    while (counter < noOfPlayer) {
      while (blackJackCounter[counter] == 1) {
        counter = counter + 1;
      }
      console.log("counter", counter);
      counterCard = 0;
      var outPut1 = "";

      console.log("player counter");
      while (counterCard < 2) {
        console.log("counterCard");
        outPut1 =
          outPut1 +
          ` Card ${[counterCard + 1]}:<b>  ${
            userDraw[counter][counterCard].name
          } of ${userDraw[counter][counterCard].suit} </b><br> `;
        counterCard += 1;
      }

      outPut =
        outPut +
        `<b>Player ${[counter + 1]}</b><br> ${outPut1}Total card value is ${
          totalValueUser[counter]
        }<br><br>`;
      counter += 1;
    }
    console.log("after while loop");
    gameMode = gameStageTwo;
    var counterStart = 0;
    while (blackJackCounter[counterStart] == 1) {
      counterStart += 1;
    }

    console.log("outPut dealer");
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

    var totalValue = 0;
    totalValueUser[counter] = 0;
    console.log("userDraw", userDraw);
    console.log(counter, "counter");

    var counterCard = 0;

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

    card1or11(counter);

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
      return `<b> ${nameOfPlayer[counter]} have Bust </b>so unable to draw any cards <br>${userTotalCard} </<br>Total value of your cards is <b>${totalValueUser[counter]}</b><br>Please key in <b>'h'</b>for hit or<b> 's' </b>for submit `;
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
  return `${dealerTotalCard} Dealer's total value is ${dealerTotalValue}<br><br> Please press submit button to see final result`;
};
var finalResult = function () {
  console.log(totalValueUser, "totalValueUser");
  console.log(playerBetting, "playerBetting");
  var counter = 0;
  if (dealerTotalValue > 21) {
    console.log("test1");
    var outPut = `Dealer have Burst. <br>  ${myImage} Dealer value is ${dealerTotalValue}<br><br> `;
    while (counter < totalValueUser.length) {
      console.log("test2");
      if (totalValueUser[counter] > 21) {
        console.log("test3");
        outPut =
          outPut +
          `😭${nameOfPlayer[counter]}😭 have Burst. <br> ${nameOfPlayer[counter]} card value is ${totalValueUser[counter]}
        <br><b>Player Lose</b> ${playerBetting[counter]}💸<br>Your total point have is ${noOfPoints[counter]}💰<br><br>`;
        console.log("test4");
      }

      if (totalValueUser[counter] <= 21) {
        console.log("test5");
        if (blackJackCounter[counter] == 0) {
          console.log("test6");
          winning[counter] = playerBetting[counter] * 2;
          playerBetting[counter] = playerBetting[counter] * 3;

          noOfPoints[counter] = noOfPoints[counter] + playerBetting[counter];
        }
        console.log("test7");
        outPut =
          outPut +
          `<b>Player Win🤑🤑</b><br> ${nameOfPlayer[counter]} card value is ${totalValueUser[counter]}<br>You have win ${winning[counter]}💵<br>Your total point have is ${noOfPoints[counter]}💰<br><br>`;
      }
      console.log("test8");
      counter += 1;
    }
  }
  if (dealerTotalValue <= 21) {
    console.log("test9");
    console.log(noOfPoints, "noOfPoints");
    var outPut = ` Dealer card total value is ${dealerTotalValue}<br><br> `;
    var counter = 0;

    while (counter <= totalValueUser.length) {
      console.log("test10");
      if (
        totalValueUser[counter] > dealerTotalValue &&
        totalValueUser[counter] <= 21
      ) {
        console.log("test11");
        if (blackJackCounter[counter] == 0) {
          console.log("test12");
          winning[counter] = playerBetting[counter];
          playerBetting[counter] = playerBetting[counter] * 2;

          noOfPoints[counter] = noOfPoints[counter] + playerBetting[counter];
          console.log(noOfPoints, "noOfPoints");
          console.log(playerBetting, "playerBetting");
        }
        console.log("test13");
        outPut =
          outPut +
          `<b>Player Win</b> <br> ${nameOfPlayer[counter]} card value is ${totalValueUser[counter]}<br>You have win🤑🤑 ${winning[counter]}💵<br>Your total point have is ${noOfPoints[counter]}💰<br><br>`;
        // counter += 1;
      }
      console.log("test14");
      if (
        totalValueUser[counter] < dealerTotalValue ||
        totalValueUser[counter] > 21
      ) {
        console.log("test15");
        console.log("noofpoint", noOfPoints);
        console.log(playerBetting, "playerBetting");
        outPut =
          outPut +
          `<br><b>😭Player Lose😭</b><br> ${nameOfPlayer[counter]} card value is ${totalValueUser[counter]}<br>You have lose ${playerBetting[counter]}💸<br>Your total point have is ${noOfPoints[counter]}💰<br><br>`;
        // counter += 1;
      }
      if (dealerTotalValue == totalValueUser[counter]) {
        console.log("noofpoint", noOfPoints);
        console.log("test16");
        if (blackJackCounter[counter] == 0) {
          console.log("test17");
          console.log("noofpoint", noOfPoints);
          console.log(playerBetting, "playerBetting");
          noOfPoints[counter] = noOfPoints[counter] + playerBetting[counter];
          console.log("noofpoint", noOfPoints);
          outPut =
            outPut +
            `<br><b>🥺Player Draw🥺</b><br> ${nameOfPlayer[counter]} card value is ${totalValueUser[counter]}<br>Your total point have is ${noOfPoints[counter]}💰<br><br>`;
          // counter += 1;
        } else if (blackJackCounter[counter] == 1) {
          console.log("test18");
          outPut =
            outPut +
            `<b>Player Win🤑🤑</b> <br> ${nameOfPlayer[counter]} card value is ${totalValueUser[counter]}<br>You have win ${winning[counter]}💵<br>Your total point have is ${noOfPoints[counter]}💰<br><br>`;
        }
      }
      console.log("test19");
      counter += 1;
      console.log("counter", counter);
    }
  }
  gameMode = gameStageBetting;
  reset();
  return (
    `${nameOfPlayer[0]}, Please key in your bet to start a new game <br>Summary <br>` +
    outPut
  );
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
var reset = function () {
  playerBetting = [];
  shuffleCard = cardShuffle();
  userDraw = [];
  dealerDraw = [];
  totalValueUser = [];
  dealerTotalValue = 0;
  userAceCard = [];
  user11Card = [];
  dealerAceCard = 0;
  dealer11Card = 0;
  counterHit = 0;
  counterAmount = 0;
  blackJackCounter = [];
  winning = [];
  var counter = 0;
  while (noOfPlayer > counter) {
    userAceCard.push(0);
    user11Card.push(0);

    blackJackCounter.push(0);
    winning.push(0);
    counter += 1;
  }
};
var nameInput = function (playerName) {
  if (noOfPlayer - 1 > counterName && playerName != "") {
    var name = playerName;
    nameOfPlayer.push(name);
    counterName = counterName + 1;
    console.log(counterName);
    return (
      `Welcome <b>${nameOfPlayer[counterName - 1]}</b><br><br> Player${
        counterName + 1
      } ` + nameImage
    );
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

    console.log(noOfPoints);
    gameMode = gameStageBetting;
    return (
      `Hi ${nameOfPlayer},<br> All will start with 100 points. <br><br><b> ${nameOfPlayer[0]}, </b>` +
      betImage
    );
  }
  return ` <b>Player ${
    counterName + 1
  }</b> Please enter your name ${nameImage} `;
};
var betting = function (amount) {
  console.log("betting");
  if (counterAmount < noOfPlayer - 1 && amount != "" && !isNaN(amount)) {
    var bettingAmount = amount;
    playerBetting.push(bettingAmount);
    console.log(playerBetting);

    counterAmount += 1;
    console.log(counterAmount);
    return (
      `${nameOfPlayer[counterAmount]}, Please key in your betting amount` +
      betImage
    );
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
        `${nameOfPlayer[counter]}'s <br>bet: ${playerBetting[counter]} point💵<br> left: ${noOfPoints[counter]} point 💰<br><br>`;
      counter += 1;

      // if (playerBetting[counter] > noOfPoints[counter]) {
      //   return `${nameOfPlayer[counter]}, Please key in the amount within your limit ${noOfPoints[counter]}`;
      // }
    }
    gameMode = gameStageOne;
    return outPut + `<br> Please click Submit for all player to draw card`;
  }

  return `Please key in your betting amount` + betImage;
};
var shuffleCard = cardShuffle();
var main = function (input) {
  if (gameMode == gameStagePlayer) {
    if (input == "" || isNaN(input)) {
      return `Please Key in Number of Player`;
    }
    gameMode = gameStageName;
    noOfPlayer = input;

    return (
      `Welcome All ${noOfPlayer} Players<br><br><b>Player 1<br>` + nameImage
    );
  }

  if (gameMode == gameStageName) {
    return nameInput(input);
  }
  if (gameMode == gameStageBetting) {
    var number = input;
    console.log("betting");
    realNumber = Number(number);
    return betting(realNumber);
  }
  if (gameMode == gameStageOne) {
    return card1st2Draw();
  }

  if (gameMode == gameStageTwo) {
    console.log("gamemode2");
    while (blackJackCounter[counterHit] == 1) {
      counterHit += 1;
    }
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
        if (blackJackCounter[counterHit] == 0 && counterHit >= noOfPlayer) {
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
          return `<b>${nextPlayerOutput} </b> Your total card value is: <b>${totalValueUser[counterHit]}</b><br> Please key in 'h'for hit or 's' fors submit`;
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
