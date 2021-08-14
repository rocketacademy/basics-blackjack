var makeDeck = function () {
  var deck = [];

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

      deck.push(card);

      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }

  return deck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleCards = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);

    var currentItem = cards[index];

    var randomItem = cards[randomIndex];

    cards[index] = randomItem;
    cards[randomIndex] = currentItem;

    index = index + 1;
  }

  return cards;
};

var dealCard = function (x) {
  x.push(randomDeck.pop());
};

var sumOfHand = function (whoHand) {
  var totalValueHand = 0;
  for (var x = 0; x < whoHand.length; x++) {
    totalValueHand = totalValueHand + whoHand[x].rank;
  }
  return totalValueHand;
};

var sumOfHandMulti = function (x) {
  var totalValueHand = 0;
  for (var x = 0; x < multiObj[x].Cards.length; x++) {
    totalValueHand = totalValueHand + multiObj[x].Cards.rank;
  }
  return totalValueHand;
};

var showHand = function (whoHand) {
  var currentArray = [];
  for (var x = 0; x < whoHand.length; x++) {
    currentArray.push(whoHand[x].rank);
  }
  return currentArray;
};

var firstTextOutput = function (pTotal, dTotal) {
  var textShortcut = `Player Deals :  ${showHand(
    playerHand
  )}  Total = ${pTotal} <br> Dealer Deals : ${
    dealerHand[0].rank
  }, unknown  Total = -`;

  if (pTotal == blackjackBingo) {
    mode = "nextRoundWager";
    p1TotalPoints = p1TotalPoints + p1Wager * 1.5;
    myOutputValue = ` ${textShortcut} <br> Blackjack! Player Wins! <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Change = + ${
      p1Wager * 1.5
    }`;
  } else if (pTotal > blackjackBingo) {
    mode = "nextRoundWager";
    p1TotalPoints = p1TotalPoints - p1Wager;
    myOutputValue = ` ${textShortcut} <br> Dealer Wins! Player has busted!<br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Change = - ${p1Wager}`;
  } else {
    myOutputValue = ` ${textShortcut} <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Do you wish to stand or hit? `;
  }

  return myOutputValue;
};

var multiTextOutput = function () {
  counter = 0;
  while (counter < numberPlayers) {
    var arrayToStoreNumbers = [];
    for (var i = 0; i < multiObj[counter].Cards.length; i++) {
      arrayToStoreNumbers.push(multiObj[counter].Cards[i].rank);
    }
    var textInput = `Player ${multiObj[counter].Number} Deals: ${arrayToStoreNumbers}`;
    textOutputArray.push(textInput);
    counter = counter + 1;
  }

  // //printing players card, but how to scale with the number of players?
  // var textShortcut = `Player Deals :  ${showHand(
  //   playerHand
  // )}  Total = ${pTotal} <br> Dealer Deals : ${
  //   dealerHand[0].rank
  // }, unknown  Total = -`;

  // //we can have this part in a seperate function
  // if (pTotal == blackjackBingo) {
  //   mode = "nextRoundWager";
  //   p1TotalPoints = p1TotalPoints + p1Wager * 1.5;
  //   myOutputValue = ` ${textShortcut} <br> Blackjack! Player Wins! <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Change = + ${
  //     p1Wager * 1.5
  //   }`;
  // } else if (pTotal > blackjackBingo) {
  //   mode = "nextRoundWager";
  //   p1TotalPoints = p1TotalPoints - p1Wager;
  //   myOutputValue = ` ${textShortcut} <br> Dealer Wins! Player has busted!<br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Change = - ${p1Wager}`;
  // } else {
  //   myOutputValue = ` ${textShortcut} <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Do you wish to stand or hit? `;
  // }

  return textOutputArray;
};

var standTextOutput = function (pTotal, dTotal) {
  var textShortcut = `Player Deals :  ${showHand(
    playerHand
  )}  Total = ${pTotal} <br> Dealer Deals : ${showHand(
    dealerHand
  )}  Total = ${dTotal}`;

  if (pTotal == blackjackBingo) {
    mode = "nextRoundWager";
    p1TotalPoints = p1TotalPoints + p1Wager * 2;
    myOutputValue = ` ${textShortcut} <br> Blackjack! Player Wins! <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Change = + ${
      p1Wager * 2
    }`;
  } else if (dTotal == blackjackBingo) {
    mode = "nextRoundWager";
    p1TotalPoints = p1TotalPoints - p1Wager;
    myOutputValue = ` ${textShortcut} <br> Blackjack! Dealer Wins! <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Change = - ${p1Wager}`;
  } else if (pTotal > blackjackBingo) {
    mode = "nextRoundWager";
    p1TotalPoints = p1TotalPoints - p1Wager;
    myOutputValue = ` ${textShortcut} <br> Dealer Wins! Player has busted! <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Change = - ${p1Wager}`;
  } else if (dTotal > blackjackBingo) {
    mode = "nextRoundWager";
    p1TotalPoints = p1TotalPoints + p1Wager * 2;
    myOutputValue = ` ${textShortcut} <br> Player Wins! Dealer has busted! <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Change = + ${
      p1Wager * 2
    }`;
  } else if (pTotal > dTotal) {
    mode = "nextRoundWager";
    p1TotalPoints = p1TotalPoints + p1Wager * 2;
    myOutputValue = ` ${textShortcut} <br> Player Wins! <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Change = + ${
      p1Wager * 2
    }`;
  } else if (dTotal > pTotal) {
    mode = "nextRoundWager";
    p1TotalPoints = p1TotalPoints - p1Wager;

    myOutputValue = ` ${textShortcut} <br> Dealer Wins! <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Change = - ${p1Wager}`;
  }

  return myOutputValue;
};

var dealerTextOutput = function (pTotal, dTotal) {
  var textShortcut = `Player Deals :  ${showHand(
    playerHand
  )}  Total = ${pTotal} <br> Dealer Deals : ${showHand(
    dealerHand
  )}  Total = ${dTotal}`;

  if (pTotal == blackjackBingo) {
    mode = "nextRoundWager";
    p1TotalPoints = p1TotalPoints + p1Wager * 2;
    myOutputValue = ` ${textShortcut} <br> Blackjack! Player Wins! <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Change = + ${
      p1Wager * 2
    }`;
  } else if (dTotal == blackjackBingo) {
    mode = "nextRoundWager";
    p1TotalPoints = p1TotalPoints - p1Wager;
    myOutputValue = ` ${textShortcut} <br> Blackjack! Dealer Wins! <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Change = - ${p1Wager}`;
  } else if (pTotal > blackjackBingo) {
    mode = "nextRoundWager";
    p1TotalPoints = p1TotalPoints - p1Wager;
    myOutputValue = ` ${textShortcut} <br> Dealer Wins! Player has busted! <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Change = - ${p1Wager}`;
  } else if (dTotal > blackjackBingo) {
    mode = "nextRoundWager";
    p1TotalPoints = p1TotalPoints + p1Wager * 2;
    myOutputValue = ` ${textShortcut} <br> Player Wins! Dealer has busted! <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Change = + ${
      p1Wager * 2
    }`;
  } else {
    mode = "dealerDeals";
    myOutputValue = ` ${textShortcut} <br> Bet = ${p1Wager} Total Points = ${p1TotalPoints} <br> Click Submit to see what dealer do next. `;
  }

  return myOutputValue;
};

var makePlayerObjects = function (numberOfPlayers) {
  var playerObjects = [];
  for (var i = 0; i < numberOfPlayers; i++) {
    var playerData = {
      Number: i + 1,
      Bet: 0,
      Cards: [],
      Points: 100,
    };

    playerObjects.push(playerData);
  }
  return playerObjects;
};

var mode = "gameOptions";
var randomDeck = shuffleCards(makeDeck());
var playerHand = [];
var dealerHand = [];
var dealerLimit = 16;
var blackjackBingo = 21;
var myOutputValue = "";
var p1TotalPoints = 100;
var p1Wager = 0;
var playerHandTotal = 0;
var dealerHandTotal = 0;
var numberPlayers = 0;
var multiObj = [];
var currentPlayerIndex = 0;
var currentPlayerIndex2 = 0;
var textOutputArray = [];

var main = function (input) {
  if (mode == "gameOptions") {
    mode = "modeMenu";
    myOutputValue =
      "Please choose one of the game modes : <br> 1. Single Player <br> 2. Multiplayer";
  }

  if (mode == "modeMenu") {
    if (input == 1) {
      mode = "instructionPage";
      myOutputValue = `Hello there gambler, what's your name?`;
      return myOutputValue;
    }
    if (input == 2) {
      mode = "multiWager";
      myOutputValue = "Please input the number of players = ";
      return myOutputValue;
    }
  }

  if (mode == "multiWager") {
    numberPlayers = numberPlayers + parseInt(input);
    multiObj = makePlayerObjects(numberPlayers);

    mode = "wagerSuccess";
    return `Hi player ${currentPlayerIndex + 1}, please input your bet`;

    // for (var i = 0; i < numberPlayers; i++) {
    //   if (mode == `Player${i}Wager`) {
    //     mode = `Player${i + 1}Wager`;
    //     myOutputValue = `Hi Player 1 ${i}, Please input your bet :`;
    //     multiObj[i].Bet = multiObj[i].Bet + input;
    //   }
    //   return myOutputValue;
    // }
  }

  if (mode == "wagerSuccess") {
    multiObj[currentPlayerIndex].Bet = Number(input);

    if (numberPlayers - 1 == currentPlayerIndex) {
      mode = "multiLandingPage";
      return `Success! Player ${multiObj[currentPlayerIndex].Number} Wager is ${multiObj[currentPlayerIndex].Bet} <br> Please click Submit to enter the game`;
    }

    currentPlayerIndex = currentPlayerIndex + 1;
    mode = "wagerSuccess";

    return `Success! Player ${
      multiObj[currentPlayerIndex - 1].Number
    } Wager is ${multiObj[currentPlayerIndex - 1].Bet}. Player ${
      currentPlayerIndex + 1
    } Please Input your bet = `;
  }

  if (mode == "multiLandingPage") {
    dealerHand = [];
    var counter = 0;
    for (var i = 0; i < numberPlayers; i++) {
      for (var x = 0; x < 2; x++) {
        dealCard(multiObj[i].Cards);
      }
    }
    while (counter < 2) {
      dealCard(dealerHand);
      counter = counter + 1;
    }

    return `${multiTextOutput()} <br> Dealer Deals : ${
      dealerHand[0].rank
    }, unknown  Total = -`;
  }

  if (mode == "instructionPage") {
    mode = "landingPage";

    myOutputValue = `Well, hello there ${input}  <br> Available points = ${p1TotalPoints} <br> Please enter your round wager and click submit to enter the game`;
    return myOutputValue;
  }

  if (mode == "nextRoundWager") {
    p1Wager = 0;
    playerHand = [];
    dealerHand = [];
    mode = "landingPage";
    return `Your Total Points = ${p1TotalPoints} <br>Welcome to the next round <br> Please enter your wager = `;
  }

  if (mode == "landingPage") {
    var counter = 0;
    p1Wager = p1Wager + parseInt(input);
    mode = "nextRound";

    while (counter < 2) {
      dealCard(playerHand);
      dealCard(dealerHand);
      counter = counter + 1;
    }
    playerHandTotal = sumOfHand(playerHand);
    dealerHandTotal = sumOfHand(dealerHand);

    return `${firstTextOutput(playerHandTotal, dealerHandTotal)}`;
  }

  if (mode == "nextRound") {
    if (input == "hit") {
      dealCard(playerHand);
      mode == "nextRound";
      playerHandTotal = sumOfHand(playerHand);
      dealerHandTotal = sumOfHand(dealerHand);
      return `Player Hits! <br> ${firstTextOutput(
        playerHandTotal,
        dealerHandTotal
      )}`;
    }

    if (input == "stand") {
      if (dealerHandTotal > dealerLimit) {
        return `${standTextOutput(playerHandTotal, dealerHandTotal)}`;
      } else {
        dealCard(dealerHand);
        dealerHandTotal = sumOfHand(dealerHand);
        return `Dealer Hits! <br> ${dealerTextOutput(
          playerHandTotal,
          dealerHandTotal
        )}`;
      }
    }
  }

  if (mode == "dealerDeals") {
    if (dealerHandTotal > dealerLimit) {
      return `${standTextOutput(playerHandTotal, dealerHandTotal)}`;
    } else {
      dealCard(dealerHand);
      dealerHandTotal = sumOfHand(dealerHand);
      return `Dealer Hits! <br> ${dealerTextOutput(
        playerHandTotal,
        dealerHandTotal
      )}`;
    }
  }
  return myOutputValue;
};
