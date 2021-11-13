//Functions - Deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var emojiArray = ["♥️", "♦", "♣️", "♠️"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var currentEmoji = emojiArray[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: currentEmoji,
      };
      if (card.rank == 11 || card.rank == 12 || card.rank == 13) {
        card.rank = 10;
      }
      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
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
  return cardDeck;
};

//Functions - Individual
var rollDice = function (max) {
  var randomDecimal = Math.random() * max;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
var inputIsNan = function (input) {
  var flag = false;
  if (isNaN(input) || input.length == 0) {
    flag = true;
  }
  return flag;
};
var drawCards = function (numberOfDraws, cardDeck, cardArray) {
  var indexNumber = 0;
  while (indexNumber < numberOfDraws) {
    cardArray.push(cardDeck.shift());
    indexNumber = indexNumber + 1;
  }
  return cardArray;
};
var computeSumCardsRanks = function (cardArray) {
  indexNumber = 0;
  sumCardsRanks = 0;
  var flagHaveAce = "";
  while (indexNumber < cardArray.length) {
    if (cardArray[indexNumber].name == "ace") {
      flagHaveAce = true;
    }
    sumCardsRanks = sumCardsRanks + cardArray[indexNumber].rank;
    indexNumber = indexNumber + 1;
  }
  if (sumCardsRanks == 2 && flagHaveAce) {
    sumCardsRanks = 21; // sumCardsRanks = 21 if both are Aces
  } else if (sumCardsRanks <= 11 && flagHaveAce) {
    sumCardsRanks += 10; // Ace == 11 if sum of other cards <= 10 e.g. Ace, Nine, Ace
  }
  console.log("checkHand sumCardsRanks: ", sumCardsRanks);
  return sumCardsRanks;
};
var checkHand = function (sumRank, minRank) {
  //Validate if sumRank < minRank i.e. flagMinRank = TRUE means did not hit minRank
  var flagMinRank = sumRank < minRank;
  return flagMinRank;
};
var displayCards = function (cardArray, indexNumber) {
  myOutputValue = "";
  while (indexNumber < cardArray.length) {
    myOutputValue += `Card ${indexNumber + 1} - ${
      cardArray[indexNumber].name
    } of ${cardArray[indexNumber].emoji}<br>`;
    indexNumber = indexNumber + 1;
  }
  return `<br>${myOutputValue}`;
};
var computeIfDraw = function (sumRank, minRank) {
  flag = false;
  if (checkHand(sumRank, minRank)) {
    flag = true;
  } else {
    // Fixed probability that Computer will draw additional card
    var diceRollYes = rollDice(5);
    var diceRollDestiny = rollDice(20);
    console.log("diceRollYes: ", diceRollYes);
    console.log("diceRollDestiny: ", diceRollDestiny);
    if (diceRollYes > diceRollDestiny) {
      flag = true;
    }
  }
  console.log("computeIfDraw flag:", flag);
  return flag;
};
//Functions - Array
var resetGame = function () {
  for (let i = 0; i < numberOfPlayers; i++) {
    allPlayersArray[i].cards = [];
    allPlayersArray[i].rank = 0;
    allPlayersArray[i].blackjack = false;
    allPlayersArray[i].playCount += 1;
  }
  deck = makeDeck();
  console.log("deck", JSON.parse(JSON.stringify(deck)));
  shuffledDeck = shuffleCards(deck);
  console.log("shuffledDeck", JSON.parse(JSON.stringify(shuffledDeck)));
};
var makePlayersArray = function (indexPlayers) {
  allPlayersArray = [];
  for (let i = 0; i < indexPlayers; i++) {
    //Name players - first player as User, last player as Dealer
    var arrayName = `Player ${i}`;
    if (i == indexUser) {
      arrayName = "User";
    } else if (i == indexDealer) {
      arrayName = "Dealer";
    }

    var playerArray = {
      name: arrayName,
      cards: [],
      rank: 0,
      blackjack: false,
      wins: 0,
      playCount: 0,
    };
    allPlayersArray.push(playerArray);
  }
  return allPlayersArray;
};
var drawTwoCardsUpdateArray = function (indexPlayers, allPlayersArray) {
  for (let i = 0; i < indexPlayers; i++) {
    allPlayersArray[i].cards = drawCards(2, deck, allPlayersArray[i].cards);
    allPlayersArray[i].rank = computeSumCardsRanks(allPlayersArray[i].cards);
    allPlayersArray[i].blackjack = !checkHand(allPlayersArray[i].rank, 21);
  }
};
var checkBlackjack = function (allPlayersArray) {
  gameMode = USERTURN;
  if (allPlayersArray[indexDealer].blackjack) {
    gameMode = ENDGAME;
  } else if (allPlayersArray[indexUser].blackjack) {
    gameMode = ENDGAME;
    myOutputValue = `You gasp.`;
  }
  return myOutputValue;
};
var checkIfDrawUpdateArray = function (indexPlayers, allPlayersArray) {
  for (let i = 1; i < indexPlayers; i++) {
    if (allPlayersArray[i].blackjack == false) {
      while (computeIfDraw(allPlayersArray[i].rank, 17)) {
        allPlayersArray[i].cards = drawCards(1, deck, allPlayersArray[i].cards);
        allPlayersArray[i].rank = computeSumCardsRanks(
          allPlayersArray[i].cards
        );
      }
    }
  }
};

//Global Variables
var deck = shuffleCards(makeDeck());
var numberOfPlayers = "";
var indexUser = 0;
var indexDealer = "";
var allPlayersArray = []; //each player has: Name, Cards, Blackjack, SumRank, Wins
var playerCoins = 100;
var playerWager = 0;
var playerWinnings = 0;
var playCount = 0;
var myOutputValue = "";

//Game Mode
var INPUTPLAYERS = "inputNumberOfPlayers";
var FIRSTDRAW = "firstDraw";
var USERTURN = "userturn";
var DEALERTURN = "dealerturn";
var ENDGAME = "endgame";
var gameMode = INPUTPLAYERS;

var main = function (input) {
  myOutputValue = storyBoard[gameMode].opening;
  if (gameMode == FIRSTDRAW) {
    resetGame();
    if (inputIsNan(input) == true || input > playerCoins) {
      return storyBoard[gameMode].ending;
    } else {
      // User's wager is accepted
      playerWager = input;
      playCount += 1;

      // Dealer deals two cards to all players, then itself. Check if anybody has Blackjack.
      drawTwoCardsUpdateArray(numberOfPlayers, allPlayersArray);
      console.log("allPlayersArray FIRSTDRAW: ", allPlayersArray);

      // If User or Dealer blackjacks, end game automatically. Else, continue.
      myOutputValue = checkBlackjack(allPlayersArray);
    }
  } else if (gameMode == USERTURN) {
    if (input == "HIT") {
      allPlayersArray[indexUser].cards = drawCards(
        1,
        deck,
        allPlayersArray[indexUser].cards
      );
      allPlayersArray[indexUser].rank = computeSumCardsRanks(
        allPlayersArray[indexUser].cards
      );
      // Give User option to redraw if total points are under 22
      if (allPlayersArray[indexUser].rank < 22) {
        gameMode = USERTURN;
      } else {
        gameMode = DEALERTURN;
      }
    } else if (input == "STAND" && allPlayersArray[indexUser].rank < 17) {
      return storyBoard[gameMode].error2;
    } else if (input == "STAND" && allPlayersArray[indexUser].rank > 16) {
      gameMode = DEALERTURN;
    } else {
      gameMode = USERTURN;
      return storyBoard[gameMode].error;
    }
    myOutputValue += storyBoard[gameMode].outcome[input];
    console.log("allPlayersArray USERTURN:", allPlayersArray);
  } else if (gameMode == DEALERTURN) {
    myOutputValue = storyBoard[gameMode].opening;
    checkIfDrawUpdateArray(numberOfPlayers, allPlayersArray);
    console.log("allPlayersArray DEALERTURN:", allPlayersArray);
    gameMode = ENDGAME;
  } else if (gameMode == ENDGAME) {
    //Win by blackjack
    if (
      allPlayersArray[indexUser].blackjack ||
      allPlayersArray[indexDealer].blackjack
    ) {
      if (
        allPlayersArray[indexUser].blackjack &&
        allPlayersArray[indexDealer].blackjack
      ) {
        myOutputValue = `"BLACKJA-", you stop halfway when you see the dealer reveals its hands too. <br>It's a push. `;
      } else if (allPlayersArray[indexUser].blackjack) {
        playerWinnings = playerWager * 1.5;
        allPlayersArray[indexUser].wins += 1;
        myOutputValue = `"BLACKJACK!" you upper-cut the air while the dealer takes back your cards and pushes ${playerWinnings} coins to you. `;
      } else if (allPlayersArray[indexDealer].blackjack) {
        playerWinnings = playerWager * -1.5;
        myOutputValue = `"Blackjack," the dealer beeps and sweeps ${Math.abs(
          playerWinnings
        )} coins away from you. `;
      }
    }
    //Win by highest points
    else {
      if (
        allPlayersArray[indexUser].rank == allPlayersArray[indexDealer].rank
      ) {
        myOutputValue = `"Draw," the dealer beeps and takes back your cards. `;
      } else if (
        (allPlayersArray[indexUser].rank < allPlayersArray[indexDealer].rank &&
          allPlayersArray[indexDealer].rank < 22) ||
        allPlayersArray[indexUser].rank > 21
      ) {
        playerWinnings = playerWager * -1;
        myOutputValue = `"Lose," the dealer beeps and sweeps the ${Math.abs(
          playerWinnings
        )} coins away from you. `;
      } else {
        playerWinnings = playerWager * 1;
        allPlayersArray[indexUser].wins += 1;
        myOutputValue = `"Win," the dealer beeps as it takes back your cards and pushes ${playerWinnings} coins to you. `;
      }
    }
    playerCoins += playerWinnings;
    playerWager = 0;
    if (playerCoins <= 0) {
      return (myOutputValue +=
        storyBoard[gameMode].outcome.endgame +
        `<hr>Coins: ${playerCoins}, Wager: ${playerWager}<br><br>Your hand: ${displayCards(
          allPlayersArray[0].cards,
          0
        )}<br>Computer's hand: ${displayCards(
          allPlayersArray[indexDealer].cards,
          0
        )}`);
    } else {
      // myOutputValue += storyBoard[gameMode].outcome.continuegame;
      gameMode = FIRSTDRAW;
    }
  } else {
    // when User access game for the first time
    if (inputIsNan(input) == true) {
      //myOutputValue = messageTemplate[gameMode].error; NOTE: KIV TO USE MESSAGETEMPLATE
      return storyBoard[gameMode].error;
    } else {
      numberOfPlayers = Number(input) + 2;
      indexDealer = numberOfPlayers - 1;
      allPlayersArray = makePlayersArray(numberOfPlayers);
      console.log("allPlayersArray: ", allPlayersArray);
      if (input == 0) {
        myOutputValue += `However, there are no other players seated at the table.<br><br>`;
      } else {
        myOutputValue += `There are ${input} other players seated at the table.<br><br>`;
      }
      gameMode = FIRSTDRAW;
    }
  }
  myOutputValue += storyBoard[gameMode].ending;
  //During game, display only one of Dealer's cards. Else, display both.
  if (gameMode == FIRSTDRAW) {
    myOutputValue += `<hr>Coins: ${playerCoins}, Wager: ${playerWager}<br>Round: ${playCount}, Wins: ${
      allPlayersArray[indexUser].wins
    }<br><br>Your hand: ${displayCards(
      allPlayersArray[0].cards,
      0
    )}<br>Computer's hand: ${displayCards(
      allPlayersArray[indexDealer].cards,
      0
    )}`;
  } else {
    myOutputValue += `<hr>Coins: ${playerCoins}, Wager: ${playerWager}<br>Round: ${playCount}, Wins: ${
      allPlayersArray[indexUser].wins
    }<br><br>Your hand: ${displayCards(
      allPlayersArray[0].cards,
      0
    )}<br>Computer's hand: ${displayCards(
      allPlayersArray[indexDealer].cards,
      1
    )}`;
  }
  return myOutputValue;
};

var storyBoard = {
  inputNumberOfPlayers: {
    opening: `As you got closer to the poker table, you see the dealer tonight is an astromech droid. `,
    outcome: {
      noplayers: `xx`,
      players: `xx`,
    },
    ending: ``,
    error: `You hear a voice inside of your head saying: Please input number of players.`,
  },
  firstDraw: {
    opening: `You consider your options.`,
    error: `You hear a voice inside of your head saying: Please input within your limits.`,
    ending: `The dealer does not seem to register your presence until you put some coins on the table.<br>[To play, input your bet and press Submit]`,
  },
  userturn: {
    opening:
      "You cast a glance at the dealer. The dealer has a blank, emotionless expression that gives no indication of its thoughts or intentions. Literally, a poker face.<br><br>",
    outcome: {
      HIT: `You tap on the table twice, asking to draw another card.`,
      STAND: `You shrug your shoulders and end your turn.`,
    },
    ending: `<br>[Input HIT or STAND to continue]`,
    error: `You hear a voice inside of your head saying: Please enter HIT or STAND only.`,
    error2: `You hear a voice inside of your head saying: You have insufficient points, you must HIT!`,
  },
  dealerturn: {
    opening: `You stare hard at your cards while the game progresses.`,
    ending: `<br>[Press Submit to continue]`,
  },
  endgame: {
    opening: ``,
    outcome: {
      continuegame: `<br><br>The dealer no longer registers your presence.<br>[To continue playing, input your bet and press Submit]`,
      endgame: `<br><br>You got kicked out of the tavern because you have no more coins.<br>[END GAME]`,
    },
    ending: `<br>[Press Submit to continue]`,
  },
};
