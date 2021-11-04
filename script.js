//Global Variables
var computerCardArray = [];
var playerCardArray = [];
var playerCoins = 100;
var playerWinnings = 0;
var playerWager = 0;
var deck = [];
var shuffledDeck = "";
var playerBlackjack = "";
var computerBlackjack = "";
var myOutputValue = "";

//Game Mode
var FIRSTDRAW = "First draw";
var USERTURN = "User's turn";
var COMPUTERTURN = "Computer's turn";
var ENDGAME = "End game";
var gameMode = FIRSTDRAW;

var main = function (input) {
  if (gameMode == FIRSTDRAW) {
    resetGame();
    playerWager = input;
    myOutputValue = `You put ${playerWager} coins on the table. The dealer hands you two cards, faced down.<br><br>`;
    computerCardArray = drawCards(2, shuffledDeck, computerCardArray);
    playerCardArray = drawCards(2, shuffledDeck, playerCardArray);
    validateBlackjack(playerCardArray, computerCardArray);
    return (myOutputValue += `<hr>Coins: ${playerCoins}, Wager: ${playerWager}<br><br>Your hand: ${displayCards(
      playerCardArray,
      0
    )}<br>Computer's hand: ${displayCards(computerCardArray, 1)}`);
  } else if (gameMode == USERTURN) {
    myOutputValue = `You cast a glance at the dealer. The dealer has a blank, emotionless expression that gives no indication of its thoughts or intentions. Literally, a poker face.<br><br>`;
    gameMode = COMPUTERTURN;
    if (input == "HIT") {
      playerCardArray = drawCards(1, shuffledDeck, playerCardArray);
      if (computeSumCardsRanks(playerCardArray) > 21) {
        gameMode = ENDGAME;
      }
      myOutputValue += `You tap on the table twice, asking to draw another card.`;
    } else if (input == "STAND") {
      myOutputValue += `You shrug your shoulders and end your turn.`;
    } else {
      gameMode = USERTURN;
      return `You hear a voice inside of your head saying: Please enter HIT or STAND only.`;
    }
    myOutputValue += `<br>[Press Submit to continue]`;
    return (myOutputValue += `<hr>Coins: ${playerCoins}, Wager: ${playerWager}<br><br>Your hand: ${displayCards(
      playerCardArray,
      0
    )}<br>Computer's hand: ${displayCards(computerCardArray, 1)}`);
  } else if (gameMode == COMPUTERTURN) {
    if (computeIfComputerDraw(computerCardArray, 17)) {
      myOutputValue = `Without skipping a beat, you see the dealer extend its mechanical arm to draw cards.`;
      computerCardArray = drawCards(1, shuffledDeck, computerCardArray);
    } else {
      myOutputValue = `The dealer remains motionless.`;
    }
    gameMode = ENDGAME;
    myOutputValue += "<br>[Press Submit to continue]";
    return (myOutputValue += `<hr>Coins: ${playerCoins}, Wager: ${playerWager}<br><br>Your hand: ${displayCards(
      playerCardArray,
      0
    )}<br>Computer's hand: ${displayCards(computerCardArray, 1)}`);
  } else if (gameMode == ENDGAME) {
    var computerFinalRanks = computeSumCardsRanks(computerCardArray);
    var playerFinalRanks = computeSumCardsRanks(playerCardArray);
    if (playerBlackjack && computerBlackjack) {
      playerWinnings = 0;
      myOutputValue = `"BLACKJA-", you stop halfway when you see the dealer reveals its hands. <br>It's a push.`;
    } else if (playerBlackjack) {
      playerWinnings = playerWager * 1.5;
      myOutputValue = `"BLACKJACK!" You shout as you upper-cut the air.<br> The dealer automatically takes back your cards and pushes ${playerWinnings} coins to you.`;
    } else if (computerBlackjack) {
      playerWinnings = playerWager * -1.5;
      myOutputValue = `Before you could even gesture, the dealer reveals its hands. "Blackjack," it beeps and sweeps ${Math.abs(
        playerWinnings
      )} coins away from you.`;
    } else if (computerFinalRanks == playerFinalRanks) {
      playerWinnings = 0;
      myOutputValue = `While you are still doing the math for the dealer's cards, it takes back your cards and returns your initial bet. "Could've been worse," you muttered.`;
    } else if (
      (playerFinalRanks < computerFinalRanks && computerFinalRanks < 22) ||
      playerFinalRanks > 21
    ) {
      playerWinnings = -playerWager;
      myOutputValue = `"Loser," the dealer beeps and sweeps the ${Math.abs(
        playerWinnings
      )} coins away from you. `;
    } else {
      playerWinnings = playerWager;
      myOutputValue = `While you are still doing the math for the dealer's cards, it takes back your cards and pushes ${playerWinnings} coins to you.`;
    }
    playerCoins += Number(playerWinnings);
    if (playerCoins <= 0) {
      return (myOutputValue += `<br><br>You got kicked out of the tavern because you have no more coins.<br>[END GAME]`);
    } else {
      gameMode = FIRSTDRAW;
      myOutputValue += `<br><br> Almost too quickly, the dealer no longer seems to register your presence.<br>[To continue playing, input your bet and press Submit]`;
    }
    return (myOutputValue += `<hr>Coins: ${playerCoins}<br><br>Your hand: ${displayCards(
      playerCardArray,
      0
    )}<br>Computer's hand: ${displayCards(computerCardArray, 0)}`);
    s;
  }
};

var rollDice = function (max) {
  var randomDecimal = Math.random() * max;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
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
  return cardDeck;
};
var drawCards = function (numberOfDraws, cardDeck, cardArray) {
  var indexNumber = 0;
  while (indexNumber < numberOfDraws) {
    cardArray.push(cardDeck.pop());
    indexNumber = indexNumber + 1;
  }
  return cardArray;
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
  console.log("validateHand sumCardsRanks: ", sumCardsRanks);
  return sumCardsRanks;
};
var validateHand = function (cardArray, minRank) {
  sumCardsRanks = computeSumCardsRanks(cardArray);
  //Validate if sumCardsRanks < minRank i.e. flagMinRank = TRUE means did not hit minRank
  var flagMinRank = sumCardsRanks < minRank;
  return flagMinRank;
};
var validateBlackjack = function (playerCardArray, computerCardArray) {
  // function validates if Blackjack end games automatically. Else, continue.
  playerBlackjack = !validateHand(playerCardArray, 21);
  computerBlackjack = !validateHand(computerCardArray, 21);
  if (computerBlackjack) {
    gameMode = ENDGAME;
    return (myOutputValue += `You consider your options.<br>[Input HIT or STAND to continue]`);
  }
  if (playerBlackjack) {
    gameMode = ENDGAME;
    return (myOutputValue += `[Press Submit to continue the game.]`);
  } else {
    gameMode = USERTURN;
  }
  myOutputValue += `You consider your options.<br>[Input HIT or STAND to continue]`;
};
var computeIfComputerDraw = function (cardArray, minRank) {
  flag = false;
  if (validateHand(cardArray, minRank)) {
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
  console.log("computeIfComputerDraw flag:", flag);
  return flag;
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
var resetGame = function () {
  computerCardArray = [];
  playerCardArray = [];
  myOutputValue = "";
  deck = makeDeck();
  console.log("deck", JSON.parse(JSON.stringify(deck)));
  shuffledDeck = shuffleCards(deck);
  console.log("shuffledDeck", JSON.parse(JSON.stringify(shuffledDeck)));
};
