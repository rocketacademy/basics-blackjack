var cardDeck = [
  {
    name: "ace",
    suit: "♥",
    rank: 1,
  },
  {
    name: "2",
    suit: "♥",
    rank: 2,
  },
  {
    name: "3",
    suit: "♥",
    rank: 3,
  },
  {
    name: "4",
    suit: "♥",
    rank: 4,
  },
  {
    name: "5",
    suit: "♥",
    rank: 5,
  },
  {
    name: "6",
    suit: "♥",
    rank: 6,
  },
  {
    name: "7",
    suit: "♥",
    rank: 7,
  },
  {
    name: "8",
    suit: "♥",
    rank: 8,
  },
  {
    name: "9",
    suit: "♥",
    rank: 9,
  },
  {
    name: "10",
    suit: "♥",
    rank: 10,
  },
  {
    name: "jack",
    suit: "♥",
    rank: 10,
  },
  {
    name: "queen",
    suit: "♥",
    rank: 10,
  },
  {
    name: "king",
    suit: "♥",
    rank: 10,
  },
  {
    name: "ace",
    suit: "♦",
    rank: 1,
  },
  {
    name: "2",
    suit: "♦",
    rank: 2,
  },
  {
    name: "3",
    suit: "♦",
    rank: 3,
  },
  {
    name: "4",
    suit: "♦",
    rank: 4,
  },
  {
    name: "5",
    suit: "♦",
    rank: 5,
  },
  {
    name: "6",
    suit: "♦",
    rank: 6,
  },
  {
    name: "7",
    suit: "♦",
    rank: 7,
  },
  {
    name: "8",
    suit: "♦",
    rank: 8,
  },
  {
    name: "9",
    suit: "♦",
    rank: 9,
  },
  {
    name: "10",
    suit: "♦",
    rank: 10,
  },
  {
    name: "jack",
    suit: "♦",
    rank: 10,
  },
  {
    name: "queen",
    suit: "♦",
    rank: 10,
  },
  {
    name: "king",
    suit: "♦",
    rank: 10,
  },
  {
    name: "ace",
    suit: "♣",
    rank: 1,
  },
  {
    name: "2",
    suit: "♣",
    rank: 2,
  },
  {
    name: "3",
    suit: "♣",
    rank: 3,
  },
  {
    name: "4",
    suit: "♣",
    rank: 4,
  },
  {
    name: "5",
    suit: "♣",
    rank: 5,
  },
  {
    name: "6",
    suit: "♣",
    rank: 6,
  },
  {
    name: "7",
    suit: "♣",
    rank: 7,
  },
  {
    name: "8",
    suit: "♣",
    rank: 8,
  },
  {
    name: "9",
    suit: "♣",
    rank: 9,
  },
  {
    name: "10",
    suit: "♣",
    rank: 10,
  },
  {
    name: "jack",
    suit: "♣",
    rank: 10,
  },
  {
    name: "queen",
    suit: "♣",
    rank: 10,
  },
  {
    name: "king",
    suit: "♣",
    rank: 10,
  },
  {
    name: "ace",
    suit: "♠",
    rank: 1,
  },
  {
    name: "2",
    suit: "♠",
    rank: 2,
  },
  {
    name: "3",
    suit: "♠",
    rank: 3,
  },
  {
    name: "4",
    suit: "♠",
    rank: 4,
  },
  {
    name: "5",
    suit: "♠",
    rank: 5,
  },
  {
    name: "6",
    suit: "♠",
    rank: 6,
  },
  {
    name: "7",
    suit: "♠",
    rank: 7,
  },
  {
    name: "8",
    suit: "♠",
    rank: 8,
  },
  {
    name: "9",
    suit: "♠",
    rank: 9,
  },
  {
    name: "10",
    suit: "♠",
    rank: 10,
  },
  {
    name: "jack",
    suit: "♠",
    rank: 10,
  },
  {
    name: "queen",
    suit: "♠",
    rank: 10,
  },
  {
    name: "king",
    suit: "♠",
    rank: 10,
  },
];
var cardsDrawnByComputerInLoop = [];
var index = 0;
var imageThinking =
  '<img src="https://acegif.com/wp-content/uploads/gif/thinking-emoji-39.gif"/>';
var imagePraying =
  '<img src="https://i.kym-cdn.com/photos/images/masonry/002/306/879/716.png"/>';
var imageLosing =
  '<img src="https://c.tenor.com/NUC6WS9g8UoAAAAC/shrug-idk.gif"/>';
var imageBlackjack =
  '<img src="https://miro.medium.com/max/1200/1*TmCYL1wqQl9TKtfRtPIQVA.gif"/>';
var imageBlackjackTie =
  '<img src="https://c.tenor.com/6kKpyXqu2FsAAAAM/kiryu-yakuza.gif"/>';

//arrays to store cards dealt
var drawPlayer = []; //rank
var drawComputer = []; //rank
var drawPlayerSuit = []; //suit
var drawComputerSuit = []; //suit
var drawPlayerName = []; //name
var drawComputerName = []; //name
//modes to move from one step to another - stand by,
var currentMode = `standby`;
//sum of drawComputer array
var sumComputer = drawComputer.reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

//sum of drawPlayer array
var sumPlayer = drawPlayer.reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

//hit-stand function
//hit function for player, one card will be popped from deck and added to drawPlayer array
var hitPlayer = function () {
  var shuffleHitPlayer = shuffleCards(cardDeck);
  var hitCardPlayer = shuffleHitPlayer.pop();
  drawPlayer.push(hitCardPlayer.rank);
  drawPlayerSuit.push(hitCardPlayer.suit);
  drawPlayerName.push(hitCardPlayer.name);
};
//hit function for computer, one card will be popped from deck and added to drawComputer array
var hitComputer = function () {
  var shuffleHitComputer = shuffleCards(cardDeck);
  var hitCardComputer = shuffleHitComputer.pop();
  drawComputer.push(hitCardComputer.rank);
  drawComputerSuit.push(hitCardComputer.suit);
  drawComputerName.push(hitCardComputer.name);
};

var main = function (input) {
  var shuffleDeck1 = shuffleCards(cardDeck);
  var shuffleDeck2 = shuffleCards(cardDeck);
  var myOutputValue = ``;

  //deal cards, 2 to computer and 2 to player
  //cards dealt will be popped from deck
  //cards dealt (ranks) will be pushed into arrays
  if (currentMode == `standby`) {
    var computerCard1 = shuffleDeck1.pop();
    console.log(
      `Computer 1:  name: ${computerCard1.name}, rank: ${computerCard1.rank}`
    );
    drawComputer.push(computerCard1.rank);
    drawComputerSuit.push(computerCard1.suit);
    drawComputerName.push(computerCard1.name);

    var computerCard2 = shuffleDeck2.pop();
    console.log(
      `Computer 2:  name: ${computerCard2.name}, rank: ${computerCard2.rank}`
    );
    drawComputer.push(computerCard2.rank);
    drawComputerSuit.push(computerCard2.suit);
    drawComputerName.push(computerCard2.name);

    var playerCard1 = shuffleDeck1.pop();
    console.log(
      `Player 1: name: ${playerCard1.name}, rank: ${playerCard1.rank}`
    );
    drawPlayer.push(playerCard1.rank);
    drawPlayerSuit.push(playerCard1.suit);
    drawPlayerName.push(playerCard1.name);

    var playerCard2 = shuffleDeck2.pop();
    console.log(
      `Player 2: name: ${playerCard2.name}, rank: ${playerCard2.rank}`
    );
    drawPlayer.push(playerCard2.rank);
    drawPlayerSuit.push(playerCard2.suit);
    drawPlayerName.push(playerCard2.name);

    //if computer draws an ace
    if (drawComputer[0] == 1 && sumComputer != 2) {
      drawComputer[0] = 11;
      sumComputer = drawComputer.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      console.log(`sumComputer: ${sumComputer}`);
    }

    if (drawComputer[1] == 1 && sumComputer != 2) {
      drawComputer[1] = 11;
      sumComputer = drawComputer.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      console.log(`sumComputer: ${sumComputer}`);
    }

    //sum of drawComputer array (copied from the internet, Idk exactly how it works)
    sumComputer = drawComputer.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    console.log(`sumComputer: ${sumComputer}`);

    //sum of drawPlayer array (same as above)
    sumPlayer = drawPlayer.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    console.log(`sumPlayer: ${sumPlayer}`);

    currentMode = `cards shuffled`;
    console.log(currentMode);
    console.log(`---------------------------------`);
  }
  //if player has blackjack and computer doesn't
  if (
    ((drawPlayerName[0] == "10" && drawPlayerName[1] == "ace") ||
      (drawPlayerName[0] == "jack" && drawPlayerName[1] == "ace") ||
      (drawPlayerName[0] == "queen" && drawPlayerName[1] == "ace") ||
      (drawPlayerName[0] == "king" && drawPlayerName[1] == "ace")) &&
    ((drawComputerName[0] !== "10" && drawComputerName[1] !== "ace") ||
      (drawComputerName[0] !== "jack" && drawComputerName[1] !== "ace") ||
      (drawComputerName[0] !== "queen" && drawComputerName[1] !== "ace") ||
      (drawComputerName[0] !== "king" && drawComputerName[1] !== "ace"))
  ) {
    currentMode = `calculation over`;
    return (
      `You got BLACKJACK! You win! Refresh the page to play again!<br><br>` +
      imageBlackjack
    );
  }

  if (
    ((drawPlayerName[1] == "10" && drawPlayerName[0] == "ace") ||
      (drawPlayerName[1] == "jack" && drawPlayerName[0] == "ace") ||
      (drawPlayerName[1] == "queen" && drawPlayerName[0] == "ace") ||
      (drawPlayerName[1] == "king" && drawPlayerName[0] == "ace")) &&
    ((drawComputerName[1] !== "10" && drawComputerName[0] !== "ace") ||
      (drawComputerName[1] !== "jack" && drawComputerName[0] !== "ace") ||
      (drawComputerName[1] !== "queen" && drawComputerName[0] !== "ace") ||
      (drawComputerName[1] !== "king" && drawComputerName[0] !== "ace"))
  ) {
    currentMode = `calculation over`;
    return (
      `You got BLACKJACK! You win! Refresh the page to play again!<br><br>` +
      imageBlackjack
    );
  }
  //if computer has blackjack and player doesn't
  if (
    ((drawPlayerName[0] !== "10" && drawPlayerName[1] !== "ace") ||
      (drawPlayerName[0] !== "jack" && drawPlayerName[1] !== "ace") ||
      (drawPlayerName[0] !== "queen" && drawPlayerName[1] !== "ace") ||
      (drawPlayerName[0] !== "king" && drawPlayerName[1] !== "ace")) &&
    ((drawComputerName[0] == "10" && drawComputerName[1] == "ace") ||
      (drawComputerName[0] == "jack" && drawComputerName[1] == "ace") ||
      (drawComputerName[0] == "queen" && drawComputerName[1] == "ace") ||
      (drawComputerName[0] == "king" && drawComputerName[1] == "ace"))
  ) {
    currentMode = `calculation over`;
    return (
      `Computer got BLACKJACK! You lose! Refresh the page to play again!<br><br>` +
      imageLosing
    );
  }

  if (
    ((drawPlayerName[1] !== "10" && drawPlayerName[0] !== "ace") ||
      (drawPlayerName[1] !== "jack" && drawPlayerName[0] !== "ace") ||
      (drawPlayerName[1] !== "queen" && drawPlayerName[0] !== "ace") ||
      (drawPlayerName[1] !== "king" && drawPlayerName[0] !== "ace")) &&
    ((drawComputerName[1] == "10" && drawComputerName[0] == "ace") ||
      (drawComputerName[1] == "jack" && drawComputerName[0] == "ace") ||
      (drawComputerName[1] == "queen" && drawComputerName[0] == "ace") ||
      (drawComputerName[1] == "king" && drawComputerName[0] == "ace"))
  ) {
    currentMode = `calculation over`;
    return (
      `Computer got BLACKJACK! You lose! Refresh the page to play again!<br><br>` +
      imageLosing
    );
  }

  //if both have blackjack
  if (
    ((drawPlayerName[0] == "10" && drawPlayerName[1] == "ace") ||
      (drawPlayerName[0] == "jack" && drawPlayerName[1] == "ace") ||
      (drawPlayerName[0] == "queen" && drawPlayerName[1] == "ace") ||
      (drawPlayerName[0] == "king" && drawPlayerName[1] == "ace")) &&
    ((drawComputerName[0] == "10" && drawComputerName[1] == "ace") ||
      (drawComputerName[0] == "jack" && drawComputerName[1] == "ace") ||
      (drawComputerName[0] == "queen" && drawComputerName[1] == "ace") ||
      (drawComputerName[0] == "king" && drawComputerName[1] == "ace"))
  ) {
    currentMode = `calculation over`;
    return (
      `You got BLACKJACK! But the computer has blackjack, too! Push! Refresh the page to play again!<br><br>` +
      imageBlackjackTie
    );
  }

  if (
    ((drawPlayerName[1] == "10" && drawPlayerName[0] == "ace") ||
      (drawPlayerName[1] == "jack" && drawPlayerName[0] == "ace") ||
      (drawPlayerName[1] == "queen" && drawPlayerName[0] == "ace") ||
      (drawPlayerName[1] == "king" && drawPlayerName[0] == "ace")) &&
    ((drawComputerName[1] == "10" && drawComputerName[0] == "ace") ||
      (drawComputerName[1] == "jack" && drawComputerName[0] == "ace") ||
      (drawComputerName[1] == "queen" && drawComputerName[0] == "ace") ||
      (drawComputerName[1] == "king" && drawComputerName[0] == "ace"))
  ) {
    currentMode = `calculation over`;
    return (
      `You got BLACKJACK! But the computer has blackjack, too! Push! Refresh the page to play again!<br><br>` +
      imageBlackjackTie
    );
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (drawPlayer[0] == 1) {
    //if player draws an ace
    //let the player decide if they want the ace to be 1 or 11
    currentMode = `ace`;
    aceOutPut = `Your cards are: Ace of ${drawComputerSuit[0]} and ${drawPlayerName[1]} of ${drawPlayerSuit[1]}.<br><br>Computer has drawn ${drawComputerName[0]} of ${drawComputerSuit[0]} and ${drawComputerName[1]} of ${drawComputerSuit[1]}, sum: ${sumComputer}<br><br>There is an Ace, do you want its value to be 1 or 11?`;
    if (input == `1`) {
      console.log(input);
      drawPlayer[0] = 1;
      sumPlayer = drawPlayer.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      aceOutPut = `Your Ace will have a value of 1.<br><br>Press Submit to proceed.`;
    }
    if (input == `11`) {
      console.log(input);
      drawPlayer[0] = 11;
      sumPlayer = drawPlayer.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      aceOutPut = `Your Ace will have a value of 11.<br><br>Press Submit to proceed.`;
    }
    currentMode = `ace decided`;
    return aceOutPut;
  }
  if (drawPlayer[1] == 1) {
    currentMode = `ace`;
    aceOutPut = `Your cards are: ${drawPlayerName[0]} of ${drawPlayerSuit[0]} and Ace of ${drawPlayerSuit[1]}.<br><br>Computer has drawn: ${drawComputerName[0]} of ${drawComputerSuit[0]} and ${drawComputerName[1]} of ${drawComputerSuit[1]}, sum: ${sumComputer}<br><br>There is an Ace, do you want its value to be 1 or 11?`;
    if (input == `1`) {
      console.log(input);
      drawPlayer[1] = 1;
      sumPlayer = drawPlayer.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      aceOutPut = `Your Ace will have a value of 11.<br><br>Press Submit to proceed.`;
    }
    if (input == `11`) {
      console.log(input);
      drawPlayer[1] = 11;
      sumPlayer = drawPlayer.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      aceOutPut = `Your Ace will have a value of 11.<br><br>Press Submit to proceed.`;
    }
    currentMode = `ace decided`;
    return aceOutPut;
  }
  //input validation for ace step
  if (currentMode == `ace`) {
    if (input !== `hit` && input !== `stand`) {
      throw new Error();
    }
  }

  //showing the player dealt cards step
  if (currentMode == `cards shuffled` || currentMode == `ace decided`) {
    sumComputer = drawComputer.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    console.log(`sumComputer: ${sumComputer}`);

    myOutputValue =
      `Your cards are: ${drawPlayerName[0]} of ${drawPlayerSuit[0]} and ${drawPlayerName[1]} of ${drawPlayerSuit[1]}, sum: ${sumPlayer}.<br><br>Computer's cards are: ${drawComputerName[0]} of ${drawComputerSuit[0]} and ${drawPlayerName[1]} of ${drawComputerSuit[1]}, sum: ${sumComputer}.<br><br>Enter "hit" if you want to draw another card, or "stand" if you don't want to draw another card.` +
      imageThinking;
    currentMode = `cards shown`;
    console.log(currentMode);
    return myOutputValue;
  }

  //hit-stand step
  //input validation
  if (currentMode == `cards shown`) {
    if (input !== `hit` && input !== `stand`) {
      throw new Error();
    }
  }

  if (
    (currentMode == `cards shown` && input == `hit`) ||
    (currentMode == `ace decided` && input == `hit`)
  ) {
    //when player enters "hit", take one card from deck and add it to array of cards drawn by player, update sumPlayer
    var playerHit = hitPlayer();
    sumPlayer = drawPlayer.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    sumComputer = drawComputer.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    currentMode = `cards shown`;
    console.log(`sumPlayer: ${sumPlayer}`);

    if (sumPlayer > 21) {
      currentMode = `busted`;
      return (
        `You busted. You drew ${drawPlayerName[drawPlayerName.length - 1]} of ${
          drawPlayerSuit[drawPlayerSuit.length - 1]
        }, your sum is: ${sumPlayer}.<br><br>Please refresh the page to play again!<br><br>` +
        imageLosing
      );
    }

    return `You chose hit and drew ${
      drawPlayerName[drawPlayerName.length - 1]
    } of ${
      drawPlayerSuit[drawPlayerSuit.length - 1]
    }.<br><br>You've drawn: ${drawPlayer}<br><br>Your sum is: ${sumPlayer}.<br><br>Computer has drawn: ${drawComputer}, sum: ${sumComputer}.<br><br>Enter "hit" to draw another card or "stand" to stand.`; //I don't really understand drawPlayer[drawPlayer.length - 1], I got it from the internet; it just works
  }

  //if player busts, end the game by stopping the program. i'm using an error to do so.
  if (currentMode == `busted`) {
    throw new Error();
  }

  //change mode when player enters "stand"
  if (
    (currentMode == `cards shown` && input == `stand`) ||
    (currentMode == `ace decided` && input == `stand`)
  ) {
    currentMode = `player stand`;
    console.log(currentMode);
  }
  //${drawComputer[drawComputer.length - 1]; last in array
  //when the player enters "stand", let the computer decide whether to draw a card for itself or not
  //if the computer's sum is lower or equal 16, hit, update sumComputer
  var loopCounter = 0;
  if (currentMode == `player stand`) {
    while (sumComputer < 17) {
      var computerHit = hitComputer();
      cardsDrawnByComputerInLoop.push(drawComputer);
      loopCounter += 1;
      console.log(`loopCounter: ${loopCounter}`);
      sumComputer = drawComputer.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      console.log(`sumComputer: ${sumComputer}`);
    }

    //in case computer busts
    if (sumComputer > 21) {
      currentMode = `computer busted`;
      return `Computer has drawn ${drawComputer}, with the sum of ${sumComputer} and has BUSTED!<br><br>You win!<br><br>Please refresh the page to play again!`;
    }

    //switch to calculate mode
    currentMode = `calculate`;
    return (
      `You chose stand.<br><br>Computer has drawn: ${drawComputer}, sum: ${sumComputer}.<br><br>You've drawn: ${drawPlayer}, your sum is: ${sumPlayer}.<br><br>Click Submit to proceed to see the result!` +
      imagePraying
    );
  }

  //if computer busts, throw an error and end the game
  if (currentMode == `computer busted`) {
    throw new Error();
  }

  //if computer's sum is 17 or higher but below 21, stand
  if (currentMode == `player stand` && sumComputer >= 17 && sumComputer < 21) {
    currentMode == `computer stand`;
    return `Computer chose stand.<br><br>Your sum: ${sumPlayer}.<br><br>Computer's sum: ${sumComputer}.`;
  }

  if (currentMode == `calculate`) {
    //////////////////////////////////////////////////////////////////////////////////////////
    //win-lose calculation step
    //lose (not bust)
    if (sumPlayer < sumComputer || sumPlayer > 21) {
      currentMode = `calculation done`;
      return (
        `You lose.<br><br>Computer drew: ${drawComputer}, sum: ${sumComputer}.<br><br>You drew: ${drawPlayer}, sum: ${sumPlayer}.<br><br>Better luck next time!<br><br>Please refresh the page to play again!<br><br>` +
        imageLosing
      );
    }

    //win
    if (sumPlayer > sumComputer) {
      currentMode = `calculation done`;
      return `You win!<br><br>Computer drew: ${drawComputer}, sum: ${sumComputer}.<br><br>You drew: ${drawPlayer}, sum: ${sumPlayer}.<br><br>Congratulations!<br><br>Please refresh the page to play again!`;
    }

    if (sumComputer == sumPlayer) {
      currentMode = `calculation done`;
      return `Push!<br><br>You drew ${drawPlayer}, computer drew ${drawComputer}.<br><br>Please refresh the page to play again!`;
    }
  }

  if (currentMode == `calculation done`) {
    currentMode = `calculation over`;
    return `Please refresh the page to play again!`;
  }

  if (currentMode == `calculation over`) {
    throw new Error();
  }

  //flush everything so that nothing will be stacked up in the next round
  computerCard1 = 0;
  computerCard2 = 0;
  playerCard1 = 0;
  playerCard2 = 0;
};
