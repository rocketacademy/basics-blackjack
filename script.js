var getRandomIndex = function () {
  // Get a random index ranging from 0 (inclusive) to max (exclusive).
  return Math.floor(Math.random() * 52);
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"]; // Initialise an array of the 4 suits in our deck.
  var suitIndex = 0; // Loop over the suits array
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    /* Store the current suit in a variable
​    // Loop from 1 to 13 to create all cards for a given suit.
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    This is an example of a loop without an array.*/
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      // By default, the card name is the same as rankCounter
      if (cardName == 1) {
        //If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      var card = {
        // Create a new card with the current name, suit, and rank
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      // Store and add the new card to the deck within rankcounter
      rankCounter += 1;
      // Increment rankCounter to iterate over the next rank
    }
    suitIndex += 1; // Increment the suit index to iterate over the next suit
  }
  return cardDeck; // Return the completed card deck
};

var shuffleCards = function (cardDeck) {
  let deck = makeDeck(); // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(deck.length);
    var randomCard = deck[randomIndex]; // Select the card that corresponds to randomIndex
    var currentCard = deck[currentIndex]; // Select the card that corresponds to currentIndex
    // Swap positions of randomCard and currentCard in the deck
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  return deck; // Return the shuffled deck
};

var faceValue = function (playCardGame) {
  var currentIndex = 0;
  console.log(playCardGame);
  while (currentIndex < playCardGame.length) {
    if (playCardGame[currentIndex].name == "jack") {
      playCardGame[currentIndex].rank = 10;
      console.log(playCardGame[currentIndex].rank);
    } else if (playCardGame[currentIndex].name == "queen") {
      playCardGame[currentIndex].rank = 10;
      console.log(playCardGame[currentIndex].rank);
    } else if (playCardGame[currentIndex].name == "king") {
      playCardGame[currentIndex].rank = 10;
      console.log(playCardGame[currentIndex].rank);
    }
    currentIndex += 1;
  }
  return playCardGame;
};

var addPlayerCard = function (playerCard) {
  var totalsumA = 0;
  var totalsumB = 0;
  var totalSum = 0;
  var noOfAce = 0;
  for (i = 0; i < playerCard.length; i++) {
    if (playerCard[i].name == "ace" && noOfAce == 0) {
      playerCard[i].rank = 11;
      noOfAce += 1;
    }
    totalsumA = playerCard[i].rank + totalsumA;
  }
  for (i = 0; i < playerCard.length; i++) {
    if (playerCard[i].name == "ace" && noOfAce == 1) {
      playerCard[i].rank = 1;
    }
    totalsumB = playerCard[i].rank + totalsumB;
  }

  totalSum = Math.max(totalsumA, totalsumB);

  return totalSum;
};

var checkBlackJack = function (totalplayerCard, totaldealerCard) {
  var message = "";
  if (totalplayerCard == 21 || totaldealerCard == 21) {
    if (totalplayerCard == 21) {
      message = `Player ${winGameMessage}`;
      gameMode = "ShuffleCard";
      blackJack = true;
    } else if (totaldealerCard == 21) {
      message = `Dealer ${winGameMessage}`;
      gameMode = "ShuffleCard";
      blackJack = true;
    }
    return message;
  } else return message;
};

var message1 = "";
var message2 = [];
var currentplayOneCardDeck = 2;
var m = [];
var playerDrawCard = function (input) {
  //draw card from deck
  if (input == "1") {
    m.length = 0; //empty ArrayList first first for new draw
    message2.length = 0; //empty ArrayList first for new draw
    console.log(m);
    console.log(message2);
    console.log("CardDraw: ", cardDraw);
    playerOneCard.push(playCardGame[cardDraw]);
    console.log("playcardGame: ", playCardGame[cardDraw]);
    totalplayerOneCard = addPlayerCard(playerOneCard);

    for (i = 0; i < playerOneCard.length; i++) {
      m[i] = `<br/> Your Card ${i + 1} ${playerOneCard[i].suit} of ${
        playerOneCard[i].rank
      } `;
      message2.push(m[i]);
    }

    message1 =
      `Player, You draw card ${playerOneCard[currentplayOneCardDeck].suit} of ${playerOneCard[currentplayOneCardDeck].rank}` +
      message2.toString() +
      `<br/>-->Total Sum: ${totalplayerOneCard}` +
      `<br/> Enter 1 to Re-draw or Enter 2 to Stand?`;
    cardDraw += 1;
    currentplayOneCardDeck += 1;
  }

  if (input == "2") {
    //initalize for two card
    if (playerOneCard.length < 3) {
      console.log(playerOneCard.length);
      for (i = 0; i < playerOneCard.length; i++) {
        m[i] = `<br/> Player Card ${i + 1} ${playerOneCard[i].suit} of ${
          playerOneCard[i].rank
        }`;
        message2.push(m[i]);
        message1 =
          `Player choose to Stand, <br/>-->Total Sum: ${totalplayerOneCard} <br/>` +
          message2.toString();
      }
    } else
      message1 =
        `Player choose to Stand, <br/> Total Sum: ${totalplayerOneCard} <br/>` +
        message2.toString();
    gameMode = "dealerDrawCard";
  }
  return message1;
};

var message3 = [];
var dealerDrawCard = function () {
  var p = [];
  var message4 = "";
  while (totaldealerCard < 17) {
    console.log("CardDraw: ", cardDraw);
    dealerCard.push(playCardGame[cardDraw]);
    totaldealerCard = addPlayerCard(dealerCard);
    cardDraw += 1;
    console.log("CardDraw: ", cardDraw);
  }
  for (i = 0; i < dealerCard.length; i++) {
    p[i] = `<br/> Dealer Card ${i + 1} ${dealerCard[i].suit} of ${
      dealerCard[i].rank
    }`;
    message3.push(p[i]);
  }
  if (totaldealerCard < 21) {
    message4 =
      `Dealer Stand, <br/> Total Sum: ${totaldealerCard} <br/>` +
      message3.toString();
    gameMode = "comparedScore";
  }

  return message4;
};

var comparedScore = function () {
  var finalMessage = "";
  if (totalplayerOneCard == totaldealerCard) {
    finalMessage = `Both Scores are a tie.<br/>${message3.toString()}<br/> <br/>${message2.toString()}<br/> `;
  } else {
    var winner = Math.max(totaldealerCard, totalplayerOneCard);

    if (winner == totaldealerCard) {
      finalMessage =
        "Dealer Win!" +
        `<br/> --> Dealer card sum is ${totaldealerCard}. <br/>${message3.toString()}<br/> <br/> Player card sum is ${totalplayerOneCard}.<br/>${message2.toString()}<br/>`;
    }

    if (winner == totalplayerOneCard) {
      finalMessage =
        "Player Win!" +
        `<br/> --> Player card sum is ${totalplayerOneCard}.<br/>${message2.toString()} <br/> <br/> Dealer card sum is ${totaldealerCard}. ${message3.toString()}<br/>`;
    }
  }
  return finalMessage;
};

var gameMode = "ShuffleCard"; //initialize to initial mode
var playCardGame = {};
var winGameMessage = "BlackJack!";
var blackJack = false;
var cardDraw = 4;
var playerOneCard = [];
var dealerCard = [];
var totalplayerOneCard = 0;
var totaldealerCard = 0;
var outPutMessage = "";

var initalizeAllvariable = function () {
  m.length = 0;
  message2.length = 0;
  playerOneCard.length = 0;
  playCardGame.length = 0;
  totalplayerOneCard = 0;
  totaldealerCard = 0;
  dealerCard.length = 0;
  message3.length = 0;
  cardDraw = 4;
  message1 = "";
  currentplayOneCardDeck = 2;
  blackJack = false;
};

var main = function (input) {
  if (gameMode === "ShuffleCard") {
    initalizeAllvariable();
    playCardGame = shuffleCards(makeDeck()); //inital stage
    playCardGame = faceValue(playCardGame); //reset Jacks/Queen/King to rank 10
    //playCardGame = faceValue(playCardGame);
    gameMode = "DealCard";
    console.log(playCardGame);

    return "Card Shuffle, Dealer ready to deal card, click submit to deal card";
  }
  if (gameMode === "DealCard") {
    playerOneCard.push(playCardGame[0]);
    playerOneCard.push(playCardGame[2]);
    console.log(playerOneCard);
    dealerCard.push(playCardGame[1]);
    dealerCard.push(playCardGame[3]);
    console.log(dealerCard);
    totalplayerOneCard = addPlayerCard(playerOneCard);
    totaldealerCard = addPlayerCard(dealerCard);
    //totalplayerOneCard = 21; // testing purpose, remove if applicable
    if (totalplayerOneCard == 21 || totaldealerCard == 21) {
      outPutMessage = checkBlackJack(totalplayerOneCard, totaldealerCard);

      if (blackJack == true) {
        gameMode = "ShuffleCard";
        console.log("CheckBlackJack Boolean working", blackJack);
      }
      //return outPutMessage;
    } //(totalplayerOneCard != 21 || totaldealerCard != 21) {
    else {
      outPutMessage = `Player cards are <br/> Card 1: ${playerOneCard[0].suit} of ${playerOneCard[0].rank} <br/> Card 2: ${playerOneCard[1].suit} of ${playerOneCard[1].rank} <br/> Total Sum: ${totalplayerOneCard} 
      <br/> ---> Dealer card are <br/> Card 1: ${dealerCard[0].suit} of ${dealerCard[0].rank} <br/> Card 2: *HIDDEN*  
      <br/> --->> Enter 1 to draw or Enter 2 to Stand?`;
      gameMode = "PlayerTurn";
    }
    return outPutMessage;
  }

  if (gameMode === "PlayerTurn") {
    outPutMessage = playerDrawCard(input);
    if (totalplayerOneCard > 21) {
      var burstMessage = "";
      burstMessage = "<br/>-->Player Burst!<br/>";
      outPutMessage =
        burstMessage +
        `-->Total Sum: ${totalplayerOneCard}<br/>` +
        message2.toString();
      gameMode = "ShuffleCard";
    }
    return outPutMessage;
  }
  if (gameMode === "dealerDrawCard") {
    outPutMessage = dealerDrawCard();
    if (totaldealerCard > 21) {
      var burstMessage = "";
      burstMessage = "<br/>Dealer Burst!<br/>";
      outPutMessage =
        burstMessage +
        `-->Total Sum: ${totaldealerCard}<br/>` +
        message3.toString();
      gameMode = "ShuffleCard";
    }
    return outPutMessage;
  }
  if (gameMode === "comparedScore") {
    outPutMessage = comparedScore();
    return outPutMessage;
  }
};
